"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RentCardProps {
  title: string;
  image: string;
  price: number;
  company: string;
  companyLogo: string;
  location: string;
  id: number;
}

export default function RentCard({ title, image, price, company, companyLogo, location, id }: RentCardProps) {
  const router = useRouter();
  const handleRentNow = () => {
    if (id !== undefined && id !== null) {
      router.push(`/rent/${id}`);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-xs mx-auto">
      <div className="w-full h-40 sm:h-48 relative">
        <Image src={image} alt={title} fill className="object-cover w-full h-full" />
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="font-semibold text-base mb-1 truncate" title={title}>{title}</div>
        <div className="flex items-center gap-2 mb-2">
          <Image src={companyLogo} alt={company} width={24} height={24} className="rounded object-contain" />
          <span className="text-gray-700 text-sm font-medium">{company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-base font-bold text-gray-900">৳{price}<span className="text-xs font-normal text-gray-500">/day</span></span>
          <button
            className="border border-gray-300 rounded-full px-4 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all"
            onClick={handleRentNow}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
