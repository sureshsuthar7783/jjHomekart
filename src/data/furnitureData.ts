export interface Product {
  id: string;
  name: string;
  category: 'Living Room' | 'Bedroom' | 'Storage & Accents' | 'Study & Office' | 'Kitchen & Dining';
  image: string;
  woodType: string;
  retailPrice: number;
  wholesalePrice: number;
  dimensions: string;
  leadTime: string;
  description: string;
  features: string[];
  finishes: string[];
  inStock: boolean;
  warranty: string;
}

export interface Review {
  id: string;
  author: string;
  locality: string;
  rating: number;
  date: string;
  purchase: string;
  comment: string;
  verified: boolean;
}

export const STORE_INFO = {
  name: "JJ Homekart",
  tagline: "Direct Furniture Manufacturer & Wholesaler",
  address: "34, 35, Old UCO Bank Rd, Nagappa Reddy Layout, Ramamurthy Nagar, Bengaluru, Karnataka 560016",
  landmarks: "Opposite Lenskart & near Best Bakery",
  phone: "+91 99005 60985",
  rawPhone: "919900560985",
  hours: "Monday – Sunday: 9:00 AM – 9:00 PM",
  hoursDetail: "Open 7 days a week for retail walk-ins, custom carpentry consultations, and wholesale bulk orders",
  rating: 4.6,
  reviewCount: 10,
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=JJ+Homekart+34+35+Old+UCO+Bank+Rd+Ramamurthy+Nagar+Bengaluru+560016",
  city: "Bengaluru",
  pincode: "560016",
  yearEstablished: "2018",
  warrantyYears: 10,
};

