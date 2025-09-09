import Image from 'next/image';
import React from 'react';

interface EbookCardProps {
  image: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  seller?: string;
  onBuy?: () => void;
}

const EbookCard: React.FC<EbookCardProps> = ({
  image,
  title,
  author,
  price,
  rating,
  reviews,
  seller,
  onBuy,
}) => {
  return (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col p-3 transition hover:shadow-lg relative" style={{ maxWidth: 350 }}>
      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3">
        <Image src={image} alt={title} width={220} height={260} className="object-cover w-full h-full" />
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <span className="inline-block w-4 h-4 bg-gray-200 rounded-sm mr-1" />
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
      <div className="font-semibold text-base leading-tight mb-1 line-clamp-2" title={title}>{title}</div>
      <div className="text-sm text-gray-500 mb-1 truncate">{author}</div>
      {seller && <div className="text-xs text-gray-500 mb-2">Seller: {seller}</div>}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="font-bold text-lg text-gray-800">${price}</span>
        <button
          className="bg-gray-100 hover:bg-sky-500 hover:text-white text-gray-800 px-5 py-1.5 rounded-full text-sm font-semibold shadow-sm transition-all"
          onClick={onBuy}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default EbookCard;
