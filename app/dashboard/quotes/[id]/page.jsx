"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  ArrowLeft,
  Package,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  FileText,
  Download,
  Send,
  AlertTriangle,
  Phone,
  Mail,
  Clock,
  User,
  Paperclip,
  File,
} from "lucide-react";

// Mock data loader (kept small — same shape as original)
const getQuoteById = (id) => {
  const quotes = [
    {
      id: "QUOTE-001",
      rfqId: "RFQ-001",
      buyer: "Fashion Retail Co.",
      product: "Denim Jackets - Bulk Order",
      category: "Apparel",
      quantity: 500,
      budget: 15000,
      deadline: "2024-02-15",
      status: "pending",
      requestDate: "2024-01-20",
      responseTime: "4 hours",
      requirements: ["Minimum 12oz denim weight", "Sustainable cotton sourcing"],
      specifications: "High-quality denim, sustainable materials, bulk order for retail",
      buyerNotes: "Looking for premium quality with quick turnaround",
      priority: "high",
      contactInfo: { name: "John Smith", email: "john@fashionretail.com", phone: "+1 (555) 123-4567" },
      previousOrders: 3,
      totalSpent: 8900,
      rfqDetails: { title: "Custom Denim Collection", description: "Custom denim jackets and jeans for spring collection", files: [{ name: "design-specs.pdf", size: "2.3 MB" }] },
    },
    {
      id: "QUOTE-002",
      rfqId: "RFQ-002",
      buyer: "EcoStyle Boutique",
      product: "Organic Cotton T-Shirts",
      category: "Apparel",
      quantity: 1000,
      budget: 8000,
      deadline: "2024-02-10",
      status: "responded",
      requestDate: "2024-01-18",
      responseTime: "2 hours",
      requirements: ["100% organic cotton", "GOTS certification"],
      specifications: "Eco-friendly t-shirts for sustainable fashion line",
      buyerNotes: "Sustainability is our top priority",
      priority: "medium",
      contactInfo: { name: "Sarah Johnson", email: "sarah@ecostyle.com", phone: "+1 (555) 987-6543" },
      previousOrders: 1,
      totalSpent: 3200,
      quoteSubmitted: { price: 7500, leadTime: "18-22 days", notes: "Can meet all requirements", submittedAt: "2024-01-19", status: "submitted" },
      rfqDetails: { title: "Organic Cotton Products", description: "Organic cotton hoodies and t-shirts", files: [{ name: "product-specs.docx", size: "1.8 MB" }] },
    },
  ];

  return quotes.find((q) => q.id === id);
};

export default function QuoteDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const quote = getQuoteById(params.id);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  if (!quote) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quote not found</h3>
            <p className="text-muted-foreground mb-4">The quote you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/dashboard/quotes')}>Back to Quotes</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full px-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Quotes
          </Button>
        </div>

        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{quote.product}</h1>
              <p className="text-sm text-gray-500 mt-1">ID: {quote.id}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Badge className={`${getStatusBadgeClass(quote.status)}`}>{quote.status}</Badge>
              <Badge className={`${getPriorityBadgeClass(quote.priority)}`}>{quote.priority}</Badge>
              <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Package className="h-5 w-5 mr-2 text-blue-500"/> Quote Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Buyer</p>
                  <p className="font-medium">{quote.buyer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{quote.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{quote.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">${quote.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{new Date(quote.deadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{new Date(quote.requestDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2 text-blue-500"/> Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{quote.specifications}</p>
              </CardContent>
            </Card>

            {quote.rfqDetails && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2 text-blue-500"/> RFQ Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">RFQ ID</p>
                    <p className="font-medium">{quote.rfqId}</p>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Title</p>
                      <p className="font-medium">{quote.rfqDetails.title}</p>
                    </div>
                  </CardContent>
                </Card>

                {quote.rfqDetails.files && quote.rfqDetails.files.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center"><Paperclip className="h-5 w-5 mr-2 text-blue-500"/> Attached Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {quote.rfqDetails.files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <File className="h-6 w-6 mr-3 text-gray-500" />
                              <div>
                                <p className="font-medium">{file.name}</p>
                                {file.size && <p className="text-sm text-gray-500">{file.size}</p>}
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
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><User className="h-5 w-5 mr-2 text-blue-500"/> Buyer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p className="font-medium">{quote.contactInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${quote.contactInfo.email}`} className="font-medium text-blue-600 hover:underline">{quote.contactInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{quote.contactInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quote.status === 'pending' && (
                  <Button className="w-full" onClick={() => setIsSubmitModalOpen(true)}>
                    <Send className="h-4 w-4 mr-2" /> Submit Quote
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" /> Contact Buyer
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download RFQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
