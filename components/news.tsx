"use client"

import { useState } from 'react';
import Image from "next/image";

import Link from "next/link";

const featuredNews = {
  id: 1,
  image: "/news1.png",
  title: "China considers yuan-backed stablecoins to boost global currency usage",
  desc: "China is considering allowing the usage of yuan-backed stablecoins for the first time to boost wider adoption of its currency globally, sources familiar...",
  author: "Roni Khan",
  time: "7 hrs ago",
};

const otherNews = [
  {
    id: 2,
    image: "/news2.png",
    title: "Protectionism endangers 'win' from US tariff.",
    desc: "The recently concluded US-Bangladesh tariff talks might have been hailed as a 'position...",
    author: "Roni Khan",
    time: "7 hrs ago",
  },
  {
    id: 3,
    image: "/news3.png",
    title: "Govt to buy potato directly from farmers this year.",
    desc: "The government has decided to procure potatoes directly from farmers this year in...",
    author: "Roni Khan",
    time: "7 hrs ago",
  },
  {
    id: 4,
    image: "/news4.png",
    title: "Investors suffer as RSRM, Aramit, Nurani factories stay shut",
    desc: "Prolonged closure of factories of three listed companies - Ratanpur Steel Re-Rolling Mill...",
    author: "Roni Khan",
    time: "7 hrs ago",
  },
];

const latestUpdates = [
  {
    id: 5,
    image: "/news5.png",
    title: "Govt keen to finalise free trade zone decision by Dec",
    time: "7 hrs ago",
    author: "Roni Khan"
  },
  {
    id: 6,
    image: "/news6.png",
    title: "Visa closes US open-banking unit as data fight heats up, source says",
    time: "7 hrs ago",
    author: "Roni Khan"
  },
  {
    id: 7,
    image: "/news7.png",
    title: "Tasty Treat celebrates milestone of 500 outlets",
    time: "7 hrs ago",
    author: "Roni Khan"
  },
  {
    id: 8,
    image: "/news8.png",
    title: "Trump raises pressure on Fed with call for governor to resign",
    time: "7 hrs ago",
    author: "Roni Khan"
  },
  {
    id: 9,
    image: "/news9.png",
    title: "ABB board expands, new leaders elected",
    time: "7 hrs ago",
    author: "Roni Khan"
  },
  {
    id: 10,
    image: "/news10.png",
    title: "Legacy Night' reunion of Notre Dame alumni held",
    time: "7 hrs ago",
    author: "Roni Khan"
  }
];

const popularNews = [...latestUpdates].reverse();

export function News() {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <section className="py-10 ">
      <div className="container mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">News</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Featured News */}
            <Link href={`/news/${featuredNews.id}`} className="block bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{featuredNews.title}</h3>
                <p className="text-gray-600 mb-4">{featuredNews.desc}</p>
                <div className="text-sm text-gray-500">
                  <span>{featuredNews.time}</span> | <span className='font-semibold'>{featuredNews.author}</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image src={featuredNews.image} alt={featuredNews.title} width={500} height={300} className="rounded-lg object-cover w-full h-auto" />
              </div>
            </Link>

            {/* Other News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="block bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                  <Image src={item.image} alt={item.title} width={300} height={180} className="rounded-lg mb-3 object-cover w-full h-32" />
                  <h4 className="font-bold text-md mb-2 text-gray-800 leading-tight">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.desc}</p>
                  <div className="text-sm text-gray-500">
                    <span>{item.time}</span> | <span className='font-semibold'>{item.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex border-b mb-4">
                <button onClick={() => setActiveTab('latest')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'latest' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-500'}`}>
                  Latest Update
                </button>
                <button onClick={() => setActiveTab('popular')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'popular' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-500'}`}>
                  Popular News
                </button>
              </div>
              <div className='max-h-[500px] overflow-y-auto'>
                {(activeTab === 'latest' ? latestUpdates : popularNews).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="flex items-center gap-4 mb-4 hover:bg-gray-50 rounded-md p-1 transition">
                    <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-lg object-cover w-20 h-16" />
                    <div>
                      <h5 className="font-semibold text-sm text-gray-800 leading-tight">{item.title}</h5>
                      <div className="text-xs text-gray-500 mt-1">
                        <span>{item.time}</span> | <span className='font-semibold'>{item.author}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
