import Image from 'next/image';
import React from 'react';

interface DigitalCardProps {
  image: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
  category?: string;
  onBuy?: () => void;
  oldPrice?: number;
}

const DigitalCard: React.FC<DigitalCardProps> = ({
  image,
  title,
  author,
  price,
  rating,
  reviews,
  bestSeller,
  category = 'Artwork',
  onBuy,
  oldPrice,
}) => {
  return (
  <div className="rounded-2xl p-4 flex flex-col shadow-sm border border-gray-100 max-w-sm" style={{ minWidth: 340 }}>
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        <Image src={image} alt={title} width={320} height={240} className="object-cover w-full h-full" />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span className="flex items-center gap-1">
          <Image src="/digital.png" alt="Digital" width={18} height={18} className="inline-block" />
          <span className="font-medium text-gray-700">{category}</span>
        </span>
        <span className="flex items-center ml-2 gap-1 text-yellow-500">
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
        </span>
        <span className="text-gray-500 text-base ml-1">({reviews})</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="font-semibold text-base leading-tight line-clamp-1 flex-1" title={title}>{title}</div>
        {bestSeller && (
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded ml-1">Best Seller</span>
        )}
      </div>
      <div className="text-sm text-gray-500 mb-3 truncate">{author}</div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-gray-900">৳{price}</span>
          {oldPrice && (
            <span className="text-base text-gray-400 line-through">৳{oldPrice}</span>
          )}
        </div>
        <button
          className="px-7 py-2 rounded-full border text-base font-semibold text-gray-700 border-[#98a1b2] bg-white hover:bg-gray-100 transition-all shadow-sm"
          style={{ boxShadow: 'none' }}
          onClick={onBuy}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default DigitalCard;
