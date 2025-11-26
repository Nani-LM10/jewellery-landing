"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products, categories, type Product } from "@/lib/products"

interface ProductGridProps {
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ onQuickView, onAddToCart }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured")

  const filteredProducts = useMemo(() => {
    const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "newest":
        return [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default:
        return filtered
    }
  }, [activeCategory, sortBy])

  return (
    <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
          Our <span className="text-primary">Collection</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Each piece is meticulously crafted to celebrate life&apos;s precious moments
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
      >
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category.name
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <span className="ml-1 opacity-70">({category.count})</span>
            </motion.button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm border-0 focus:ring-2 focus:ring-accent"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </motion.div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
