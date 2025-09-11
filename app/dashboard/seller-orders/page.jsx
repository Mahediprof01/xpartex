"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Target,
  Award,
  TrendingUp,
  Factory,
  ShoppingBag,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "../../../components/ui/data-table";
import { createOrderColumns } from "../../../components/columns";

// Available custom orders for sellers to bid on
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
  {
    id: "CUST-103",
    buyerName: "StyleHub",
    buyerEmail: "orders@stylehub.com",
    date: "2024-01-20",
    product: "Wool Blend Overcoat",
    specifications:
      "Fabric: 70% Wool, 30% Polyester; Color: Navy; Sizes: S-XXL; Quantity: 100 units",
    quantity: 100,
    budget: 120.0,
    currency: "USD",
    deadline: "2024-03-20",
    requirements:
      "Premium finish, double-breasted design, inner pocket. Luxury feel required.",
    status: "bidding_active",
    bidsReceived: 2,
    samples: {
      requested: false,
      cost: 0,
      deadline: null,
    },
  },
];

// Seller's submitted bids
const submittedBids = [
  {
    id: "BID-001",
    orderId: "CUST-101",
    orderProduct: "Custom Linen Summer Dress",
    buyer: "Fashion Retail Co.",
    submittedDate: "2024-01-23",
    price: 68.5,
    currency: "USD",
    status: "pending",
    timeline: { start: "2024-02-01", end: "2024-02-25" },
    quality: "Premium",
    materials: "GOTS certified organic linen, natural dyes",
    note: "Can provide samples within 5 days. Sustainable packaging included.",
    samples: {
      provided: true,
      cost: 15.0,
      status: "approved",
    },
  },
  {
    id: "BID-002",
    orderId: "CUST-102",
    orderProduct: "Classic Denim Jacket",
    buyer: "EcoFashion",
    submittedDate: "2024-01-22",
    price: 52.0,
    currency: "USD",
    status: "accepted",
    timeline: { start: "2024-02-15", end: "2024-03-10" },
    quality: "Premium",
    materials: "Recycled denim, sustainable trims",
    note: "Accepted! Starting production on schedule.",
    samples: {
      provided: true,
      cost: 20.0,
      status: "approved",
    },
  },
  {
    id: "BID-003",
    orderId: "CUST-103",
    orderProduct: "Wool Blend Overcoat",
    buyer: "StyleHub",
    submittedDate: "2024-01-21",
    price: 115.0,
    currency: "USD",
    status: "rejected",
    timeline: { start: "2024-02-20", end: "2024-03-15" },
    quality: "Premium",
    materials: "Premium wool blend, luxury lining",
    note: "Rejected due to higher price than budget. Consider reducing quality to meet budget.",
    samples: {
      provided: false,
      cost: 0,
      status: "not_requested",
    },
  },
];

// Regular retail orders
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
  {
    id: "ORD-003",
    customer: "Mike Davis",
    customerEmail: "mike@example.com",
    date: "2024-01-20",
    items: [
      { name: "Wool Blend Overcoat", quantity: 1, price: "$129.99" },
      { name: "Silk Blouse", quantity: 1, price: "$89.99" },
    ],
    total: "$219.98",
    status: "shipped",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    paymentStatus: "paid",
    trackingNumber: "TRK123456789",
    notes: "Customer requested expedited shipping for the overcoat",
  },
];

const statusConfig = {
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
  cancelled: {
    label: "Cancelled",
    icon: AlertCircle,
    variant: "destructive",
    color: "text-red-600",
  },
};