export const FURNITURE_PRODUCTS: Product[] = [
  {
    id: "teak-sofa-divan-suite",
    name: "Solid Teak 3-Seater Sofa & Pullout Divan Suite",
    category: "Living Room",
    image: "/src/assets/images/product_wooden_sofa_divan_1793469477334.jpg",
    woodType: "100% Solid Seasoned Teak & Sheesham",
    retailPrice: 38500,
    wholesalePrice: 31500,
    dimensions: '76" W x 32" D x 34" H (Sofa) · 72" x 30" (Divan)',
    leadTime: "3 - 5 Days (In Stock / Custom 8 Days)",
    description: "Expertly handcrafted from kiln-dried hardwood with grain-matched joinery. Features a matching multi-purpose divan with deep hydraulic storage underneath for extra cushions, blankets, and bedspreads.",
    features: [
      "High-density 40D Sleepwell foam seating with ergonomic lumbar support",
      "Removable & washable stain-resistant Belgian linen covers",
      "Full under-bed smooth pullout storage drawer with leather pull tab",
      "Traditional mortise-and-tenon joints guaranteed for 10 years against sagging",
      "Hand-rubbed moisture resistant natural oil finish"
    ],
    finishes: ["Natural Honey Teak", "Rich Dark Walnut", "Warm Mahogany", "Smoked Oak"],
    inStock: true,
    warranty: "10 Years Structural Warranty"
  },
  {
    id: "led-tv-slatted-console",
    name: "Fluted Architectural LED TV Console & Wall Unit",
    category: "Living Room",
    image: "/src/assets/images/product_led_tv_cabinet_1793469479247.jpg",
    woodType: "Solid Teak Slatting on Marine Plywood Core",
    retailPrice: 24000,
    wholesalePrice: 19200,
    dimensions: '72" W x 14" D x 18" H (Accommodates 55"–85" Screens)',
    leadTime: "2 - 4 Days",
    description: "Contemporary floating or floor-mount media console featuring precision-milled wooden fluted acoustic slats, concealed warm LED backlighting channels, and seamless wire management.",
    features: [
      "Concealed 3000K warm LED ambient perimeter strip with remote dimmer",
      "Soft-close flap-down fluted door sections that allow IR remote signals",
      "Internal soundbar and set-top console pass-through channels",
      "Brushed brass handles with heavy-duty German mounting brackets",
      "Anti-termite treated solid wood edges"
    ],
    finishes: ["Natural Teak Matte", "Dark Walnut & Brass", "Nordic White Ash"],
    inStock: true,
    warranty: "7 Years Warranty"
  },
  {
    id: "royal-teak-wardrobe",
    name: "Royal 3-Door Solid Wood Wardrobe with Fluted Glass",
    category: "Bedroom",
    image: "/src/assets/images/product_custom_wardrobe_teak_1793469478239.jpg",
    woodType: "Seasoned Burma Teak & Engineered Hardwood Interior",
    retailPrice: 46000,
    wholesalePrice: 38500,
    dimensions: '54" W x 22" D x 80" H (Custom Heights available up to 9ft)',
    leadTime: "7 - 10 Days (Custom Tailored to Room Height)",
    description: "Generous 3-door wooden wardrobe designed for urban Bengaluru homes. Combines two solid wood panel doors for privacy with one ribbed fluted glass door for illuminated boutique displays.",
    features: [
      "Integrated concealed jewelry & document security locker with digital lock",
      "Full-height hanger rail for sarees, suits, and long coats",
      "Internal soft-close telescoping storage drawers with velvet liners",
      "Ventilated interior panels to prevent monsoon moisture buildup",
      "Brushed aged-brass cylindrical door pulls"
    ],
    finishes: ["Honey Gold Teak", "Imperial Rosewood Polish", "Antique Walnut"],
    inStock: true,
    warranty: "10 Years Warranty"
  },
  {
    id: "ventilated-shoe-bench",
    name: "Ventilated Slatted Shoe Cabinet with Seating Bench",
    category: "Storage & Accents",
    image: "/src/assets/images/product_wooden_shoe_rack_1793469479373.jpg",
    woodType: "Solid Teak & Seasoned Hardwood Frame",
    retailPrice: 14500,
    wholesalePrice: 11500,
    dimensions: '48" W x 16" D x 24" H (Capacity: 24–30 pairs)',
    leadTime: "In Stock / Ready for Same-Day Delivery",
    description: "Combines functional entryway shoe storage with a comfortable padded bench. Slatted wooden louver doors allow continuous air circulation to eliminate footwear odor in humid weather.",
    features: [
      "Multi-tier modular internal shelving with adjustable heights for high boots",
      "High-resilience tufted grey fabric seating bench with washable cover",
      "Open quick-access side cubbies for everyday slippers and guest shoes",
      "Raised legs for easy robot vacuum cleaning underneath",
      "Brass round knobs with magnetic soft-catch closures"
    ],
    finishes: ["Two-Tone Honey Oak & Charcoal", "Monochrome Teak", "Dark Espresso"],
    inStock: true,
    warranty: "5 Years Warranty"
  },
  {
    id: "solid-teak-living-coffee-table",
    name: "Handcrafted Solid Teakwood Center & Coffee Table",
    category: "Living Room",
    image: "/src/assets/images/hero_teak_living_showroom_1793469477466.jpg",
    woodType: "100% Solid Natural Teakwood",
    retailPrice: 11800,
    wholesalePrice: 9200,
    dimensions: '44" W x 24" D x 18" H',
    leadTime: "Ready for Delivery",
    description: "Minimalist Scandinavian-inspired center table built with thick solid teak planks. Rounded safety corners protect toddlers while showcasing gorgeous continuous wood grain.",
    features: [
      "Beveled edge profile with silky smooth hand-sanded touch",
      "Bottom slatted magazine and remote organizer shelf",
      "Heat and water-resistant polyurethane protective topcoat",
      "Sturdy tapered wooden legs with silicone floor protectors"
    ],
    finishes: ["Natural Warm Teak", "Raw Matte Wax Polish", "Dark Walnut"],
    inStock: true,
    warranty: "10 Years Warranty"
  },
  {
    id: "ergonomic-hardwood-study-desk",
    name: "Ergonomic Solid Wood Computer Desk & Workstation",
    category: "Study & Office",
    image: "/src/assets/images/product_wooden_sofa_divan_1793469477334.jpg",
    woodType: "Kiln-Dried Sheesham & Teak",
    retailPrice: 16800,
    wholesalePrice: 13200,
    dimensions: '48" W x 24" D x 30" H',
    leadTime: "3 - 5 Days",
    description: "Built for work-from-home engineers and creatives in Bengaluru. Deep wooden desktop with integrated cable pass-through, dual smooth-gliding storage drawers, and ergonomic legroom.",
    features: [
      "CNC-routed cable grommet with brass cap for laptop chargers and monitors",
      "Solid dovetail jointed drawers on silent ball-bearing slides",
      "Spacious knee clearance designed for standard ergonomic office chairs",
      "Zero wobble solid hardwood construction"
    ],
    finishes: ["Honey Sheesham", "Teak Matte", "Ebony Stained Oak"],
    inStock: true,
    warranty: "7 Years Warranty"
  },
  {
    id: "modular-kitchen-base-overhead",
    name: "Custom Modular Kitchen Storage & Overhead Cabinetry",
    category: "Kitchen & Dining",
    image: "/src/assets/images/product_custom_wardrobe_teak_1793469478239.jpg",
    woodType: "IS 710 Boiling Waterproof Marine Ply + Acrylic / Teak Laminate",
    retailPrice: 58000,
    wholesalePrice: 47000,
    dimensions: 'Custom Run per Running Foot (Starting ₹1,650/sq.ft)',
    leadTime: "10 - 14 Days (Factory Manufactured & On-Site Installation)",
    description: "Factory manufactured modular kitchen cabinetry with moisture-proof marine ply core and heavy-duty German soft-close hydraulic hardware.",
    features: [
      "100% Boiling Waterproof (BWP) grade ply that resists kitchen steam and moisture",
      "Hettich / Blum soft-close hinges and tandem box cutlery organizers",
      "Custom chimney cutouts, spice pullouts, and heavy grain-pull drawers",
      "Free site measurement anywhere in Bengaluru within 24 hours"
    ],
    finishes: ["Gloss Acrylic White & Teak", "Matte Slate & Warm Timber", "Anti-Scratch Laminate"],
    inStock: false,
    warranty: "15 Years BWP Warranty"
  },
  {
    id: "solid-wood-library-bookshelf",
    name: "Multi-Tier Open & Glass Library Bookshelf",
    category: "Storage & Accents",
    image: "/src/assets/images/hero_teak_living_showroom_1793469477466.jpg",
    woodType: "Solid Teak Frame & Sturdy Hardwood Shelves",
    retailPrice: 18500,
    wholesalePrice: 14800,
    dimensions: '36" W x 14" D x 74" H',
    leadTime: "3 - 5 Days",
    description: "Vertical tall storage bookcase designed to house heavy book collections, framed family photos, and decor. Features 4 open display tiers plus a bottom closed double-door cabinet.",
    features: [
      "Reinforced 22mm solid shelves that will not bend under 40kg heavy encyclopedias",
      "Enclosed dust-proof bottom cabinet for documents and office files",
      "Wall-anchor safety brackets included for child and seismic safety",
      "Hand-rubbed smooth polyurethane seal"
    ],
    finishes: ["Classic Teak Finish", "Dark Walnut Polish", "Vintage Honey"],
    inStock: true,
    warranty: "10 Years Warranty"
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ramesh Narayanan",
    locality: "Ramamurthy Nagar, Bengaluru",
    rating: 5,
    date: "2 weeks ago",
    purchase: "Solid Teak 3-Seater Sofa & Pullout Divan Suite",
    comment: "Bought our living room sofa and custom divan from JJ Homekart directly at their Old UCO Bank Road shop. The wood quality is genuine seasoned teak—heavy, solid, and beautifully polished. Saved at least 35% compared to big showroom brand prices on Outer Ring Road.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Deepika Gowda",
    locality: "Kasturi Nagar, Bengaluru",
    rating: 5,
    date: "1 month ago",
    purchase: "3-Door Teak Wardrobe & Dressing Table",
    comment: "They customized the wardrobe height exactly to 8.5 feet to match our apartment ceiling. Suresh and his carpentry team visited our flat for exact measurements within 2 hours of calling. Very prompt delivery and flawless assembly.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Venkatraman Swamy",
    locality: "Horamavu, Bengaluru",
    rating: 5,
    date: "2 months ago",
    purchase: "Fluted LED TV Unit & Slatted Shoe Rack",
    comment: "The LED TV cabinet with acoustic slats looks straight out of an interior design magazine. The concealed wire management keeps everything spotless. The ventilated shoe rack is also super sturdy and the top bench cushion is firm and comfortable.",
    verified: true
  },
  {
    id: "rev-4",
    author: "Pooja & Karthik",
    locality: "Kalyan Nagar, Bengaluru",
    rating: 4,
    date: "3 months ago",
    purchase: "Solid Teak Dining Table (6-Seater)",
    comment: "Great craftsmanship and honest pricing. You can literally inspect the raw wood planks before they polish them in their factory setup. Delivery was on time right to our 3rd floor apartment.",
    verified: true
  },
  {
    id: "rev-5",
    author: "Arun Kulkarni (Interior Designer)",
    locality: "Whitefield, Bengaluru",
    rating: 5,
    date: "4 months ago",
    purchase: "Wholesale Order (3 Apartment Furnishing Sets)",
    comment: "I regularly source custom wooden furniture from JJ Homekart for my residential interior clients in East Bangalore. Their wholesale rates and reliability on dimensions are unmatched. Highly recommend for both home owners and architects.",
    verified: true
  }
];

