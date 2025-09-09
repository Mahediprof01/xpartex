"use client"

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cartStore'
import { useRouter } from 'next/navigation'

export default function CartIcon() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const getItemCount = useCartStore((state) => state.getItemCount)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    setItemCount(getItemCount())
    
    const handleCartUpdate = () => {
      setItemCount(getItemCount())
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [getItemCount])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => router.push('/cart')}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Button>
  )
}
