"use client"

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/ui/data-table";
import { createColumns, type Bid } from "../dashboard/rfqs/columns";
import Modal from "@/components/Modal";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

const rfqData = [
  {
    title: "Need 28mm 500 Pieces of Wooden Shirt Buttons",
    status: "Online",
    date: "Aug 27, 2025 | 10:08 PM",
    active: true,
  },
  {
    title: "Require 1000 Yards of Cotton Poplin Fabric",
    status: "Online",
    date: "Aug 26, 2025 | 04:20 PM",
  },
  {
    title: "Looking for 2000pcs Black Zippers - Size Nylon Coil",
    status: "Paused",
    date: "Aug 25, 2025 | 11:55 AM",
  },
  {
    title: "Need 150 Sets of Metal Snap Fasteners Antique",
    status: "Paused",
    date: "Aug 24, 2025 | 03:30 PM",
  },
  {
    title: "Seeking 300kg Reactive Dyed Cotton Yarn",
    status: "Ordered",
    date: "Aug 23, 2025 | 09:45 AM",
  },
  {
    title: "Urgent: 500pcs Polyester Thread Cones White & Black",
    status: "Ordered",
    date: "Aug 27, 2025 | 10:08 PM",
  },
  {
    title: "Looking for 100 Dozen Plastic Shirt Buttons",
    status: "Ordered",
    date: "Aug 20, 2025 | 07:35 PM",
  },
  {
    title: "Requesting Quote for 1000pcs Woven Custom Design",
    status: "Ordered",
    date: "Aug 19, 2025 | 12:50 PM",
  },
];

const bidsData: Bid[] = [
    { 
      name: "TexMart Traders", 
      amount: 5600, 
      time: "6 Days",
      description: "Thank you for your interest in wooden shirt buttons. We are pleased to offer 500 pieces of premium-quality wooden buttons as per your requirements.",
      material: "100% natural wood, smooth polished finish",
      size: "15-18 mm (uniform and precise)",
      color: "Natural wood tone, polished for durability",
      quality: "Durable, eco-friendly, consistent size and finish",
      packaging: "Securely packed in protective cartons to prevent damage during transit",
      deliveryTime: "[X] days after order confirmation",
      attachment: "500 Pieces of Wooden shi...pdf"
    },
    { 
      name: "Arvind Limited", 
      amount: 5600, 
      time: "6 Days",
      description: "We provide high-quality wooden shirt buttons with excellent finish and durability.",
      material: "Premium natural wood with smooth finish",
      size: "15-18 mm standard size",
      color: "Natural wood color",
      quality: "High-grade quality with consistent finish",
      packaging: "Safe packaging with bubble wrap protection",
      deliveryTime: "6 days after confirmation",
      attachment: "Wooden_Buttons_Spec.pdf"
    },
    { 
      name: "Esquel Group", 
      amount: 5600, 
      time: "6 Days",
      description: "Professional supplier of wooden buttons with competitive pricing.",
      material: "Natural wood with polished surface",
      size: "15-18 mm precise measurements",
      color: "Natural wood tone",
      quality: "Premium quality with durability guarantee",
      packaging: "Protective carton packaging",
      deliveryTime: "6 days delivery time",
      attachment: "Button_Details.pdf"
    },
    { 
      name: "Interloop Limited", 
      amount: 5600, 
      time: "6 Days",
      description: "Leading manufacturer of wooden accessories with international quality standards.",
      material: "100% natural wood, eco-friendly finish",
      size: "15-18 mm uniform size",
      color: "Natural polished wood color",
      quality: "International quality standards, durable and smooth",
      packaging: "Export quality packaging with damage protection",
      deliveryTime: "6 days express delivery",
      attachment: "Premium_Buttons_Quote.pdf"
    },
    { 
      name: "Noman Group", 
      amount: 5600, 
      time: "6 Days",
      description: "Quality wooden button supplier with fast delivery options.",
      material: "Natural wood with smooth finish",
      size: "15-18 mm standard specifications",
      color: "Natural wood color",
      quality: "High-quality finish with consistency",
      packaging: "Secure packaging for safe transport",
      deliveryTime: "6 days standard delivery",
      attachment: "Wooden_Buttons_Quote.pdf"
    },
    { 
      name: "Siyaram Silk Mills", 
      amount: 5600, 
      time: "6 Days",
      description: "Textile accessories manufacturer with wooden button specialization.",
      material: "Premium natural wood material",
      size: "15-18 mm precise sizing",
      color: "Natural wood finish",
      quality: "Consistent quality and smooth texture",
      packaging: "Professional packaging standards",
      deliveryTime: "6 days from order",
      attachment: "Button_Specifications.pdf"
    },
    { 
      name: "Seiren Co., Ltd.", 
      amount: 5600, 
      time: "6 Days",
      description: "International supplier of wooden fashion accessories.",
      material: "Natural wood with premium finish",
      size: "15-18 mm uniform dimensions",
      color: "Polished natural wood tone",
      quality: "International quality standards",
      packaging: "Export standard packaging",
      deliveryTime: "6 days international shipping",
      attachment: "Wood_Buttons_Details.pdf"
    },
    { 
      name: "LoomLuxe Textiles", 
      amount: 5600, 
      time: "6 Days",
      description: "Luxury textile accessories with wooden button expertise.",
      material: "Premium wood with luxury finish",
      size: "15-18 mm precision cut",
      color: "Natural wood with luxury polish",
      quality: "Luxury grade quality assurance",
      packaging: "Premium protective packaging",
      deliveryTime: "6 days priority delivery",
      attachment: "Luxury_Buttons_Quote.pdf"
    },
    { 
      name: "FiberFusion Group", 
      amount: 5600, 
      time: "6 Days",
      description: "Modern textile solutions with eco-friendly wooden buttons.",
      material: "Eco-friendly natural wood",
      size: "15-18 mm modern specifications",
      color: "Natural eco-finish",
      quality: "Sustainable quality standards",
      packaging: "Eco-friendly packaging solution",
      deliveryTime: "6 days green delivery",
      attachment: "Eco_Buttons_Spec.pdf"
    },
    { 
      name: "EcoWeave Innovations", 
      amount: 5600, 
      time: "6 Days",
      description: "Sustainable textile accessories with innovative wooden button designs.",
      material: "Sustainable wood with innovative finish",
      size: "15-18 mm innovative sizing",
      color: "Natural sustainable finish",
      quality: "Innovation meets sustainability",
      packaging: "Sustainable packaging materials",
      deliveryTime: "6 days sustainable delivery",
      attachment: "Sustainable_Buttons.pdf"
    },
    { 
      name: "ThreadNest Creations", 
      amount: 5600, 
      time: "6 Days",
      description: "Creative textile solutions with handcrafted wooden button quality.",
      material: "Handcrafted natural wood",
      size: "15-18 mm artisan precision",
      color: "Natural handcrafted finish",
      quality: "Artisan quality with attention to detail",
      packaging: "Handcrafted protective packaging",
      deliveryTime: "6 days artisan delivery",
      attachment: "Handcrafted_Buttons.pdf"
    },
];

