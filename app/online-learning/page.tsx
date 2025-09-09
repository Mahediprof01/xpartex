"use client";
import { useState } from "react";
import Card from "../../components/online-learning/Card";
import FilterSidebar from "../../components/online-learning/FilterSidebar";

const courses = [
  {
    id: 1,
    title: "Garment Production",
    image: "/learning.jpg",
    instructor: "Carlos Mendoza",
    rating: 4.9,
    duration: "5h 10m",
  },
  {
    id: 2,
    title: "Textile Quality Control",
    image: "/learning.jpg",
    instructor: "Ayesha Rahman",
    rating: 4.8,
    duration: "3h 45m",
  },
  {
    id: 3,
    title: "Fashion Design Basics",
    image: "/learning.jpg",
    instructor: "Priya Sharma",
    rating: 4.7,
    duration: "4h 20m",
  },
  {
    id: 4,
    title: "Supply Chain Management",
    image: "/learning.jpg",
    instructor: "John Smith",
    rating: 4.6,
    duration: "6h 00m",
  },
];


// const allInstructors = Array.from(new Set(courses.map(c => c.instructor)));
// const allDurations = ["< 4h", "4-5h", "> 5h"];

export default function OnlineLearningPage() {
  const [search] = useState("");
  const [selectedInstructor] = useState("");
  const [selectedDuration] = useState("");
  const [showFilters] = useState(false);

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesInstructor = selectedInstructor ? c.instructor === selectedInstructor : true;
    const matchesDuration = selectedDuration
      ? (selectedDuration === "< 4h" && parseInt(c.duration) < 4) ||
        (selectedDuration === "4-5h" && parseInt(c.duration) >= 4 && parseInt(c.duration) <= 5) ||
        (selectedDuration === "> 5h" && parseInt(c.duration) > 5)
      : true;
    return matchesSearch && matchesInstructor && matchesDuration;
  });

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container w-full mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <FilterSidebar
                categories={["Garments", "Textile Design", "Software Training", "Safety & Compliance", "Production Management", "Pattern Development", "Other"]}
                selectedCategories={[]}
                onCategoryChange={() => {}}
                skillLevels={["Beginner", "Intermediate", "Advanced"]}
                selectedSkill={"Beginner"}
                onSkillChange={() => {}}
                languages={["English", "Bangla", "Hindi", "Other"]}
                selectedLanguage={"English"}
                onLanguageChange={() => {}}
                durations={["Short", "Medium", "Long"]}
                selectedDuration={"Short"}
                onDurationChange={() => {}}
                priceRange={[100, 800]}
                selectedPrice={[100, 800]}
                onPriceChange={() => {}}
              />
            </div>
          </div>
          {/* Sort By Dropdown */}
          <div className="flex-1">
            <div className="flex items-center justify-end mb-6">
              <label className="text-lg font-medium text-gray-700 mr-3">Sort By:</label>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-300 rounded-sm px-5 py-2 text-base font-semibold text-gray-900 bg-white pr-8 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  defaultValue="popular"
                >
                  <option value="popular">Most Popular</option>
                  <option value="latest">Latest</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filtered.map((course) => (
                <Card
                  key={course.id}
                  id={course.id}
                  image={course.image}
                  title={course.title}
                  subtitle={course.instructor}
                  rating={course.rating}
                  price={0}
                  oldPrice={0}
                  duration={course.duration}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
