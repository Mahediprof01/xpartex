"use client";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Advanced Pattern Making for Textile Design",
    image: "/learning2.jpg",
    instructor: {
      name: "Sarah Edwards",
      avatar: "/instructor-sarah.jpg",
    },
    rating: 4.8,
    reviews: 88,
    price: 20,
    tags: ["#TextileDesign", "#PatternMaking", "#Advanced"],
    overview:
      "Master the art of advanced pattern making for textile design. Learn industry-verified techniques and tools used by professional designers.",
    description:
      "This comprehensive course will take you through the fundamentals of pattern making for textile design. You'll learn how to create precise, industry-standard patterns that can be used in professional textile manufacturing. Whether you're a beginner looking to enter the textile industry or an experienced designer wanting to refine your skills, this course provides practical hands-on experience with the tools and techniques used by professionals worldwide. By the end of this course, you'll have a portfolio of patterns and the confidence to tackle complex design challenges in the textile industry. You'll also understand the business side of pattern making and how to price your work appropriately.",
    learn: [
      "Creating precise patterns",
      "Understanding sizing charts",
      "Color theory for textiles",
      "Quality control methods",
      "Working with textile software",
      "Industry-standard design formats",
      "Pattern scaling techniques",
      "Business aspects of pattern making",
    ],
    curriculum: [
      {
        module: "Module 1: Introduction",
        content:
          "Explore the fundamentals of advanced pattern making in textile design, covering tools, techniques, and creative foundations for innovative fabrics.",
      },
      {
        module: "Module 2: Tools & Materials",
        content:
          "Learn about essential tools and materials used in professional pattern making, including software tools and traditional methods.",
      },
      {
        module: "Module 3: Advanced Techniques",
        content:
          "Master advanced pattern making techniques including grading, digitization, and optimization for different fabric types.",
      },
      {
        module: "Module 4: Real-world Application",
        content:
          "Apply your skills to real-world projects and build a professional portfolio of pattern designs.",
      },
    ],
    info: {
      duration: "8 weeks",
      skill: "Intermediate",
      language: "English",
      certificate: "Yes",
    },
    related: [
      {
        id: 2,
        title: "Digital Design Fundamentals",
        instructor: "Mike Johnson",
        duration: "6 weeks",
        image: "/course-digital.jpg",
      },
      {
        id: 3,
        title: "Textile Manufacturing",
        instructor: "Emily Chen",
        duration: "10 weeks",
        image: "/course-manufacturing.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Digital Design Fundamentals",
    image: "/course-digital.jpg",
    instructor: {
      name: "Mike Johnson",
      avatar: "/instructor-mike.jpg",
    },
    rating: 4.7,
    reviews: 65,
    price: 15,
    tags: ["#DigitalDesign", "#Fundamentals", "#Beginner"],
    overview:
      "Learn the basics of digital design for textiles with modern tools and techniques.",
    description:
      "This course introduces you to the world of digital textile design, covering fundamental concepts and practical applications using industry-standard software.",
    learn: [
      "Digital design principles",
      "Software proficiency",
      "Color theory",
      "Pattern creation",
    ],
    curriculum: [
      {
        module: "Module 1: Basics",
        content: "Introduction to digital design concepts and tools.",
      },
      {
        module: "Module 2: Software Training",
        content: "Hands-on training with design software.",
      },
    ],
    info: {
      duration: "6 weeks",
      skill: "Beginner",
      language: "English",
      certificate: "Yes",
    },
    related: [
      {
        id: 1,
        title: "Advanced Pattern Making for Textile Design",
        instructor: "Sarah Edwards",
        duration: "8 weeks",
        image: "/course-pattern.jpg",
      },
    ],
  },
];

