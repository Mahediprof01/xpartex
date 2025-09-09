"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Search,
  Eye,
  MessageSquare,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Users,
  Target,
  Calendar,
  FileText,
  Award,
  Plus,
  TrendingUp,
  Factory,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

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
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Browse More Orders
        </Button>
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
            {availableOrders.map((order) => (
              <Card key={order.id} className="border-2">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base">
                        {order.product}
                      </CardTitle>
                      <CardDescription>
                        {order.buyerName} •{" "}
                        {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-green-600">
                        Budget: ${order.budget.toFixed(2)}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="border border-[#00BFFF] bg-white text-[#00BFFF]"
                      >
                        {order.bidsReceived} bids
                      </Badge>
                      <Badge variant="default">
                        {order.status === "bidding_active"
                          ? "Active"
                          : "Closed"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Requirements
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {order.requirements}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Specifications
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {order.specifications}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Quantity: {order.quantity} units
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Deadline: {new Date(order.deadline).toLocaleDateString()}
                    </span>
                    {order.samples.requested && (
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Sample: ${order.samples.cost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          Submit Bid
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Submit Bid for {order.product}
                          </DialogTitle>
                          <DialogDescription>
                            Provide your competitive offer for this custom order
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="price">
                                Bid Price ({order.currency})
                              </Label>
                              <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={bidForm.price}
                                onChange={(e) =>
                                  setBidForm({
                                    ...bidForm,
                                    price: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quality">Quality Level</Label>
                              <Select
                                value={bidForm.quality}
                                onValueChange={(v) =>
                                  setBidForm({ ...bidForm, quality: v })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Standard">
                                    Standard
                                  </SelectItem>
                                  <SelectItem value="Premium">
                                    Premium
                                  </SelectItem>
                                  <SelectItem value="Luxury">Luxury</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="materials">
                              Materials & Specifications
                            </Label>
                            <Textarea
                              id="materials"
                              placeholder="Describe the materials and quality you'll use..."
                              value={bidForm.materials}
                              onChange={(e) =>
                                setBidForm({
                                  ...bidForm,
                                  materials: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="startDate">
                                Production Start Date
                              </Label>
                              <Input
                                id="startDate"
                                type="date"
                                value={bidForm.timeline.start}
                                onChange={(e) =>
                                  setBidForm({
                                    ...bidForm,
                                    timeline: {
                                      ...bidForm.timeline,
                                      start: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="endDate">Delivery Date</Label>
                              <Input
                                id="endDate"
                                type="date"
                                value={bidForm.timeline.end}
                                onChange={(e) =>
                                  setBidForm({
                                    ...bidForm,
                                    timeline: {
                                      ...bidForm.timeline,
                                      end: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="note">Additional Notes</Label>
                            <Textarea
                              id="note"
                              placeholder="Any additional information about your offer..."
                              value={bidForm.note}
                              onChange={(e) =>
                                setBidForm({ ...bidForm, note: e.target.value })
                              }
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1"
                              onClick={() => submitBid(order.id)}
                              disabled={
                                !bidForm.price ||
                                !bidForm.timeline.start ||
                                !bidForm.timeline.end
                              }
                            >
                              Submit Bid
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Save Draft
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Buyer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Bids Tab */}
        <TabsContent value="my-bids" className="space-y-6">
          <FilterSection type="custom" />

          <div className="space-y-4">
            {submittedBids.map((bid) => (
              <Card
                key={bid.id}
                className={`border-2 ${
                  bid.status === "accepted"
                    ? "border-green-200 bg-green-50"
                    : bid.status === "rejected"
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base">
                        {bid.orderProduct}
                      </CardTitle>
                      <CardDescription>
                        {bid.buyer} • Submitted on{" "}
                        {new Date(bid.submittedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          bidStatusConfig[bid.status]?.variant || "secondary"
                        }
                      >
                        {bidStatusConfig[bid.status]?.label || bid.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Bid Price
                        </div>
                        <div className="font-semibold text-lg">
                          ${bid.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Bid Details</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Quality:</span>{" "}
                          {bid.quality}
                        </p>
                        <p>
                          <span className="font-medium">Materials:</span>{" "}
                          {bid.materials}
                        </p>
                        <p>
                          <span className="font-medium">Timeline:</span>{" "}
                          {bid.timeline.start} → {bid.timeline.end}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Sample Status</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Provided:</span>{" "}
                          {bid.samples.provided ? "Yes" : "No"}
                        </p>
                        {bid.samples.provided && (
                          <>
                            <p>
                              <span className="font-medium">Cost:</span> $
                              {bid.samples.cost.toFixed(2)}
                            </p>
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              {bid.samples.status}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {bid.note && (
                    <div className="p-3 bg-white rounded border">
                      <p className="text-sm text-muted-foreground">
                        {bid.note}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Order
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Buyer
                    </Button>
                    {bid.status === "accepted" && (
                      <Button size="sm">Start Production</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Retail Orders Tab */}
        <TabsContent value="retail" className="space-y-6">
          <FilterSection type="retail" />

          <div className="space-y-4">
            {retailOrders.map((order) => {
              const statusInfo = statusConfig[order.status];
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Order {order.id}
                        </CardTitle>
                        <CardDescription>
                          {order.customer} • {order.customerEmail} •{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                        <Badge variant="outline" className="text-green-600">
                          {order.paymentStatus}
                        </Badge>
                        <span className="font-semibold text-lg">
                          {order.total}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          Items ({order.items.length})
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted rounded"
                            >
                              <span className="font-medium">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-medium">
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-3 bg-accent rounded-lg">
                          <p className="text-sm font-medium mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.shippingAddress}
                          </p>
                        </div>

                        {order.trackingNumber && (
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-1">
                              Tracking Number
                            </p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {order.trackingNumber}
                            </p>
                          </div>
                        )}
                      </div>

                      {order.notes && (
                        <div className="p-3 bg-accent rounded-lg">
                          <p className="text-sm font-medium mb-1">
                            Customer Notes
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.notes}
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
                          <MessageSquare className="h-4 w-4" />
                          Contact Customer
                        </Button>

                        {order.status === "pending" && (
                          <Button size="sm">Mark as Processing</Button>
                        )}

                        {order.status === "processing" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">Mark as Shipped</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Mark Order as Shipped</DialogTitle>
                                <DialogDescription>
                                  Provide tracking information for order{" "}
                                  {order.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="carrier">
                                    Shipping Carrier
                                  </Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select carrier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ups">UPS</SelectItem>
                                      <SelectItem value="fedex">
                                        FedEx
                                      </SelectItem>
                                      <SelectItem value="usps">USPS</SelectItem>
                                      <SelectItem value="dhl">DHL</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="tracking">
                                    Tracking Number
                                  </Label>
                                  <Input
                                    id="tracking"
                                    placeholder="Enter tracking number"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="notes">
                                    Additional Notes
                                  </Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Optional shipping notes..."
                                    rows={2}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button className="flex-1">
                                    Update Order
                                  </Button>
                                  <Button variant="outline">Cancel</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {order.trackingNumber && (
                          <Button variant="outline" size="sm">
                            Update Tracking
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
