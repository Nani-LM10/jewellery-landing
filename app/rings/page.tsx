"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { ProductListing } from "@/components/product-listing"
import { ProductModal } from "@/components/product-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { SearchModal } from "@/components/search-modal"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

export default function RingsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { addItem } = useCart()

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
        subtitle="Timeless Bands"
        title="Rings"
        description="From engagement rings to statement pieces, find the perfect ring that symbolizes your unique story."
      />

      <ProductListing category="rings" onQuickView={handleQuickView} onAddToCart={handleAddToCart} />

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
