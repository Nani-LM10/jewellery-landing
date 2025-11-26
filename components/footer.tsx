"use client"

import { motion } from "framer-motion"
import { Gem, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  shop: [
    { label: "Rings", href: "/rings" },
    { label: "Necklaces", href: "/necklaces" },
    { label: "Earrings", href: "/collections" },
    { label: "Bracelets", href: "/collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Craftsmanship", href: "/about" },
    { label: "Sustainability", href: "/about" },
    { label: "Press", href: "/about" },
    { label: "Careers", href: "/about" },
  ],
  support: [
    { label: "Contact Us", href: "/about" },
    { label: "FAQs", href: "/about" },
    { label: "Shipping & Returns", href: "/about" },
    { label: "Size Guide", href: "/collections" },
    { label: "Care Instructions", href: "/about" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand - Updated to Aurélia branding */}
          <div className="col-span-2">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <Gem className="w-8 h-8 text-accent" />
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-accent">Aurélia</span>
                  <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Fine Jewelry</span>
                </div>
              </Link>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Crafting timeless elegance since 1999. Each piece tells a story of artistry, passion, and sophistication.
            </p>

            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-accent/30 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links - Using Next.js Link components */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info - Updated email to Aurélia */}
        <div className="mt-12 pt-8 border-t border-accent/20">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <a href="mailto:hello@aurelia.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              hello@aurelia.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +1 (234) 567-890
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Paris, France
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Aurélia Fine Jewelry. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
