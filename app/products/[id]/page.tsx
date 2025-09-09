"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Star, Plus, Minus } from 'lucide-react'
import { ProductCategories } from '@/components/product-categories'
import useCartStore from '@/store/cartStore'

const mockProduct = {
  id: 1,
  name: "Premium Cotton Fabric",
  description: "High-quality 100% organic cotton fabric perfect for garment manufacturing. This premium fabric offers exceptional softness, durability, and breathability, making it ideal for a wide range of applications from casual wear to high-end fashion.",
  price: 12.50,
  images: [
    "/products2.jpg?height=500&width=500",
    "/products3.jpg?height=500&width=500",
    "/products4.jpg?height=500&width=500",
    "/products5.jpg?height=500&width=500"
  ],
  vendor: {
    id: 1,
    name: "Global Textiles Ltd",
    rating: 4.8,
    reviews: 234,
    verified: true
  },
  category: "fabrics",
  rating: 4.8,
  reviews: 124,
  certificates: ["OEKO-TEX", "GOTS", "Fair Trade"],
  inStock: true,
  stockQuantity: 500,
  specifications: {
    "Material": "100% Organic Cotton",
    "Weight": "150 GSM",
    "Width": "58 inches",
    "Color": "Natural White",
    "Weave": "Plain Weave",
    "Shrinkage": "Less than 3%",
    "Care": "Machine Washable"
  },
  features: [
    "OEKO-TEX Standard 100 certified",
    "GOTS certified organic cotton",
    "Pre-shrunk and colorfast",
    "Suitable for direct skin contact",
    "Eco-friendly production process"
  ]
}



export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description');
  
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    const product = {
      id: mockProduct.id,
      name: mockProduct.name,
      title: mockProduct.name,
      image: mockProduct.images[0],
      price: mockProduct.price,
      vendor: mockProduct.vendor.name,
      type: "product"
    };
    
    addItem(product, quantity);
    
    // Show success message
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showToast', {
        detail: { message: `${quantity} x ${mockProduct.name} added to cart!`, type: 'success' }
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
              {mockProduct.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden w-16 h-16 ${selectedImage === idx ? 'border-blue-400' : 'border-transparent'}`}
                >
                  <Image src={image} alt={mockProduct.name + idx} width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative rounded-xl overflow-hidden min-h-[320px] bg-gray-100">
              <Image src={mockProduct.images[selectedImage]} alt={mockProduct.name} fill className="object-cover" />
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
                  Retail Order
                </button>
                <button className="py-2 px-1 font-semibold text-gray-500 hover:text-sky-500">
                  Customize Order
                </button>
              </nav>
            </div>
            
            <div className="text-sm mb-2">
              <span className="text-gray-500">Price</span>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-800">$998</span>
                <span className="text-lg line-through text-gray-400">$1200</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus className="w-4 h-4" /></Button>
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
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Spend $80.00 to get free shipping</span>
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
                Reviews(4)
              </button>
              <button
                className={`py-2 px-4 font-semibold border-b-2 transition-colors ${activeTab === 'warranty' ? 'text-sky-500 border-sky-400' : 'text-gray-500 border-transparent hover:text-sky-500'}`}
                onClick={() => setActiveTab('warranty')}
              >
                Warranty Trams
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              <div>
                <h4 className="text-sky-500 font-semibold mb-2">About the Material and Color</h4>
                <p className="text-gray-500 text-sm">Crafted from premium solid wood with a smooth matte finish, this furniture piece is available in rich walnut brown, elegant charcoal black, and soft pastel hues. The upholstery is made from high-quality linen fabric, offering durability and a plush feel.</p>
              </div>
              <div>
                <h4 className="text-sky-500 font-semibold mb-2">Manufacturing Details:</h4>
                <p className="text-gray-500 text-sm">Expertly handcrafted using sustainable wood and precision-cut metal legs for a sturdy, long-lasting design. Assembled with reinforced joints for extra durability. Designed and manufactured with eco-friendly materials and low-VOC finishes.</p>
              </div>
              <div>
                <h4 className="text-sky-500 font-semibold mb-2">Product Features:</h4>
                <p className="text-gray-500 text-sm">Designed for modern living, this ergonomic furniture blends comfort and style, featuring high-density cushioning, a sturdy frame, and elegant detailing. The upholstery is made from high-quality linen fabric, offering durability and a plush feel.</p>
              </div>
              <div>
                <h4 className="text-sky-500 font-semibold mb-2">Warranty Terms:</h4>
                <p className="text-gray-500 text-sm">All our products come with a 1-year warranty covering manufacturing defects. For more details, please refer to our warranty policy page.</p>
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
  )
}
