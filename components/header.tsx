"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { UserProfileDropdown } from "@/components/UserProfileDropdown"
import useAuthStore from "@/store/authStore"
import useCartStore from "@/store/cartStore"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const getItemCount = useCartStore((state) => state.getItemCount)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      setCartCount(getItemCount())
    }

    // Initial load
    updateCartCount()

    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [getItemCount])

  const navItems = [
    { name: "Products", href: "/products", active: true },
    { name: "Interlining & Padding", href: "/products?category=interlining" },
    { name: "Trims & Accessories", href: "/products?category=trims" },
    { name: "Labels & Tags", href: "/products?category=labels" },
    { name: "Threads & Yarns", href: "/products?category=threads" },
    { name: "Packaging", href: "/products?category=packaging" },
    { name: "Decorative Accessories", href: "/products?category=decorative" },
  ]

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-50 mb-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm text-gray-600">
            <div className="font-medium">Welcome to worldwide Xpartex</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 hover:text-teal-600 cursor-pointer transition-colors">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>
                  Deliver to <span className="font-semibold text-gray-800">423651</span>
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-teal-600 cursor-pointer transition-colors">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Track your order</span>
              </div>
              <div className="flex items-center gap-2 hover:text-teal-600 cursor-pointer transition-colors">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>All Offers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ease-linear ${
          isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-white"
        }`}>
        <div className="container mx-auto px-4 mb-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>

              <Link href="/" className="flex items-center group">
                <div className="flex items-center h-20">
                  <Image src="/logo.png" alt="Xpartex Logo" width={180} height={180} className="h-12 w-auto object-contain mr-2" priority />
                </div>
              </Link>
            </div>

            <div className="flex-1 flex justify-center mx-8 max-w-2xl">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                  <Input
                  placeholder="Search raw materials, garment Accessories and more..."
                  className="pl-12 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all shadow-sm hover:shadow-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <UserProfileDropdown />
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-all duration-200 ease-linear font-medium focus:outline-none focus:ring-0"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">Sign Up/Sign In</span>
                  </Button>
                </Link>
              )}

              <Link href="/cart">
                  <Button
                  variant="ghost"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-all duration-200 ease-linear font-medium focus:outline-none focus:ring-0"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-sm">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm hidden lg:block">Cart</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`hidden lg:block transition-all duration-300 backdrop-blur-md`}
        >
          <div className="container mx-auto px-4 mt-2">
            <div className="w-full max-w-full overflow-x-auto scrollbar-hide">
              <nav className="flex items-center h-12 gap-2 py-1 min-w-max">
        {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
          className={`flex items-center gap-1 px-5 py-2 text-base font-medium transition-all duration-200 ease-linear whitespace-nowrap rounded-full border-0 focus:outline-none focus:ring-0 ${
                      item.active
                        ? "text-white bg-sky-400 hover:bg-sky-500 shadow-md"
                        : "text-gray-700 bg-gray-50 hover:bg-sky-50 border border-transparent hover:border-transparent"
                    }`}
                    style={{ boxShadow: item.active ? '0 2px 8px 0 rgba(0,180,255,0.15)' : undefined }}
                  >
                    <span>{item.name}</span>
                      <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ease-linear ${
                        item.active ? "text-white" : "text-sky-400"
                      }`}
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className={`lg:hidden border-t transition-all duration-300 ease-linear ${
                isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"
              }`}
            >
              <div className="py-4 space-y-2">
                <div className="px-4 pb-4 ">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-3 p-2">
                      <UserProfileDropdown />
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-gray-700 py-2 px-2 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-all ease-linear w-full justify-start focus:outline-none focus:ring-0"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Sign Up/Sign In</span>
                      </Button>
                    </Link>
                  )}
                </div>
                <nav className="px-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 ease-linear focus:outline-none focus:ring-0 ${
                        item.active
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm"
                          : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  </header>
    </>
  )
}