export const NEIGHBORHOOD_ROUTES = [
  {
    from: "KR Puram Railway Station / Hanging Bridge",
    distance: "3.8 km",
    travelTime: "10 - 12 mins",
    routeHint: "Head north via ITI Colony Rd / Ramamurthy Nagar Main Rd towards Old UCO Bank Rd. Landmark: Opposite Lenskart."
  },
  {
    from: "Kasturi Nagar / BDA Complex",
    distance: "2.4 km",
    travelTime: "7 mins",
    routeHint: "Take Dr. Rajkumar Rd towards Nagappa Reddy Layout. We are right next to Best Bakery."
  },
  {
    from: "Horamavu Agara / Kalkere",
    distance: "3.2 km",
    travelTime: "8 mins",
    routeHint: "Straight down Horamavu Main Road crossing the railway underpass to Old UCO Bank Road."
  },
  {
    from: "Manyata Tech Park / Hebbal",
    distance: "8.5 km",
    travelTime: "18 - 22 mins",
    routeHint: "Via Outer Ring Road through Hennur Junction & Ramamurthy Nagar underpass."
  },
  {
    from: "Indiranagar / Old Madras Road",
    distance: "6.2 km",
    travelTime: "16 mins",
    routeHint: "Via Kasturi Nagar flyover towards Nagappa Reddy Layout."
  }
];

export const WHOLESALE_BENEFITS = [
  {
    title: "Direct Factory Pricing",
    desc: "Cut out 35%–45% retail showroom overheads. We manufacture directly in our specialized woodcraft facility."
  },
  {
    title: "Custom Sizing & CAD Specs",
    desc: "Every flat in Bengaluru has unique pillar niches and beam heights. We customize millimeter-exact widths and heights."
  },
  {
    title: "10-Year Anti-Borer Guarantee",
    desc: "All teak, sheesham, and marine plywood undergo high-pressure chemical vacuum treatment against termites and borers."
  },
  {
    title: "Bulk Discounts for Builders & PGs",
    desc: "Tiered pricing starting from 3+ units for apartment owners, builders, interior designers, and PG accommodations."
  }
];
