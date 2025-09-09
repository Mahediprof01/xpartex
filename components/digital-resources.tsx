'use client'
import { useState } from 'react';
import DigitalCard from './digital-card/Digitalcard';
import { useRouter } from 'next/navigation';

const digitals = [
  {
    title: 'Viktor E. Frankl And The Search For Meaning',
    author: 'Pam Roy, Moira Hummel',
    price: 349,
    oldPrice: 420,
  image: '/digital2.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    title: 'Better Small Talk',
    author: 'Patrick King',
    price: 566,
    oldPrice: 620,
  image: '/digital3.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    title: 'How To Be An Imperfectionist',
    author: 'Stephen Guise',
    price: 650,
    oldPrice: 720,
  image: '/digital4.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    title: 'How We Grow Up : Understanding Adolescence',
    author: 'Matt Richtel',
    price: 349,
    oldPrice: 420,
  image: '/digital5.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
];

export function DigitalResources() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['All Products', 'New Arrivals', 'Trending Now', 'Best Sellers', 'Top Rated'];
  const router = useRouter();

  // Helper to get digital id for navigation (simulate by index+1)
  const getDigitalId = (idx: number) => idx + 1;

  return (
    <section className="mt-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Digital Resources</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {digitals.map((item, idx) => (
            <DigitalCard
              key={idx}
              image={item.image}
              title={item.title}
              author={item.author}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
              oldPrice={item.oldPrice || 420}
              onBuy={() => router.push(`/digital/${getDigitalId(idx)}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
