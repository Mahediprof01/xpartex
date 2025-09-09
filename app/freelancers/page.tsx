"use client";
import React, { useState } from "react";
import FreelancerCard from "@/components/freelance-card/freelancer-card";
import FreelancerFilterSidebar, { FreelancerFilterState } from '@/components/freelancer-filters/FreelancerFilterSidebar';

const FreelancersPage = () => {
  const [search] = useState("");
  const [showFilters] = useState(false);
  const [filters, setFilters] = useState<FreelancerFilterState>({
    location: [],
    productCategory: [],
    certification: [],
    rating: [],
    verified: [],
  });
  const freelancers = [
    {
      id: 1,
      name: "Rafiul Hasan",
      title: "Tech Pack Developer",
      avatar: '/expertavatar.png',
      location: "Delhi, India",
      rating: 4.8,
      rate: 85,
      skills: ["Tech Pack", "Knitwear Sourcing", "Sample Dev", "Fabric testing"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Pattern Maker",
      avatar: '/expertavatar.png',
      location: "Mumbai, India",
      rating: 4.7,
      rate: 70,
      skills: ["Pattern Making", "CAD", "Sample Dev"],
    },
    {
      id: 3,
      name: "John Lee",
      title: "Sourcing Specialist",
      avatar: '/expertavatar.png',
      location: "Dhaka, Bangladesh",
      rating: 4.9,
      rate: 90,
      skills: ["Supplier Sourcing", "Negotiation", "Fabric testing"],
    },
    {
      id: 4,
      name: "Sara Kim",
      title: "Apparel Designer",
      avatar: "/expertavatar.png",
      location: "Seoul, Korea",
      rating: 4.6,
      rate: 100,
      skills: ["Fashion Design", "Tech Pack", "Sample Dev"],
    },
    {
      id: 5,
      name: "Ahmed Zahir",
      title: "Quality Controller",
      avatar: "/expertavatar.png",
      location: "Cairo, Egypt",
      rating: 4.5,
      rate: 60,
      skills: ["Quality Control", "Fabric testing", "Inspection"],
    },
  ];
  const filtered = freelancers.filter(f => {
    // Location
    const locationMatch = filters.location.length === 0 || filters.location.includes(f.location.split(",")[1]?.trim() || f.location) || filters.location.includes(f.location);
    // Product Category, Certification (not in demo data, so always true)
    // Rating
    const ratingMatch = filters.rating.length === 0 || filters.rating.includes(Math.round(f.rating) + " Star");
    // Verified (not in demo data, so always true)
    // Search
    const searchMatch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase());
    return locationMatch && ratingMatch && searchMatch;
  });

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <FreelancerFilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </div>
          {/* Freelancers Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(f => (
                <FreelancerCard
                  key={f.id}
                  id={f.id}
                  name={f.name}
                  avatar={f.avatar}
                  posted={"Recently"}
                  title={f.title}
                  badges={f.skills}
                  rate={`৳${f.rate}/hour`}
                  location={f.location}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancersPage;
