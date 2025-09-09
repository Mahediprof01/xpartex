import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from 'lucide-react';
import useCartStore from '@/store/cartStore';

interface LearningCardProps {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  price: number;
  oldPrice: number;
  duration: string;
  onBuy?: () => void;
  className?: string;
  largeImage?: boolean;
}

const LearningCard: React.FC<LearningCardProps> = ({
  id,
  image,
  title,
  subtitle,
  rating,
  price,
  oldPrice,
  duration,
  onBuy,
  className = '',
  largeImage = false,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const handleBuy = () => {
    if (onBuy) {
      onBuy();
    } else {
      router.push(`/online-learning/${id}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const product = {
      id,
      name: title,
      title,
      image,
      price,
      vendor: "Xpartex Learning",
      type: "course"
    };
    
    addItem(product, 1);
    
    // Show toast notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showToast', {
        detail: { message: `${title} added to cart!`, type: 'success' }
      });
      window.dispatchEvent(event);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(e);
    router.push('/cart');
  };

  const handleCardClick = () => {
    router.push(`/online-learning/${id}`);
  };
  return (
    <div 
      className={`bg-white rounded-3xl shadow-lg px-5 py-5 flex flex-col h-full min-h-[420px] max-w-[480px] mx-auto cursor-pointer group relative ${className}`} 
      style={{ minWidth: 400 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={`w-full ${largeImage ? 'h-80' : 'h-44'} rounded-2xl overflow-hidden mb-4`}>
        <Image src={image} alt={title} width={700} height={largeImage ? 320 : 180} className="object-cover w-full h-full" />
      </div>
      <div className="font-bold text-2xl text-gray-900 mb-3">{title}</div>
      <div className="text-gray-500 text-lg mb-4">{subtitle}</div>
      <div className="flex items-center gap-2 mb-4">
        {[1,2,3,4,5].map(i => (
          <svg key={i} className={`w-6 h-6 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-gray-700 font-semibold text-lg">{rating}</span>
        <span className="text-gray-500 ml-3" style={{ fontSize: 13 }}>Duration: {duration}</span>
      </div>
      <div className="flex items-center gap-4 mb-6 mt-auto">
        <span className="text-3xl font-bold text-gray-900">৳{price}</span>
        <span className="text-2xl text-gray-400 line-through">৳{oldPrice}</span>
      </div>
      
      {/* Default state - Buy Now button */}
      <div className={`transition-all duration-300 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button 
          className="ml-auto border border-gray-300 rounded-full px-8 py-3 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition-all" 
          onClick={handleBuy}
        >
          Buy Now
        </button>
      </div>
      
      {/* Hover state - Add to Cart and Buy Now buttons */}
      <div className={`absolute bottom-5 right-5 flex gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <button
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center justify-center"
          onClick={handleAddToCart}
          title="Add to Cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button
          className="px-5 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2"
          onClick={handleBuyNow}
          title="Buy Now"
        >
          <CreditCard className="w-5 h-5" />
          <span className="font-semibold">Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default LearningCard;
