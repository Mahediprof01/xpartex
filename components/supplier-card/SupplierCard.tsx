

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SupplierCardProps {
  name: string;
  logo: string;
  location: string;
  rating: number;
  reviews: number;
  verified?: boolean;
  description?: string;
  category?: string;
  id?: number;
}

export default function SupplierCard({
  name,
  logo,
  location,
  rating,
  reviews,
  verified = true,
  description = 'Trusted supplier of premium zippers and garment accessories.',
  category = 'Apparel Trims & Accessory',
  id,
}: SupplierCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-sm mx-auto flex flex-col gap-3" style={{minWidth:'290px'}}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
          <Image src={logo} alt={name} width={48} height={48} className="object-contain w-full h-full" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg text-gray-900">{name}</span>
            {verified && (
              <span className="ml-1 text-green-500" title="Verified">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 leading-tight">{location}</div>
        </div>
      </div>
      <div className="text-gray-500 text-[15px] mt-1 mb-2">{description}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{category}</span>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </span>
          <span className="font-semibold text-base text-gray-800">{rating}</span>
          <span className="text-gray-500 text-sm">({reviews} Reviews)</span>
        </div>
        <button
          className="bg-sky-400 hover:bg-sky-500 text-white text-base font-semibold px-6 py-1.5 rounded-full shadow-sm transition-all"
          onClick={() => {
            if (id) router.push(`/vendors/${id}`);
          }}
        >
          Contact
        </button>
      </div>
    </div>
  );
}
