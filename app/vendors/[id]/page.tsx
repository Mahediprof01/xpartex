"use client";
import { useState } from 'react';
// import { useParams } from 'next/navigation'; // Currently not used, but available for future dynamic content
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Star, MapPin, Calendar, Users, Package, Award, Briefcase } from 'lucide-react';

// Mock data for a single vendor, structured to match the new design
const vendorDetails = {
  id: 1,
  name: "Global Textile Ltd",
  logo: "/Xpartex-04.png", // Replace with actual logo path
  rating: 4.8,
  reviews: 256,
  location: "Mumbai, India",
  established: 2017,
  employees: "80-100",
  products: 156,
  certificatesCount: 4,
  overview: {
    description: "Global Textiles Ltd has been at the forefront of textile innovation since 1995. We specialize in sustainable cotton production and have built strong relationships with farmers across India to ensure the highest quality raw materials. Our state-of-the-art manufacturing facilities are equipped with the latest technology to produce premium fabrics that meet international standards.",
    mission: [
      "Offering trendsetting knit garments to the global market",
      "Being innovative, cost-effective, and globally competitive",
      "Being innovative, cost-effective, and globally competitive",
    ]
  },
  contact: {
    email: "info@globaltextiles.com",
    phone: "info@globaltextiles.com", // Placeholder, use actual phone
    website: "info@globaltextiles.com", // Placeholder, use actual website
  },
  certificates: {
    description: "Global Textile Ltd holds internationally recognized certifications, reflecting our commitment to quality, compliance, and sustainability in every product we deliver to our global partners and customers.",
    items: [
      { name: "Iso 9001", type: "Verified Certificate" },
      { name: "Iso 9001", type: "Verified Certificate" },
      { name: "Iso 9001", type: "Verified Certificate" },
      { name: "Iso 9001", type: "Verified Certificate" },
    ]
  },
  productsInfo: {
    description: "We offer a wide range of textile products, from raw materials to finished garments. Explore our product catalog to find what you need.",
  }
};

type Section = 'overview' | 'contact' | 'certificate' | 'products';

export default function VendorDetailPage() {
  // const params = useParams(); // Currently not used, but available for future dynamic content
  const vendor = vendorDetails; // Using mock data for now
  const [activeSection, setActiveSection] = useState<Section>('overview');
  
  const InfoPill = ({ icon, value }: { icon: React.ReactNode, value: string | number }) => (
    <div className="flex items-center gap-2 text-gray-600 text-sm">
        {icon}
        <span>{value}</span>
    </div>
  );

  const SectionButton = ({ section, label, icon }: { section: Section, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all text-sm font-medium ${
        activeSection === section
          ? 'bg-sky-50 text-sky-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className={`${activeSection === section ? 'text-sky-500' : 'text-gray-400'}`}>{icon}</div>
      {label}
    </button>
  );

  return (
    <div className="bg-gray-50/50 min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Image src={vendor.logo} alt={vendor.name} width={80} height={80} className="rounded-lg border border-gray-100 object-contain" />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Star size={18} className="text-yellow-500 fill-yellow-400" />
                        <span className="font-semibold text-gray-800">{vendor.rating}</span>
                        <span className="text-gray-500 text-sm">({vendor.reviews} reviews)</span>
                    </div>
                </div>
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap">
                    Contact Supplier
                </button>
            </div>
            <div className="border-t border-gray-100 my-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
                <InfoPill icon={<MapPin size={16} />} value={vendor.location} />
                <InfoPill icon={<Calendar size={16} />} value={`Est. ${vendor.established}`} />
                <InfoPill icon={<Users size={16} />} value={`${vendor.employees} Employees`} />
                <InfoPill icon={<Package size={16} />} value={`${vendor.products} Products`} />
                <InfoPill icon={<Award size={16} />} value={`${vendor.certificatesCount} Certificates`} />
            </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-2 sticky top-24">
            <SectionButton section="overview" label="Company Overview" icon={<Briefcase size={20} />} />
            <SectionButton section="contact" label="Contact Information" icon={<Mail size={20} />} />
            <SectionButton section="certificate" label="Certificate" icon={<Award size={20} />} />
            <SectionButton section="products" label="Products" icon={<Package size={20} />} />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{vendor.overview.description}</p>
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Mission: To stay ahead of fast-paced fashion industry by-</h3>
                <ul className="space-y-2">
                  {vendor.overview.mission.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Information Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-gray-50/50">
                  <Mail size={24} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <a href={`mailto:${vendor.contact.email}`} className="text-sm font-medium text-gray-800 hover:text-sky-600">{vendor.contact.email}</a>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-gray-50/50">
                  <Phone size={24} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <a href={`tel:${vendor.contact.phone}`} className="text-sm font-medium text-gray-800 hover:text-sky-600">{vendor.contact.phone}</a>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-gray-50/50">
                  <Globe size={24} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Website</div>
                    <a href={`https://${vendor.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-800 hover:text-sky-600">{vendor.contact.website}</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certificates Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Certificates</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{vendor.certificates.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vendor.certificates.items.map((cert, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 text-center bg-gray-50/50">
                    <Award size={32} className="mx-auto text-gray-400 mb-2" />
                    <div className="font-semibold text-gray-800">{cert.name}</div>
                    <div className="text-xs text-gray-500">{cert.type}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Products Section (optional, can be left as placeholder) */}
            {/* <motion.div ...> ... </motion.div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
