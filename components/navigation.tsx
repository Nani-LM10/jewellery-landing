"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gem, Menu, X, ShoppingBag, Sun, Moon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  onCartClick: () => void
  onSearchClick: () => void
}

export function Navigation({ onCartClick, onSearchClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { itemCount } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Collections", href: "/collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Rings", href: "/rings" },
    { label: "Necklaces", href: "/necklaces" },
    { label: "About", href: "/about" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-accent/20 shadow-lg shadow-accent/5"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Gem className="w-8 h-8 text-accent" />
                  <motion.div
                    className="absolute inset-0 bg-accent/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold tracking-wide">
                    <span className="text-accent">Aurélia</span>
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Fine Jewelry</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Using Link components */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors group",
                      pathname === item.href ? "text-accent" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <motion.span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300",
                        pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={onSearchClick} className="relative overflow-hidden group">
                  <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-5 h-5 text-accent" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-black text-xs rounded-full flex items-center justify-center font-medium"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div className="lg:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Using Link components */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-accent/20 lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block py-3 px-4 text-lg font-medium rounded-lg transition-colors border-l-2",
                      pathname === item.href
                        ? "bg-accent/10 border-accent text-accent"
                        : "border-transparent hover:bg-accent/10 hover:border-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
