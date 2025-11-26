"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Grid, LayoutGrid, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductListingProps {
  category?: string
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductListing({ category, onQuickView, onAddToCart }: ProductListingProps) {
  const [gridSize, setGridSize] = useState<"large" | "small">("large")
  const [sortBy, setSortBy] = useState("featured")

  // Filter products by category if provided
  const filteredProducts = category
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-accent/20">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{sortedProducts.length}</span> products
          </p>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-accent/30 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-accent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Grid toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-accent/30 rounded p-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", gridSize === "large" && "bg-accent/20")}
                onClick={() => setGridSize("large")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", gridSize === "small" && "bg-accent/20")}
                onClick={() => setGridSize("small")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className={cn(
            "grid gap-6",
            gridSize === "large"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} onQuickView={onQuickView} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
