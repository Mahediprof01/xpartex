"use client";
import React, { useState } from "react";
import RentCard from "@/components/rent-card/RentCard";
import RentFilterSidebar from '@/components/rent-card/RentFilterSidebar';

const rentItems = [
  {
    id: 1,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 2,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 3,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },

  {
    id: 4,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 5,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
  {
    id: 6,
    title: 'Excavator construction machine',
    image: '/rent.png',
    price: 250,
    company: 'King Lease & Rentals, LLC',
    companyLogo: '/companylogorent.png',
    location: 'Vashon Island, Washington',
  },
];


export default function RentPage() {
  const [showFilters] = useState(false);
  const [search] = useState("");
  const [filters, setFilters] = useState({
    location: ["Bangladesh"],
    productCategory: ["Machinery & Equipment"],
    certification: ["OEKO-TEX"],
    rating: ["1 Star"],
    verified: true,
  });
  const [sort, setSort] = useState("high-to-low");

  // Filtering logic placeholder (currently only search is applied)
  let filtered = rentItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "high-to-low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sort === "low-to-high") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div />
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-700">Sort By:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none border border-gray-300 rounded-sm px-4 py-2 font-semibold text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 pr-8 min-w-[180px]"
                style={{ boxShadow: 'none' }}
              >
                <option value="high-to-low">Price High to Low</option>
                <option value="low-to-high">Price Low to High</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <RentFilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>
          {/* Rent Items Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(item => (
                <RentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  company={item.company || "King Lease & Rentals, LLC"}
                  companyLogo={item.companyLogo || "/brex.png"}
                  location={item.location || "Vashon Island, Washington"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
