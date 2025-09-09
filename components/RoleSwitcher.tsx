"use client"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Store } from "lucide-react"
import useAuthStore from "@/store/authStore"

export function RoleSwitcher() {
  const { role, toggleRole } = useAuthStore()
  const isSeller = role === 'seller'
  
  return (
    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <ShoppingBag className={`h-5 w-5 ${role === 'buyer' ? 'text-blue-600' : 'text-gray-400'}`} />
        <Label htmlFor="role-switch" className="text-sm font-medium">
          Buyer Mode
        </Label>
      </div>
      
      {/* Custom pill toggle to match provided design */}
      <button
        id="role-switch"
        aria-pressed={isSeller}
        onClick={toggleRole}
        className={`relative inline-flex items-center transition-colors duration-200 focus:outline-none ml-2 mr-2 ${
          isSeller ? 'bg-purple-600' : 'bg-gray-500'
        } rounded-full w-14 h-8 p-1`}
      >
        <span
          className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-200 ${
            isSeller ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      
      <div className="flex items-center space-x-2">
        <Label htmlFor="role-switch" className="text-sm font-medium">
          Seller Mode
        </Label>
        <Store className={`h-5 w-5 ${role === 'seller' ? 'text-purple-600' : 'text-gray-400'}`} />
      </div>
      
      <Badge 
        variant="secondary" 
        className={`ml-4 ${
          role === 'seller' 
            ? 'bg-purple-100 text-purple-700 border-purple-200' 
            : 'bg-blue-100 text-blue-700 border-blue-200'
        }`}
      >
        Active: {role === 'seller' ? 'Seller' : 'Buyer'}
      </Badge>
    </div>
  )
}
