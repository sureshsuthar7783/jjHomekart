import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Eye, RotateCcw, Maximize2, Sparkles, ChevronDown, ChevronUp, Layers, Palette, Compass } from 'lucide-react';

interface ThreeFurnitureStudioProps {
  onOpenQuotation?: () => void;
}

export type WoodFinishKey = 'burma_teak' | 'sheesham' | 'dark_walnut' | 'nordic_ash';

interface FinishConfig {
  name: string;
  color: number;
  roughness: number;
  metalness: number;
  grainIntensity: number;
  swatchHex: string;
}

const WOOD_FINISHES: Record<WoodFinishKey, FinishConfig> = {
  burma_teak: {
    name: 'Burma Teak (Golden Honey)',
    color: 0x9e602e,
    roughness: 0.38,
    metalness: 0.05,
    grainIntensity: 0.8,
    swatchHex: '#9E602E',
  },
  sheesham: {
    name: 'Indian Sheesham (Rosewood)',
    color: 0x6e3518,
    roughness: 0.32,
    metalness: 0.06,
    grainIntensity: 1.1,
    swatchHex: '#6E3518',
  },
  dark_walnut: {
    name: 'Smoked Walnut (Espresso)',
    color: 0x3d2719,
    roughness: 0.42,
    metalness: 0.04,
    grainIntensity: 0.7,
    swatchHex: '#3D2719',
  },
  nordic_ash: {
    name: 'Nordic Ash (Natural Matte)',
    color: 0xcbb292,
    roughness: 0.45,
    metalness: 0.02,
    grainIntensity: 0.5,
    swatchHex: '#CBB292',
  },
};