const bidStatusConfig = {
  pending: {
    label: "Pending Review",
    variant: "secondary",
    color: "text-yellow-600",
  },
  accepted: {
    label: "Accepted",
    variant: "default",
    color: "text-green-600",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    color: "text-red-600",
  },
  under_negotiation: {
    label: "Under Negotiation",
    variant: "outline",
    color: "text-blue-600",
  },
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
              type === "custom" ? "custom orders" : "retail orders"
            }...`}
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

export default function SellerOrdersPage() {
  const router = useRouter();
  const [bidForm, setBidForm] = useState({
    orderId: null,
    price: "",
    timeline: { start: "", end: "" },
    quality: "Standard",
    materials: "",
    note: "",
    sampleCost: "",
    provideSample: false,
  });

  const submitBid = (orderId) => {
    console.log("Submitting bid for order:", orderId, bidForm);
    setBidForm({
      orderId: null,
      price: "",
      timeline: { start: "", end: "" },
      quality: "Standard",
      materials: "",
      note: "",
      sampleCost: "",
      provideSample: false,
    });
  };

  // Normalize data for the table columns used across tabs
  // Navigate to seller-specific detail page so the correct mock data is found
  const columns = useMemo(() => createOrderColumns((order) => router.push(`/dashboard/seller-orders/${order.id}`)), [router]);

  const availableTableData = useMemo(() =>
    availableOrders.map((o) => ({
      id: o.id,
      product: o.product,
      category: "",
      type: "custom",
      supplier: o.buyerName,
      status: o.status === "bidding_active" ? "pending" : "confirmed",
      fulfillmentStatus: o.samples?.requested ? "processing" : "pending",
      quantity: o.quantity,
      price: o.budget,
      orderDate: o.date,
      estimatedDelivery: o.deadline,
      trackingNumber: null,
      raw: o,
    })), []);

  const bidsTableData = useMemo(() =>
    submittedBids.map((b) => ({
      id: b.orderId,
      product: b.orderProduct,
      category: "",
      type: "custom",
      supplier: b.buyer,
      status: b.status,
      fulfillmentStatus: "pending",
      quantity: 0,
      price: b.price,
      orderDate: b.submittedDate,
      estimatedDelivery: b.timeline?.end || b.timeline?.start || new Date().toISOString(),
      trackingNumber: null,
      raw: b,
    })), []);

  const retailTableData = useMemo(() =>
    retailOrders.map((r) => ({
      id: r.id,
      product: r.items ? r.items.map((i) => i.name).join(", ") : "Retail Order",
      category: "",
      type: "retail",
      supplier: "Retail",
      status: r.status,
      fulfillmentStatus: r.status,
      quantity: r.items ? r.items.reduce((s, it) => s + (it.quantity || 0), 0) : r.items.length || 0,
      price: Number(String(r.total || "").replace(/[^0-9.-]+/g, "")) || 0,
      orderDate: r.date,
      estimatedDelivery: r.date,
      trackingNumber: r.trackingNumber || null,
      raw: r,
    })), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Seller Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your bids and retail orders
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submittedBids.filter((b) => b.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted Bids</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submittedBids.filter((b) => b.status === "accepted").length}
            </div>
            <p className="text-xs text-muted-foreground">Won contracts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Orders
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableOrders.length}</div>
            <p className="text-xs text-muted-foreground">Open for bidding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847.50</div>
            <p className="text-xs text-muted-foreground">From accepted bids</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Available Orders
            <Badge variant="secondary" className="ml-2 bg-[#00BFFF] text-white">
              {availableOrders.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="my-bids" className="flex items-center gap-2">
            <Factory className="h-4 w-4" />
            My Bids
            <Badge variant="secondary" className="ml-2 bg-[#00BFFF] text-white">
              {submittedBids.length}
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

        {/* Available Orders Tab */}
        <TabsContent value="available" className="space-y-6">
          <FilterSection type="custom" />

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="p-4">
                    <DataTable columns={columns} data={availableTableData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Bids Tab */}
        <TabsContent value="my-bids" className="space-y-6">
          <FilterSection type="custom" />

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="p-4">
                    <DataTable columns={columns} data={bidsTableData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Retail Orders Tab */}
        <TabsContent value="retail" className="space-y-6">
          <FilterSection type="retail" />

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <div className="p-4">
                    <DataTable columns={columns} data={retailTableData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
