"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Star, Heart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card rounded-2xl shadow-2xl border border-accent/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors border border-border"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative aspect-square bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-primary text-primary-foreground">New Arrival</Badge>}
                  {product.isBestseller && <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">{product.name}</h2>

                  {/* Material */}
                  <p className="text-accent font-medium mb-4">{product.material}</p>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-primary">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="destructive">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                  {/* Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <ul className="space-y-2">
                      {product.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: Truck, label: "Free Shipping" },
                      { icon: Shield, label: "Certified" },
                      { icon: RotateCcw, label: "30-Day Return" },
                    ].map((feature) => (
                      <div key={feature.label} className="text-center p-3 bg-secondary/50 rounded-lg">
                        <feature.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <span className="text-xs text-muted-foreground">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleAddToCart}
                      >
                        <AnimatePresence mode="wait">
                          {addedToCart ? (
                            <motion.span
                              key="added"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Added to Cart!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="add"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              Add to Cart - ${(product.price * quantity).toLocaleString()}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 border-accent/50 hover:bg-accent/10 bg-transparent"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 border-accent/50 hover:bg-accent/10 bg-transparent"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
