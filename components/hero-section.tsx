"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 z-10" />

      {/* Animated background image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-jewelry-gold-rings-diamonds-elegant-dark-ba.jpg')",
          }}
        />
      </motion.div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent z-20" />
      <div className="absolute top-1/4 right-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-accent/20 to-transparent z-20" />

      {/* Main Content - Split Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8" style={{ y }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold tracking-[0.3em] uppercase">
                Exclusive Collection 2025
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight"
            >
              <span className="block text-foreground">Where</span>
              <span className="block text-foreground">Luxury Meets</span>
              <span className="block bg-gradient-to-r from-accent via-yellow-500 to-accent bg-clip-text text-transparent">
                Artistry
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Discover handcrafted masterpieces that transcend time. Each piece in our collection is a testament to
              unparalleled craftsmanship and enduring beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-accent hover:bg-accent/90 text-black px-8 py-6 text-base font-semibold rounded-none"
                >
                  <Link href="/collections">
                    <span className="flex items-center gap-2">
                      Explore Collection
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="group px-8 py-6 text-base font-semibold rounded-none border-accent/50 hover:bg-accent/10 hover:border-accent bg-transparent"
                >
                  <Play className="w-4 h-4 mr-2 fill-accent text-accent" />
                  Watch Story
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-12 pt-8 border-t border-accent/20"
            >
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "10K+", label: "Pieces Crafted" },
                { value: "50+", label: "Master Artisans" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
        

            
          </motion.div>
        </div>
      </div>

    </section>
  )
}
