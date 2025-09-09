"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  ArrowLeft,
  FileText,
  Download,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Send,
  Paperclip,
  User,
  Tag,
  DollarSign,
  Calendar,
  Info,
  List,
  Package,
  Shield,
  Briefcase,
  File,
  Mail,
  Phone,
} from "lucide-react";

// This would typically come from an API or database
const getRFQById = (id) => {
  const rfqs = [
    {
      id: "RFQ-001",
      title: "Custom Denim Collection",
      buyer: "Fashion Retail Co.",
      seller: "UrbanWear Co.",
      status: "open",
      category: "Apparel",
      priority: "high",
      budget: 5000,
      quantity: 500,
      deadline: "2024-02-15",
      description: "We are looking for a reliable supplier to produce a custom collection of denim jackets and jeans for our upcoming spring season. The collection should feature modern designs, high-quality materials, and a consistent fit. We are open to innovative washes and finishes.",
      requirements: "All materials must be sustainably sourced, with a preference for organic or recycled cotton. The final products should have a premium finish, with durable hardware and stitching. We require bulk pricing options and a detailed production timeline.",
      files: [
        { name: "design-specs.pdf", type: "pdf", size: "2.3 MB" },
        { name: "sample-images.jpg", type: "image", size: "1.1 MB" },
      ],
      responses: 0,
      createdAt: "2024-01-15",
      negotiationRounds: 3,
      timeLimit: "2024-01-30",
      buyerNotes: "We are looking for a partner with a proven track record in denim production and a commitment to quality and quick turnaround times. Please provide examples of previous work.",
      contactInfo: {
        name: "John Smith",
        email: "john@fashionretail.com",
        phone: "+1 (555) 123-4567",
      },
      quote: null,
    },
    {
      id: "RFQ-002",
      title: "Organic Cotton Products",
      buyer: "EcoFashion",
      seller: "GreenTextiles",
      status: "negotiating",
      category: "Textiles",
      priority: "medium",
      budget: 3000,
      quantity: 200,
      deadline: "2024-02-10",
      description: "We are seeking a supplier for a new line of organic cotton hoodies and t-shirts. The focus is on comfort, durability, and minimalist design. The products will be marketed to environmentally conscious consumers.",
      requirements: "All products must be GOTS certified and packaged in eco-friendly materials. We require detailed information on the supply chain and production process. A sample run will be required before a full production order.",
      files: [{ name: "product-specs.docx", type: "word", size: "1.8 MB" }],
      responses: 1,
      createdAt: "2024-01-12",
      negotiationRounds: 2,
      timeLimit: "2024-01-25",
      buyerNotes: "Sustainability and transparency are our top priorities. We are looking for a long-term partnership with a supplier who shares our values.",
      contactInfo: {
        name: "Sarah Johnson",
        email: "sarah@ecostyle.com",
        phone: "+1 (555) 987-6543",
      },
      quote: {
        id: "QUOTE-003",
        supplier: "GreenTextiles",
        price: 2800,
        leadTime: "12-15 days",
        status: "accepted",
        submittedAt: "2024-01-14",
        acceptedAt: "2024-01-20",
        notes: "Our quote includes GOTS certified organic cotton and biodegradable packaging. We have a transparent supply chain and can provide all necessary documentation.",
        rating: 4.9,
        previousOrders: 5,
        orderDetails: {
          orderId: "ORD-001",
          orderDate: "2024-01-20",
          deliveryDate: "2024-02-05",
        },
      },
    },
    {
      id: "RFQ-003",
      title: "Luxury Home Decor",
      buyer: "StyleHub",
      seller: "LuxuryFabrics",
      status: "closed",
      category: "Home & Garden",
      priority: "low",
      budget: 8000,
      quantity: 100,
      deadline: "2024-02-20",
      description: "We are sourcing a collection of premium home decoration items, including throw pillows, blankets, and table runners. The aesthetic should be modern luxury, with a focus on rich textures and high-end materials.",
      requirements: "All items must be crafted from luxury materials such as silk, velvet, and cashmere. We require designer-level quality and craftsmanship. Custom designs and colorways are a must.",
      files: [
        { name: "design-concept.ai", type: "ai", size: "5.2 MB" },
        { name: "materials-list.xlsx", type: "excel", size: "0.8 MB" },
      ],
      responses: 1,
      createdAt: "2024-01-10",
      negotiationRounds: 3,
      timeLimit: "2024-01-28",
      buyerNotes: "Quality and exclusivity are paramount. We are willing to invest in exceptional products that will appeal to our discerning clientele. Cost is secondary to craftsmanship.",
      contactInfo: {
        name: "Emily Chen",
        email: "emily@luxurybrands.com",
        phone: "+1 (555) 321-0987",
      },
      quote: {
        id: "QUOTE-004",
        supplier: "LuxuryFabrics",
        price: 8500,
        leadTime: "25-30 days",
        status: "rejected",
        submittedAt: "2024-01-15",
        rejectedAt: "2024-01-22",
        notes: "Our quote reflects the use of premium materials and the high level of craftsmanship required. We are confident in our ability to deliver exceptional quality.",
        rating: 4.7,
        previousOrders: 2,
        rejectionReason: "The quoted price exceeded our budget expectations for this collection. We have decided to explore other options at this time.",
      },
    },
  ];
  return rfqs.find((rfq) => rfq.id === id);
};

const RFQDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const rfq = getRFQById(id);

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  if (!rfq) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">RFQ not found</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "negotiating":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptQuote = () => {
    // Logic to accept the quote
    alert("Quote accepted!");
  };

  const handleRejectQuote = () => {
    // Logic to reject the quote with a reason
    alert(`Quote rejected for the following reason: ${rejectionReason}`);
    setShowRejectionForm(false);
  };

  return (
    <div className="min-h-screen ">
      <div className="container ">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to RFQs
          </Button>
        </div>

        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{rfq.title}</h1>
              <p className="text-sm text-gray-500 mt-1">ID: {rfq.id}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Badge className={`${getStatusBadge(rfq.status)}`}>{rfq.status}</Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  RFQ Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Buyer</p>
                    <p className="font-medium">{rfq.buyer}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{rfq.category}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge className={`${getPriorityBadge(rfq.priority)}`}>{rfq.priority}</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">${rfq.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{rfq.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">{new Date(rfq.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{rfq.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <List className="h-5 w-5 mr-2 text-blue-500" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{rfq.requirements}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Paperclip className="h-5 w-5 mr-2 text-blue-500" />
                  Attached Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rfq.files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <File className="h-6 w-6 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  Buyer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p className="font-medium">{rfq.contactInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${rfq.contactInfo.email}`} className="font-medium text-blue-600 hover:underline">
                      {rfq.contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{rfq.contactInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="Type your message here..." />
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {rfq.status === 'open' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                     Start Negotiation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => setShowQuoteForm(true)}>
                    Start Negotiation
                  </Button>
                </CardContent>
              </Card>
            )}

            <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
              <DialogContent className="bg-white rounded-lg shadow-lg p-6">
                  <DialogHeader>
                    <DialogTitle>Submit Your Quote</DialogTitle>
                    <DialogDescription>
                      Provide your pricing and terms for this RFQ.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-1">
                      <Label htmlFor="price" className="block text-sm text-gray-700">Price ($)</Label>
                      <Input id="price" type="number" placeholder="e.g., 4800" className="mt-1" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="leadTime" className="block text-sm text-gray-700">Lead Time</Label>
                      <Input id="leadTime" placeholder="e.g., 10-12 days" className="mt-1" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="notes" className="block text-sm text-gray-700">Notes</Label>
                      <Textarea id="notes" placeholder="Add any notes for the buyer" className="mt-1 min-h-[100px] resize-y" />
                    </div>
                    <Button className="w-full mt-2" onClick={() => setShowQuoteForm(false)}>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Quote
                    </Button>
                  </div>
                </DialogContent>
            </Dialog>

            {rfq.quote && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Quote Details
                  </CardTitle>
                  <CardDescription>
                    Submitted by {rfq.quote.supplier} on {new Date(rfq.quote.submittedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-bold text-lg text-gray-900">${rfq.quote.price.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Lead Time</p>
                    <p className="font-medium">{rfq.quote.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{rfq.quote.notes}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={`${getStatusBadge(rfq.quote.status)}`}>{rfq.quote.status}</Badge>
                  </div>

                  {rfq.quote.status === 'rejected' && rfq.quote.rejectionReason && (
                    <div>
                      <p className="text-sm text-red-600 font-medium mb-1">Rejection Reason</p>
                      <p className="text-gray-700 bg-red-50 p-3 rounded-md border border-red-200">{rfq.quote.rejectionReason}</p>
                    </div>
                  )}

                  {rfq.quote.status === 'accepted' && rfq.quote.orderDetails && (
                    <div className="border-t pt-4 mt-4">
                       <h4 className="font-semibold mb-2">Order Details</h4>
                       <div className="flex justify-between items-center">
                         <p className="text-sm text-gray-500">Order ID</p>
                         <p className="font-medium">{rfq.quote.orderDetails.orderId}</p>
                       </div>
                       <div className="flex justify-between items-center">
                         <p className="text-sm text-gray-500">Order Date</p>
                         <p className="font-medium">{new Date(rfq.quote.orderDetails.orderDate).toLocaleDateString()}</p>
                       </div>
                       <div className="flex justify-between items-center">
                         <p className="text-sm text-gray-500">Est. Delivery</p>
                         <p className="font-medium">{new Date(rfq.quote.orderDetails.deliveryDate).toLocaleDateString()}</p>
                       </div>
                    </div>
                  )}

                  {rfq.status === 'negotiating' && (
                    <div className="border-t pt-4 mt-4 space-y-4">
                      <h4 className="font-semibold">Actions</h4>
                      <div className="flex space-x-2">
                        <Button onClick={handleAcceptQuote} className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Quote
                        </Button>
                        <Button onClick={() => setShowRejectionForm(true)} variant="destructive" className="w-full">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Reject Quote
                        </Button>
                      </div>
                      {showRejectionForm && (
                        <div className="space-y-2">
                          <Label htmlFor="rejectionReason">Reason for Rejection</Label>
                          <Textarea
                            id="rejectionReason"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Provide a reason for rejecting the quote"
                          />
                          <Button onClick={handleRejectQuote} className="w-full">
                            Confirm Rejection
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQDetailPage;



