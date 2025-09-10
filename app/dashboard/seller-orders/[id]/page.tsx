"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { FileText, Package, Calendar, Target, Eye, MessageSquare, Download, ChevronLeft } from "lucide-react";

// NOTE: This page uses the same mock data set as the seller-orders listing page.
// If you later move these data to a central store/service, replace the local mocks with that source.
const availableOrders = [
  {
    id: "CUST-101",
    buyerName: "Fashion Retail Co.",
    buyerEmail: "procurement@fashionretail.com",
    date: "2024-01-22",
    product: "Custom Linen Summer Dress",
    specifications:
      "Color: Sage Green; Size: M; Length: Maxi; Fabric: 100% Linen; Neckline: V-neck; Quantity: 50 units",
    quantity: 50,
    budget: 75.0,
    currency: "USD",
    deadline: "2024-02-28",
    requirements:
      "Need breathable fabric suitable for humid climate. Include extra buttons. Sustainable materials preferred.",
    status: "bidding_active",
    bidsReceived: 3,
    samples: {
      requested: true,
      cost: 15.0,
      deadline: "2024-02-05",
    },
  },
  {
    id: "CUST-102",
    buyerName: "EcoFashion",
    buyerEmail: "sourcing@ecofashion.com",
    date: "2024-01-21",
    product: "Classic Denim Jacket",
    specifications:
      "Wash: Light blue; Stitch: Contrast; Hardware: Nickel-free; Lining: Cotton; Quantity: 200 units",
    quantity: 200,
    budget: 55.0,
    currency: "USD",
    deadline: "2024-03-15",
    requirements:
      "Include XS to XXL. Private label inside neck. Sustainable denim preferred.",
    status: "bidding_active",
    bidsReceived: 5,
    samples: {
      requested: true,
      cost: 20.0,
      deadline: "2024-02-10",
    },
  },
];

const retailOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    customerEmail: "john@example.com",
    date: "2024-01-22",
    items: [
      { name: "Classic Denim Jacket", quantity: 1, price: "$79.99" },
      { name: "Slim Fit Chinos", quantity: 2, price: "$49.99" },
    ],
    total: "$179.97",
    status: "pending",
    shippingAddress: "123 Main St, New York, NY 10001",
    paymentStatus: "paid",
    notes: "Please ensure proper sizing for the chinos",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    date: "2024-01-21",
    items: [{ name: "Organic Cotton Hoodie", quantity: 2, price: "$59.99" }],
    total: "$119.98",
    status: "processing",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    paymentStatus: "paid",
    notes: "",
  },
];

export default function SellerOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Try to find a custom (available) order first
  const custom = availableOrders.find((o) => o.id === id);
  if (custom) {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex items-center gap-2 p-3 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e6f8ff] text-[#0369a1]">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">Back</span>
          </Button>
        </div>

        <header className="rounded-lg overflow-hidden mb-6 shadow-md bg-gradient-to-r from-white via-slate-50 to-white">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00BFFF] to-[#7dd3fc] rounded-lg flex items-center justify-center text-white font-semibold text-lg">{custom.product.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{custom.product}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{custom.buyerName} • {new Date(custom.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="text-xl font-semibold">${custom.budget.toFixed(2)}</div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className="bg-white text-[#00BFFF] border border-[#00BFFF]">{custom.bidsReceived} bids</Badge>
                  <span className="mt-2">
                    <Badge className={`px-3 py-1 ${custom.status === 'bidding_active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{custom.status === 'bidding_active' ? 'Active' : 'Closed'}</Badge>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5"/> Requirements</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Key buyer requirements and expectations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{custom.requirements}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Package className="h-4 w-4"/> <span className="font-medium text-gray-700">Quantity</span><span className="ml-auto">{custom.quantity} units</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> <span className="font-medium text-gray-700">Deadline</span><span className="ml-auto">{new Date(custom.deadline).toLocaleDateString()}</span></div>
                  {custom.samples?.requested ? (
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4"/> <span className="font-medium text-gray-700">Sample Cost</span><span className="ml-auto">${custom.samples.cost.toFixed(2)}</span></div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="h-4 w-4"/> No sample requested</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Specifications</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Technical specification provided by buyer</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded">{custom.specifications}</pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5"/> Bids & Responses</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Summary of received bids</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This listing currently has <span className="font-medium text-gray-900">{custom.bidsReceived}</span> responses. Sellers may submit bids from the seller dashboard.</p>
              </CardContent>
            </Card>
          </main>

          <aside className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Order Summary</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Quick view</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium text-lg">${custom.budget.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Bids Received</p>
                  <Badge className="bg-white text-[#00BFFF] border border-[#00BFFF]">{custom.bidsReceived}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{new Date(custom.deadline).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Actions</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Take action on this listing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">Contact Buyer</Button>
                <Button className="w-full">Submit Bid</Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="h-4 w-4"/>
                  <span>Download brief</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    );
  }

  // Try to find retail order
  const retail = retailOrders.find((r) => r.id === id);
  if (retail) {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex items-center gap-2 p-1 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e6f8ff] text-[#0369a1]">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">Back</span>
          </Button>
        </div>

        <header className="rounded-lg overflow-hidden mb-6 shadow-md bg-white">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Retail Order <span className="text-primary">{retail.id}</span></h1>
                <p className="text-sm text-muted-foreground mt-1">{retail.customer} • {new Date(retail.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`px-3 py-1 ${retail.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{retail.status}</Badge>
                <Badge className="bg-green-100 text-green-800">{retail.paymentStatus}</Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Items</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Products in this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {retail.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium text-gray-900">{item.price}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5"/> Shipping</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Recipient and address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Shipping Address</p>
                  <p className="text-sm text-muted-foreground mb-2">{retail.shippingAddress}</p>
                  {(retail as any).trackingNumber && <p className="text-sm">Tracking: <span className="font-medium">{(retail as any).trackingNumber}</span></p>}
                </div>
              </CardContent>
            </Card>
          </main>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5"/> Summary</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Order totals and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-lg">{retail.total}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className="bg-yellow-100 text-yellow-800">{retail.status}</Badge>
                </div>
                <div className="mt-2">
                  <Button variant="outline" className="w-full">Contact Customer</Button>
                  <Button variant="default" className="w-full mt-2">View Invoice</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-lg text-gray-600">Order not found</p>
    </div>
  );
}
