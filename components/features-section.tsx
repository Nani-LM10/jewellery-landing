"use client"

import { motion } from "framer-motion"
import { Diamond, Award, Truck, Shield, Sparkles, Clock } from "lucide-react"

const features = [
  {
    icon: Diamond,
    title: "Certified Gems",
    description: "Every gemstone comes with certification of authenticity",
  },
  {
    icon: Award,
    title: "Master Crafted",
    description: "Handcrafted by skilled artisans with decades of experience",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary insured shipping on all orders worldwide",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Our pieces are built to last with lifetime guarantee",
  },
  {
    icon: Sparkles,
    title: "Conflict Free",
    description: "Ethically sourced materials from trusted suppliers",
  },
  {
    icon: Clock,
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for full refund",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Why Choose <span className="text-primary">Aurélia</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to excellence in every facet of our craft
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
