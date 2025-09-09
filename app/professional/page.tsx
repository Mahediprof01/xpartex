"use client";
import React, { useState } from "react";

import ProfessionalCard from "@/components/professional/ProfessionalCard";
import ProfessionalFilterSidebar, { ProfessionalFilterState } from "@/components/professional/ProfessionalFilterSidebar";

const professionals = [
  {
    id: 1,
    name: "Gregory",
    title: "Apparel Merchandiser",
    location: "Dhaka, Bangladesh",
    rating: 4.8,
    experience: 4,
    skills: ["Tech Pack", "Knitwear Sourcing", "Sample Dev", "Fabric testing"],
    verified: true,
    avatar: '/proavatar.png',
  },
  {
    id: 2,
    name: "Ayesha Rahman",
    title: "Textile Engineer",
    location: "Chittagong, Bangladesh",
    rating: 4.7,
    experience: 6,
    skills: ["Fabric Analysis", "Process Optimization", "Dyeing"],
    verified: false,
    avatar: '/proavatar.png',
  },
  {
    id: 3,
    name: "John Smith",
    title: "Production Supervisor",
    location: "Karachi, Pakistan",
    rating: 4.6,
    experience: 5,
    skills: ["Production Planning", "Team Management", "Lean Manufacturing"],
    verified: true,
    avatar: '/proavatar.png',
  },
  {
    id: 4,
    name: "Priya Sharma",
    title: "Quality Controller",
    location: "Mumbai, India",
    rating: 4.9,
    experience: 7,
    skills: ["Quality Control", "Inspection", "Reporting"],
    verified: true,
    avatar: '/proavatar.png',
  },
];


const initialFilters: ProfessionalFilterState = {
  location: [],
  profileType: [],
  industry: [],
  rating: [],
  verification: [],
};



export default function ProfessionalPage() {
  const [search] = useState("");
  const [filters, setFilters] = useState<ProfessionalFilterState>(initialFilters);
  const [sortBy, setSortBy] = useState("Recently Added");

  // Filtering logic for sidebar filters
  let filtered = professionals.filter(p => {
    // Location
    const locationMatch = filters.location.length === 0 || filters.location.includes(p.location.split(",")[1]?.trim() || p.location) || filters.location.includes(p.location);
    // Profile Type (not in demo data, so always true)
    // Industry (not in demo data, so always true)
    // Rating
    const ratingMatch = filters.rating.length === 0 || filters.rating.includes(Math.round(p.rating) + " Star");
    // Verification
    const verificationMatch = filters.verification.length === 0 || (filters.verification.includes("Verified Only") ? p.verified : true);
    // Search
    const searchMatch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return locationMatch && ratingMatch && verificationMatch && searchMatch;
  });

  // Sorting logic
  if (sortBy === "Rating: High to Low") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Rating: Low to High") {
    filtered = [...filtered].sort((a, b) => a.rating - b.rating);
  } else if (sortBy === "Name: A-Z") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Name: Z-A") {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`hidden lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <ProfessionalFilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </div>
          {/* Professionals Grid */}
          <div className="flex-1">
            {/* Sort By Dropdown */}
            <div className="flex items-center justify-end mb-6">
              <label className="mr-3 text-lg text-gray-500 font-medium">Sort By:</label>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-200 rounded-sm px-5 py-2 text-base font-semibold text-gray-900 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-200 bg-white"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ minWidth: 180 }}
                >
                  <option>Recently Added</option>
                  <option>Rating: High to Low</option>
                  <option>Rating: Low to High</option>
                  <option>Name: A-Z</option>
                  <option>Name: Z-A</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => (
                <ProfessionalCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  title={p.title}
                  location={p.location}
                  rating={p.rating}
                  experience={p.experience + " Years"}
                  avatar={p.avatar}
                  tags={p.skills}
                  reviews={undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
