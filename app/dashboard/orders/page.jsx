"use client";

import React, { useState } from "react";
import useAuthStore from "../../../store/authStore";
import useCustomOrderStore from "../../../store/customOrderStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { DataTable } from "../../../components/ui/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Search,
  Eye,
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  Factory,
  DollarSign,
  MessageSquare,
  FileText,
  Award,
  Users,
  Calendar,
  Target,
  AlertCircle,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// Buyer's custom orders with supplier bids
const customOrders = [
  {
    id: "CUST-001",
    date: "2024-01-15",
    buyer: "Fashion Retail Co.",
    items: 3,
    budget: 200.0,
    status: "bidding_closed",
    trackingNumber: "TRK123456789",
    products: ["Classic Denim Jacket", "Slim Fit Chinos", "Cotton T-Shirt"],
    requirements:
      "High-quality denim, sustainable materials, bulk order for retail",
    deadline: "2024-02-15",
    samples: {
      requested: true,
      status: "approved",
      supplier: "UrbanWear Co.",
      cost: 25.0,
    },
    bids: [
      {
        supplier: "UrbanWear Co.",
        price: 189.97,
        status: "accepted",
        timeline: { start: "2024-01-10", end: "2024-01-15" },
        quality: "Premium",
        materials: "Organic denim, sustainable trims",
        advancePaid: true,
        note: "Delivered as per schedule",
      },
      {
        supplier: "EcoFashion",
        price: 175.5,
        status: "rejected",
        timeline: { start: "2024-01-12", end: "2024-01-18" },
        quality: "Standard",
        materials: "Recycled denim, basic trims",
        note: "Below quality standards",
      },
      {
        supplier: "StyleHub",
        price: 210.0,
        status: "rejected",
        timeline: { start: "2024-01-08", end: "2024-01-20" },
        quality: "Premium",
        materials: "Premium denim, luxury trims",
        note: "Exceeded budget",
      },
    ],
  },
  {
    id: "CUST-002",
    date: "2024-01-12",
    buyer: "EcoFashion",
    items: 2,
    budget: 150.0,
    status: "bidding_active",
    trackingNumber: null,
    products: ["Organic Cotton Hoodie", "Linen Summer Dress"],
    requirements:
      "100% organic materials, eco-friendly packaging, small batch production",
    deadline: "2024-02-10",
    samples: {
      requested: true,
      status: "pending",
      supplier: null,
      cost: 0,
    },
    bids: [
      {
        supplier: "GreenTextiles",
        price: 139.98,
        status: "pending",
        timeline: { start: "2024-01-15", end: "2024-01-25" },
        quality: "Premium",
        materials: "GOTS certified organic cotton, natural dyes",
        note: "Awaiting buyer response",
      },
      {
        supplier: "EcoSupplies",
        price: 145.0,
        status: "pending",
        timeline: { start: "2024-01-18", end: "2024-01-28" },
        quality: "Standard",
        materials: "Organic cotton, eco-friendly trims",
        note: "Competitive pricing",
      },
    ],
  },
  {
    id: "CUST-003",
    date: "2024-01-10",
    buyer: "StyleHub",
    items: 4,
    budget: 300.0,
    status: "bidding_active",
    trackingNumber: null,
    products: [
      "Wool Blend Overcoat",
      "Premium Jeans",
      "Silk Blouse",
      "Casual Sweater",
    ],
    requirements: "Luxury materials, premium finishing, designer quality",
    deadline: "2024-02-20",
    samples: {
      requested: false,
      status: "not_requested",
      supplier: null,
      cost: 0,
    },
    bids: [
      {
        supplier: "LuxuryFabrics",
        price: 256.75,
        status: "pending",
        timeline: { start: "2024-01-20", end: "2024-02-05" },
        quality: "Premium",
        materials: "Merino wool, silk, premium denim",
        note: "Updated trims cost, awaiting approval",
      },
      {
        supplier: "PremiumManufacturing",
        price: 285.0,
        status: "pending",
        timeline: { start: "2024-01-22", end: "2024-02-08" },
        quality: "Premium",
        materials: "Cashmere blend, premium silk, designer denim",
        note: "Luxury finish guarantee",
      },
    ],
  },
];

