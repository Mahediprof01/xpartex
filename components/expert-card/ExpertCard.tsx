'use client'
import Image from 'next/image';



import { useRouter } from 'next/navigation';

interface ExpertCardProps {
  id?: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  rate: number;
  avatar: string;
  tags: string[];

}

export default function ExpertCard({ id, name, title, location, rating, rate, avatar, tags }: ExpertCardProps) {
  const router = useRouter();
  return (
    <div
      className="bg-[#fcfcfc] rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-stretch min-h-[320px]"
      style={{ boxShadow: '0 2px 8px 0 rgba(60,72,88,.04)' }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
          <Image src={avatar} alt={name} width={48} height={48} className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-gray-900 leading-tight mb-1">{name}</span>
          <span className="text-base text-gray-600 leading-tight mb-1">{title}</span>
          <span className="text-sm text-[#6c757d] leading-tight">{location}</span>
        </div>
      </div>
      <div className="flex items-center mt-2 mb-3">
        <div className="flex items-center px-2 py-0.5 text-xs font-semibold text-gray-800 mr-2">
          <svg width="16" height="16" fill="#FFD600" viewBox="0 0 24 24" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          {rating}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-[#f5f7fa] text-gray-700 text-sm px-4 py-1 rounded-full font-medium">{tag}</span>
        ))}
      </div>
      <hr className="my-2 border-gray-200" />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold text-gray-900">৳{rate}<span className="text-base font-normal text-gray-500">/hour</span></span>
        <button
          className="border border-gray-300 rounded-full px-7 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-all"
          onClick={() => {
            if (id) router.push(`/experts/${id}`);
          }}
        >
          Hire Now
        </button>
      </div>
    </div>
  );
}
