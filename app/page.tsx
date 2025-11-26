"use client"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { ProductModal } from "@/components/product-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { FeaturesSection } from "@/components/features-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { SearchModal } from "@/components/search-modal"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { addItem } = useCart()
  const collectionsRef = useRef<HTMLDivElement>(null)

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

      <HeroSection />

      <div ref={collectionsRef}>
        <ProductGrid onQuickView={handleQuickView} onAddToCart={(product) => handleAddToCart(product)} />
      </div>

      <FeaturesSection />
      <NewsletterSection />
      <Footer />

      {/* Modals */}
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
