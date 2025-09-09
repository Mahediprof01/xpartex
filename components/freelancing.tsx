"use client"
import FreelancerCard from './freelance-card/freelancer-card';
import Link from 'next/link';

const freelancers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/jobavatar.png',
    posted: '2 days ago',
    title: 'Web Developer',
    badges: ['Full Stack', 'Remote', '5 Years'],
    rate: '$40/hr',
    location: 'Remote',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '/jobavatar2.png',
    posted: '1 day ago',
    title: 'UI/UX Designer',
    badges: ['Design', 'Remote', '3 Years'],
    rate: '$35/hr',
    location: 'Remote',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar: '/jobavatar3.png',
    posted: '4 days ago',
    title: 'Content Writer',
    badges: ['Writing', 'Remote', '2 Years'],
    rate: '$25/hr',
    location: 'Remote',
  },
  {
    id: 4,
    name: 'Emily Brown',
    avatar: '/jobavatar4.png',
    posted: '3 days ago',
    title: 'SEO Specialist',
    badges: ['SEO', 'Remote', '4 Years'],
    rate: '$30/hr',
    location: 'Remote',
  },
  {
    id: 5,
    name: 'Michael Lee',
    avatar: '/jobavatar5.png',
    posted: '5 days ago',
    title: 'Mobile App Developer',
    badges: ['Mobile', 'Remote', '6 Years'],
    rate: '$50/hr',
    location: 'Remote',
  },
  {
    id: 6,
    name: 'Sara Kim',
    avatar: '/jobavatar6.png',
    posted: '6 days ago',
    title: 'Digital Marketer',
    badges: ['Marketing', 'Remote', '3 Years'],
    rate: '$28/hr',
    location: 'Remote',
  },
  {
    id: 7,
    name: 'Sara Kim',
    avatar: '/jobavatar6.png',
    posted: '6 days ago',
    title: 'Digital Marketer',
    badges: ['Marketing', 'Remote', '3 Years'],
    rate: '$28/hr',
    location: 'Remote',
  },
  {
    id: 8,
    name: 'Sara Kim',
    avatar: '/jobavatar6.png',
    posted: '6 days ago',
    title: 'Digital Marketer',
    badges: ['Marketing', 'Remote', '3 Years'],
    rate: '$28/hr',
    location: 'Remote',
  },
];

export function Freelancing() {
  const tabs = ['All Freelancers', 'Developers', 'Designers', 'Writers', 'Marketers'];

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Freelancing Job</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href="/freelancers"
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
          {freelancers.map((freelancer, idx) => (
            <FreelancerCard key={idx} {...freelancer} />
          ))}
        </div>
      </div>
    </section>
  );
}
