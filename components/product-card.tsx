"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  index: number
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, index, onQuickView, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-accent/10">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />

          {/* Shimmer overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ x: "-100%", y: "-100%" }}
            whileHover={{ x: "100%", y: "100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-primary text-primary-foreground border-0">New</Badge>}
            {product.isBestseller && <Badge className="bg-accent text-accent-foreground border-0">Bestseller</Badge>}
            {product.originalPrice && (
              <Badge variant="destructive" className="border-0">
                Sale
              </Badge>
            )}
          </div>

          {/* Like Button */}
          <motion.button
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:border-accent transition-colors"
            onClick={() => setIsLiked(!isLiked)}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
            />
          </motion.button>

          {/* Quick Actions */}
          <motion.div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 bg-white/90 text-black hover:bg-white"
                onClick={() => onQuickView(product)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => onAddToCart(product)}>
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-3">{product.material}</p>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
