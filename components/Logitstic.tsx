"use client";
import RentCard from './rent-card/RentCard';
import { useState } from 'react';
import Image from "next/image";

const logistics = [
  {
    title: 'Express Freight Delivery',
    image: '/rent.png',
    price: 1200,
    company: 'Swift Logistics Solutions',
    companyLogo: '/companylogorent.png',
    location: 'Dallas, Texas',
  },
  {
    title: 'Container Shipping',
    image: '/rent2.png',
    price: 3500,
    company: 'Global Container Lines',
    companyLogo: '/companylogorent.png',
    location: 'Long Beach, California',
  },
  {
    title: 'Air Cargo Express',
    image: '/rent3.png',
    price: 2200,
    company: 'AeroFast Cargo',
    companyLogo: '/companylogorent.png',
    location: 'Atlanta, Georgia',
  },
  {
    title: 'Rail Freight Service',
    image: '/rent4.png',
    price: 1800,
    company: 'Continental Railways',
    companyLogo: '/companylogorent.png',
    location: 'Chicago, Illinois',
  },
];

export function Logistic() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['All Logistics', 'Freight', 'Air', 'Rail', 'Container'];
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Logistics Services</h2>
          <div className="flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`relative px-4 py-2 text-base font-medium focus:outline-none text-gray-800 bg-transparent border-none transition-colors duration-200 ${activeTab === idx ? '' : 'hover:text-sky-600'}`}
                style={{ background: 'none' }}
              >
                <span className="relative inline-block">
                  {tab}
                  {activeTab === idx && (
                    <span className="block absolute left-0 right-0 -bottom-1 h-[3px] bg-sky-400 rounded transition-all duration-200" style={{width: '100%'}}></span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Cards Section (reduced width) */}
          <div className="w-full lg:flex-[1_1_0%] xl:flex-[1.5_1_0%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {logistics.map((item, idx) => (
                <RentCard
                  key={idx}
                  id={idx}
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
          {/* Right: Requests Panel (aligned with filter tabs) */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex-[0_1_420px] bg-white rounded-xl shadow-md p-4 h-fit mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">Logistics Requests</h3>
              <button className="flex items-center gap-1 text-gray-500 border px-2 py-1 rounded-md text-xs">
                <span>▼</span>
              </button>
            </div>
            <hr className="mb-2" />
            <ul className="flex flex-col gap-2">
              {[
                { name: 'DHL Express', desc: 'International Freight', count: 12, logo: '/rentavatar.png' },
                { name: 'FedEx Logistics', desc: 'Air Cargo', count: 18, logo: '/rentavatar1.png' },
                { name: 'Maersk Line', desc: 'Container Shipping', count: 22, logo: '/rentavatar2.png' },
                { name: 'Union Pacific', desc: 'Rail Freight', count: 9, logo: '/rentavatar3.png' },
                { name: 'Blue Dart', desc: 'Domestic Express', count: 15, logo: '/rentavatar4.png' },
                { name: 'Kuehne+Nagel', desc: 'Global Logistics', count: 27, logo: '/rentavatar5.png' },
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
