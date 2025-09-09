
import React from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";

interface FreelancerCardProps {
  id: number;
  name: string;
  avatar: string;
  posted: string;
  title: string;
  badges: string[];
  rate: string;
  location: string;
  description?: string;
  deadline?: string;
  payment?: string;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({
  id,
  name,
  avatar,
  badges,
}) => {
  const router = useRouter();
  return (
    <div
      className="rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-stretch min-h-[320px] max-w-sm mx-auto"
      style={{ boxShadow: '0 2px 8px 0 rgba(60,72,88,.04)', width: '340px' }}
    >
      <h3 className="text-[20px] font-bold text-gray-900 mb-2 leading-snug">Tech Pack Design for T-Shirt Product</h3>
      <div className="flex items-center gap-2 mb-2">
        <Image src={avatar} alt={name} width={24} height={24} className="w-6 h-6 rounded-full object-cover border border-gray-200" />
        <span className="text-sm text-gray-700 font-medium">Sarh Bin</span>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block"><path fill="#98A2B3" d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.02 10.62 8.01 11.34.34.25.64.25.98 0C13.98 21.62 21 16.25 21 11c0-4.97-4.03-9-9-9Zm0 17.88C9.14 18.07 5 14.61 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.61-4.14 7.07-7 8.88Zm0-12.38A3.5 3.5 0 0 0 8.5 11c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5A3.5 3.5 0 0 0 12 5.5Zm0 5A1.5 1.5 0 1 1 12 8a1.5 1.5 0 0 1 0 3Z"/></svg>
        <span className="text-sm text-gray-700 font-medium">Germany</span>
      </div>
      <p className="text-gray-700 text-[15px] mb-2 leading-normal">
        Looking for an experienced tech pack designer who can create professional tech packs according to design.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {badges.map((badge, idx) => (
          <span key={idx} className="bg-[#F5F7FA] text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2 text-gray-700 text-[15px]">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#98A2B3" d="M12 8a1 1 0 0 1 1 1v3h2a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"/></svg>
          <span className="font-medium">Deadline:</span> <span className="font-bold ml-1">5 days</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-[15px]">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#98A2B3" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm1-13h-2v6h6v-2h-4z"/></svg>
          <span className="font-medium">Payment:</span> <span className="font-bold ml-1">৳30000</span>
        </div>
      </div>
      <button
        className="w-full mt-2 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold text-base bg-white hover:bg-gray-50 transition"
        onClick={() => router.push(`/freelancers/${id}`)}
      >
        Apply
      </button>
    </div>
  );
};

export default FreelancerCard;