// Buyer's retail orders (orders they've placed for themselves)
const retailOrders = [
  {
    id: "RETAIL-001",
    date: "2024-01-08",
    customer: "John Doe",
    items: 2,
    total: "$119.98",
    status: "delivered",
    trackingNumber: "TRK456789123",
    products: ["Floral Maxi Dress", "Lightweight Cardigan"],
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "RETAIL-002",
    date: "2024-01-05",
    customer: "Jane Smith",
    items: 1,
    total: "$89.99",
    status: "shipped",
    trackingNumber: "TRK789123456",
    products: ["Faux Fur Coat"],
    shippingAddress: "456 Oak Ave, Town, State 67890",
  },
  {
    id: "RETAIL-003",
    date: "2024-01-03",
    customer: "Mike Johnson",
    items: 3,
    total: "$167.97",
    status: "processing",
    trackingNumber: null,
    products: ["Athletic Leggings", "Sports Bra", "Running Shorts"],
    shippingAddress: "789 Pine Rd, Village, State 11111",
  },
];

const statusConfig = {
  bidding_active: {
    label: "Bidding Active",
    icon: Users,
    variant: "default",
    color: "text-blue-600",
  },
  bidding_closed: {
    label: "Bidding Closed",
    variant: "secondary",
    color: "text-gray-600",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary",
    color: "text-yellow-600",
  },
  processing: {
    label: "Processing",
    icon: Package,
    variant: "default",
    color: "text-primary",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    variant: "outline",
    color: "text-purple-600",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    variant: "default",
    color: "text-green-600",
  },
};

