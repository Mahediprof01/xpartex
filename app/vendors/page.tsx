"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { VendorFilters } from '@/components/vendor-filters'
import { useState } from 'react'

const mockVendors = [
  {
    id: 1,
    name: "Global Textiles Ltd",
    description: "Leading manufacturer of premium cotton fabrics and sustainable textiles",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center",
    location: "Mumbai, India",
    established: 1995,
    employees: "500-1000",
    rating: 4.8,
    reviews: 234,
    certificates: ["ISO 9001", "OEKO-TEX", "GOTS"],
    categories: ["Fabrics", "Garments"],
    totalProducts: 156,
    verified: true
  },
  {
    id: 2,
    name: "MachineWorks Pro",
    description: "Industrial textile machinery and equipment supplier with 25+ years experience",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
    banner: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=200&fit=crop&crop=center",
    location: "Shanghai, China",
    established: 1998,
    employees: "1000+",
    rating: 4.9,
    reviews: 189,
    certificates: ["ISO 9001", "CE", "UL"],
    categories: ["Machinery", "Tools"],
    totalProducts: 89,
    verified: true
  },
  {
    id: 3,
    name: "Fiber Solutions Inc",
    description: "Premium synthetic and natural fiber supplier for textile industry",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&crop=center",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop&crop=center",
    location: "Istanbul, Turkey",
    established: 2001,
    employees: "200-500",
    rating: 4.6,
    reviews: 145,
    certificates: ["ISO 14001", "OEKO-TEX"],
    categories: ["Fibers", "Accessories"],
    totalProducts: 234,
    verified: true
  },
  {
    id: 4,
    name: "Fashion Forward Co",
    description: "Contemporary fashion garments and apparel manufacturing",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center",
    banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center",
    location: "Ho Chi Minh, Vietnam",
    established: 2005,
    employees: "100-200",
    rating: 4.7,
    reviews: 298,
    certificates: ["Fair Trade", "WRAP"],
    categories: ["Garments", "Accessories"],
    totalProducts: 445,
    verified: false
  }
]

export default function VendorsPage() {
  // const [searchQuery] = useState('') // Currently not used
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VendorFilters onClose={() => setShowFilters(false)} />
          </motion.div>

          {/* Vendors Grid */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {mockVendors.length} verified vendors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center max-w-xs mx-auto">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 overflow-hidden border border-gray-100">
                      <Image src={vendor.logo} alt={vendor.name} width={80} height={80} className="object-contain w-full h-full" />
                    </div>
                    <div className="w-full flex items-center justify-between mb-3">
                      <div className="font-semibold text-base text-left">{vendor.name}</div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        <span className="text-gray-800 text-sm font-semibold">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between mb-4">
                      <div className="text-gray-500 text-sm text-left">{vendor.location}</div>
                      {vendor.verified && <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">Verified</span>}
                    </div>
                    <div className="w-full text-left mb-4">
                      <span className="font-semibold text-sm text-gray-700">Main Products</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(vendor.categories || []).map((cat, i) => (
                          <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-md text-gray-700">{cat}</span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between text-sm text-gray-700 mb-6 mt-2">
                      <span className="text-left">MOQ:<br /><span className="font-semibold">2000 Pieces</span></span>
                      <span>Lead Time:<br /><span className="font-semibold">10-15 Days</span></span>
                    </div>
                    <Link href={`/vendors/${vendor.id}`} className="w-full mt-auto">
                      <button className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2.5 rounded-full text-base transition-all mt-2">View Profile</button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
