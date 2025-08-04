"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-1 xs:px-2 sm:px-4">
        <div className="flex h-10 xs:h-12 sm:h-14 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1 text-xs xs:text-sm sm:text-base font-bold">
              <span className="truncate">TimeTrack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-2 lg:space-x-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-2 py-1 rounded-md transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-1">
            <ThemeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex space-x-1">
              <Button variant="ghost" size="sm" className="text-xs px-2" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button size="sm" className="text-xs px-2" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-1 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4 xs:h-5 xs:w-5" /> : <Menu className="h-4 w-4 xs:h-5 xs:w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="container max-w-7xl mx-auto px-1 xs:px-2 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-2 px-3 text-xs xs:text-sm rounded-md transition-colors hover:bg-muted/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t space-y-2">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent" asChild>
                  <Link to="/signin">Login</Link>
                </Button>
                <Button size="sm" className="w-full text-xs" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
