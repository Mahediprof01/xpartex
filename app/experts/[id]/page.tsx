"use client";

import Image from "next/image";
import { Star, Bookmark, Share2 } from "lucide-react";

const freelancerData = {
  id: 1,
  name: "Jack Hayes",
  title: "Pattern Maker",
  location: "San Francisco, USA",
  rating: 4.7,
  rate: 45,
  avatar: "/expertavatar.png",
  description:
    "I am a skilled Pattern Designer with expertise in creating precise garment patterns for a wide range of apparel. With a strong understanding of fabric behavior, garment fit, and production techniques, I ensure patterns are both technically accurate and production-ready. My experience spans from developing basic blocks to advanced styles, supporting smooth sampling and bulk production. I work closely with designers, merchandisers, and production teams to bring creative ideas into perfectly constructed garments.",
  keyAchievements: [
    "Successfully created 1,000+ garment patterns across menswear, womenswear, and kidswear.",
    "Reduced fabric wastage by 15% through efficient marker planning.",
    "Collaborated with international brands to deliver export-quality patterns.",
    "Developed digital patterns using CAD software for faster sampling and production.",
    "Trained junior pattern makers, improving overall team productivity.",
  ],
  topSkills: ["Pattern Making", "CAD Design", "Marker Planning", "Technical Drawing"],
  experiences: [
    {
      company: "H&M",
      logo: "/hm.jpg",
      role: "Senior Pattern Maker",
      type: "Full Time",
      duration: "Sept 2023 - Aug 2025",
      length: "1 year 11 months",
    },
    {
      company: "PVH",
      logo: "/wp.png",
      role: "Pattern Maker",
      type: "Full Time",
      duration: "Jun 2022 - Aug 2023",
      length: "1 year 2 months",
    },
  ],
  info: {
    location: "Texas, USA",
    memberSince: "Aug, 2025",
    experiences: "3 Years",
    languages: "English, Dutch",
    totalJobs: 2,
  },
};

export default function FreelancerDetailPage() {
  // const params = useParams(); // Currently not used, but available for future dynamic content
  // const id = params.id; // Currently not used, but available for future dynamic content

  // For this redesign, we'll statically render Jack Hayes' data.
  const freelancer = freelancerData;

  return (
    <div className="bg-gray-50/50 min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          Home &gt; Experts &gt; <span className="font-medium text-gray-700">Expert Details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Profile Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Image src={freelancer.avatar} alt={freelancer.name} width={80} height={80} className="rounded-full" />
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold">{freelancer.name}</h1>
                  <p className="text-gray-600 text-lg">{freelancer.title}</p>
                  <div className="mt-3 space-y-2 text-gray-500">
                    <p>Location : <span className="text-gray-700 font-medium">{freelancer.location}</span></p>
                    <div className="flex items-center">
                      <span className="mr-2">Rating :</span>
                      <Star size={18} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-bold text-gray-800">{freelancer.rating}</span>
                      <span className="mx-3 text-gray-300">|</span>
                      <span className="text-lg font-semibold text-gray-800">${freelancer.rate}/hour</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="border border-gray-300 text-gray-800 font-semibold py-2.5 px-8 rounded-lg hover:bg-gray-50 transition-all">Connect</button>
                <button className="bg-cyan-400 text-white font-bold py-2.5 px-10 rounded-lg hover:bg-cyan-500 transition-all">Hire Now</button>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm">
              <h2 className="text-xl font-bold mb-3">{freelancer.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{freelancer.description}</p>
              <h3 className="text-lg font-semibold mb-4">Key Achievements:</h3>
              <ul className="space-y-2 mb-6">
                {freelancer.keyAchievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                    <span className="text-gray-600">{ach}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-4">Top Skills</h3>
              <div className="flex flex-wrap gap-3">
                {freelancer.topSkills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-700 font-medium px-4 py-1.5 rounded-md text-sm">{skill}</span>
                ))}
              </div>
            </div>

            {/* Experiences Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Experiences</h2>
              <div className="space-y-6">
                {freelancer.experiences.map((exp, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center border">
                      <Image src={exp.logo} alt={`${exp.company} logo`} width={32} height={32} className="object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{exp.role}</h4>
                      <p className="text-gray-600">{exp.company} &middot; {exp.type}</p>
                      <p className="text-sm text-gray-500">{exp.duration} &middot; {exp.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:sticky top-24">
            <div className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Info</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full border hover:bg-gray-100">
                    <Bookmark size={18} />
                  </button>
                  <button className="p-2 rounded-full border hover:bg-gray-100">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <p className="text-gray-500">Location</p>
                <p className="text-gray-800 font-medium">{freelancer.info.location}</p>
                <p className="text-gray-500">Member Since</p>
                <p className="text-gray-800 font-medium">{freelancer.info.memberSince}</p>
                <p className="text-gray-500">Experiences</p>
                <p className="text-gray-800 font-medium">{freelancer.info.experiences}</p>
                <p className="text-gray-500">Languages</p>
                <p className="text-gray-800 font-medium">{freelancer.info.languages}</p>
                <p className="text-gray-500">Total Jobs</p>
                <p className="text-gray-800 font-medium">{freelancer.info.totalJobs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
