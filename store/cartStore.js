"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id && item.type === product.type)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id && item.type === product.type
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity }]
          })
        }
        
        // Dispatch custom event for UI updates
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cartUpdated'))
        }
      },
      
      removeItem: (productId, productType) => {
        set({
          items: get().items.filter(item => 
            !(item.id === productId && (!productType || item.type === productType))
          )
        })
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cartUpdated'))
        }
      },
      
      updateQuantity: (productId, quantity, productType) => {
        if (quantity <= 0) {
          get().removeItem(productId, productType)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId && (!productType || item.type === productType)
              ? { ...item, quantity }
              : item
          )
        })
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cartUpdated'))
        }
      },
      
      clearCart: () => {
        set({ items: [] })
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cartUpdated'))
        }
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalWithTax: (taxRate = 0.1) => {
        const subtotal = get().getSubtotal()
        return subtotal + (subtotal * taxRate)
      }
    }),
    {
      name: "xpartex-cart",
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
)

export default useCartStore
