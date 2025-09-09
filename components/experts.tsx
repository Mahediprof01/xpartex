'use client'
import React from 'react';
import Link from 'next/link';
import ExpertCard from './expert-card/ExpertCard';


const experts = [
  {
    id: 1,
    name: 'Rafiul Hasan',
    title: 'Tech Pack Developer',
    location: 'Delhi, India',
    rating: 4.8,
    rate: 85,
    avatar: '/expertavatar.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 2,
    name: 'Li Mei',
    title: 'Fabric Specialist',
    location: 'Guangzhou, China',
    rating: 4.9,
    rate: 75,
    avatar: '/expertavatar2.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 3,
    name: 'Mohammad',
    title: 'Pattern Maker',
    location: 'Soki, Bangladesh',
    rating: 4.7,
    rate: 45,
    avatar: '/expertavatar3.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
  {
    id: 4,
    name: 'Faisal Khan',
    title: 'E-commerce Lister',
    location: 'Lahore, Pakistan',
    rating: 4.8,
    rate: 85,
    avatar: '/expertavatar4.png',
    tags: ['Tech Pack', 'Knitwear Sourcing', 'Sample Dev', 'Fabric testing'],
  },
];

export function Experts() {
  const tabs = [
    'All',
    'Auto Cad Designer',
    'Cutting Master',
    'Pattern',
    'Technition',
  ];
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Hire Experts</h2>
          <div className="flex gap-8 border-0 bg-transparent">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/experts"
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
          {experts.map((exp) => (
            <ExpertCard
              key={exp.id}
              id={exp.id}
              name={exp.name}
              title={exp.title}
              location={exp.location}
              rating={exp.rating}
              rate={exp.rate}
              avatar={exp.avatar}
              tags={exp.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
