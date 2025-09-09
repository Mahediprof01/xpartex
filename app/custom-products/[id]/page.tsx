"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Plus, Minus } from 'lucide-react';
import { ProductCategories } from '@/components/product-categories';
import useCartStore from '@/store/cartStore';

const mockCustomProduct = {
	id: 101,
	name: "Custom Embroidered Hoodie",
	description: "Design your own premium hoodie with custom embroidery. Choose fabric, color, and add your logo or text for a unique look.",
	price: 45.00,
	images: [
		"/custom2.png",
		"/custom3.png",
		"/custom4.png",
		"/custom5.png"
	],
	vendor: {
		id: 2,
		name: "CustomWear Studio",
		rating: 4.9,
		reviews: 89,
		verified: true
	},
	category: "custom-products",
	rating: 4.9,
	reviews: 89,
	certificates: ["Handmade", "Eco-Friendly"],
	inStock: true,
	stockQuantity: 120,
	specifications: {
		"Material": "80% Cotton, 20% Polyester",
		"Weight": "320 GSM",
		"Sizes": "S, M, L, XL, XXL",
		"Color Options": "10+ Colors",
		"Care": "Machine Washable"
	},
	features: [
		"Custom embroidery included",
		"Premium heavyweight fabric",
		"Wide range of color options",
		"Bulk order discounts",
		"Fast turnaround time"
	]
};

