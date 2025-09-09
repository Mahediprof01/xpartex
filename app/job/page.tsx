"use client"
import JobCard from '@/components/job-card/JobCard';
import JobFilterSidebar from '@/components/job-filters/JobFilterSidebar';
import { useState } from 'react'

export default function JobPage() {
  const [showFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: ["Bangladesh"],
    jobType: ["Full-time", "Part-time"],
    jobCategory: ["Merchandising"],
    experienceLevel: ["Entry Level (0-2 years)"],
    postingDate: ["Last 24 Hours"],
    priceRange: 200,
  });

  // Mock jobs data for demo
  const jobs = [
    {
      id: 1,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
    {
      id: 2,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
    {
      id: 3,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
    {
      id: 4,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
    {
      id: 5,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
    {
      id: 6,
      company: 'Shein Logistics',
      logo: '/jobavatar.png',
      posted: '3 days ago',
      title: 'Delivery Rider (Bike)',
      badges: ['Full Time', 'On Site', '3 Years'],
      salary: '$250-$300',
      location: 'Guangzhou, China',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-28">
              <JobFilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} id={job.id} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