export default function CourseDetail() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const course = courses.find((c) => c.id === courseId) || courses[0];

  return (
    <div className="container w-full mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
        <span>Home</span>
        <span className="mx-1">/</span>
        <span>Online Learning</span>
        <span className="mx-1">/</span>
        <span className="text-gray-700 font-semibold">Learning View Details</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Video/Image */}
          <div className="rounded-2xl overflow-hidden mb-4 relative" style={{height:'260px'}}>
            <Image src={course.image} alt={course.title} width={400} height={260} className="w-full h-[260px] object-cover" />
            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-md">
              <svg width="36" height="36" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="9.5,7.5 16.5,12 9.5,16.5" fill="#19C3E7"/>
              </svg>
            </button>
          </div>
          
          {/* Overview */}
          <div className="mb-6">
            <div className="font-semibold text-xl mb-2">Learning Overview</div>
            <div className="text-gray-700 text-[15px] mb-2">{course.description}</div>
          </div>
          
          {/* What You'll Learn */}
          <div className="mb-6">
            <div className="font-semibold text-xl mb-2">What You&apos;ll Learn</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {course.learn.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[15px] text-gray-700">
                  <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="9" cy="12" r="8"/>
                    <path d="M5 12l4 4L19 7"/>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Curriculum */}
          <div className="mb-6">
            <div className="font-semibold text-xl mb-2">Curriculum</div>
            <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {course.curriculum.map((mod, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-gray-800 flex items-center justify-between group-open:bg-sky-50 transition-all">
                    {mod.module}
                    <span className="ml-2 text-sky-400 group-open:rotate-90 transition-transform">
                      <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-gray-700 text-[15px]">{mod.content}</div>
                </details>
              ))}
            </div>
          </div>
          
          {/* Instructor Profile */}
          <div className="mt-12 mb-10">
            <div className="font-semibold text-xl mb-4">Instructor Profile</div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-start gap-6">
              <Image src={course.instructor.avatar} alt={course.instructor.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover mb-2 md:mb-0" />
              <div>
                <div className="font-semibold text-lg text-gray-900 leading-tight mb-0.5">{course.instructor.name}</div>
                <div className="text-gray-500 text-sm mb-2">Textile Engineer & Course Creator</div>
                <div className="text-gray-700 text-[15px] mb-3 max-w-xl">
                  Sarah now has 15+ years of experience in textile design and pattern making. She has worked with major fashion brands and has taught thousands of students worldwide. Her expertise in both traditional and digital pattern making techniques makes her courses comprehensive and practical. <br />
                  She holds a Master&apos;s degree in Textile Engineering and is certified in multiple industry-standard software platforms. Sarah&apos;s passion for teaching and her real-world experience combine to create engaging, practical learning experiences.
                </div>
                <a href="#" className="inline-block bg-sky-400 hover:bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">View Other Courses</a>
              </div>
            </div>
          </div>
          
          {/* All Reviews */}
          <div className="mb-16">
            <div className="font-semibold text-xl mb-4">All Reviews</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">4.9</span>
              <span className="flex items-center gap-1 text-yellow-500 font-semibold text-xl">
                <svg width="22" height="22" fill="#FFD600" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </span>
              <span className="text-lg text-gray-700 font-semibold">90 Reviews</span>
            </div>
            <div className="flex flex-col gap-4 mt-4 max-w-2xl">
              <div className="flex gap-3 items-start bg-gray-50 rounded-lg p-4">
                <Image src="/avatar1.jpg" alt="Maria Rodriguez" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                  <div className="text-gray-700 text-[15px]">Excellent course! Sarah&apos;s teaching style is clear and practical. I learned so much about pattern making that I can immediately apply to my work.</div>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-gray-50 rounded-lg p-4">
                <Image src="/avatar2.jpg" alt="James Chen" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">James Chen</div>
                  <div className="text-gray-700 text-[15px]">The curriculum is well-structured and the projects are engaging. The certificate at the end was a nice bonus for my portfolio.</div>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-gray-50 rounded-lg p-4">
                <Image src="/avatar3.jpg" alt="Emma Thompson" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Emma Thompson</div>
                  <div className="text-gray-700 text-[15px]">Great content and very informative. Would have liked more advanced techniques, but overall a solid foundation course.</div>
                </div>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-white border border-gray-300 text-gray-800 rounded-full font-semibold transition-all">All Reviews</button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image src={course.instructor.avatar} alt={course.instructor.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-lg text-gray-900 leading-tight">{course.instructor.name}</div>
              </div>
            </div>
            <div className="font-bold text-xl text-gray-900 mb-1">{course.title}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-yellow-500 font-semibold text-base">
                <svg width="18" height="18" fill="#FFD600" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                {course.rating}
              </span>
              <span className="text-gray-400 text-sm">({course.reviews} reviews)</span>
            </div>
            <div className="text-gray-600 text-sm mb-2">{course.overview}</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sky-500 font-bold text-2xl">${course.price}</span>
            </div>
            <button className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 rounded-full transition-all text-lg flex items-center justify-center gap-2 mb-2">
              Buy Now
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          
          {/* Learning Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="font-semibold text-lg mb-4">Learning Information</div>
            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex items-center gap-2">
                <span className="bg-sky-50 text-sky-500 p-2 rounded-lg">
                  <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </span>
                <span>Duration</span>
                <span className="ml-auto font-medium text-gray-700">{course.info.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-50 text-sky-500 p-2 rounded-lg">
                  <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2v20"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <span>Skill Level</span>
                <span className="ml-auto font-medium text-gray-700">{course.info.skill}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-50 text-sky-500 p-2 rounded-lg">
                  <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2v20"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <span>Language</span>
                <span className="ml-auto font-medium text-gray-700">{course.info.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-50 text-sky-500 p-2 rounded-lg">
                  <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2v20"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <span>Certificate</span>
                <span className="ml-auto font-medium text-gray-700">{course.info.certificate}</span>
              </div>
            </div>
          </div>
          
          {/* Related Courses */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="font-semibold text-lg mb-4">Related Courses</div>
            <div className="flex flex-col gap-4">
              {course.related.map((rel) => (
                <div key={rel.id} className="flex items-center gap-3">
                  <Image src={rel.image} alt={rel.title} width={56} height={56} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900">{rel.title}</div>
                    <div className="text-gray-500 text-sm">{rel.instructor}</div>
                    <div className="text-gray-400 text-xs">{rel.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
