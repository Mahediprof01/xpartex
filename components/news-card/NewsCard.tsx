import React from 'react';

import Image from "next/image";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  authorImg?: string;
  onClick?: () => void;
  onArrowClick?: () => void;
}


const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  date,
  author,
  onClick,
}) => {
  return (
    <div
      className=" rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full p-3 transition hover:shadow-md relative cursor-pointer max-w-xs"
      style={{ boxShadow: "0 2px 8px 0 rgba(16, 30, 54, 0.08)" }}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-full h-[120px] rounded-xl overflow-hidden mb-3">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col px-0">
        <div className="font-semibold text-base leading-tight mb-1 line-clamp-2 text-gray-900">{title}</div>
        <div className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-2">
          <span>{date}</span>
          <span className="mx-1">|</span>
          <span className="text-gray-500 font-medium">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
