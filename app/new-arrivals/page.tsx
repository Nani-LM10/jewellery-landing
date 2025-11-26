"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { SearchModal } from "@/components/search-modal"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-provider"
import { products, type Product } from "@/lib/products"

export default function NewArrivalsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { addItem } = useCart()

  // Show first 6 as "new arrivals"
  const newArrivals = products.slice(0, 6)

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleAddToCart = (product: Product, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    setIsCartOpen(true)
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />

      <PageHeader
        subtitle="Just Arrived"
        title="New Arrivals"
        description="Be the first to discover our latest creations. Fresh designs that embody modern elegance."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured new arrival banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-12 overflow-hidden rounded-none border border-accent/30"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src="/luxury-diamond-necklace-on-velvet-display.jpg"
                  alt="Featured new arrival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-card">
                <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Featured</span>
                <h3 className="text-3xl font-serif font-bold mb-4">The Aurora Collection</h3>
                <p className="text-muted-foreground mb-6">
                  Inspired by the ethereal beauty of the Northern Lights, this collection captures the dance of light
                  with brilliant diamonds and carefully selected gemstones.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="self-start px-8 py-3 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors"
                >
                  Explore Aurora
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} onQuickView={handleQuickView} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onProductSelect={handleQuickView} />
    </main>
  )
}
