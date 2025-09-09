"use client";

import RentCard from './rent-card/RentCard';
import Link from 'next/link';
import Image from "next/image";

const rents = [
  {
    id: 1,
    title: 'Racks for Garments Product',
    image: '/rent.png',
    price: 3000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 2,
    title: 'Pallet Jacks & Forklifts',
    image: '/rent2.png',
    price: 6000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 3,
    title: 'Delivery Vans',
    image: '/rent3.png',
    price: 4000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 4,
    title: 'Turk Delivery For Rental',
    image: '/rent4.png',
    price: 5000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 5,
    title: 'Excavator construction machine',
    image: '/rent5.png',
    price: 9000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 6,
    title: 'Pallet Jacks & Forklifts',
    image: '/rent2.png',
    price: 7000,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
];

export function Rent() {
  const tabs = ['All Rentals', 'Machines', 'Props', 'Racks', 'Mannequins'];

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Rental Services</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/rent"
                className="relative px-4 py-2 text-base font-medium focus:outline-none text-gray-800 bg-transparent border-none transition-colors duration-200 hover:text-sky-600"
                style={{ background: 'none', textDecoration: 'none' }}
              >
                <span className="relative inline-block">
                  {tab}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Cards Section (reduced width) */}
          <div className="w-full lg:flex-[1_1_0%] xl:flex-[1.5_1_0%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rents.slice(0, 6).map((item) => (
                <RentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  company={item.company}
                  companyLogo={item.companyLogo}
                  location={item.location}
                />
              ))}
            </div>
          </div>
          {/* Right: Rental Requests Panel (aligned with filter tabs) */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-[0_1_420px] bg-white rounded-xl shadow-md p-4 h-fit mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">Rental Requests</h3>
              <button className="flex items-center gap-1 text-gray-500 border px-2 py-1 rounded-md text-xs">
                <span>▼</span>
              </button>
            </div>
            <hr className="mb-2" />
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Mega Machines Inc.', desc: 'Heavy Machinery Rentals', count: 15, logo: '/rentavatar.png' },
                { name: 'Hennes & Mauritz', desc: 'Clothing Company', count: 27, logo: '/rentavatar1.png' },
                { name: 'Textile Daddy', desc: 'Textile Machineries and Properties', count: 35, logo: '/rentavatar2.png' },
                { name: 'The Home Depot', desc: 'Maintenance Machineries', count: 21, logo: '/rentavatar3.png' },
                { name: 'Cintas', desc: 'Workwear, uniforms, and floor mats.', count: 19, logo: '/rentavatar4.png' },
                { name: 'Lindström Group', desc: 'Workwear and protective clothing', count: 42, logo: '/rentavatar5.png' },
              ].map((req, idx) => (
                <li key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Image src={req.logo} alt={req.name} width={32} height={32} className="w-8 h-8 rounded-full object-contain bg-white border" />
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{req.name}</div>
                      <div className="text-xs text-gray-500">{req.desc}</div>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold min-w-[36px] text-center">{req.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
