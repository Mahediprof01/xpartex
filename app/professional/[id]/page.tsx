"use client";
import React from "react";
import Image from "next/image";
import { Star, Bookmark, Share2, MapPin, Clock, Mail, Phone, Globe } from "lucide-react";

const professionalData = {
  id: 99,
  name: "Marvin",
  title: "Loading Helper",
  location: "Dhaka, Bangladesh",
  rating: 4.8,
  tags: ["Tech Pack", "Knitwear Sourcing", "Sample Dev"],
  about:
    "Experienced Garments Technology Leader with over 8 years of expertise in textile manufacturing, pattern development, and quality control systems. Specialized in optimizing production workflows and implementing sustainable manufacturing practices in the ready-made garments industry. Proven track record of leading cross-functional teams, reducing production costs by 15%, and maintaining quality standards that exceed international compliance requirements. Passionate about innovation in textile technology and sustainable fashion manufacturing.",
  languages: ["English", "Bangla", "Hindi"],
  workType: ["Remote", "Hybrid"],
  availability: ["Full-Time", "Part-Time", "Consultant"],
  experience: [
    {
      role: "Senior Garment Technologist",
      company: "ABC Apparels Ltd",
      period: "Jan 2021 - Present",
      duties: [
        "Led a team of 12 in pattern correction and production optimization for denim lines",
        "Implemented quality control systems that reduced defect rates by 25%",
        "Managed technical pack development for 50+ styles per season",
      ],
    },
    {
      role: "Production Manager",
      company: "XYZ Textiles",
      period: "Mar 2019 - Dec 2020",
      duties: [
        "Oversaw daily production operations for 500+ workers",
        "Coordinated with design teams to ensure technical feasibility",
        "Achieved 98% on-time delivery rate for international clients",
      ],
    },
  ],
  profileSummary: {
    location: "Dhaka, Bangladesh",
    time: "Available Full-Time",
  },
  topSkills: ["Quality Control", "Pattern Making", "Production Management", "Knitwear Sourcing"],
  contact: {
    email: "marvinifo@gmail.com",
    phone: "+8801778215098",
    website: "www.infomarvin.com",
  },
  avatar: "/proavatar.png",
};

export default function ProfessionalDetailPage() {
  const prof = professionalData;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-sm text-gray-500 mb-6">
          Home &gt; Professional Connection &gt; <span className="font-semibold text-gray-700">Professional Connection Details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row items-start">
                <Image src={prof.avatar} alt={prof.name} width={80} height={80} className="rounded-full mr-6 mb-4 sm:mb-0" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold">{prof.name}</h1>
                      <p className="text-gray-600">{prof.title}</p>
                      <p className="text-gray-500 text-sm mt-1">Location: {prof.location}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-600 mr-1">Rating:</span>
                        <span className="font-bold text-gray-800 mr-2">{prof.rating}</span>
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="ml-4 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full border hover:bg-gray-100">
                        <Bookmark size={20} />
                      </button>
                      <button className="p-2 rounded-full border hover:bg-gray-100">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <button className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-cyan-600">Connect</button>
                    <button className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-50">Send Message</button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {prof.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-gray-600 mb-6">{prof.about}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {prof.languages.map(lang => <span key={lang} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{lang}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Work Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {prof.workType.map(type => <span key={type} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{type}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {prof.availability.map(avail => <span key={avail} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{avail}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-6">Experience Timeline</h2>
              <div className="relative border-l-2 border-cyan-200">
                {prof.experience.map((exp, index) => (
                  <div key={index} className="mb-8 ml-6">
                    <span className="absolute flex items-center justify-center w-4 h-4 bg-cyan-500 rounded-full -left-2 ring-4 ring-white"></span>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-cyan-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {exp.duties.map((duty, i) => <li key={i}>{duty}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4">Profile Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-3 text-cyan-500" />
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="font-medium text-gray-800">{prof.profileSummary.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-3 text-cyan-500" />
                  <div>
                    <p className="text-sm">Time</p>
                    <p className="font-medium text-gray-800">{prof.profileSummary.time}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold mt-6 mb-3">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {prof.topSkills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={20} className="mr-3 text-cyan-500" />
                  <div>
                    <p className="text-sm">Email</p>
                    <a href={`mailto:${prof.contact.email}`} className="font-medium text-gray-800 hover:underline">{prof.contact.email}</a>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={20} className="mr-3 text-cyan-500" />
                  <div>
                    <p className="text-sm">Phone</p>
                    <p className="font-medium text-gray-800">{prof.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe size={20} className="mr-3 text-cyan-500" />
                  <div>
                    <p className="text-sm">Website</p>
                    <a href={`https://${prof.contact.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:underline">{prof.contact.website}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
