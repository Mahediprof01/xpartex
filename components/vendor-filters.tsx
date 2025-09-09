import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-react'

interface VendorFiltersProps {
  onClose?: () => void
}

const locations = [
  'India', 'China', 'Turkey', 'Vietnam', 'Bangladesh', 'Pakistan', 'Thailand', 'Indonesia'
]

const categories = [
  'Garments', 'Fabrics', 'Machinery', 'Fibers', 'Accessories', 'Tools'
]

const certificates = [
  'ISO 9001', 'OEKO-TEX', 'GOTS', 'Fair Trade', 'CE', 'UL', 'WRAP'
]

export function VendorFilters({ onClose }: VendorFiltersProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <h3 className="font-semibold mb-3">Location</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="font-semibold mb-3">Certificates</h3>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <h3 className="font-semibold mb-3">Verification</h3>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox />
            <span className="text-sm">Verified Vendors Only</span>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
