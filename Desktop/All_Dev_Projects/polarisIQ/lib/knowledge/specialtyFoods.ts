// Comprehensive Specialty Foods Knowledge Database

export interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  allergens: string[]
  dietary: string[]
  origin?: string
  shelfLife?: string
  storage?: string
  prepMethods?: string[]
  pairings?: string[]
  substitutes?: string[]
  pricePoint: 'budget' | 'mid' | 'premium' | 'luxury'
}

export interface Recipe {
  id: string
  name: string
  cuisine: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  prepTime: string
  cookTime: string
  ingredients: string[]
  steps: string[]
  techniques: string[]
  tips: string[]
}

export interface CuisineKnowledge {
  name: string
  region: string
  characteristics: string[]
  keyIngredients: string[]
  commonTechniques: string[]
  popularDishes: string[]
  dietaryConsiderations: string[]
}

// ALLERGEN DATABASE
export const ALLERGENS = {
  top9: ['Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soybeans', 'Sesame'],
  additional: ['Corn', 'Sulfites', 'Mustard', 'Celery', 'Lupin', 'Molluscs']
}

// PRODUCT CATALOG
export const PRODUCTS: Product[] = [
  // PASTRY & BAKING
  {
    id: 'p001',
    name: 'Belgian Dark Chocolate Couverture (70% Cacao)',
    category: 'Pastry',
    subcategory: 'Chocolate',
    description: 'Premium Belgian couverture chocolate with 70% cacao content, ideal for tempering, ganache, and fine pastry work',
    allergens: ['Milk', 'Soy'],
    dietary: ['Vegetarian'],
    origin: 'Belgium',
    shelfLife: '18 months',
    storage: 'Cool, dry place 60-68°F',
    prepMethods: ['Tempering', 'Melting', 'Ganache'],
    pairings: ['Raspberry', 'Orange', 'Coffee', 'Caramel', 'Sea Salt'],
    substitutes: ['Valrhona 70%', 'Callebaut 70%'],
    pricePoint: 'premium'
  },
  {
    id: 'p002',
    name: 'French Butter (82% Butterfat, Cultured)',
    category: 'Pastry',
    subcategory: 'Dairy',
    description: 'European-style cultured butter with 82% butterfat content, perfect for laminated doughs and fine pastry',
    allergens: ['Milk'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    origin: 'France',
    shelfLife: '3 months frozen, 2 weeks refrigerated',
    storage: 'Refrigerate or freeze',
    prepMethods: ['Lamination', 'Creaming', 'Beurre Noisette'],
    pairings: ['Flaky pastries', 'Croissants', 'Puff pastry'],
    substitutes: ['Plugra European Butter', 'Vermont Creamery Cultured Butter'],
    pricePoint: 'premium'
  },
  {
    id: 'p003',
    name: 'Italian 00 Flour (Finely Milled)',
    category: 'Pastry',
    subcategory: 'Flour',
    description: 'Ultra-fine Italian milled flour, ideal for pasta, pizza dough, and delicate pastries',
    allergens: ['Wheat'],
    dietary: [],
    origin: 'Italy',
    shelfLife: '12 months',
    storage: 'Cool, dry, airtight container',
    prepMethods: ['Pasta making', 'Pizza dough', 'Pastry'],
    pairings: ['Fresh pasta', 'Neapolitan pizza', 'Sfogliatelle'],
    substitutes: ['All-purpose flour (with texture difference)', 'Cake flour blend'],
    pricePoint: 'mid'
  },

  // ETHNIC INGREDIENTS
  {
    id: 'e001',
    name: 'Japanese Miso Paste (White/Shiro)',
    category: 'Ethnic',
    subcategory: 'Japanese',
    description: 'Sweet, mild fermented soybean paste, essential for Japanese cuisine and modern fusion',
    allergens: ['Soybeans'],
    dietary: ['Vegan', 'Vegetarian'],
    origin: 'Japan',
    shelfLife: '12 months refrigerated',
    storage: 'Refrigerate after opening',
    prepMethods: ['Miso soup', 'Marinades', 'Glazes', 'Dressings'],
    pairings: ['Fish', 'Eggplant', 'Tofu', 'Mushrooms'],
    substitutes: ['Red miso (stronger)', 'Chickpea miso (soy-free)'],
    pricePoint: 'mid'
  },
  {
    id: 'e002',
    name: 'Tahini (100% Sesame Paste)',
    category: 'Ethnic',
    subcategory: 'Middle Eastern',
    description: 'Pure ground sesame seed paste, cornerstone of Middle Eastern cuisine',
    allergens: ['Sesame'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Kosher', 'Halal'],
    origin: 'Lebanon',
    shelfLife: '12 months unopened, 6 months refrigerated',
    storage: 'Refrigerate after opening',
    prepMethods: ['Hummus', 'Baba Ganoush', 'Tahini sauce', 'Halva'],
    pairings: ['Chickpeas', 'Eggplant', 'Lemon', 'Garlic', 'Dates'],
    substitutes: ['Sunflower seed butter (allergen-free)', 'Almond butter'],
    pricePoint: 'mid'
  },
  {
    id: 'e003',
    name: 'Thai Red Curry Paste',
    category: 'Ethnic',
    subcategory: 'Thai',
    description: 'Authentic blend of red chilies, lemongrass, galangal, and aromatics',
    allergens: ['Fish', 'Shellfish'],
    dietary: [],
    origin: 'Thailand',
    shelfLife: '18 months unopened, 3 months refrigerated',
    storage: 'Refrigerate after opening',
    prepMethods: ['Curry', 'Stir-fry', 'Marinades', 'Soup base'],
    pairings: ['Coconut milk', 'Chicken', 'Shrimp', 'Vegetables', 'Rice'],
    substitutes: ['Massaman paste', 'Panang paste', 'Homemade blend'],
    pricePoint: 'budget'
  },

  // SPECIALTY PROTEINS
  {
    id: 's001',
    name: 'Duck Confit (Traditional French)',
    category: 'Protein',
    subcategory: 'Poultry',
    description: 'Duck legs slow-cooked and preserved in their own fat, French delicacy',
    allergens: [],
    dietary: [],
    origin: 'France',
    shelfLife: '6 months refrigerated in fat',
    storage: 'Refrigerate, keep submerged in fat',
    prepMethods: ['Crisping', 'Cassoulet', 'Salad', 'Rillettes'],
    pairings: ['White beans', 'Frisée', 'Potatoes', 'Cherry sauce'],
    substitutes: ['Fresh duck legs (requires preparation)', 'Duck breast'],
    pricePoint: 'premium'
  },
  {
    id: 's002',
    name: 'Spanish Jamón Ibérico de Bellota',
    category: 'Protein',
    subcategory: 'Charcuterie',
    description: 'Premium acorn-fed Ibérico ham, aged 36+ months',
    allergens: [],
    dietary: [],
    origin: 'Spain',
    shelfLife: '12 months whole, consume within days once sliced',
    storage: 'Cool, dry place; refrigerate sliced',
    prepMethods: ['Slice thin', 'Room temperature serving'],
    pairings: ['Manchego', 'Melon', 'Figs', 'Almonds', 'Sherry'],
    substitutes: ['Prosciutto di Parma', 'Serrano ham'],
    pricePoint: 'luxury'
  },

  // SPECIALTY DAIRY
  {
    id: 'd001',
    name: 'Burrata (Fresh Italian Mozzarella)',
    category: 'Dairy',
    subcategory: 'Cheese',
    description: 'Fresh mozzarella filled with cream and mozzarella curds',
    allergens: ['Milk'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    origin: 'Italy',
    shelfLife: '5-7 days refrigerated',
    storage: 'Refrigerate, keep in liquid, use quickly',
    prepMethods: ['Serve room temperature', 'Tear gently'],
    pairings: ['Heirloom tomatoes', 'Basil', 'Olive oil', 'Prosciutto', 'Stone fruit'],
    substitutes: ['Fresh mozzarella', 'Stracciatella'],
    pricePoint: 'premium'
  }
]

// CUISINE KNOWLEDGE BASE
export const CUISINES: CuisineKnowledge[] = [
  {
    name: 'French Pastry',
    region: 'France',
    characteristics: ['Precise technique', 'Butter-forward', 'Lamination', 'Classical methods'],
    keyIngredients: ['Butter (82% butterfat)', 'Cream', 'Eggs', 'Chocolate', 'Vanilla bean', 'Almond flour'],
    commonTechniques: ['Lamination', 'Tempering', 'Piping', 'Choux paste', 'Pâte sucrée', 'Ganache'],
    popularDishes: ['Croissants', 'Macarons', 'Éclairs', 'Tarte Tatin', 'Mille-feuille', 'Crème brûlée'],
    dietaryConsiderations: ['High in dairy', 'Gluten-heavy', 'Can adapt for vegan with technique changes']
  },
  {
    name: 'Japanese',
    region: 'Japan',
    characteristics: ['Umami-focused', 'Seasonal ingredients', 'Minimal preparation', 'Aesthetic presentation'],
    keyIngredients: ['Soy sauce', 'Miso', 'Dashi', 'Rice', 'Sake', 'Mirin', 'Seaweed', 'Wasabi'],
    commonTechniques: ['Steaming', 'Grilling', 'Raw preparation', 'Pickling', 'Simmering'],
    popularDishes: ['Sushi', 'Ramen', 'Tempura', 'Teriyaki', 'Miso soup', 'Tonkatsu'],
    dietaryConsiderations: ['Soy allergen common', 'Fish/seafood prevalent', 'Naturally gluten-free rice-based dishes', 'Vegan options available']
  },
  {
    name: 'Middle Eastern',
    region: 'Levant, Persia, Arabia',
    characteristics: ['Aromatic spices', 'Mezze culture', 'Grains and legumes', 'Slow-cooked meats'],
    keyIngredients: ['Tahini', 'Chickpeas', 'Lamb', 'Cumin', 'Cardamom', 'Pomegranate', 'Dates', 'Olive oil'],
    commonTechniques: ['Grilling', 'Slow braising', 'Grinding', 'Smoking', 'Pickling'],
    popularDishes: ['Hummus', 'Falafel', 'Shawarma', 'Tabbouleh', 'Baklava', 'Kebabs'],
    dietaryConsiderations: ['Many vegan options', 'Halal preparation common', 'Sesame allergen present', 'Naturally gluten-free options']
  },
  {
    name: 'Thai',
    region: 'Thailand',
    characteristics: ['Balance of flavors', 'Sweet-sour-salty-spicy', 'Fresh herbs', 'Complex pastes'],
    keyIngredients: ['Fish sauce', 'Coconut milk', 'Lemongrass', 'Galangal', 'Thai basil', 'Chili', 'Lime'],
    commonTechniques: ['Stir-frying', 'Curry making', 'Pounding pastes', 'Quick cooking', 'Balancing'],
    popularDishes: ['Pad Thai', 'Green curry', 'Tom Yum', 'Som Tam', 'Massaman curry', 'Larb'],
    dietaryConsiderations: ['Fish sauce in many dishes', 'Shellfish common', 'Easy vegan adaptations', 'Naturally gluten-free options']
  },
  {
    name: 'Italian',
    region: 'Italy',
    characteristics: ['Regional diversity', 'Simplicity', 'Quality ingredients', 'Pasta mastery'],
    keyIngredients: ['Olive oil', 'Tomatoes', 'Garlic', 'Basil', 'Parmesan', 'Mozzarella', 'Prosciutto'],
    commonTechniques: ['Pasta making', 'Risotto', 'Braising', 'Wood-fired cooking', 'Curing'],
    popularDishes: ['Pasta carbonara', 'Risotto', 'Osso buco', 'Margherita pizza', 'Tiramisu', 'Panna cotta'],
    dietaryConsiderations: ['Dairy-heavy in north', 'Gluten from pasta/bread', 'Mediterranean diet-friendly', 'Regional variations']
  },
  {
    name: 'Indian',
    region: 'India',
    characteristics: ['Complex spice blends', 'Regional diversity', 'Vegetarian traditions', 'Tandoor cooking'],
    keyIngredients: ['Turmeric', 'Cumin', 'Coriander', 'Garam masala', 'Ghee', 'Lentils', 'Basmati rice', 'Yogurt'],
    commonTechniques: ['Tandoor grilling', 'Tempering spices', 'Slow simmering', 'Grinding masalas', 'Layering flavors'],
    popularDishes: ['Butter chicken', 'Biryani', 'Dal', 'Samosas', 'Tikka masala', 'Naan'],
    dietaryConsiderations: ['Many vegan/vegetarian options', 'Dairy in North Indian', 'Naturally gluten-free curries', 'Halal versions available']
  }
]

// PREP METHODS & TECHNIQUES
export const TECHNIQUES = {
  pastry: {
    lamination: {
      name: 'Lamination',
      description: 'Creating layers of dough and butter through folding',
      difficulty: 'hard',
      keyPoints: [
        'Keep butter and dough at same temperature (cool but pliable)',
        'Work quickly to prevent butter from melting',
        'Rest between folds to relax gluten',
        'Typical sequence: 3 single folds or 2 double folds'
      ],
      applications: ['Croissants', 'Puff pastry', 'Danish pastry'],
      commonMistakes: [
        'Butter too cold (breaks through)',
        'Butter too warm (incorporates into dough)',
        'Insufficient resting',
        'Uneven rolling'
      ]
    },
    tempering: {
      name: 'Chocolate Tempering',
      description: 'Controlled crystallization of cocoa butter for stable, glossy chocolate',
      difficulty: 'expert',
      keyPoints: [
        'Melt chocolate to 110-120°F (dark), 105-115°F (milk/white)',
        'Cool to 80-82°F while stirring',
        'Reheat to 88-90°F (dark), 86-88°F (milk), 84-86°F (white)',
        'Test on parchment - should set in 3-5 minutes with shine'
      ],
      applications: ['Bonbons', 'Coating', 'Decorations', 'Molding'],
      commonMistakes: [
        'Water contact (seizing)',
        'Overheating',
        'Insufficient stirring',
        'Wrong temperature zones'
      ]
    }
  },
  cooking: {
    searing: {
      name: 'High-Heat Searing',
      description: 'Browning protein at high heat to develop crust and flavor',
      difficulty: 'medium',
      keyPoints: [
        'Dry protein thoroughly before searing',
        'Use high smoke-point oil (grapeseed, avocado)',
        'Preheat pan until nearly smoking',
        'Don\'t move protein - let crust develop (3-4 minutes)',
        'Finish in oven if thick cut'
      ],
      applications: ['Steaks', 'Scallops', 'Duck breast', 'Tuna'],
      commonMistakes: [
        'Wet protein (steams instead of sears)',
        'Pan not hot enough',
        'Moving protein too early',
        'Overcrowding pan'
      ]
    },
    emulsification: {
      name: 'Emulsification',
      description: 'Combining fat and water into stable mixture',
      difficulty: 'medium',
      keyPoints: [
        'Add fat very slowly to water phase while whisking',
        'Use emulsifiers (egg yolk, mustard) for stability',
        'Maintain consistent temperature',
        'Broken emulsion can be saved by starting over with new base'
      ],
      applications: ['Hollandaise', 'Mayonnaise', 'Vinaigrette', 'Beurre blanc'],
      commonMistakes: [
        'Adding fat too quickly',
        'Temperature too high (eggs)',
        'Insufficient whisking',
        'Wrong ratios'
      ]
    }
  }
}

// DIETARY & ALLERGEN GUIDES
export const DIETARY_INFO = {
  'gluten-free': {
    avoid: ['Wheat', 'Barley', 'Rye', 'Standard oats', 'Malt', 'Triticale'],
    safe: ['Rice', 'Quinoa', 'Buckwheat', 'Corn', 'Certified GF oats', 'Almond flour'],
    watchFor: ['Cross-contamination', 'Soy sauce (contains wheat)', 'Beer', 'Some stabilizers'],
    certifications: ['GFCO', 'NSF Gluten-Free', 'CSA Recognition Seal']
  },
  'kosher': {
    principles: ['Meat and dairy separation', 'No pork/shellfish', 'Proper slaughter', 'Kosher certification'],
    certifications: ['OU', 'OK', 'Kof-K', 'Star-K', 'CRC'],
    categories: ['Pareve (neutral)', 'Dairy', 'Meat'],
    timing: ['6 hour wait from meat to dairy (some traditions)', '30 min-1 hour from dairy to meat']
  },
  'halal': {
    principles: ['Proper slaughter', 'No pork/alcohol', 'Clean ingredients', 'Halal certification'],
    certifications: ['IFANCA', 'ISA', 'HFA', 'HFSAA'],
    avoid: ['Pork products', 'Alcohol', 'Blood', 'Carnivorous animals', 'Non-halal gelatin'],
    acceptable: ['Zabihah meat', 'Fish/seafood', 'Vegetables', 'Halal-certified products']
  },
  'vegan': {
    avoid: ['All animal products', 'Dairy', 'Eggs', 'Honey', 'Gelatin', 'Some wine/beer (animal fining)'],
    alternatives: {
      'eggs': ['Flax eggs', 'Aquafaba', 'Commercial egg replacers'],
      'dairy': ['Oat milk', 'Coconut cream', 'Cashew cheese', 'Nutritional yeast'],
      'meat': ['Jackfruit', 'Tempeh', 'Seitan', 'Mushrooms', 'Legumes']
    },
    watchFor: ['Hidden dairy (whey, casein)', 'L-cysteine', 'Carmine', 'Vitamin D3 (often animal)']
  }
}
