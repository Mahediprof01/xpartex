"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { X, Star } from 'lucide-react'

interface Filters {
  category: string
  priceRange: number[]
  certificates: string[]
  rating: number
  inStock: boolean
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose?: () => void
}

const categories = [
  { id: 'garments', name: 'Garments', count: 1250 },
  { id: 'fabrics', name: 'Fabrics', count: 2100 },
  { id: 'machinery', name: 'Machinery', count: 850 },
  { id: 'fibers', name: 'Fibers', count: 1400 },
  { id: 'accessories', name: 'Accessories', count: 950 },
  { id: 'tools', name: 'Tools', count: 420 }
]

const certificates = [
  'OEKO-TEX',
  'GOTS',
  'ISO 9001',
  'ISO 14001',
  'CE',
  'Fair Trade',
  'UL',
  'CPSIA'
]

export function ProductFilters({ filters, onFiltersChange, onClose }: ProductFiltersProps) {
  const updateFilters = (key: keyof Filters, value: string | number | boolean | string[] | number[]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleCertificate = (cert: string) => {
    const newCerts = filters.certificates.includes(cert)
      ? filters.certificates.filter(c => c !== cert)
      : [...filters.certificates, cert]
    updateFilters('certificates', newCerts)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      priceRange: [0, 20000],
      certificates: [],
      rating: 0,
      inStock: false
    })
  }

  const hasActiveFilters = filters.category || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 20000 ||
    filters.certificates.length > 0 ||
    filters.rating > 0 ||
    filters.inStock

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.category === category.id}
                    onCheckedChange={(checked) => 
                      updateFilters('category', checked ? category.id : '')
                    }
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters('priceRange', value)}
              max={20000}
              min={0}
              step={50}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="font-semibold mb-3">Certificates</h3>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.certificates.includes(cert)}
                  onCheckedChange={() => toggleCertificate(cert)}
                />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) => 
                    updateFilters('rating', checked ? rating : 0)
                  }
                />
                <div className="flex items-center">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold mb-3">Availability</h3>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilters('inStock', !!checked)}
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
