import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Users, Calendar, Shield, Package, ArrowRight } from 'lucide-react'

interface Vendor {
  id: number
  name: string
  description: string
  logo: string
  banner: string
  location: string
  established: number
  employees: string
  rating: number
  reviews: number
  certificates: string[]
  categories: string[]
  totalProducts: number
  verified: boolean
}

interface VendorCardProps {
  vendor: Vendor
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={vendor.banner || "/placeholder.svg"}
          alt={`${vendor.name} banner`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {vendor.verified && (
          <Badge className="absolute top-4 left-4 bg-green-500 text-white">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-background shadow-lg flex-shrink-0">
            <Image
              src={vendor.logo || "/placeholder.svg"}
              alt={`${vendor.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/vendors/${vendor.id}`}>
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                {vendor.name}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {vendor.location}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{vendor.rating}</span>
                <span className="text-muted-foreground ml-1">({vendor.reviews})</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {vendor.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>Est. {vendor.established}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-green-600" />
            <span>{vendor.employees}</span>
          </div>
          <div className="flex items-center">
            <Package className="w-4 h-4 mr-2 text-purple-600" />
            <span>{vendor.totalProducts} Products</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {vendor.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {vendor.certificates.slice(0, 2).map((cert) => (
            <Badge key={cert} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
        
        <Link href={`/vendors/${vendor.id}`}>
          <Button className="w-full bg-gradient-to-r from-[#0040304A] to-[#9782DC] hover:from-[#003028] hover:to-[#8A75D1] text-white group">
            View Vendor Profile
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
