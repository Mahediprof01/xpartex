"use client"

import LearningCard from "./online-learning/Card";
import Link from "next/link";

const courses = [
  {
    id: 1,
    image: "/learning2.jpg",
    title: "Mastering Advanced Pattern Making Techniques for Modern Textile Design",
    subtitle: "Phil Ebiner, Sam Shimizu Jones",
    rating: 4.9,
    price: 1799,
    oldPrice: 2499,
    duration: "4h 50min"
  },
  {
    id: 2,
    image: "/learning.jpg",
    title: "Effective Garment Production and Design",
    subtitle: "Phil Ebiner, Sam Shimizu Jones",
    rating: 4.9,
    price: 1700,
    oldPrice: 2499,
    duration: "4h 50min"
  },
  {
    id: 3,
    image: "/learning3.jpg",
    title: "Complete Tech Pack Creation for Fashion",
    subtitle: "Phil Ebiner, Sam Shimizu Jones",
    rating: 4.8,
    price: 2100,
    oldPrice: 2499,
    duration: "3h 50min"
  },
  {
    id: 4,
    image: "/learning4.jpg",
    title: "Apparel Merchandising: From Sample",
    subtitle: "Phil Ebiner, Sam Shimizu Jones",
    rating: 4.9,
    price: 2300,
    oldPrice: 2499,
    duration: "4h 50min"
  },
  {
    id: 5,
    image: "/learning5.jpg",
    title: "Garment Quality Process & Inspection",
    subtitle: "Phil Ebiner, Sam Shimizu Jones",
    rating: 4.7,
    price: 1899,
    oldPrice: 2499,
    duration: "3h 50min"
  },
];

export function Learning() {
  const tabs = ["All Courses", "Sewing", "Design", "Merch", "Tech Pack"];


  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Online Courses</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/online-learning"
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
        <div className="lg:flex gap-6 items-stretch">
          {/* Featured Card */}
          <div className="w-full lg:max-w-[520px] flex-shrink-0 flex flex-col h-full">
            <LearningCard
              {...courses[0]}
              className="h-full min-h-0 flex-1"
              largeImage={true}
              // onBuy removed: navigation handled by <a> now
            />
          </div>
          {/* 2x2 Grid for other cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 self-stretch content-stretch" style={{height: '100%'}}>
            {courses.slice(1, 5).map((course, idx) => (
              <LearningCard
                key={idx}
                {...course}
                // onBuy removed: navigation handled by <a> now
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
