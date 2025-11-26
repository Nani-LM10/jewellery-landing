export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  details: string[]
  material: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eternal Diamond Ring",
    price: 4999,
    originalPrice: 5999,
    image: "/elegant-diamond-engagement-ring-on-velvet.jpg",
    category: "Rings",
    description: "A stunning solitaire diamond ring featuring a brilliant-cut 1.5 carat diamond set in 18K white gold.",
    details: ["1.5 carat brilliant-cut diamond", "18K white gold band", "GIA certified", "Lifetime warranty"],
    material: "18K White Gold, Diamond",
    rating: 4.9,
    reviews: 128,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Golden Serpent Necklace",
    price: 2499,
    image: "/luxury-gold-snake-chain-necklace-elegant.jpg",
    category: "Necklaces",
    description: "An exquisite serpent-inspired necklace crafted from solid 22K gold with emerald eyes.",
    details: ["22K solid gold", "Natural emerald accents", "Adjustable length", "Handcrafted"],
    material: "22K Gold, Emerald",
    rating: 4.8,
    reviews: 86,
    isNew: true,
  },
  {
    id: "3",
    name: "Pearl Cascade Earrings",
    price: 1299,
    image: "/elegant-pearl-drop-earrings-luxury.jpg",
    category: "Earrings",
    description: "Delicate cascade earrings featuring freshwater pearls and 14K gold accents.",
    details: ["Freshwater pearls", "14K gold settings", "Butterfly back closure", "Hypoallergenic"],
    material: "14K Gold, Pearl",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "4",
    name: "Emerald Garden Bracelet",
    price: 3299,
    originalPrice: 3999,
    image: "/emerald-and-gold-bracelet-luxury-jewelry.jpg",
    category: "Bracelets",
    description: "A magnificent bracelet featuring Colombian emeralds set in an intricate 18K gold design.",
    details: ["Colombian emeralds", "18K yellow gold", "Box clasp with safety", "Certificate of authenticity"],
    material: "18K Gold, Emerald",
    rating: 4.9,
    reviews: 42,
    isBestseller: true,
  },
  {
    id: "5",
    name: "Sapphire Dreams Ring",
    price: 5499,
    image: "/blue-sapphire-ring-with-diamonds-luxury.jpg",
    category: "Rings",
    description: "A breathtaking blue sapphire surrounded by a halo of brilliant diamonds.",
    details: ["3 carat Ceylon sapphire", "Diamond halo setting", "Platinum band", "Custom sizing available"],
    material: "Platinum, Sapphire, Diamond",
    rating: 5.0,
    reviews: 31,
    isNew: true,
  },
  {
    id: "6",
    name: "Rose Gold Chain",
    price: 899,
    image: "/delicate-rose-gold-chain-necklace-minimal.jpg",
    category: "Necklaces",
    description: "A delicate rose gold chain perfect for layering or wearing alone.",
    details: ["14K rose gold", "18 inch length", "Lobster clasp", "Gift box included"],
    material: "14K Rose Gold",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "7",
    name: "Diamond Tennis Bracelet",
    price: 7999,
    originalPrice: 9499,
    image: "/diamond-tennis-bracelet-luxury-sparkling.jpg",
    category: "Bracelets",
    description: "Classic elegance with 5 carats of round brilliant diamonds in a secure prong setting.",
    details: ["5 carats total weight", "Round brilliant diamonds", "14K white gold", "Hidden safety clasp"],
    material: "14K White Gold, Diamond",
    rating: 4.9,
    reviews: 89,
    isBestseller: true,
  },
  {
    id: "8",
    name: "Vintage Ruby Pendant",
    price: 2899,
    image: "/vintage-ruby-pendant-necklace-gold-antique.jpg",
    category: "Necklaces",
    description: "A vintage-inspired pendant featuring a natural ruby with intricate gold filigree.",
    details: ["Natural Burmese ruby", "Vintage filigree design", "18K gold chain included", "One of a kind"],
    material: "18K Gold, Ruby",
    rating: 4.8,
    reviews: 27,
    isNew: true,
  },
]

export const categories = [
  { name: "All", count: products.length },
  { name: "Rings", count: products.filter((p) => p.category === "Rings").length },
  { name: "Necklaces", count: products.filter((p) => p.category === "Necklaces").length },
  { name: "Earrings", count: products.filter((p) => p.category === "Earrings").length },
  { name: "Bracelets", count: products.filter((p) => p.category === "Bracelets").length },
]
