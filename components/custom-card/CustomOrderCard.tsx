"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import CustomOrderForm from "./CustomOrderForm";
import SampleRequestForm from "./SampleRequestForm";
import useAuthStore from "@/store/authStore";

interface CustomOrderCardProps {
  id: string;
  image: string;
  title: string;
  priceRange: string;
  moq: string;
  sold: string;
  reqSummited: string;
}

export default function CustomOrderCard({
  id,
  image,
  title,
  priceRange,
  moq,
  sold,
  reqSummited,
}: CustomOrderCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);
  const [isSampleRequestModalOpen, setIsSampleRequestModalOpen] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if a button is clicked
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    router.push(`/custom-products/${id}`);
  };
  
  const handleCustomOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Always open the form, authentication check happens on submit
    setIsCustomOrderModalOpen(true);
  };
  
  const handleSampleRequestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Always open the form, authentication check happens on submit
    setIsSampleRequestModalOpen(true);
  };
  
  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center w-full max-w-xs mx-auto cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
      >
        <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
          <Image src={image} alt={title} width={300} height={160} className="object-cover w-full h-full" />
        </div>
        <div className="w-full text-[15px] font-medium text-gray-800 truncate mb-1" title={title}>{title}</div>
        <div className="w-full flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-gray-900">৳{priceRange}</span>
          <span className="text-xs text-gray-500 font-medium">MOQ: {moq}</span>
        </div>
        <div className="w-full flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>{sold} sold</span>
          <span className="mx-1">|</span>
          <span>Req Summited: {reqSummited}</span>
        </div>
        <div className="w-full flex gap-2 mt-auto">
          <button 
            className="flex-1 border border-gray-300 rounded-full py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-all"
            onClick={handleSampleRequestClick}
          >
            Request Sample
          </button>
          <button 
            className="flex-1 border border-gray-300 rounded-full py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-all"
            onClick={handleCustomOrderClick}
          >
            Custom Order
          </button>
        </div>
      </div>
      
      {/* Custom Order Modal */}
      <Modal
        isOpen={isCustomOrderModalOpen}
        onClose={() => setIsCustomOrderModalOpen(false)}
        title="Place Custom Order"
        size="lg"
      >
        <CustomOrderForm 
          onClose={() => setIsCustomOrderModalOpen(false)} 
          productInfo={{ id, title, priceRange, moq }}
        />
      </Modal>
      
      {/* Sample Request Modal */}
      <Modal
        isOpen={isSampleRequestModalOpen}
        onClose={() => setIsSampleRequestModalOpen(false)}
        title="Request Product Sample"
        size="md"
      >
        <SampleRequestForm 
          onClose={() => setIsSampleRequestModalOpen(false)} 
          productInfo={{ id, title, priceRange, moq }}
        />
      </Modal>
    </>
  );
}
