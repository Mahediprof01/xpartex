"use client";
import { useState } from "react";


import FilterSidebar from "@/components/ebook-card/FilterSidebar";
import EbookCard from "@/components/ebook-card/EbookCard";

const ebooks = [
  {
    id: 1,
    title: "Textile Manufacturing Excellence",
    image: '/ebook.png',
    author: "Dr. Maria Santos",
    rating: 4.9,
    pages: 256,
    category: "Manufacturing",
    price: 29.99,
    description: "Comprehensive guide to modern textile manufacturing processes and quality control.",
  },
  {
    id: 2,
    title: "Sustainable Fashion Design",
    image: '/ebook.png',
    author: "Emily Green",
    rating: 4.8,
    pages: 192,
    category: "Design",
    price: 24.99,
    description: "Learn sustainable practices in fashion design and eco-friendly materials.",
  },
  {
    id: 3,
    title: "Fabric Science and Technology",
    image: '/ebook.png',
    author: "Prof. John Mitchell",
    rating: 4.7,
    pages: 320,
    category: "Technology",
    price: 34.99,
    description: "Advanced study of fabric properties, testing methods, and innovations.",
  },
  {
    id: 4,
    title: "Pattern Making Mastery",
    image: '/ebook.png',
    author: "Sarah Chen",
    rating: 4.9,
    pages: 280,
    category: "Design",
    price: 31.99,
    description: "Master the art of pattern making with traditional and digital techniques.",
  },
  {
    id: 5,
    title: "Textile Dyeing Techniques",
    image: '/ebook.png',
    author: "Ahmed Hassan",
    rating: 4.6,
    pages: 224,
    category: "Manufacturing",
    price: 27.99,
    description: "Complete guide to natural and synthetic dyeing methods for textiles.",
  },
  {
    id: 6,
    title: "Fashion Business Strategy",
    image: '/ebook.png',
    author: "Lisa Rodriguez",
    rating: 4.8,
    pages: 198,
    category: "Business",
    price: 26.99,
    description: "Strategic insights for building and scaling fashion businesses globally.",
  },
  {
    id: 7,
    title: "Smart Textiles and Wearables",
    image: '/ebook.png',
    author: "Dr. Kevin Wang",
    rating: 4.7,
    pages: 312,
    category: "Technology",
    price: 39.99,
    description: "Explore the future of textiles with smart fabrics and wearable technology.",
  },
  {
    id: 8,
    title: "Textile Quality Control",
    image: '/ebook.png',
    author: "Anna Kowalski",
    rating: 4.5,
    pages: 176,
    category: "Manufacturing",
    price: 22.99,
    description: "Essential methods for ensuring textile quality and compliance standards.",
  },
];


const allCategories = Array.from(new Set(ebooks.map(e => e.category)));
const allTrendingTopics = [
  "New Arrivals",
  "Trending",
  "Best Seller",
  "Top Rated",
  "On Sale"
];


export default function EBookPage() {
  const [search] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTrending, setSelectedTrending] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Price High to Low");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    "Price High to Low",
    "Price Low to High",
    "Rating High to Low",
    "Rating Low to High"
  ];

  let filtered = ebooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    const matchesTrending = selectedTrending ? (
      book.title.toLowerCase().includes(selectedTrending.toLowerCase()) ||
      book.category.toLowerCase().includes(selectedTrending.toLowerCase()) ||
      book.description.toLowerCase().includes(selectedTrending.toLowerCase())
    ) : true;
    return matchesSearch && matchesCategory && matchesTrending;
  });

  // Sorting logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "Price High to Low") return b.price - a.price;
    if (sortBy === "Price Low to High") return a.price - b.price;
    if (sortBy === "Rating High to Low") return b.rating - a.rating;
    if (sortBy === "Rating Low to High") return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Book Library</h1>
          <p className="text-gray-600">Discover comprehensive guides and resources for textile professionals</p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <button
            className="border border-gray-200 rounded-md px-4 py-2 text-sm flex items-center gap-2 lg:hidden"
            onClick={() => setShowFilters((v) => !v)}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M9 12h6m-7 6h8"/>
            </svg>
            Filters
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-gray-500 text-base font-medium">Short By:</span>
            <div className="relative">
              <button
                className="border border-gray-300 rounded-sm px-5 py-2 text-base font-semibold text-black bg-white flex items-center gap-2 min-w-[200px] shadow-sm hover:border-sky-400 transition-all"
                onClick={() => setShowSortDropdown((v) => !v)}
                type="button"
                id="sortDropdownBtn"
              >
                {sortBy}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {/* Dropdown */}
              {showSortDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                  {sortOptions.map(option => (
                    <button
                      key={option}
                      className={`block w-full text-left px-5 py-2 text-base font-medium hover:bg-sky-50 ${sortBy === option ? 'text-sky-600' : 'text-black'}`}
                      onClick={() => { setSortBy(option); setShowSortDropdown(false); }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <FilterSidebar
                categories={allCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                trendingTopics={allTrendingTopics}
                selectedTrending={selectedTrending}
                onTrendingChange={(topic) => setSelectedTrending(topic === selectedTrending ? "" : topic)}
              />
            </div>
          </div>

          {/* E-Books Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600 text-sm">
              Showing {filtered.length} of {ebooks.length} e-books
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((book) => (
                <div key={book.id}>
                  <EbookCard
                    id={book.id}
                    image={book.image}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    rating={book.rating}
                    reviews={30}
                    seller={"Books House"}
                  />
                </div>
              ))}
            </div>
            
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No e-books found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