// Procedural Canvas Wood Grain Texture Generator
function createProceduralWoodTexture(colorHex: number, grainScale = 1.0): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const baseColor = new THREE.Color(colorHex);
  ctx.fillStyle = `#${baseColor.getHexString()}`;
  ctx.fillRect(0, 0, 512, 512);

  // Generate continuous procedural grain rings and pores
  for (let y = 0; y < 512; y++) {
    const grainNoise = Math.sin(y * 0.04 * grainScale) * Math.cos(y * 0.008) * 18;
    const brightness = (Math.sin((y + grainNoise) * 0.2) + 1) * 0.5;
    
    // Subtle alternating earlywood and latewood rings
    const ringColor = baseColor.clone();
    ringColor.offsetHSL(0, 0.02, (brightness - 0.5) * 0.12);

    ctx.fillStyle = `#${ringColor.getHexString()}`;
    ctx.fillRect(0, y, 512, 1);
  }

  // Add micro wood pores / fibers
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let i = 0; i < 1500; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, Math.random() * 4 + 1, Math.random() * 1.5 + 0.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ThreeFurnitureStudio: React.FC<ThreeFurnitureStudioProps> = ({ onOpenQuotation }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<WoodFinishKey>('burma_teak');
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [cameraView, setCameraView] = useState<'perspective' | 'front' | 'top'>('perspective');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // References for render loop state
  const explodedRef = useRef<number>(0);
  const finishRef = useRef<WoodFinishKey>('burma_teak');
  const sceneElementsRef = useRef<{
    woodMaterial?: THREE.MeshStandardMaterial;
    cushionMaterial?: THREE.MeshStandardMaterial;
    cushions?: THREE.Group;
    drawer?: THREE.Group;
    backrest?: THREE.Mesh;
    sideArms?: THREE.Group;
    controls?: OrbitControls;
    camera?: THREE.PerspectiveCamera;
  }>({});

  useEffect(() => {
    explodedRef.current = explodedVal;
  }, [explodedVal]);

  useEffect(() => {
    finishRef.current = selectedFinish;
    if (sceneElementsRef.current.woodMaterial) {
      const cfg = WOOD_FINISHES[selectedFinish];
      sceneElementsRef.current.woodMaterial.color.setHex(cfg.color);
      sceneElementsRef.current.woodMaterial.roughness = cfg.roughness;
      sceneElementsRef.current.woodMaterial.metalness = cfg.metalness;
      sceneElementsRef.current.woodMaterial.map = createProceduralWoodTexture(cfg.color, cfg.grainIntensity);
      sceneElementsRef.current.woodMaterial.needsUpdate = true;
    }
  }, [selectedFinish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f1e8);
    scene.fog = new THREE.FogExp2(0xf6f1e8, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(3.8, 2.5, 4.4);
    sceneElementsRef.current.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.03; // Don't flip below floor
    controls.minDistance = 2.5;
    controls.maxDistance = 8.5;
    controls.target.set(0, 0.65, 0);
    controls.update();
    sceneElementsRef.current.controls = controls;

    // Lighting (Warm Key + Cool Fill + Subtle Rim)
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0xd4c2a5, 0.6);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(4, 6, 3);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 14;
      dirLight.shadow.camera.left = -3;
      dirLight.shadow.camera.right = 3;
      dirLight.shadow.camera.top = 3;
      dirLight.shadow.camera.bottom = -3;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xd9b382, 0.9);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Ground Plane with Soft Radial Shadow
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf3ece1,
      roughness: 0.9,
      metalness: 0.0,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    // Subtle Ground Contact Ring
    const contactCanvas = document.createElement('canvas');
    contactCanvas.width = 256;
    contactCanvas.height = 256;
    const cCtx = contactCanvas.getContext('2d')!;
    const grad = cCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(56, 33, 11, 0.45)');
    grad.addColorStop(0.5, 'rgba(56, 33, 11, 0.18)');
    grad.addColorStop(1, 'rgba(56, 33, 11, 0)');
    cCtx.fillStyle = grad;
    cCtx.fillRect(0, 0, 256, 256);
    const contactTex = new THREE.CanvasTexture(contactCanvas);

    const contactPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 2.2),
      new THREE.MeshBasicMaterial({ map: contactTex, transparent: true, depthWrite: false })
    );
    contactPlane.rotation.x = -Math.PI / 2;
    contactPlane.position.set(0, 0.005, 0);
    scene.add(contactPlane);

    // -------------------------------------------------------------
    // Procedural 3D Furniture Hierarchy (Sofa & Storage Divan Suite)
    // -------------------------------------------------------------
    const furnitureGroup = new THREE.Group();
    scene.add(furnitureGroup);

    // Shared Wood Material
    const initConfig = WOOD_FINISHES[finishRef.current];
    const woodTexture = createProceduralWoodTexture(initConfig.color, initConfig.grainIntensity);
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: initConfig.color,
      roughness: initConfig.roughness,
      metalness: initConfig.metalness,
      map: woodTexture,
    });
    sceneElementsRef.current.woodMaterial = woodMaterial;

    // Linen Fabric Material
    const cushionMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8dfd1,
      roughness: 0.85,
      metalness: 0.02,
    });
    sceneElementsRef.current.cushionMaterial = cushionMaterial;

    // Brass Hardware Material
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.85,
    });

    // 1. Solid Wood Base Frame Planks
    const basePlank = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.0), woodMaterial);
    basePlank.position.set(0, 0.35, 0);
    basePlank.castShadow = !isSoftwareGl;
    basePlank.receiveShadow = !isSoftwareGl;
    furnitureGroup.add(basePlank);

    // 2. Tapered Wooden Legs (4 corners)
    const legGeo = new THREE.CylinderGeometry(0.04, 0.025, 0.35, 12);
    const legPositions: [number, number, number][] = [
      [-1.1, 0.175, -0.42],
      [1.1, 0.175, -0.42],
      [-1.1, 0.175, 0.42],
      [1.1, 0.175, 0.42],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, woodMaterial);
      leg.position.set(x, y, z);
      leg.castShadow = !isSoftwareGl;
      furnitureGroup.add(leg);
    });

    // 3. Side Arms with Mortise-and-Tenon Joint Detailing
    const sideArms = new THREE.Group();
    furnitureGroup.add(sideArms);
    sceneElementsRef.current.sideArms = sideArms;

    const armGeo = new THREE.BoxGeometry(0.1, 0.35, 1.05);
    const leftArm = new THREE.Mesh(armGeo, woodMaterial);
    leftArm.position.set(-1.18, 0.55, 0);
    leftArm.castShadow = !isSoftwareGl;
    sideArms.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, woodMaterial);
    rightArm.position.set(1.18, 0.55, 0);
    rightArm.castShadow = !isSoftwareGl;
    sideArms.add(rightArm);

    // 4. Backrest Frame
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 0.08), woodMaterial);
    backrest.position.set(0, 0.72, -0.48);
    backrest.castShadow = !isSoftwareGl;
    furnitureGroup.add(backrest);
    sceneElementsRef.current.backrest = backrest;

    // 5. Cushions Group (Seat cushions + Back lumbar pillows)
    const cushionsGroup = new THREE.Group();
    furnitureGroup.add(cushionsGroup);
    sceneElementsRef.current.cushions = cushionsGroup;

    // 3 Distinct Seat Cushions
    const seatCushionGeo = new THREE.BoxGeometry(0.72, 0.14, 0.85);
    [-0.76, 0, 0.76].forEach((xPos) => {
      const seat = new THREE.Mesh(seatCushionGeo, cushionMaterial);
      seat.position.set(xPos, 0.47, 0.02);
      seat.castShadow = !isSoftwareGl;
      seat.receiveShadow = !isSoftwareGl;
      cushionsGroup.add(seat);
    });

    // 3 Backrest Pillows
    const backPillowGeo = new THREE.BoxGeometry(0.72, 0.36, 0.16);
    [-0.76, 0, 0.76].forEach((xPos) => {
      const pillow = new THREE.Mesh(backPillowGeo, cushionMaterial);
      pillow.position.set(xPos, 0.7, -0.36);
      pillow.rotation.x = 0.08;
      pillow.castShadow = !isSoftwareGl;
      cushionsGroup.add(pillow);
    });

    // Two Throw Pillows (Accent)
    const throwMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.9,
    });
    const throwGeo = new THREE.BoxGeometry(0.32, 0.32, 0.12);
    const leftThrow = new THREE.Mesh(throwGeo, throwMat);
    leftThrow.position.set(-0.95, 0.65, -0.2);
    leftThrow.rotation.set(0.1, 0.3, 0.1);
    cushionsGroup.add(leftThrow);

    const rightThrow = new THREE.Mesh(throwGeo, throwMat);
    rightThrow.position.set(0.95, 0.65, -0.2);
    rightThrow.rotation.set(0.1, -0.3, -0.1);
    cushionsGroup.add(rightThrow);

    // 6. Pullout Under-Bed Storage Divan Drawer
    const drawerGroup = new THREE.Group();
    furnitureGroup.add(drawerGroup);
    sceneElementsRef.current.drawer = drawerGroup;

    const drawerBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.22, 0.86), woodMaterial);
    drawerBody.position.set(0, 0.15, 0.02);
    drawerBody.castShadow = !isSoftwareGl;
    drawerGroup.add(drawerBody);

    // Brass / Leather Drawer Pull
    const pullGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.22, 12);
    const drawerPull = new THREE.Mesh(pullGeo, brassMaterial);
    drawerPull.rotation.z = Math.PI / 2;
    drawerPull.position.set(0, 0.15, 0.46);
    drawerGroup.add(drawerPull);

    // 7. Companion Teak Center Table in Front
    const coffeeTable = new THREE.Group();
    coffeeTable.position.set(0, 0, 1.4);
    furnitureGroup.add(coffeeTable);

    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.65), woodMaterial);
    tableTop.position.set(0, 0.38, 0);
    tableTop.castShadow = !isSoftwareGl;
    tableTop.receiveShadow = !isSoftwareGl;
    coffeeTable.add(tableTop);

    // Table legs
    const tLegGeo = new THREE.CylinderGeometry(0.025, 0.018, 0.38, 10);
    [
      [-0.6, 0.19, -0.25],
      [0.6, 0.19, -0.25],
      [-0.6, 0.19, 0.25],
      [0.6, 0.19, 0.25],
    ].forEach(([tx, ty, tz]) => {
      const tLeg = new THREE.Mesh(tLegGeo, woodMaterial);
      tLeg.position.set(tx, ty, tz);
      tLeg.castShadow = !isSoftwareGl;
      coffeeTable.add(tLeg);
    });

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Spring Damping
    let frameId: number;
    let targetCameraPos = new THREE.Vector3(3.8, 2.5, 4.4);
    let targetLookAt = new THREE.Vector3(0, 0.65, 0);

    const clock = new THREE.Clock();

    let isUserInteracting = false;
    controls.addEventListener('start', () => { isUserInteracting = true; });
    controls.addEventListener('end', () => { isUserInteracting = false; });

    const animate = () => {
      const dt = clock.getDelta();

      // Smooth camera position transitions
      camera.position.lerp(targetCameraPos, Math.min(dt * 3.5, 1));
      controls.target.lerp(targetLookAt, Math.min(dt * 3.5, 1));

      // Slow cinematic turntable rotation if enabled & not being actively dragged
      if (isRotating && !isUserInteracting) {
        furnitureGroup.rotation.y += dt * 0.12;
      }

      // Smooth Exploded View Interpolation
      const targetExp = explodedRef.current;
      const cushions = sceneElementsRef.current.cushions;
      const drawer = sceneElementsRef.current.drawer;
      const sideArms = sceneElementsRef.current.sideArms;
      const backrest = sceneElementsRef.current.backrest;

      if (cushions) {
        // Cushions float upward
        cushions.position.y = THREE.MathUtils.damp(cushions.position.y, targetExp * 0.75, 8, dt);
      }
      if (drawer) {
        // Drawer glides smoothly forward
        drawer.position.z = THREE.MathUtils.damp(drawer.position.z, targetExp * 0.85, 8, dt);
      }
      if (sideArms) {
        // Side arms expand slightly outward
        sideArms.position.x = THREE.MathUtils.damp(sideArms.position.x, 0, 8, dt);
      }
      if (backrest) {
        // Backrest shifts backward
        backrest.position.z = THREE.MathUtils.damp(backrest.position.z, -0.48 - targetExp * 0.4, 8, dt);
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Preset Views
  const switchCameraView = (view: 'perspective' | 'front' | 'top') => {
    setCameraView(view);
    const camera = sceneElementsRef.current.camera;
    const controls = sceneElementsRef.current.controls;
    if (!camera || !controls) return;

    if (view === 'perspective') {
      camera.position.set(3.8, 2.5, 4.4);
      controls.target.set(0, 0.65, 0);
    } else if (view === 'front') {
      camera.position.set(0, 1.1, 4.2);
      controls.target.set(0, 0.5, 0);
    } else if (view === 'top') {
      camera.position.set(0, 5.2, 0.1);
      controls.target.set(0, 0, 0);
    }
  };

  const resetView = () => {
    setExplodedVal(0);
    switchCameraView('perspective');
    setIsRotating(true);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden bg-[#F6F1E8] border border-[#E6D9C5] shadow-xl select-none group">
      
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
        data-cursor="DRAG 3D"
        onMouseDown={() => setIsRotating(false)}
        onTouchStart={() => setIsRotating(false)}
      />

      {/* Top Left Spec Badge (§5: minimal unboxed branding, no pulsating dots) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-[#FAF7F2]/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#E6D9C5] shadow-xs space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B5A2B]">
            Interactive 3D Woodcraft Studio
          </div>
          <div className="font-serif text-sm font-bold text-[#38210B]">
            Solid Teak Sofa & Storage Divan Suite
          </div>
          <div className="text-[11px] text-[#523315]">
            Drag to Rotate · Scroll to Zoom · Inspect Millimeter Joinery
          </div>
        </div>
      </div>

      {/* Top Right Quick Utilities */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs border transition-all cursor-pointer ${
            isRotating 
              ? 'bg-[#6D441F] text-white border-[#6D441F]' 
              : 'bg-[#FAF7F2]/90 text-[#523315] border-[#E6D9C5] hover:bg-white'
          }`}
          title="Toggle Turntable"
        >
          {isRotating ? 'Pause Turntable' : 'Auto Rotate'}
        </button>

        <button
          onClick={resetView}
          className="p-2 rounded-lg bg-[#FAF7F2]/90 hover:bg-white text-[#523315] border border-[#E6D9C5] backdrop-blur-xs transition-colors cursor-pointer"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Unified Bottom Control Dock (§5: Horizontal Glassmorphic Dock, No Side Occlusion) */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-all duration-300 ${
          isDockCollapsed ? 'bottom-2' : 'bottom-4'
        }`}
      >
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-1 bg-[#FAF7F2]/95 backdrop-blur-md rounded-t-lg border-t border-x border-[#E6D9C5] text-[11px] font-semibold text-[#523315] hover:text-[#38210B] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>Show 3D Studio Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>Zen Fullscreen View</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        {!isDockCollapsed && (
          <div className="bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#E6D9C5] shadow-xl space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
              
              {/* Finish Selector */}
              <div className="md:col-span-5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#38210B]">
                  <span className="flex items-center gap-1 text-[#8B5A2B]">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Hardwood Finish:</span>
                  </span>
                  <span className="text-[10px] text-[#6D441F] font-normal truncate max-w-[130px]">
                    {WOOD_FINISHES[selectedFinish].name.split('(')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {(Object.keys(WOOD_FINISHES) as WoodFinishKey[]).map((key) => {
                    const cfg = WOOD_FINISHES[key];
                    const isSelected = selectedFinish === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedFinish(key)}
                        className={`p-1 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-[#6D441F] bg-[#6D441F]/10 ring-1 ring-[#6D441F]'
                            : 'border-[#E6D9C5] bg-white hover:bg-[#F3ECE1]'
                        }`}
                        title={cfg.name}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                          style={{ backgroundColor: cfg.swatchHex }}
                        />
                        <span className="text-[10px] font-medium text-[#38210B] truncate">
                          {key === 'burma_teak' ? 'Teak' : key === 'sheesham' ? 'Rosewood' : key === 'dark_walnut' ? 'Walnut' : 'Ash'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exploded Joinery View Slider */}
              <div className="md:col-span-4 space-y-1.5 border-t md:border-t-0 md:border-l md:border-r border-[#E6D9C5] pt-2 md:pt-0 md:px-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#38210B]">
                  <span className="flex items-center gap-1 text-[#8B5A2B]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Exploded Joinery:</span>
                  </span>
                  <span className="text-[10px] font-mono tabular-nums text-[#6D441F]">
                    {Math.round(explodedVal * 100)}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedVal}
                  onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
                  className="w-full accent-[#6D441F] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#6D441F]">
                  <span>Assembled</span>
                  <span>Internal Drawer & Joints</span>
                </div>
              </div>

              {/* Camera Angle Presets & Action */}
              <div className="md:col-span-3 flex flex-col justify-between gap-1.5 pt-2 md:pt-0">
                <div className="text-[11px] font-semibold text-[#8B5A2B] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Camera Angles:</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => switchCameraView('perspective')}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded border transition-colors cursor-pointer ${
                      cameraView === 'perspective'
                        ? 'bg-[#6D441F] text-white border-[#6D441F]'
                        : 'bg-white text-[#523315] border-[#E6D9C5]'
                    }`}
                  >
                    3D Iso
                  </button>
                  <button
                    onClick={() => switchCameraView('front')}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded border transition-colors cursor-pointer ${
                      cameraView === 'front'
                        ? 'bg-[#6D441F] text-white border-[#6D441F]'
                        : 'bg-white text-[#523315] border-[#E6D9C5]'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => switchCameraView('top')}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded border transition-colors cursor-pointer ${
                      cameraView === 'top'
                        ? 'bg-[#6D441F] text-white border-[#6D441F]'
                        : 'bg-white text-[#523315] border-[#E6D9C5]'
                    }`}
                  >
                    Top
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
