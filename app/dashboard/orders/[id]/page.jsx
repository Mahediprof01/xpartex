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
import {
  ArrowLeft,
  FileText,
  Package,
  ClipboardCheck,
  Gavel,
  DollarSign,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  MessageSquare,
  Download,
  Users,
} from "lucide-react";

// Mock data fetching function, similar to the RFQ page
const getOrderById = (id) => {
  const orders = [
    {
      id: "CUST-001",
      placedOn: "2024-01-15",
      requirements: "High-quality, sustainable materials, bulk order for retail",
      products: [
        { name: "Classic Denim Jacket" },
        { name: "Slim Fit Chinos" },
        { name: "Cotton T-Shirt" },
      ],
      sampleRequest: {
        status: "Approved",
        supplier: "UrbanWear Co.",
        cost: "$25.00",
      },
      supplierBids: [
        {
          id: "BID-001",
          supplier: "UrbanWear Co.",
          quality: "Premium+ Materials: Organic denim, sustainable trims",
          timeline: "2024-01-10 to 2024-01-15",
          price: 189.97,
          status: "accepted",
        },
        {
          id: "BID-002",
          supplier: "EcoFashion",
          quality: "Standard+ Materials: Recycled denim, basic trims",
          timeline: "2024-01-12 to 2024-01-18",
          price: 175.50,
          status: "rejected",
        },
        {
          id: "BID-003",
          supplier: "StyleHub",
          quality: "Premium+ Materials: Premium denim, luxury trims",
          timeline: "2024-01-08 to 2024-01-20",
          price: 210.00,
          status: "pending",
        },
      ],
      budget: 200.00,
      bidding: "Closed",
    },
    // Add more mock orders if needed
  ];
  // Mock retail orders (these mirror the list in the Orders page)
  const retailOrders = [
    {
      id: "RETAIL-001",
      placedOn: "2024-01-08",
      customer: "John Doe",
      products: [
        { name: "Floral Maxi Dress" },
        { name: "Lightweight Cardigan" },
      ],
      total: "$119.98",
      status: "delivered",
      trackingNumber: "TRK456789123",
      shippingAddress: "123 Main St, City, State 12345",
    },
    {
      id: "RETAIL-002",
      placedOn: "2024-01-05",
      customer: "Jane Smith",
      products: [{ name: "Faux Fur Coat" }],
      total: "$89.99",
      status: "shipped",
      trackingNumber: "TRK789123456",
      shippingAddress: "456 Oak Ave, Town, State 67890",
    },
  ];

  const foundCustom = orders.find((order) => order.id === id);
  if (foundCustom) return foundCustom;

  const foundRetail = retailOrders.find((r) => r.id === id);
  if (foundRetail) return foundRetail;

  return undefined;
};

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Order not found</p>
      </div>
    );
  }

  const getBidStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptBid = (bidId) => {
    alert(`Bid ${bidId} accepted!`);
  };

  const handleRejectBid = (bidId) => {
    alert(`Bid ${bidId} rejected!`);
  };

  const handleNegotiate = (bidId) => {
    alert(`Negotiating bid ${bidId}...`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full px-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </Button>
        </div>

        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Custom Order {order.id}</h1>
              <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.placedOn).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Badge className="bg-blue-100 text-blue-800 text-base px-3 py-1">Bidding {order.bidding}</Badge>
            </div>
          </div>
        </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements - only for orders that have it (custom/wholesale) */}
            {order.requirements && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.requirements}</p>
                </CardContent>
              </Card>
            )}

            {/* Products */}
            {order.products && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-blue-500" />
                    Products ({order.products.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {order.products.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Sample Request - optional */}
            {order.sampleRequest && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardCheck className="h-5 w-5 mr-2 text-blue-500" />
                    Sample Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{order.sampleRequest.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Supplier</p>
                    <p className="font-medium">{order.sampleRequest.supplier || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="font-medium">{order.sampleRequest.cost || '-'}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Supplier Bids - optional */}
            {order.supplierBids && order.supplierBids.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gavel className="h-5 w-5 mr-2 text-blue-500" />
                    Supplier Bids ({order.supplierBids.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.supplierBids.map((bid) => (
                    <div key={bid.id} className={`p-4 rounded-lg border ${
                      bid.status === 'accepted' ? 'bg-green-50 border-green-200' : 
                      bid.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-white'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{bid.supplier}</h4>
                          <p className="text-sm text-gray-600">{bid.quality}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            {bid.timeline}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-green-600">${bid.price.toFixed(2)}</p>
                          <Badge className={`${getBidStatusBadge(bid.status)} mt-1`}>{bid.status}</Badge>
                        </div>
                      </div>
                      {bid.status === 'pending' && (
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" onClick={() => handleAcceptBid(bid.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept Bid
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectBid(bid.id)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleNegotiate(bid.id)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Negotiate
                          </Button>
                        </div>
                      )}
                       {bid.status === 'accepted' && (
                        <div className="mt-3 text-sm font-semibold text-green-800 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2" /> Accepted
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* For retail orders show customer, shipping and totals */}
            {order.customer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    Retail Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="font-medium text-right">{order.shippingAddress}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium text-lg">{order.total}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary / Bidding summary for custom orders */}
            {!order.customer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium text-lg">${order.budget?.toLocaleString?.()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Bidding Status</p>
                    <Badge className="bg-blue-100 text-blue-800">{order.bidding}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                 <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" /> Download Specs
                 </Button>
                 <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" /> Contact Suppliers
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
