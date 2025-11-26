"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { CartDrawer } from "@/components/cart-drawer"
import { CheckoutModal } from "@/components/checkout-modal"
import { SearchModal } from "@/components/search-modal"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-provider"
import { Award, Heart, Gem, Users } from "lucide-react"

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { addItem } = useCart()

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const values = [
    {
      icon: Gem,
      title: "Uncompromising Quality",
      description: "Every piece is crafted using only the finest materials, sourced ethically from around the world.",
    },
    {
      icon: Heart,
      title: "Passion for Craft",
      description: "Our master artisans pour their heart into each creation, ensuring perfection in every detail.",
    },
    {
      icon: Award,
      title: "Heritage Excellence",
      description: "25 years of tradition and innovation, creating jewelry that stands the test of time.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help you find the perfect piece.",
    },
  ]

  const milestones = [
    { year: "1999", event: "Aurélia founded in Paris" },
    { year: "2005", event: "First flagship store opens" },
    { year: "2012", event: "International expansion begins" },
    { year: "2018", event: "Sustainable sourcing initiative launched" },
    { year: "2024", event: "25th anniversary collection released" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />

      <PageHeader
        subtitle="Our Story"
        title="About Aurélia"
        description="A legacy of elegance, craftsmanship, and timeless beauty since 1999."
      />

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-[4/5] border border-accent/30 overflow-hidden">
                  <img
                    src="/jewelry-craftsman-working-gold-workshop-artisan.jpg"
                    alt="Our craftsmen at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-accent/30 overflow-hidden">
                  <img src="/luxury-jewelry-store-interior-elegant.jpg" alt="Our atelier" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-bold">A Tradition of Excellence</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 1999 by master jeweler Élise Aurélia, our maison has dedicated itself to creating pieces that
                transcend mere adornment. Each creation tells a story of passion, precision, and the pursuit of
                perfection.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From our ateliers in Paris, our artisans continue the time-honored traditions of fine jewelry making,
                while embracing innovative techniques that push the boundaries of what's possible. The result is jewelry
                that honors the past while looking boldly toward the future.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that true luxury lies not just in precious materials, but in the care, creativity, and
                craftsmanship that transforms them into works of art.
              </p>
              <div className="pt-4 flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold text-accent">25+</div>
                  <div className="text-sm text-muted-foreground">Years of Legacy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Master Artisans</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">Pieces Created</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Aurélia.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground">Milestones that shaped who we are today.</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="text-2xl font-bold text-accent">{milestone.year}</div>
                  <div className="text-muted-foreground">{milestone.event}</div>
                </div>
                <div className="relative z-10 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onProductSelect={() => {}} />
    </main>
  )
}
