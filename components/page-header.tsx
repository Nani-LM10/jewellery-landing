"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-accent/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-accent/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          >
            {subtitle}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>
    </section>
  )
}
