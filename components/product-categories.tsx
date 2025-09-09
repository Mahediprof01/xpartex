"use client"

import Link from 'next/link'
import Image from 'next/image'


const categories = [
  {
    name: 'Fabrics & Raw Materials',
    image: '/cat1.jpg',
  },
  {
    name: 'Trims & Accessories',
    image: '/cat2.jpg',
  },
  {
    name: 'Labels & Branding',
    image: '/cat3.jpg',
  },
  {
    name: 'Packaging Materials',
    image: '/cat4.jpg',
  },
  {
    name: 'Decorative Accessories',
    image: '/cat5.jpg',
  },
];

export function ProductCategories() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Product Categories</h2>
          <Link href="/products" className="bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center p-4 relative group transition-all">
              <div className="w-full h-40 flex items-center justify-center mb-3">
                <Image src={cat.image} alt={cat.name} width={180} height={180} className="object-contain max-h-40" />
              </div>
              <div className="font-medium text-base text-center mb-1 truncate w-full" title={cat.name}>{cat.name}</div>
              <button className="absolute bottom-3 right-3 bg-gray-100 hover:bg-sky-100 rounded-full p-2 border border-gray-200 transition-all">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
