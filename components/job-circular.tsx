"use client"

import JobCard from './job-card/JobCard';
import Link from 'next/link';
const jobs = [
  {
    id: 1,
    company: 'Shein Logistics',
    logo: '/jobavatar.png',
    posted: '3 days ago',
    title: 'Delivery Rider (Bike)',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '250-300',
    location: 'Guangzhou, China',
  },
  {
    id: 2,
    company: 'Amazon',
    logo: '/jobavatar2.png',
    posted: '5 days ago',
    title: 'Logistics Coordinator',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '550-600',
    location: 'Dubai, UAE',
  },
  {
    id: 3,
    company: 'Zara Manufacturing',
    logo: '/jobavatar3.png',
    posted: '3 days ago',
    title: 'Fleet Manager',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '250-300',
    location: 'Barcelona, Spain',
  },
  {
    id: 4,
    company: 'H&M Supply Chain',
    logo: '/jobavatar4.png',
    posted: '7 days ago',
    title: 'Warehouse In-Charge',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '150-200',
    location: 'Helsingborg, Sweden',
  },
  {
    id: 5,
    company: 'DHL Express',
    logo: '/jobavatar5.png',
    posted: '3 days ago',
    title: 'Routing Officer',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '250-300',
    location: 'Frankfurt, Germany',
  },
  {
    id: 6,
    company: 'Uniqlo Production',
    logo: '/jobavatar6.png',
    posted: '6 days ago',
    title: 'Vehicle Maintenance',
    badges: ['Full Time', 'On Site', '3 Years'],
    salary: '200-300',
    location: 'Osaka, Japan',
  },
];

export function JobCircular() {
  const tabs = ['All Jobs', 'Manager', 'Operator', 'Merchandiser', 'Pattern'];

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Job Portal</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/job"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <JobCard key={idx} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
