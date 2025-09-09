"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import NewsCard from '../../components/news-card/NewsCard';
import FilterSidebar from '../../components/news-card/FilterSidebar';

const newsArticles = [
  {
    id: 1,
    title: "Garment Production is Reshaping the Industry",
    excerpt: "The textile industry has always been about precision, quality, and speed. Today, technological advancements are revolutionizing how garments are produced, from design to delivery.",
    content: "The global textile market has achieved a significant milestone, reaching $1.3 trillion in valuation for 2024...",
    image: "/cloth.jpg",
    category: "Industry Insights",
    author: "Emily Chen",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-15T10:00:00Z",
    readTime: "5 min read",
    trending: true,
    tags: ["market", "growth", "sustainability"]
  },
  {
    id: 2,
    title: "Top 2025 Trends in Sustainable Fashion",
    excerpt: "As environmental consciousness grows, sustainable fashion is taking center stage. From recycled materials to circular fashion models, the industry is embracing eco-friendly practices.",
    content: "A breakthrough in smart textile technology has been announced by leading researchers...",
    image: "/fabric.jpg",
    category: "Sustainability",
    author: "Michael Davis",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-14T14:30:00Z",
    readTime: "7 min read",
    trending: false,
    tags: ["technology", "innovation", "IoT"]
  },
  {
    id: 3,
    title: "New Safety Rules for RMG in Bangladesh",
    excerpt: "Bangladesh's ready-made garment industry is implementing comprehensive safety reforms following international standards and worker welfare initiatives.",
    content: "The sustainable cotton industry has seen remarkable growth this year...",
    image: "/machinary.jpg",
    category: "Regulations",
    author: "Rashida Ahmed",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-13T09:15:00Z",
    readTime: "6 min read",
    trending: true,
    tags: ["sustainability", "cotton", "farming"]
  },
  {
    id: 4,
    title: "Export Orders Jump 15% This Quarter",
    excerpt: "The textile export sector is experiencing significant growth with a 15% increase in orders this quarter, driven by rising global demand and improved production capabilities.",
    content: "The textile industry is embracing artificial intelligence for quality control...",
    image: "/fabric1.jpg",
    category: "Market Analysis",
    author: "David Wilson",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-12T16:45:00Z",
    readTime: "8 min read",
    trending: false,
    tags: ["AI", "quality", "manufacturing"]
  },
  {
    id: 5,
    title: "Digital Tools Transform Fashion Choices",
    excerpt: "Digital transformation is revolutionizing the fashion industry, from virtual fitting rooms to AI-powered design tools, changing how consumers shop and designers create.",
    content: "The world's largest textile trade fair has announced its 2024 schedule...",
    image: "/fiber.jpg",
    category: "Technology",
    author: "Sarah Johnson",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-11T11:20:00Z",
    readTime: "4 min read",
    trending: false,
    tags: ["events", "trade fair", "exhibition"]
  },
  {
    id: 6,
    title: "Smart Warehousing Saves Production Time",
    excerpt: "Automated warehousing solutions are reducing production time by up to 40%, improving efficiency and reducing costs in textile manufacturing operations.",
    content: "The textile industry is undergoing a transformation towards circular economy principles...",
    image: "/machinary1.jpg",
    category: "Logistics",
    author: "Jennifer Kim",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-10T13:00:00Z",
    readTime: "6 min read",
    trending: true,
    tags: ["circular economy", "sustainability", "waste reduction"]
  },
  {
    id: 7,
    title: "EU Enforces Strict Factory Worker Welfare",
    excerpt: "The European Union has introduced stringent regulations to ensure factory worker welfare across its textile supply chain, setting new global standards.",
    content: "New regulations cover fire safety, building structural integrity, electrical safety, and worker training programs...",
    image: "/fiber1.jpg",
    category: "Regulations",
    author: "Thomas Mueller",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-09T15:30:00Z",
    readTime: "7 min read",
    trending: false,
    tags: ["safety", "regulations", "welfare"]
  },
  {
    id: 8,
    title: "Denim Sees Export Surge in Western Markets",
    excerpt: "Denim exports to Western markets have increased by 25% this year, driven by growing demand for premium quality and sustainable denim products.",
    content: "The surge is attributed to innovations in eco-friendly production methods...",
    image: "/fiber2.jpg",
    category: "Market Trends",
    author: "Maria Santos",
    authorImg: "/newsavatar.png",
    publishedAt: "2024-12-08T12:00:00Z",
    readTime: "5 min read",
    trending: false,
    tags: ["denim", "exports", "sustainability"]
  },
];

const categories = [
  "All Articles",
  "Industry Insights", 
  "Sustainability",
  "Regulations",
  "Market Analysis",
  "Technology",
  "Logistics",
  "Market Trends"
];

const trendingTopics = [
  "Garment Production",
  "Sustainable Fashion", 
  "Export Growth",
  "Digital Transformation",
  "Worker Safety"
];

export default function NewsPage() {
  const [searchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [selectedTrending, setSelectedTrending] = useState('');
  const router = useRouter();

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Articles' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container w-full mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">News</h1>
        <p className="text-gray-600">Stay updated with the latest trends and insights in the textile industry</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="">

            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              trendingTopics={trendingTopics}
              selectedTrending={selectedTrending}
              onTrendingChange={setSelectedTrending}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredNews.length} articles
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-base font-medium">Short By:</span>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-300 rounded-sm px-5 py-2 text-base font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 pr-8"
                  style={{ minWidth: 160 }}
                  // Add sorting logic as needed
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L10 12L14 8" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <NewsCard
                key={article.id}
                title={article.title}
                description={article.excerpt}
                imageUrl={article.image}
                date={new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                })}
                author={article.author}
                authorImg={article.authorImg}
                onArrowClick={() => router.push(`/news/${article.id}`)}
              />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
