'use client'
import Link from 'next/link';

import EbookCard from './ebook-card/EbookCard';

const ebooks = [
  {
    id: 1,
    title: 'Viktor E. Frankl And The Search For Meaning',
    author: 'Pam Roy, Moira Hummel',
    price: 349,
    oldPrice: 420,
    image: '/ebook2.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    id: 2,
    title: 'Better Small Talk',
    author: 'Patrick King',
    price: 566,
    oldPrice: 620,
    image: '/ebook.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    id: 3,
    title: 'How To Be An Imperfectionist',
    author: 'Stephen Guise',
    price: 650,
    oldPrice: 720,
    image: '/ebook3.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
  {
    id: 4,
    title: 'How We Grow Up : Understanding Adolescence',
    author: 'Matt Richtel',
    price: 349,
    oldPrice: 420,
    image: '/ebook4.png',
    rating: 4.5,
    reviews: 30,
    seller: 'Books House',
  },
];

export function Ebook() {
  const tabs = ['All Products', 'New Arrivals', 'Trending Now', 'Best Sellers', 'Top Rated'];


  return (
    <section className="mt-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">eBooks</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/e-book"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ebooks.map((book, idx) => (
            <EbookCard
              key={idx}
              id={book.id}
              image={book.image}
              title={book.title}
              author={book.author}
              price={book.price}
              rating={book.rating}
              reviews={book.reviews}
              seller={book.seller || 'Books House'}
              oldPrice={book.oldPrice || 420}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
