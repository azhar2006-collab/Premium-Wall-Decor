/**
 * KINETIC MOTO - Master Product Catalog
 * Exactly 20 distinct 3D Miniature Motorcycle Models & Premium Wall Decor
 * Featuring authentic miniature scale models, diecast sculptures & 3D printed builds
 */

const PRODUCTS_DATA = [
  // --- PRODUCT 1: USER UPLOAD - Triumph Speed 400 Handheld ---
  {
    id: 1,
    name: "Triumph Speed 400 Heritage Miniature",
    category: "Classic Motorcycles",
    originalPrice: 249,
    price: 189,
    rating: 5.0,
    reviewsCount: 68,
    image: "assets/images/product-1.jpg",
    badge: "Bestseller",
    featured: true,
    shortDesc: "Triumph modern-classic roadster miniature in cherry red and brushed silver tank relief.",
    fullDesc: "An exquisite 3D miniature celebrating Triumph's timeless roadster design. Hand-held scale precision showcasing the signature teardrop red-and-white fuel tank, gold anodized upside-down front forks, finned cylinder head, and upswept silencer mounted in a museum shadowbox frame.",
    specs: {
      scale: "1:18 Collector Scale Miniature",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Anodized Matte Aluminum Shadowbox",
      backing: "Carbon-Twill Textured Display Plaque",
      glazing: "Museum Ultra-Clear UV Acrylic (99% UV-cut)",
      weight: "2.4 kg (5.3 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 2: USER UPLOAD - Stealth Matte Black Streetfighter ---
  {
    id: 2,
    name: "Stealth Black Streetfighter 3D Miniature",
    category: "Custom Miniature Bikes",
    originalPrice: 269,
    price: 209,
    rating: 4.9,
    reviewsCount: 54,
    image: "assets/images/product-2.jpg",
    badge: "Limited Edition",
    featured: true,
    shortDesc: "Monochromatic blacked-out naked streetfighter with exposed trellis frame miniature.",
    fullDesc: "Aggressive, sinister, and stripped-down. This stealth black 3D miniature streetfighter highlights sharp sculpted tank contours, perimeter frame geometry, blacked-out alloy wheels, and dual petal disc brake replicas set in an acoustic-absorbing charcoal shadowbox.",
    specs: {
      scale: "1:18 Collector Scale Miniature",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Matte Black Billet Aluminum",
      backing: "Brushed Gunmetal Backplate",
      glazing: "Anti-Scratch Optical Acrylic",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Flush Magnetic Wall Mount System"
    }
  },

  // --- PRODUCT 3: USER UPLOAD - 3D-Printed Naked Custom ---
  {
    id: 3,
    name: "Kinetic Mono 3D-Printed Naked Sport",
    category: "Custom Miniature Bikes",
    originalPrice: 239,
    price: 179,
    rating: 4.8,
    reviewsCount: 42,
    image: "assets/images/product-3.jpg",
    badge: "3D Artisan Build",
    featured: false,
    shortDesc: "Precision additive-sculpted naked sport motorcycle in raw matte monochrome layers.",
    fullDesc: "A raw celebration of digital manufacturing and miniature design. Every facet features authentic micro-layer 3D textured styling, contrasting white wheel rims, circular LED projector headlight miniature, and an aggressive swept-forward streetfighter geometry.",
    specs: {
      scale: "1:12 Custom 3D Scale",
      dimensions: "400 mm × 300 mm × 80 mm",
      frame: "Extruded Charcoal Billet Shadowbox",
      backing: "Industrial Concrete Grey Texture",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.2 kg (4.8 lbs)",
      mounting: "Dual Locking Wall Fasteners"
    }
  },

  // --- PRODUCT 4: USER UPLOAD - 3D Dirt Bike Motocross ---
  {
    id: 4,
    name: "Apex Dirt Pro 250 Motocross Miniature",
    category: "Adventure Bikes",
    originalPrice: 259,
    price: 199,
    rating: 4.9,
    reviewsCount: 47,
    image: "assets/images/product-4.jpg",
    badge: "Motocross Edition",
    featured: false,
    shortDesc: "High-clearance motocross dirt bike miniature with spoke wheels and rear monoshock.",
    fullDesc: "Pure off-road DNA captured in high-detail scale relief. Features aggressive knobby dirt tires with wire spokes, high-rise motocross handlebars, perimeter alloy swingarm, expansion chamber exhaust, and white racing number board on a floating wall plinth.",
    specs: {
      scale: "1:18 Precision Dirt Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Solid Charcoal Aluminum Frame",
      backing: "Matte Slate Geometric Grid",
      glazing: "Anti-Scratch Optical Acrylic",
      weight: "2.3 kg (5.1 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 5: USER UPLOAD - Sur-Ron Electric Dirt Bike ---
  {
    id: 5,
    name: "Sur-Ron Ultra-Bee Electric Dirt Miniature",
    category: "Adventure Bikes",
    originalPrice: 289,
    price: 229,
    rating: 5.0,
    reviewsCount: 76,
    image: "assets/images/product-5.jpg",
    badge: "Hyper-Detail",
    featured: true,
    shortDesc: "Ultra-detailed electric enduro miniature with anodized gold inverted forks and purple fairings.",
    fullDesc: "The undisputed icon of modern electric trail performance. Showcases anodized gold inverted front suspension forks, functional kickstand replica, high-torque central motor block, gold chain drive detailing, and vivid metallic purple plastics set in a luxury framed display.",
    specs: {
      scale: "1:18 Hyper-Detail Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Aviation-Grade Anodized Black Aluminum",
      backing: "Topographic Mountain Contour Map Backing",
      glazing: "Museum Ultra-Clear UV Acrylic (99% UV-cut)",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Flush Magnetic Wall Mount System"
    }
  },

  // --- PRODUCT 6: USER UPLOAD - Kawasaki Tourer with Rider Figurine ---
  {
    id: 6,
    name: "Kawasaki Versys Sport Tourer + Rider Figurine",
    category: "Adventure Bikes",
    originalPrice: 299,
    price: 239,
    rating: 4.9,
    reviewsCount: 59,
    image: "assets/images/product-6.jpg",
    badge: "Collector Set",
    featured: false,
    shortDesc: "Adventure-touring miniature with green wind protection and hand-painted rider figure.",
    fullDesc: "A complete diorama in a frame! Features the lime-green Kawasaki adventure tourer with tall touring windscreen, rear luggage racks, and a hand-painted scale rider figure in aerodynamic helmet and leathers, creating an unmatched sense of life and motion on your wall.",
    specs: {
      scale: "1:18 Scale Diorama Set",
      dimensions: "400 mm × 300 mm × 85 mm",
      frame: "Brushed Gunmetal Billet Shadowbox",
      backing: "Track Telemetry Laser-Etched Plate",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.8 kg (6.2 lbs)",
      mounting: "Concealed Wall Mounting Cleat"
    }
  },

  // --- PRODUCT 7: USER UPLOAD - Yamaha RX 100 Red on Workbench ---
  {
    id: 7,
    name: "Yamaha RX 100 Heritage Red (1990)",
    category: "Classic Motorcycles",
    originalPrice: 279,
    price: 219,
    rating: 5.0,
    reviewsCount: 88,
    image: "assets/images/product-7.jpg",
    badge: "Legendary 2-Stroke",
    featured: true,
    shortDesc: "The iconic two-stroke sound of the 90s preserved in classic cherry red on wood workshop display.",
    fullDesc: "The undisputed king of retro street nostalgia. Immortalized in breathtaking scale detail with authentic candy cherry red tank, Yamaha gold striping, chrome peashooter exhaust pipe, round chrome headlamp, dual rear shocks, and center-stand display posture.",
    specs: {
      scale: "1:18 Precision Scale Replica",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Solid Hardwood & Billet Aluminum Frame",
      backing: "Artisan Workshop Timber Grain Backplate",
      glazing: "Museum Ultra-Clear UV Acrylic (99% Clarity)",
      weight: "2.6 kg (5.7 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 8: USER UPLOAD - Yamaha RX 100 Cobalt Blue on Ledge ---
  {
    id: 8,
    name: "Yamaha RX 100 Cobalt Blue Edition",
    category: "Classic Motorcycles",
    originalPrice: 269,
    price: 209,
    rating: 4.9,
    reviewsCount: 63,
    image: "assets/images/product-8.jpg",
    badge: "Retro Classic",
    featured: false,
    shortDesc: "Legendary twin-seat classic commuter in deep metallic cobalt blue with chrome fenders.",
    fullDesc: "The beloved two-stroke legend in its rare cobalt blue livery. Complete with authentic side-stand lean, spoke wire rims, chrome fenders, ribbed black two-seater saddle, and period-correct registration plate detailing.",
    specs: {
      scale: "1:18 Precision Scale Replica",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Matte Charcoal Velvet & Billet Aluminum",
      backing: "Brushed Silver Heritage Plaque",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Flush Wall Mount & Stand"
    }
  },

  // --- PRODUCT 9: Ducati 999 1:6 Precision Scale Model ---
  {
    id: 9,
    name: "Ducati 999 Superbike Studio Model",
    category: "Super Bikes",
    originalPrice: 339,
    price: 269,
    rating: 4.9,
    reviewsCount: 44,
    image: "assets/images/product-9.jpg",
    badge: "Large 1:6 Scale",
    featured: false,
    shortDesc: "Pierre Terblanche's iconic stacked-headlight Ducati superbike in 1:6 studio precision scale.",
    fullDesc: "A masterwork of 2000s superbike design. Features stacked projector headlights, sculptural aerodynamic side vents, dry clutch miniature assembly, and Rosso Corsa fairings preserved in a deep panoramic shadowbox frame.",
    specs: {
      scale: "1:6 Studio Large Scale",
      dimensions: "450 mm × 350 mm × 95 mm",
      frame: "Aviation-Grade Anodized Black Aluminum",
      backing: "Twill Carbon-Fiber Textured Plaque",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "3.6 kg (7.9 lbs)",
      mounting: "Concealed Heavy-Duty Mounting Rail"
    }
  },

  // --- PRODUCT 10: Yamaha YZF-R1 Kai Edition Miniature ---
  {
    id: 10,
    name: "Yamaha YZF-R1 Kai Track Model",
    category: "Sports Bikes",
    originalPrice: 289,
    price: 225,
    rating: 4.9,
    reviewsCount: 39,
    image: "assets/images/product-10.jpg",
    badge: "Track Spec",
    featured: false,
    shortDesc: "Aggressive crossplane superbike replica with twin aerodynamic fairings and track livery.",
    fullDesc: "Yamaha's Grand Prix inspired flagship superbike faithfully replicated in miniature form. Features sculpted front cowl intake nostrils, miniature titanium exhaust pipe, rear racing paddock stand mount, and high-contrast racing graphics.",
    specs: {
      scale: "1:12 Precision Scale",
      dimensions: "420 mm × 320 mm × 85 mm",
      frame: "Brushed Gunmetal Aluminum",
      backing: "Circuit Telemetry Overlay Plate",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "3.0 kg (6.6 lbs)",
      mounting: "Dual Locking Wall Fasteners"
    }
  },

  // --- PRODUCT 11: Yamaha YZF-R1 Sunset Die-Cast ---
  {
    id: 11,
    name: "Yamaha YZF-R1 Die-Cast Sunset Miniature",
    category: "Sports Bikes",
    originalPrice: 279,
    price: 219,
    rating: 4.8,
    reviewsCount: 34,
    image: "assets/images/product-11.jpg",
    badge: "Die-Cast Metal",
    featured: false,
    shortDesc: "Precision diecast racing sportbike captured in outdoor golden hour collector profile.",
    fullDesc: "Real diecast zinc body panels with deep metallic gloss paint. Features rubber treaded sport tires, functional steering assembly, detailed front brake discs, and authentic underseat exhaust outlets.",
    specs: {
      scale: "1:18 Diecast Metal",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Charcoal Grey Satin Aluminum",
      backing: "Carbon Matrix Composite Backing",
      glazing: "Anti-Scratch Optical Acrylic",
      weight: "2.4 kg (5.3 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 12: BMW S 1000 RR Scale Model ---
  {
    id: 12,
    name: "BMW S 1000 RR Table Display Model",
    category: "Super Bikes",
    originalPrice: 309,
    price: 245,
    rating: 5.0,
    reviewsCount: 51,
    image: "assets/images/product-12.jpg",
    badge: "M Heritage",
    featured: false,
    shortDesc: "Bavarian asymmetrical race engineering showcased in precision table display scale.",
    fullDesc: "The machine that revolutionized liter-class superbikes. Features asymmetric shark-gill fairing vents, miniature Brembo radial calipers, cast aluminum swingarm, and BMW motorsport tricolor pinstripes.",
    specs: {
      scale: "1:12 Scale Collector Model",
      dimensions: "420 mm × 320 mm × 85 mm",
      frame: "Solid Billet Matte Black Aluminum",
      backing: "Brushed Silver Anodized Plate",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "3.1 kg (6.8 lbs)",
      mounting: "Dual Locking Wall Fasteners"
    }
  },

  // --- PRODUCT 13: Ducati Desmosedici MotoGP Track Miniature ---
  {
    id: 13,
    name: "Ducati Desmosedici GP Track Replica",
    category: "Racing Motorcycles",
    originalPrice: 329,
    price: 259,
    rating: 5.0,
    reviewsCount: 62,
    image: "assets/images/product-13.jpg",
    badge: "MotoGP Edition",
    featured: false,
    shortDesc: "World championship prototype race replica mounted on natural wood display shelf.",
    fullDesc: "Grand Prix prototype perfection in scale relief. Highlights full carbon fiber aerodynamic winglets, Akrapovič under-tail exhaust, authentic sponsor racing livery, and slick race tires on forged magnesium miniature wheels.",
    specs: {
      scale: "1:18 Prototype Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Deep Charcoal Billet Shadowbox",
      backing: "Telemetry Circuit Grid Backing",
      glazing: "Museum Ultra-Clear UV Acrylic (99% UV-cut)",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Flush Magnetic Wall Mount System"
    }
  },

  // --- PRODUCT 14: Classic Italian 125 Retro Miniature ---
  {
    id: 14,
    name: "Vespa Primavera 125 Vintage Miniature",
    category: "Classic Motorcycles",
    originalPrice: 229,
    price: 179,
    rating: 4.8,
    reviewsCount: 46,
    image: "assets/images/product-14.jpg",
    badge: "Vintage Dolce Vita",
    featured: false,
    shortDesc: "Charming vintage Italian roadster miniature with rounded headlight and chrome carrier.",
    fullDesc: "A joyful tribute to 1960s Rome and Milan street life. Showcases the iconic pressed-steel monocoque body finished in Italian red, tan leather saddle replica, chrome luggage rack, and whitewall tires.",
    specs: {
      scale: "1:18 Scale Collector Replica",
      dimensions: "360 mm × 260 mm × 70 mm",
      frame: "Solid Matte Black Hardwood & Aluminum",
      backing: "Vintage Italian Flag Motif Plate",
      glazing: "Anti-Scratch Optical Acrylic",
      weight: "2.1 kg (4.6 lbs)",
      mounting: "Concealed Wall Mounting Cleat"
    }
  },

  // --- PRODUCT 15: Honda CBR 1000RR Fireblade Miniature Display ---
  {
    id: 15,
    name: "Honda CBR 1000RR Fireblade Miniature",
    category: "Sports Bikes",
    originalPrice: 289,
    price: 229,
    rating: 4.9,
    reviewsCount: 38,
    image: "assets/images/product-15.jpg",
    badge: "Total Control",
    featured: false,
    shortDesc: "High-revving Japanese track supersport miniature model with cockpit display styling.",
    fullDesc: "Celebrating Honda's legendary Total Control superbike lineage. Showcases angular aerodynamic fairings, four-cylinder engine casting detail, titanium muffler, and cast aluminum twin-spar frame in fine relief.",
    specs: {
      scale: "1:18 Collector Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Brushed Gunmetal Aluminum",
      backing: "Matte Slate Geometric Grid",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.4 kg (5.3 lbs)",
      mounting: "Dual Locking Wall Fasteners"
    }
  },

  // --- PRODUCT 16: Classic Cafe Racer Vintage 3D Miniature ---
  {
    id: 16,
    name: "Ace Cafe London 1960s Cafe Racer Miniature",
    category: "Custom Miniature Bikes",
    originalPrice: 249,
    price: 195,
    rating: 4.8,
    reviewsCount: 52,
    image: "assets/images/product-16.jpg",
    badge: "Cafe Culture",
    featured: false,
    shortDesc: "Timeless 1960s British cafe stance with clip-on bars and sculpted rear cowl.",
    fullDesc: "Immortalizing the ton-up club racers of London. Handcrafted scale details include wrapped header exhaust pipes, clip-on dropped handlebars, spoked alloy wheels, and a single-seat racing cowl on an embossed plate.",
    specs: {
      scale: "1:18 Handcrafted Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Solid Charcoal Hardwood & Billet Frame",
      backing: "Checkerboard Flag Geometric Etching",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.3 kg (5.1 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 17: Kawasaki Ninja ZX-10R Racing Miniature ---
  {
    id: 17,
    name: "Kawasaki Ninja ZX-10R Desk Display Model",
    category: "Sports Bikes",
    originalPrice: 279,
    price: 219,
    rating: 4.9,
    reviewsCount: 41,
    image: "assets/images/product-17.jpg",
    badge: "Championship Spec",
    featured: false,
    shortDesc: "WorldSBK championship aerodynamics sculpted for personal office and desk wall display.",
    fullDesc: "Green machine dominance miniaturized. Features authentic ram-air scoop intake, aerodynamic front cowl winglets, Showa Balance Free fork detailing, and factory lime green and metallic carbon paintwork.",
    specs: {
      scale: "1:18 Precision Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Anodized Matte Aluminum Shadowbox",
      backing: "Carbon Matrix Composite Backing",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.4 kg (5.3 lbs)",
      mounting: "Flush Magnetic Wall Mount System"
    }
  },

  // --- PRODUCT 18: Suzuki GSX-R1000 Maisto Precision Die-Cast Model ---
  {
    id: 18,
    name: "Suzuki GSX-R1000 Maisto Die-Cast Model",
    category: "Super Bikes",
    originalPrice: 269,
    price: 209,
    rating: 4.9,
    reviewsCount: 45,
    image: "assets/images/product-18.jpg",
    badge: "Die-Cast Master",
    featured: false,
    shortDesc: "The legendary Gixxer liter-class superbike in authentic race-ready miniature scale.",
    fullDesc: "The benchmark of Japanese road and circuit supremacy. Features diecast metal fuel tank, working rear spring suspension, variable valve timing engine casing replica, and signature Suzuki blue & white racing colors.",
    specs: {
      scale: "1:18 Diecast Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Brushed Gunmetal Billet Shadowbox",
      backing: "Matte Blue & Charcoal Racing Grid",
      glazing: "Anti-Scratch Optical Acrylic",
      weight: "2.4 kg (5.3 lbs)",
      mounting: "Dual Locking Wall Fasteners"
    }
  },

  // --- PRODUCT 19: Custom Chopper / Bobber Artisan Miniature ---
  {
    id: 19,
    name: "Dark Custom Bobber 3D Miniature",
    category: "Custom Miniature Bikes",
    originalPrice: 289,
    price: 229,
    rating: 4.9,
    reviewsCount: 57,
    image: "assets/images/product-19.jpg",
    badge: "Artisan Custom",
    featured: false,
    shortDesc: "Stretched front rake and low-slung custom cruiser sculpted by artisan scale-modelers.",
    fullDesc: "Raw American heavy-metal rebellion. Showcases raked front triple-trees, peanut fuel tank, solo sprung saddle, drag handlebars, and blacked-out straight pipes set in an anodized shadowbox display.",
    specs: {
      scale: "1:18 Handcrafted Custom",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Solid Billet Matte Black Aluminum",
      backing: "Industrial Diamond-Plate Backing",
      glazing: "Museum Ultra-Clear UV Acrylic",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Dual Heavy-Duty Integrated Flush Brackets"
    }
  },

  // --- PRODUCT 20: Honda RC213V Factory Grand Prix Scale Replica ---
  {
    id: 20,
    name: "Honda RC213V Grand Prix Champion Miniature",
    category: "Racing Motorcycles",
    originalPrice: 349,
    price: 279,
    rating: 5.0,
    reviewsCount: 65,
    image: "assets/images/product-20.jpg",
    badge: "World Champion GP",
    featured: false,
    shortDesc: "Championship MotoGP racing aerodynamic winglets and race-exhaust scale tribute.",
    fullDesc: "The pinnacle of Grand Prix motorcycle engineering. Features hand-applied competition decals, carbon fiber front brake cooling ducts, under-tail SC-Project race exhaust miniature, and track slick tires on a museum display plaque.",
    specs: {
      scale: "1:18 Grand Prix Scale",
      dimensions: "380 mm × 280 mm × 75 mm",
      frame: "Aviation-Grade Anodized Black Aluminum",
      backing: "Telemetry Circuit Overlay Plate",
      glazing: "Museum Ultra-Clear UV Acrylic (99% UV-cut)",
      weight: "2.5 kg (5.5 lbs)",
      mounting: "Flush Magnetic Wall Mount System"
    }
  }
];

// Helper functions for easy querying
const getProductById = (id) => PRODUCTS_DATA.find(p => p.id === parseInt(id));
const getFeaturedProducts = () => PRODUCTS_DATA.filter(p => p.featured);
const getProductsByCategory = (cat) => cat === 'All' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === cat);
