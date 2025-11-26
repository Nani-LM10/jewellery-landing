"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { products, type Product } from "@/lib/products"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onProductSelect: (product: Product) => void
}

export function SearchModal({ isOpen, onClose, onProductSelect }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-2xl mx-auto mt-20 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-accent/20 overflow-hidden">
              {/* Search Input */}
              <div className="relative border-b border-border">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  autoFocus
                  placeholder="Search for jewelry..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 pl-12 pr-12 border-0 text-lg focus-visible:ring-0"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((product, index) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          onProductSelect(product)
                          onClose()
                          setQuery("")
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium line-clamp-1">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-sm font-semibold text-primary">${product.price.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <div className="p-8 text-center text-muted-foreground">No results found for &quot;{query}&quot;</div>
                ) : (
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {["Diamond Ring", "Gold Necklace", "Pearl Earrings", "Tennis Bracelet"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
