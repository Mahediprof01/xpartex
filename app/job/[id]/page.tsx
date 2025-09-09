"use client";
import { useParams } from "next/navigation";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    company: "Shein Logistics",
    logo: "", 
    posted: "3 days ago",
    title: "Delivery Rider (Bike)",
    salary: "$250-$300",
    location: "Guangzhou, China",
    jobType: "Full Time",
    education: "Minimum A level",
    experience: "Min. 1 year",
    description: "We are seeking reliable and responsible Delivery Riders to join Shein Logistics. The rider will be responsible for delivering packages safely, on time, and maintaining excellent customer service.",
    responsibilities: [
      "Safely deliver parcels to customers within assigned routes.",
      "Ensure timely and accurate deliveries.",
      "Collect payments or obtain delivery confirmations where required.",
      "Follow traffic rules and company safety guidelines.",
      "Handle packages with care and professionalism.",
      "Report any delivery issues or delays to the supervisor."
    ],
    requirements: [
      "Valid driving license for motorbikes.",
      "Minimum 1 years of riding experience (can be adjusted).",
      "Age at least 19 years.",
      "Previous delivery experience is a plus.",
      "Strong knowledge of local areas and routes."
    ],
    skills: ["Bike Riding", "Navigation", "Area Awareness", "Time Management", "Communication"],
    assets: ["Motorbike", "Safety Gear"],
    logoType: "letter",
    deadline: "23 Aug, 2025",
  },
  {
    id: 2,
    company: "H&M Sourcing",
    logo: "/hm.jpg",
    posted: "1 day ago",
    title: "Merchandiser (Knit)",
    salary: "$300-$350",
    location: "Dhaka, Bangladesh",
    jobType: "Full Time",
    education: "Bachelor's Degree",
    experience: "2+ years",
    description: "Coordinate with suppliers and buyers for knitwear merchandising. Ensure timely delivery and quality.",
    responsibilities: [
        "Manage the full merchandising cycle from development to shipment.",
        "Communicate with buyers and suppliers to ensure requirements are met.",
        "Negotiate prices and timelines.",
        "Monitor production status and ensure on-time delivery.",
    ],
    requirements: [
      "Bachelor's degree in relevant field",
      "2+ years merchandising experience",
      "Strong communication skills",
      "Knowledge of knitwear production.",
    ],
    skills: ["Merchandising", "Negotiation", "Communication", "Supply Chain"],
    assets: ["Laptop"],
    logoType: "image",
    deadline: "28 Aug, 2025",
  },
];

export default function JobDetailPage() {
  const params = useParams();
  let id = undefined;
  if (typeof params === 'object' && params !== null && 'id' in params) {
    if (typeof params.id === 'string') {
      id = params.id;
    } else if (Array.isArray(params.id)) {
      id = params.id[0];
    }
  }
  const job = jobs.find((j) => String(j.id) === id);
  if (!job) return <div className="text-center py-20 text-2xl">Job not found</div>;

  return (
    <div className=" bg-gray-50/50 min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span>Home</span>
          <span className="text-gray-300">&gt;</span>
          <span>Job Circular</span>
          <span className="text-gray-300">&gt;</span>
          <span className="text-gray-800 font-medium">Job Details</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-md bg-black flex items-center justify-center overflow-hidden text-white font-bold text-2xl">
                {job.logoType === "image" && job.logo ? (
                  <Image src={job.logo} alt={job.company} width={48} height={48} className="object-contain w-12 h-12" />
                ) : (
                  job.company[0]
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-lg leading-tight">{job.company}</div>
                <div className="text-sm text-gray-400">{job.posted}</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{job.title}</h1>
            
            {/* Meta Card */}
            <div className="bg-[#fafbfc] border border-gray-200 rounded-xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 mb-8">
              <div className="col-span-2 md:col-span-4">
                <div className="text-xl font-semibold text-gray-800">{job.salary} <span className="text-base font-normal text-gray-400">/ Monthly</span></div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.27 2.27 0 01-2.27 2.27H5.99a2.27 2.27 0 01-2.27-2.27v-4.07a2.27 2.27 0 012.27-2.27h1.91v-2.19a2.27 2.27 0 012.27-2.27h3.82a2.27 2.27 0 012.27 2.27v2.19h1.91a2.27 2.27 0 012.27 2.27z" /></svg>
                {job.jobType}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.002-.018.002-.006.001a50.57 50.57 0 00-2.299 2.299c.896.248 1.783.52 2.658.814m15.482 0l.07.002.018.002.006.001a50.57 50.57 0 002.299 2.299c-.896.248-1.783.52-2.658.814m0 0l-2.299 2.299m0 0l-2.299-2.299m0 0l2.299 2.299" /></svg>
                {job.education}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {job.experience}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-2 text-gray-800">Job Description</h2>
              <p className="text-gray-600 text-base">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-3 text-gray-800">Responsibilities</h2>
              <ul className="list-none pl-0 text-gray-600 text-base space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[9px] w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-3 text-gray-800">Requirements</h2>
              <ul className="list-none pl-0 text-gray-600 text-base space-y-2">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[9px] w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-3 text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, i) => (
                  <span key={i} className="bg-[#f3f7fa] text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200">{skill}</span>
                ))}
              </div>
            </div>

            {/* Assets */}
            <div>
              <h2 className="font-semibold text-xl mb-3 text-gray-800">Assets</h2>
              <div className="flex flex-wrap gap-3">
                {job.assets.map((asset, i) => (
                  <span key={i} className="bg-[#f3f7fa] text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200">{asset}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg text-gray-800">Job Actions</span>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Bookmark">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Share">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
                  </button>
                </div>
              </div>
              <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-full text-base transition-colors">Apply Now</button>
              <div className="flex flex-col gap-1 mt-2 text-center">
                <span className="text-sm text-gray-400">Deadline</span>
                <span className="text-base font-medium text-red-500">{job.deadline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}