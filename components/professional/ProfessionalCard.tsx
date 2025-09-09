"use client";
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/navigation';

interface ProfessionalCardProps {
  id: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  experience: string;
  avatar: string;
  tags: string[];
  reviews?: number;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  id,
  name,
  title,
  location,
  rating,
  experience,
  avatar,
  tags,
  reviews,
}) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-start border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
          <Image src={avatar} alt={name} width={48} height={48} className="object-cover w-full h-full" />
        </div>
        <div>
          <div className="font-semibold text-base leading-tight">{name}</div>
          <div className="text-sm text-gray-500 leading-tight">{title}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-3">Location : {location}</div>
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        Rating :
        <span className="text-yellow-500 font-semibold ml-1">★ {rating}</span>
        {reviews && <span className="text-xs text-gray-400 ml-1">({reviews} Reviews)</span>}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-md text-gray-700">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="text-sm text-gray-700">Experience : {experience}</span>
        <button
          className="ml-auto bg-white border border-gray-200 rounded-full px-5 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          onClick={() => router.push(`/professional/${id}`)}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
