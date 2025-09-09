"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/product-card/ProductCard'
import ProductFilterSidebar from '@/components/product-filters/ProductFilterSidebar'

// Mock product data
const products = [
	{
		id: 1,
		name: 'Premium Cotton Fabric',
		image: '/fabric.jpg?w=400&h=400&fit=crop&crop=center',
		price: 12.5,
		rating: 4.8,
		reviews: 124,
		sold: 191,
	},
	{
		id: 2,
		name: 'Industrial Sewing Machine',
		image: '/machinary.jpg?w=400&h=400&fit=crop&crop=center',
		price: 2850.0,
		rating: 4.9,
		reviews: 89,
		sold: 191,
	},
	{
		id: 3,
		name: 'Polyester Fiber Blend',
		image: '/fiber.jpg?w=400&h=400&fit=crop&crop=center',
		price: 8.75,
		rating: 4.6,
		reviews: 67,
		sold: 191,
	},
	{
		id: 4,
		name: 'Designer Denim Jacket',
		image: '/fabric2.jpg?w=400&h=400&fit=crop&crop=center',
		price: 89.99,
		rating: 4.7,
		reviews: 203,
		sold: 191,
	},
	{
		id: 5,
		name: 'Silk Fabric Premium',
		image: '/fabric1.jpg?w=400&h=400&fit=crop&crop=center',
		price: 45.0,
		rating: 4.9,
		reviews: 156,
		sold: 191,
	},
	{
		id: 6,
		name: 'Embroidery Machine Pro',
		image: '/machinary2.jpg?w=400&h=400&fit=crop&crop=center',
		price: 15750.0,
		rating: 4.8,
		reviews: 45,
		sold: 191,
	},
]

export default function ProductsPage() {
	const [showFilters] = useState(false)
	const [filters, setFilters] = useState({
		availability: ["In Stock"],
		productType: ["Retail"],
		productCategory: ["Raw Materials"],
		brand: ["Norman Fabrics"],
		priceRange: [20, 500],
	})
	const router = useRouter();

	return (
		<div className="pt-16 lg:pt-20 min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="flex gap-8">
					{/* Filters Sidebar */}
					<div
						className={`${
							showFilters ? 'block' : 'hidden'
						} lg:block w-full lg:w-80 flex-shrink-0`}
					>
						<div className="sticky top-28">
							<ProductFilterSidebar
								filters={filters}
								setFilters={setFilters}
							/>
						</div>
					</div>

					{/* Products Grid */}
					<div className="flex-1">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											  {products.map((product) => (
												  <ProductCard
													  key={product.id}
													  id={product.id}
													  title={product.name}
													  image={product.image}
													  price={product.price}
													  rating={product.rating}
													  reviews={product.reviews}
													  sold={product.sold}
													  onClick={() => router.push(`/products/${product.id}`)}
												  />
											  ))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
