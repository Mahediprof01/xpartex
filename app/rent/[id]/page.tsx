"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const rents = [
  {
    id: 1,
    name: "Delivery van loaded with boxes in a warehouse",
    images: [
      '/rent.png',
      '/rent.png',
      '/rent.png',
    ],
    company: "Uniqlo Logistics",
    verified: true,
    rate: "$250/day",
    description:
      "This delivery van is preloaded with boxed cargo and stationed in a secure warehouse, ready for immediate dispatch. Designed for efficient city-wide logistics, it features GPS tracking, air-conditioning, and professional driver service. Ideal for transporting goods across Dhaka with speed and reliability. The van offers ample space for medium to large shipments, ensuring safety and timely delivery. Flexible rental options are available for businesses of all sizes.",
  },
  // ...other items
];

export default function RentDetailPage() {
  const params = useParams();
  let id = undefined;
  if (typeof params === 'object' && params !== null && 'id' in params) {
    if (typeof params.id === 'string') {
      id = params.id;
    } else if (Array.isArray(params.id)) {
      id = params.id[0];
    }
  }
  const rent = rents.find((r) => String(r.id) === id);
  if (!rent) return <div className="text-center py-20 text-2xl">Item not found</div>;

  return (
    <div className="container w-full mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
        <span>Home</span>
        <span className="mx-1">/</span>
        <span>Rent</span>
        <span className="mx-1">/</span>
        <span className="text-gray-700 font-semibold">Rent View Details</span>
      </div>
      {/* Carousel */}
      <div className="rounded-2xl overflow-hidden mb-8 relative" style={{height:'340px'}}>
        <Carousel>
          <CarouselContent>
            {rent.images.map((img, i) => (
              <CarouselItem key={i}>
                <Image src={img} alt={rent.name} width={800} height={340} className="w-full h-[340px] object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </div>
      {/* Title & Info */}
      <h1 className="text-2xl font-bold mb-2">{rent.name}</h1>
      <div className="flex items-center gap-4 mb-2">
        <span className="font-semibold text-base flex items-center gap-2">
          <span className="text-gray-800">{rent.company}</span>
          {rent.verified && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">Verified</span>}
        </span>
        <span className="text-gray-500 text-base">Rate : <span className="font-semibold text-gray-800">{rent.rate}</span></span>
      </div>
      <p className="text-gray-700 mb-6 max-w-3xl">{rent.description}</p>
      <div className="flex gap-4 mb-8">
        <button className="px-7 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-full font-semibold transition-all">Contact Now</button>
        <button className="px-7 py-2 bg-white border border-gray-300 text-gray-800 rounded-full font-semibold transition-all">Book Now</button>
      </div>

      {/* Rent Information Section */}
      
        <div className="font-semibold text-xl mb-4">Rent Information</div>
        <div className="border-t border-gray-200 pt-4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Rent Type</div>
              <div className="font-medium text-gray-700">Delivery Truck</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Available From</div>
              <div className="font-medium text-gray-700">20 Aug 2025</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21V19a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2"/><rect x="3" y="7" width="18" height="13" rx="2"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Location</div>
              <div className="font-medium text-gray-700">Dhaka, Bangladesh</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Rate</div>
              <div className="font-medium text-gray-700">$250/day</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M6 21V19a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Capacity</div>
              <div className="font-medium text-gray-700">5 Tons</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 21V19a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Minimum Duration</div>
              <div className="font-medium text-gray-700">2 days</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2v4M8 2v4"/><rect x="3" y="7" width="18" height="13" rx="2"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Contact</div>
              <div className="font-medium text-gray-700">+8801XXXXXXXXX</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-sky-50 text-sky-500 p-2 rounded-lg"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M12 2v4"/></svg></span>
            <div>
              <div className="text-xs text-gray-400">Posted by</div>
              <div className="font-medium text-gray-700">Uniqlo</div>
            </div>
          </div>
        </div>

      {/* Details Section */}
        <div className="font-semibold text-xl mb-4">Details</div>
        <div className="border-t border-gray-200 pt-4 mb-4"></div>
        <div className="text-gray-700 text-[15px] mb-2 max-w-4xl">
          Efficient and reliable, this delivery van is fully loaded and positioned at our central warehouse, ready for your next shipment. With secure cargo space, GPS tracking, and experienced driver support, it&apos;s ideal for distributing boxed goods across Dhaka. Whether for retail, wholesale, or B2B logistics, this van ensures timely delivery and cargo protection. Suitable for daily or long term rentals, with flexible terms tailored to business needs.
        </div>
      

      {/* Features & Benefits Section */}
      <div className="mb-12">
        <div className="font-semibold text-xl mb-4">Features & Benefits</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>Preloaded and Ready</span>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>Air-Conditioned Cabin</span>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>Spacious Cargo Area</span>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>Professional Driver Included</span>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>GPS Tracking Enabled</span>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-gray-700">
            <svg width="18" height="18" fill="none" stroke="#19C3E7" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="12" r="8"/><path d="M5 12l4 4L19 7"/></svg>
            <span>Flexible Rental Terms</span>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="mb-12">
        <div className="font-semibold text-xl mb-4">Image Gallery</div>
        <div className="flex gap-4 bg-sky-50 rounded-2xl p-4 overflow-x-auto">
          {[...rent.images, '/rent.png', '/rent.png'].map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden min-w-[120px] h-[90px] flex items-center justify-center bg-white border border-sky-100">
              <Image src={img} alt={rent.name + ' gallery'} width={140} height={90} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="mb-12">
        <div className="font-semibold text-xl mb-4">You May Also Like</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Example recommendations, replace with real data as needed */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-0" style={{maxWidth: 320}}>
              <div className="w-full h-36 relative">
                <Image src="/rent.png" alt="Mini Pickup Van for Rent" fill className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="font-semibold text-base mb-1 truncate">Mini Pickup Van for Rent</div>
                <div className="flex items-center gap-2 mb-1">
                  <Image src="/companylogorent.png" alt="QuickHaul Transport Services" width={20} height={20} className="rounded object-contain" />
                  <span className="text-gray-700 text-xs font-medium">QuickHaul Transport Services</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-gray-900">$100<span className="text-xs font-normal text-gray-500">/day</span></span>
                  <button className="border border-gray-300 rounded-full px-5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all">Rent Now</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-0" style={{maxWidth: 320}}>
              <div className="w-full h-36 relative">
                <Image src="/rent.png" alt="Warehouse Space for Rent" fill className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="font-semibold text-base mb-1 truncate">Warehouse Space for Rent</div>
                <div className="flex items-center gap-2 mb-1">
                  <Image src="/companylogorent.png" alt="King Lease & Rentals, LLC" width={20} height={20} className="rounded object-contain" />
                  <span className="text-gray-700 text-xs font-medium">King Lease & Rentals, LLC</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                  <span>Vashon Island, Washington</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-gray-900">$350<span className="text-xs font-normal text-gray-500">/day</span></span>
                  <button className="border border-gray-300 rounded-full px-5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all">Rent Now</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-0" style={{maxWidth: 320}}>
              <div className="w-full h-36 relative">
                <Image src="/rent.png" alt="Forklift Rental Service" fill className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="font-semibold text-base mb-1 truncate">Forklift Rental Service</div>
                <div className="flex items-center gap-2 mb-1">
                  <Image src="/companylogorent.png" alt="King Lease & Rentals, LLC" width={20} height={20} className="rounded object-contain" />
                  <span className="text-gray-700 text-xs font-medium">King Lease & Rentals, LLC</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                  <span>Vashon Island, Washington</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-gray-900">$100<span className="text-xs font-normal text-gray-500">/day</span></span>
                  <button className="border border-gray-300 rounded-full px-5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all">Rent Now</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden p-0" style={{maxWidth: 320}}>
              <div className="w-full h-36 relative">
                <Image src="/rent.png" alt="Turk Delivery For Rental" fill className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="font-semibold text-base mb-1 truncate">Turk Delivery For Rental</div>
                <div className="flex items-center gap-2 mb-1">
                  <Image src="/companylogorent.png" alt="King Lease & Rentals, LLC" width={20} height={20} className="rounded object-contain" />
                  <span className="text-gray-700 text-xs font-medium">King Lease & Rentals, LLC</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                  <span>Vashon Island, Washington</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-gray-900">$120<span className="text-xs font-normal text-gray-500">/day</span></span>
                  <button className="border border-gray-300 rounded-full px-5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all">Rent Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