export default function CustomProductDetailPage() {
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState('description');
	const router = useRouter();
	const addItem = useCartStore((state) => state.addItem);

	const handleAddToCart = () => {
		const product = {
			id: mockCustomProduct.id,
			name: mockCustomProduct.name,
			title: mockCustomProduct.name,
			image: mockCustomProduct.images[0],
			price: mockCustomProduct.price,
			vendor: mockCustomProduct.vendor.name,
			type: "custom-product"
		};
		addItem(product, quantity);
		if (typeof window !== 'undefined') {
			const event = new CustomEvent('showToast', {
				detail: { message: `${quantity} x ${mockCustomProduct.name} added to cart!`, type: 'success' }
			});
			window.dispatchEvent(event);
		}
	};

	const handleBuyNow = () => {
		handleAddToCart();
		router.push('/cart');
	};

	return (
		<div className="pt-10 min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
					{/* Image Gallery */}
					<div className="flex gap-6">
						<div className="flex flex-col gap-3">
							{mockCustomProduct.images.map((image, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedImage(idx)}
									className={`border-2 rounded-lg overflow-hidden w-16 h-16 ${selectedImage === idx ? 'border-blue-400' : 'border-transparent'}`}
								>
									<Image src={image} alt={mockCustomProduct.name + idx} width={64} height={64} className="object-cover w-full h-full" />
								</button>
							))}
						</div>
						<div className="flex-1 relative rounded-xl overflow-hidden min-h-[320px] bg-gray-100">
							<Image src={mockCustomProduct.images[selectedImage]} alt={mockCustomProduct.name} fill className="object-cover" />
						</div>
					</div>
					{/* Product Info */}
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl md:text-3xl font-bold mb-2">Striped Cloth Lining Fabric 20 Meters Roll</h1>
						<div className="flex items-center gap-2 mb-2">
							<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
							<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
							<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
							<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
							<Star className="w-5 h-5 fill-gray-300 text-yellow-400" />
							<span className="font-semibold ml-2">4.8</span>
							<span className="text-gray-400">(56 Reviews)</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
							<Image src="/companylogorent.png" alt="vendor logo" width={24} height={24} className="rounded-full" />
							<span>Shenzhen Zhanbaiyi Textile Co., Ltd.</span>
						</div>

						<div className="border-b border-gray-200 mb-4">
							<nav className="flex gap-4" aria-label="Tabs">
								<button className="py-2 px-1 font-semibold border-b-2 border-sky-400 text-sky-500">
									Wholesale
								</button>
								<button className="py-2 px-1 font-semibold text-gray-500 hover:text-sky-500">
									Customize Order
								</button>
							</nav>
						</div>
						
						<div className="grid grid-cols-4 gap-4 text-center mb-4">
							<div>
								<p className="text-sm text-gray-500">100-250 Pieces</p>
								<p className="font-bold text-lg">৳250</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">250-500 Pieces</p>
								<p className="font-bold text-lg">৳230</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">500-700 Pieces</p>
								<p className="font-bold text-lg">৳200</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">&gt;=700 Pieces</p>
								<p className="font-bold text-lg">৳200</p>
							</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-box-open text-gray-500"></i>
								<span className="text-sm">Product Sample: <span className="font-bold">৳250</span></span>
							</div>
							<Button variant="outline" size="sm" className="text-sky-500 border-sky-500">Get Sample</Button>
						</div>

						<div className="flex items-center gap-4 mb-4">
							<div className="flex items-center gap-2 border rounded-md p-2">
								<Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(0, quantity - 1))}><Minus className="w-4 h-4" /></Button>
								<span className="px-4 text-lg font-semibold">{quantity}</span>
								<Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="w-4 h-4" /></Button>
							</div>
							<Button 
								onClick={handleAddToCart}
								className="flex-1 bg-sky-400 hover:bg-sky-500 text-white text-lg font-semibold py-3 rounded-md"
							>
								Add to Cart
							</Button>
						</div>
						
						<Button 
							onClick={handleBuyNow}
							variant="outline" 
							className="w-full text-lg font-semibold py-3 rounded-md mb-4"
						>
							Buy Now
						</Button>

						<div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
							<i className="fa-regular fa-clock"></i>
							<span>Order in the next <b>20 hour 34 minutes</b> to get it by 15 March 2025</span>
						</div>

						<div className="flex items-center gap-3 mb-4">
							<span className="text-sm text-gray-600">Share:</span>
							<span className="flex gap-3">
								<i className="fa-brands fa-instagram text-xl"></i>
								<i className="fa-brands fa-linkedin-in text-xl text-blue-700"></i>
								<i className="fa-brands fa-facebook-f text-xl text-blue-600"></i>
								<i className="fa-brands fa-youtube text-xl text-red-600"></i>
								<i className="fa-brands fa-x-twitter text-xl"></i>
							</span>
						</div>

						<div className="flex items-center gap-2 text-sm">
							<span className="text-gray-600">Guaranteed Checkout:</span>
							<span className="flex gap-2 items-center">
								<Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} />
								<Image src="/gpay.svg" alt="GPay" width={32} height={20} />
								<Image src="/visa.svg" alt="Visa" width={32} height={20} />
								<Image src="/stripe.svg" alt="Stripe" width={32} height={20} />
								<Image src="/paypal.svg" alt="Paypal" width={32} height={20} />
							</span>
						</div>
					</div>
				</div>
				{/* Tabs Section */}
				<div className="mt-8">
					<div className="border-b border-gray-200">
						<nav className="flex gap-8 justify-center" aria-label="Tabs">
							<button
								className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'description' ? 'text-sky-500 border-sky-400' : 'text-gray-500 border-transparent hover:text-sky-500'}`}
								onClick={() => setActiveTab('description')}
							>
								Description
							</button>
							<button
								className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'additional' ? 'text-sky-500 border-sky-400' : 'text-gray-500 border-transparent hover:text-sky-500'}`}
								onClick={() => setActiveTab('additional')}
							>
								Additional information
							</button>
							<button
								className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'reviews' ? 'text-sky-500 border-sky-400' : 'text-gray-500 border-transparent hover:text-sky-500'}`}
								onClick={() => setActiveTab('reviews')}
							>
								Reviews(2)
							</button>
							<button
								className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'warranty' ? 'text-sky-500 border-sky-400' : 'text-gray-500 border-transparent hover:text-sky-500'}`}
								onClick={() => setActiveTab('warranty')}
							>
								Warranty Terms
							</button>
						</nav>
					</div>
					{/* Tab Content */}
					{activeTab === 'description' && (
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
							<div>
								<h4 className="text-sky-500 font-semibold mb-2">About the Hoodie</h4>
								<p className="text-gray-500 text-sm">This hoodie is crafted from a premium cotton-poly blend, offering warmth, comfort, and durability. Personalize it with your own embroidery for a unique touch.</p>
							</div>
							<div>
								<h4 className="text-sky-500 font-semibold mb-2">Customization Details:</h4>
								<p className="text-gray-500 text-sm">Choose from a variety of colors and sizes. Upload your logo or text for embroidery. Bulk orders available for teams and events.</p>
							</div>
							<div>
								<h4 className="text-sky-500 font-semibold mb-2">Product Features:</h4>
								<p className="text-gray-500 text-sm">Heavyweight fabric, double-stitched seams, adjustable drawstring hood, and kangaroo pocket. Designed for comfort and style.</p>
							</div>
							<div>
								<h4 className="text-sky-500 font-semibold mb-2">Warranty Terms:</h4>
								<p className="text-gray-500 text-sm">All custom products come with a 6-month warranty covering manufacturing defects. See our warranty policy for details.</p>
							</div>
						</div>
					)}
					{activeTab === 'additional' && (
						<div className="py-8 text-center text-gray-500">Additional information coming soon...</div>
					)}
					{activeTab === 'reviews' && (
						<div className="py-8 text-center text-gray-500">Reviews coming soon...</div>
					)}
					{activeTab === 'warranty' && (
						<div className="py-8 text-center text-gray-500">Warranty terms and details coming soon...</div>
					)}
				</div>
				{/* Product Categories Section */}
				<div className="mt-12">
					<ProductCategories />
				</div>
			</div>
		</div>
	);
}
