"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, ShoppingCart, Eye, ArrowRight } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: Product) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isWishlisted) {
      const filtered = wishlist.filter((item: Product) => item.id !== product.id)
      localStorage.setItem('wishlist', JSON.stringify(filtered))
      setIsWishlisted(false)
    } else {
      wishlist.push(product)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setIsWishlisted(true)
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('wishlistUpdated'))
  }

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <Link href={`/vendors/${product.vendorId}`}>
                  <p className="text-sm text-blue-600 hover:underline mb-2">{product.vendor}</p>
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleWishlist}
                className="text-muted-foreground hover:text-red-500"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
              </div>
              {product.certificates.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#0040304A] dark:text-[#9782DC]">
                ${product.price.toFixed(2)}
              </div>
              <div className="flex gap-2">
                <Link href={`/products/${product.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="bg-sky-400 hover:bg-sky-500 text-white group"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden">
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleWishlist}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white text-muted-foreground hover:text-red-500"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <Link href={`/vendors/${product.vendorId}`}>
          <p className="text-sm text-blue-600 hover:underline mb-2">{product.vendor}</p>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.certificates.slice(0, 2).map((cert) => (
            <Badge key={cert} variant="secondary" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-[#0040304A] dark:text-[#9782DC]">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button 
            onClick={addToCart}
            disabled={!product.inStock}
            className="flex-1 bg-sky-400 hover:bg-sky-500 text-white group"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
