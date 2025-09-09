"use client";
import Image from 'next/image';



import { useRouter } from 'next/navigation';

interface JobCardProps {
  id: number;
  company: string;
  logo: string;
  posted: string;
  title: string;
  badges: string[];
  salary: string;
  location: string;
  button?: string;
}

export default function JobCard({ id, company, logo, posted, title, badges, salary, location, button }: JobCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col min-h-[240px] relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image src={logo} alt={company} width={32} height={32} className="object-contain w-8 h-8" />
          </div>
          <span className="font-semibold text-sm text-gray-800">{company}</span>
          <span className="text-xs text-gray-400">{posted}</span>
        </div>
        <button className="text-xs text-gray-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
          Save
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
        </button>
      </div>
  <div className="font-semibold text-lg mb-3 text-gray-900">{title}</div>
  <div className="flex flex-wrap gap-2 mb-4">
        {badges.map((badge, i) => (
          <span key={i} className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium">{badge}</span>
        ))}
      </div>
      {/* Office location and apply by date section */}
  <div className="flex items-center text-xs text-gray-500 mb-2">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V17.25A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0h-9" />
        </svg>
        Office · Bashundhara, Dhaka
      </div>
  <div className="flex items-center text-xs text-gray-500 mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8.25V8.75A2.25 2.25 0 015.25 6.5h13.5A2.25 2.25 0 0121 8.75v7.5A2.25 2.25 0 0118.75 18.5H5.25A2.25 2.25 0 013 16.25z" />
        </svg>
        Apply by: 26 Aug, 2025
      </div>
  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div>
          <div className="font-bold text-base text-gray-900">৳{salary}</div>
          <div className="text-xs text-gray-500">{location}</div>
        </div>
        <button
          className={
            button === 'primary'
              ? 'bg-sky-400 hover:bg-sky-500 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all'
              : 'bg-white border border-gray-300 text-gray-900 font-semibold px-5 py-2 rounded-full text-sm transition-all hover:bg-gray-50'
          }
          onClick={() => router.push(`/job/${id}`)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
