"use client"

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  vendor: string
  vendorId: number
  category: string
  rating: number
  reviews: number
  certificates: string[]
  inStock: boolean
}

interface ProductGridProps {
  products: Product[]
  viewMode: 'grid' | 'list'
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  )
}