const statusColors = {
  Online: "bg-green-100 text-green-800",
  Paused: "bg-yellow-100 text-yellow-800",
  Ordered: "bg-blue-100 text-blue-800",
};

const RFQPage = () => {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCounterBidModalOpen, setIsCounterBidModalOpen] = useState(false);
  const [counterBidData, setCounterBidData] = useState({
    description: "",
    counterPrice: "",
    deliveryTimeline: ""
  });

  const handleViewDetails = (bid: Bid) => {
    setSelectedBid(bid);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBid(null);
  };

  const handleAccept = () => {
    // Handle accept logic here
    console.log("Accepted bid:", selectedBid);
    handleCloseModal();
  };

  const handleCounterBid = () => {
    // Close the view details modal and open counter bid modal
    setIsModalOpen(false);
    setIsCounterBidModalOpen(true);
  };

  const handleCloseCounterBidModal = () => {
    setIsCounterBidModalOpen(false);
    setCounterBidData({
      description: "",
      counterPrice: "",
      deliveryTimeline: ""
    });
  };

  const handleSubmitCounterBid = () => {
    // Handle counter bid submission logic here
    console.log("Counter bid submitted:", counterBidData, "for:", selectedBid);
    handleCloseCounterBidModal();
    setSelectedBid(null);
  };

  const handleBackToDetails = () => {
    // Go back to view details modal
    setIsCounterBidModalOpen(false);
    setIsModalOpen(true);
  };

  const columns = createColumns({ onViewDetails: handleViewDetails });

  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
      <div className="w-full lg:w-1/3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">All Request for Quotations <ChevronDown className="h-4 w-4 ml-2" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Online</DropdownMenuItem>
                <DropdownMenuItem>Paused</DropdownMenuItem>
                <DropdownMenuItem>Ordered</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Search className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rfqData.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${item.active ? 'bg-gray-100' : ''}`}>
                  <div className="flex justify-between items-start">
                    <p className="font-semibold">{item.title}</p>
                    <Badge className={`${statusColors[item.status]} px-2 py-1 text-xs`}>{item.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-2/3">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <CardTitle>Need 500 Pieces of Wooden Shirt Buttons</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Pause RFQ</Button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-500">
                I am looking to purchase 500 pieces of high-quality wooden shirt buttons. The buttons should be durable, smooth finished, and uniform in size. Preferred size is 15-18 mm, natural wood color (or polished). Please ensure consistent quality and proper packaging to avoid damage during delivery.
              </p>
              <div className="flex gap-2 pt-2">
                  <Image src="/cotton-hoodie.jpeg" alt="buttons" width={80} height={80} className="rounded-lg" />
                  <Image src="/cotton-hoodie.png" alt="buttons" width={80} height={80} className="rounded-lg" />
              </div>
               <p className="text-sm text-gray-500 mt-1">Aug 27, 2025 | 10:08 PM</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Supplier Bids (16)</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort by: All Bids <ChevronDown className="h-4 w-4 ml-2" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Lowest Bid</DropdownMenuItem>
                  <DropdownMenuItem>Highest Bid</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="overflow-x-auto">
              <DataTable columns={columns} data={bidsData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal for Bid Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="View Details"
        size="xl"
        footerActions={
          <>
            <Button variant="outline" onClick={handleCounterBid} className="rounded-full px-12 py-2 h-12 text-base">
              Counter Bid
            </Button>
            <Button onClick={handleAccept} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-12 py-2 h-12 text-base">
              Accept
            </Button>
          </>
        }
      >
        {selectedBid && (
          <div className="space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{selectedBid.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Textile Materials Supplier • Aug 27, 2025 | 10:08 PM</p>
            </div>

            {/* Bid Details Grid */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Bid Price:</p>
                <p className="text-base font-semibold text-gray-900">{selectedBid.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Delivery Time:</p>
                <p className="text-base font-semibold text-gray-900">{selectedBid.time}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Attachments</p>
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">
                  {selectedBid.attachment}
                </div>
              </div>
            </div>

            {/* Single Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Offer Description */}
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3">Offer Description</h4>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Thank you for your interest in wooden shirt buttons. We are pleased to offer 500 pieces of premium-quality wooden buttons as per your requirements.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Material:</strong> 100% natural wood, smooth polished finish</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Size:</strong> 15-18 mm (uniform and precise)</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Color:</strong> Natural wood tone, polished for durability</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Quality:</strong> Durable, eco-friendly, consistent size and finish</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Packaging:</strong> Securely packed in protective cartons to prevent damage during transit</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span><strong>Delivery Time:</strong> [X] days after order confirmation</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We ensure strict quality checks before dispatch and guarantee you receive buttons that meet your expectations.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Counter Bid Modal */}
      <Modal
        isOpen={isCounterBidModalOpen}
        onClose={handleCloseCounterBidModal}
        title="Counters Bid"
        size="lg"
        footerActions={
          <>
            <Button variant="outline" onClick={handleBackToDetails} className="rounded-full px-12 py-2 h-12 text-base">
              Back
            </Button>
            <Button onClick={handleSubmitCounterBid} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-12 py-2 h-12 text-base">
              Submit Bid
            </Button>
          </>
        }
      >
        {selectedBid && (
          <div className="space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{selectedBid.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Textile Materials Supplier • Aug 27, 2025 | 10:08 PM</p>
            </div>

            {/* Original Bid Details */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Bid Price:</p>
                <p className="text-base font-semibold text-gray-900">{selectedBid.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Delivery Time:</p>
                <p className="text-base font-semibold text-gray-900">{selectedBid.time}</p>
              </div>
            </div>

            {/* Counter Bid Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  placeholder="Write a description..."
                  value={counterBidData.description}
                  onChange={(e) => setCounterBidData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500 text-right mt-1">{counterBidData.description.length}/2000 characters</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 w-32">Counter Price:</label>
                  <Input
                    placeholder="Enter amount"
                    value={counterBidData.counterPrice}
                    onChange={(e) => setCounterBidData(prev => ({ ...prev, counterPrice: e.target.value }))}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 w-32">Delivery Timeline:</label>
                  <Input
                    placeholder="Delivery time in Days"
                    value={counterBidData.deliveryTimeline}
                    onChange={(e) => setCounterBidData(prev => ({ ...prev, deliveryTimeline: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RFQPage;
