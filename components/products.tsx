"use client"
import React from 'react';

import Link from 'next/link';
import ProductCard from './product-card/ProductCard';

const products = [
  {
    id: 1,
    title: 'Cotton Fabric Green Floral Rose',
    image: '/productsimg.jpg',
    price: 150,
    rating: 4.5,
    reviews: 30,
  },
  {
    id: 2,
    title: 'Belleva Faux Leather Jacket',
    image: '/products1.png',
    price: 250,
    rating: 4.8,
    reviews: 40,
  },
  {
    id: 3,
    title: 'AK TRADING CO. Muslin Fabric',
    image: '/products2.jpg',
    price: 350,
    rating: 5.0,
    reviews: 50,
    new: true,
  },
  {
    id: 4,
    title: 'Fat Quarters Fabric Bundles',
    image: '/products3.jpg',
    price: 120,
    rating: 4.0,
    reviews: 20,
  },
  {
    id: 5,
    title: 'Textured background soil',
    image: '/products4.jpg',
    price: 150,
    rating: 5.0,
    reviews: 60,
  },
  {
    id: 6,
    title: 'Dreamlover Wig Band, Elastic',
    image: '/products5.jpg',
    price: 150,
    rating: 4.5,
    reviews: 30,
  },
  {
    id: 7,
    title: 'Snap Fastener Tool Snap Too',
    image: '/products6.jpg',
    price: 250,
    rating: 4.8,
    reviews: 40,
  },
  {
    id: 8,
    title: 'White Price Tags with String',
    image: '/products7.jpg',
    price: 350,
    rating: 5.0,
    reviews: 50,
  },
  {
    id: 9,
    title: 'Dry & Dry Blue (Indicating Silica Gel)',
    image: '/products8.jpg',
    price: 120,
    rating: 4.0,
    reviews: 20,
  },
  {
    id: 10,
    title: 'Rollo Direct Thermal Barcode Labels',
    image: '/products9.jpg',
    price: 150,
    rating: 5.0,
    reviews: 60,
  },
];

const filters = [
  'All Products',
  'New Arrivals',
  'Trending Now',
  'Best Sellers',
  'Top Rated',
];

export function Products() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Products</h2>
          <div className="flex gap-8 border-0 bg-transparent">
            {filters.map((filter) => (
              <Link
                key={filter}
                href="/products"
                className="relative bg-transparent border-none outline-none px-2 py-1 text-base font-medium transition-colors duration-200 text-gray-700 hover:text-sky-600"
                style={{ background: 'none', textDecoration: 'none' }}
              >
                <span className="relative inline-block">
                  {filter}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
