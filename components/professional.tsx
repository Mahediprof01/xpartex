'use client'
import React from 'react';
import Link from 'next/link';

import ProfessionalCard from './professional/ProfessionalCard';

const professionals = [
  {
    id: 1,
    name: 'Sarah Khan',
    title: 'Apparel Merchandiser',
    location: 'Dhaka, Bangladesh',
    rating: 4.8,
    experience: '5 Years',
    avatar: '/proavatar.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 2,
    name: 'Chen Wei',
    title: 'Fabric Sourcing Agent',
    location: 'Guangzhou, China',
    rating: 4.8,
    experience: '5 Years',
    avatar: '/proavatar.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 3,
    name: 'Mohammed Farid',
    title: 'Garment Technical',
    location: 'Gazipur, Bangladesh',
    rating: 4.8,
    experience: '3 Year',
    avatar: '/proavatar.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 4,
    name: 'Priya Mehra',
    title: 'Fashion Designer',
    location: 'Mumbai, India',
    rating: 4.6,
    experience: '5 Years',
    avatar: '/proavatar.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
    reviews: 100,
  },
];

export function Professional() {
  const tabs = [
    'All Connections',
    'Suppliers',
    'Designers',
    'Agencies',
    'Communities',
  ];
  return (
    <section className="py-10">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Professional Connection</h2>
          <div className="flex gap-8 border-0 bg-transparent">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/professional"
                className="relative bg-transparent border-none outline-none px-2 py-1 text-base font-medium transition-colors duration-200 text-gray-700 hover:text-sky-600"
                style={{ background: 'none', textDecoration: 'none' }}
              >
                <span className="relative inline-block">
                  {tab}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {professionals.map((pro) => (
            <ProfessionalCard key={pro.id} {...pro} />
          ))}
        </div>
      </div>
    </section>
  );
}