const BidCard = ({ bid, orderBudget, onAccept, onReject, onNegotiate }) => {
  const isWithinBudget = bid.price <= orderBudget;
  const isAccepted = bid.status === "accepted";
  const isRejected = bid.status === "rejected";
  const isPending = bid.status === "pending";

  return (
    <Card
      className={`border-2 ${
        isAccepted
          ? "border-green-200 bg-green-50"
          : isRejected
          ? "border-red-200 bg-red-50"
          : "border-gray-200"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{bid.supplier}</CardTitle>
            <CardDescription className="text-sm">
              Quality: {bid.quality} • Materials: {bid.materials}
            </CardDescription>
          </div>
          <div className="text-right">
            <div
              className={`text-lg font-bold ${
                isWithinBudget ? "text-green-600" : "text-red-600"
              }`}
            >
              ${bid.price.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {isWithinBudget ? "Within Budget" : "Over Budget"}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Timeline:</span>
            <span className="font-medium">
              {bid.timeline.start} → {bid.timeline.end}
            </span>
          </div>

          {bid.note && (
            <p className="text-sm text-muted-foreground bg-white p-2 rounded border">
              {bid.note}
            </p>
          )}

          {isPending && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onAccept(bid)}
                disabled={!isWithinBudget}
                className="flex-1"
              >
                Accept Bid
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(bid)}
                className="flex-1"
              >
                Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNegotiate(bid)}
                className="flex-1"
              >
                Negotiate
              </Button>
            </div>
          )}

          {isAccepted && (
            <Badge variant="default" className="w-full justify-center">
              ✓ Accepted
            </Badge>
          )}

          {isRejected && (
            <Badge variant="destructive" className="w-full justify-center">
              ✗ Rejected
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const SampleRequestCard = ({ sample, onRequestSample, onApproveSample }) => {
  if (!sample.requested) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="pt-6">
          <div className="text-center">
            <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              No sample requested yet
            </p>
            <Button size="sm" onClick={onRequestSample}>
              Request Sample
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Sample Request</CardTitle>
        <CardDescription>
          Status:{" "}
          {sample.status === "pending" ? "Awaiting Approval" : "Approved"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Supplier:</span>
            <span className="font-medium">
              {sample.supplier || "Not assigned"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Cost:</span>
            <span className="font-medium">${sample.cost.toFixed(2)}</span>
          </div>

          {sample.status === "pending" && (
            <div className="flex gap-2">
              <Button size="sm" onClick={onApproveSample} className="flex-1">
                Approve Sample
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Request Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderCard = ({ order, type }) => {
  const statusInfo = statusConfig[order.status];

  if (type === "custom") {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Custom Order {order.id}</CardTitle>
              <CardDescription>
                Placed on {new Date(order.date).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={statusInfo?.variant || "secondary"}
                className="flex items-center gap-1 bg-primary text-primary-foreground"
              >
                {statusInfo?.label || order.status}
              </Badge>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Budget</div>
                <div className="font-semibold text-lg">
                  ${order.budget.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Order Requirements */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Requirements
              </h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {order.requirements}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Deadline: {new Date(order.deadline).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {order.items} items
                </span>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-medium mb-2">Products ({order.items})</h4>
              <div className="flex flex-wrap gap-2">
                {order.products.map((product, index) => (
                  <Badge key={index} variant="outline">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sample Request */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Sample Request
              </h4>
              <SampleRequestCard
                sample={order.samples}
                onRequestSample={() =>
                  console.log("Request sample for", order.id)
                }
                onApproveSample={() =>
                  console.log("Approve sample for", order.id)
                }
              />
            </div>

            {/* Bidding Section */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Supplier Bids ({order.bids.length})
              </h4>
              <div className="space-y-3">
                {order.bids.map((bid, index) => (
                  <BidCard
                    key={index}
                    bid={bid}
                    orderBudget={order.budget}
                    onAccept={(bid) =>
                      console.log("Accept bid from", bid.supplier)
                    }
                    onReject={(bid) =>
                      console.log("Reject bid from", bid.supplier)
                    }
                    onNegotiate={(bid) =>
                      console.log("Negotiate with", bid.supplier)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Suppliers
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Download Specs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Retail order display (existing code)
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Retail Order {order.id}</CardTitle>
            <CardDescription>
              Placed on {new Date(order.date).toLocaleDateString()} •{" "}
              {order.customer}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={statusConfig[order.status]?.variant || "secondary"}
              className="flex items-center gap-1 bg-primary text-primary-foreground"
            >
              {statusConfig[order.status]?.label || order.status}
            </Badge>
            <span className="font-semibold text-lg">{order.total}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Products ({order.items})</h4>
            <div className="flex flex-wrap gap-2">
              {order.products.map((product, index) => (
                <Badge key={index} variant="outline">
                  {product}
                </Badge>
              ))}
            </div>
          </div>

          {/* Retail Order Customer Info */}
          {type === "retail" && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Shipping Address</p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress}
              </p>
            </div>
          )}

          {order.trackingNumber && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Tracking Number</p>
              <p className="text-sm text-muted-foreground font-mono">
                {order.trackingNumber}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            {order.trackingNumber && (
              <Button variant="outline" size="sm">
                Track Package
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FilterSection = ({ type }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">
        Filter {type === "custom" ? "Custom" : "Retail"} Orders
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${
              type === "custom" ? "custom" : "retail"
            } orders...`}
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {type === "custom" ? (
              <>
                <SelectItem value="bidding_active">Bidding Active</SelectItem>
                <SelectItem value="bidding_closed">Bidding Closed</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="amount-high">Amount: High to Low</SelectItem>
            <SelectItem value="amount-low">Amount: Low to High</SelectItem>
            {type === "custom" && (
              <>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

export default function OrdersPage() {
  const { user } = useAuthStore();
  const { customOrders: userCustomOrders } = useCustomOrderStore();
  
  // Combine mock data with user's real custom orders
  const allCustomOrders = [...customOrders, ...userCustomOrders];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground">
            Manage your custom manufacturing orders and retail purchases
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Place Custom Order
        </Button>
      </div>

      <Tabs defaultValue="custom" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Factory className="h-4 w-4" />
            Custom Orders
            <Badge variant="secondary" className="ml-2 bg-[#00BFFF] text-white">
              {customOrders.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="retail" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Retail Orders
            <Badge variant="secondary" className="ml-2 bg-[#00BFFF] text-white">
              {retailOrders.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-6">
          <FilterSection type="custom" />

          <div className="space-y-4">
            {allCustomOrders.map((order) => (
              <OrderCard key={order.id} order={order} type="custom" />
            ))}
          </div>

          {allCustomOrders.length > 0 && (
            <div className="text-center">
              <Button variant="outline">Load More Custom Orders</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="retail" className="space-y-6">
          <FilterSection type="retail" />

          <div className="space-y-4">
            {retailOrders.map((order) => (
              <OrderCard key={order.id} order={order} type="retail" />
            ))}
          </div>

          {retailOrders.length > 0 && (
            <div className="text-center">
              <Button variant="outline">Load More Retail Orders</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
