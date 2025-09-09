import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, CreditCard } from 'lucide-react';
import useCartStore from '@/store/cartStore';

interface EbookCardProps {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  seller?: string;
  onBuy?: () => void;
  oldPrice?: number;
}

const EbookCard: React.FC<EbookCardProps> = ({
  id,
  image,
  title,
  author,
  price,
  rating,
  reviews,
  seller,
  onBuy,
  oldPrice,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  
  const handleBuy = () => {
    if (onBuy) {
      onBuy();
    } else {
      router.push(`/e-book/${id}`);
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
      vendor: seller || "Books House",
      type: "ebook"
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
    router.push(`/e-book/${id}`);
  };
  return (
  <div 
    className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col p-3 transition hover:shadow-lg relative cursor-pointer group" 
    style={{ maxWidth: 350 }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={handleCardClick}
  >
      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3">
        <Image src={image} alt={title} width={220} height={260} className="object-cover w-full h-full" />
      </div>
  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Image src="/ebookvector.png" alt="eBook icon" width={16} height={16} className="mr-1" />
          <span className="font-semibold text-gray-700">eBook</span>
        <span className="ml-auto flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.round(rating) ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 17.25l-6.172 3.245 1.179-6.873L2 8.755l6.914-1.004L12 1.5l3.086 6.251L22 8.755l-5.007 4.867 1.179 6.873z"
              />
            </svg>
          ))}
          <span className="text-gray-400 ml-1">({reviews})</span>
        </span>
      </div>
  <div className="font-semibold text-base leading-tight mb-2 line-clamp-2" title={title}>{title}</div>
  <div className="text-sm text-gray-500 mb-2 truncate">{author}</div>
  {seller && <div className="text-xs text-gray-500 mb-3">Seller: {seller}</div>}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">৳{price}</span>
          {oldPrice && (
            <span className="text-base text-gray-400 line-through">৳{oldPrice}</span>
          )}
        </div>
        
        {/* Default state - Buy Now button */}
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          <button
            className="px-7 py-2 rounded-full border text-lg font-bold text-gray-700 border-[#98a1b2] bg-transparent hover:bg-gray-100 transition-all"
            style={{ boxShadow: 'none' }}
            onClick={handleBuy}
          >
            Buy Now
          </button>
        </div>
        
        {/* Hover state - Add to Cart and Buy Now buttons */}
        <div className={`absolute right-3 bottom-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <button
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center justify-center"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-1"
            onClick={handleBuyNow}
            title="Buy Now"
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-semibold">Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookCard;
