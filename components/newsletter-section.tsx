"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Exclusive Offers
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Join Our <span className="text-primary">Inner Circle</span>
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Subscribe to receive exclusive access to new collections, special offers, and jewelry care tips from our
          master craftsmen.
        </p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-medium">Welcome to the Lumière family!</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-4 bg-card border-border/50 focus:border-accent"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  )
}
