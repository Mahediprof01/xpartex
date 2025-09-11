"use client";

import { useState } from "react";
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
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Search,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Package,
  Calendar,
  MessageSquare,
  Eye,
  Edit,
  Send,
  Download,
  MoreHorizontal,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";
import { createQuoteColumns } from "../../../components/columns";
import { DataTable } from "../../../components/ui/data-table";

// Enhanced quote requests data with proper flow states - One-to-One with Buyer
const quoteRequests = [
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
    requirements: [
      "Minimum 12oz denim weight",
      "Sustainable cotton sourcing",
      "Reinforced stitching",
      "Multiple size options (S-XXL)",
      "Custom branding available",
    ],
    specifications:
      "High-quality denim, sustainable materials, bulk order for retail",
    buyerNotes: "Looking for premium quality with quick turnaround",
    priority: "high",
    contactInfo: {
      name: "John Smith",
      email: "john@fashionretail.com",
      phone: "+1 (555) 123-4567",
    },
    previousOrders: 3,
    totalSpent: 8900,
    rfqDetails: {
      title: "Custom Denim Collection",
      description: "Custom denim jackets and jeans for spring collection",
      files: [
        { name: "design-specs.pdf", type: "pdf", size: "2.3 MB" },
        { name: "sample-images.jpg", type: "image", size: "1.1 MB" },
      ],
      negotiationRounds: 3,
      timeLimit: "2024-01-30",
    },
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
    requirements: [
      "100% organic cotton",
      "GOTS certification",
      "Natural dyes",
      "Fair trade practices",
      "Biodegradable packaging",
    ],
    specifications: "Eco-friendly t-shirts for sustainable fashion line",
    buyerNotes: "Sustainability is our top priority",
    priority: "medium",
    contactInfo: {
      name: "Sarah Johnson",
      email: "sarah@ecostyle.com",
      phone: "+1 (555) 987-6543",
    },
    previousOrders: 1,
    totalSpent: 3200,
    quoteSubmitted: {
      price: 7500,
      leadTime: "18-22 days",
      notes: "Can meet all requirements with GOTS certified materials",
      submittedAt: "2024-01-19",
      status: "submitted",
    },
    rfqDetails: {
      title: "Organic Cotton Products",
      description: "Organic cotton hoodies and t-shirts",
      files: [{ name: "product-specs.docx", type: "word", size: "1.8 MB" }],
      negotiationRounds: 2,
      timeLimit: "2024-01-25",
    },
  },
  {
    id: "QUOTE-003",
    rfqId: "RFQ-003",
    buyer: "Urban Outfitters",
    product: "Streetwear Collection",
    category: "Apparel",
    quantity: 750,
    budget: 12000,
    deadline: "2024-02-20",
    status: "accepted",
    requestDate: "2024-01-15",
    responseTime: "1 hour",
    requirements: [
      "Trendy streetwear styles",
      "Comfortable fit",
      "Durable materials",
      "Multiple colors",
      "Quick production",
    ],
    specifications: "Modern streetwear for young urban consumers",
    buyerNotes: "Need trendy designs that appeal to Gen Z",
    priority: "high",
    contactInfo: {
      name: "Mike Davis",
      email: "mike@urbanoutfitters.com",
      phone: "+1 (555) 456-7890",
    },
    previousOrders: 5,
    totalSpent: 15600,
    quoteSubmitted: {
      price: 11500,
      leadTime: "15-18 days",
      notes: "Perfect match for your target demographic",
      submittedAt: "2024-01-16",
      status: "accepted",
      acceptedAt: "2024-01-25",
    },
    orderDetails: {
      orderId: "ORD-001",
      orderDate: "2024-01-25",
      deliveryDate: "2024-02-15",
    },
    rfqDetails: {
      title: "Luxury Home Decor",
      description: "Premium home decoration items",
      files: [
        { name: "design-concept.ai", type: "ai", size: "5.2 MB" },
        { name: "materials-list.xlsx", type: "excel", size: "0.8 MB" },
      ],
      negotiationRounds: 3,
      timeLimit: "2024-01-28",
    },
  },
  {
    id: "QUOTE-004",
    rfqId: "RFQ-004",
    buyer: "Luxury Brands Inc.",
    product: "Premium Silk Blouses",
    category: "Apparel",
    quantity: 200,
    budget: 25000,
    deadline: "2024-03-01",
    status: "rejected",
    requestDate: "2024-01-12",
    responseTime: "6 hours",
    requirements: [
      "Premium silk quality",
      "Designer finishes",
      "Exclusive patterns",
      "Luxury packaging",
      "Hand-stitched details",
    ],
    specifications: "High-end silk blouses for luxury market",
    buyerNotes: "Quality over cost, must be exceptional",
    priority: "low",
    contactInfo: {
      name: "Emily Chen",
      email: "emily@luxurybrands.com",
      phone: "+1 (555) 321-0987",
    },
    previousOrders: 0,
    totalSpent: 0,
    quoteSubmitted: {
      price: 28000,
      leadTime: "25-30 days",
      notes: "Premium materials and craftsmanship",
      submittedAt: "2024-01-14",
      status: "rejected",
      rejectedAt: "2024-01-22",
    },
    rejectionReason: "Price exceeded budget expectations",
    rfqDetails: {
      title: "Premium Silk Collection",
      description: "High-end silk blouses for luxury market",
      files: [
        { name: "design-specs.pdf", type: "pdf", size: "3.1 MB" },
        { name: "fabric-samples.jpg", type: "image", size: "2.2 MB" },
      ],
      negotiationRounds: 3,
      timeLimit: "2024-01-30",
    },
  },
];

const statusConfig = {
  pending: {
    label: "Pending Response",
    variant: "secondary",
    color: "text-yellow-600",
  },
  responded: {
    label: "Quote Submitted",
    variant: "outline",
    color: "text-blue-600",
  },
  accepted: {
    label: "Order Accepted",
    variant: "default",
    color: "text-green-600",
  },
  rejected: {
    label: "Quote Rejected",
    variant: "destructive",
    color: "text-red-600",
  },
  expired: { label: "Expired", variant: "outline", color: "text-gray-600" },
};

const priorityConfig = {
  high: { label: "High", variant: "destructive", color: "text-red-600" },
  medium: { label: "Medium", variant: "default", color: "text-blue-600" },
  low: { label: "Low", variant: "secondary", color: "text-gray-600" },
};

const QuoteCard = ({ quote, onRespond, onViewDetails, onContact }) => {
  const statusInfo = statusConfig[quote.status];
  const priorityInfo = priorityConfig[quote.priority];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{quote.product}</h3>
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
              <Badge variant={priorityInfo.variant} className="text-xs">
                {priorityInfo.label} Priority
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {quote.buyer}
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {quote.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Due: {new Date(quote.deadline).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm mb-2">
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Qty: {quote.quantity.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Budget: ${quote.budget.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {quote.responseTime} response time
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onViewDetails(quote)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onContact(quote)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Buyer
                </DropdownMenuItem>
                {quote.status === "pending" && (
                  <DropdownMenuItem onClick={() => onRespond(quote)}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Quote
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download RFQ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {quote.specifications}
        </p>

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Key Requirements:</h4>
          <div className="flex flex-wrap gap-2">
            {quote.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {quote.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{quote.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Buyer Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {quote.previousOrders}
            </div>
            <div className="text-xs text-muted-foreground">Previous Orders</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-green-600">
              ${quote.totalSpent.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
        </div>

        {/* Quote Status */}
        {quote.status === "responded" && quote.quoteSubmitted && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Quote Submitted
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Price: </span>
                <span className="font-medium">
                  ${quote.quoteSubmitted.price.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-blue-600">Lead Time: </span>
                <span className="font-medium">
                  {quote.quoteSubmitted.leadTime}
                </span>
              </div>
            </div>
            {quote.quoteSubmitted.notes && (
              <p className="text-sm text-blue-700 mt-2">
                {quote.quoteSubmitted.notes}
              </p>
            )}
          </div>
        )}

        {quote.status === "accepted" && quote.orderDetails && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="text-sm font-medium text-green-800 mb-2">
              Order Accepted!
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600">Order ID: </span>
                <span className="font-medium">
                  {quote.orderDetails.orderId}
                </span>
              </div>
              <div>
                <span className="text-green-600">Delivery: </span>
                <span className="font-medium">
                  {new Date(
                    quote.orderDetails.deliveryDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {quote.status === "rejected" && quote.rejectionReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              Quote Rejected
            </h4>
            <p className="text-sm text-red-700">{quote.rejectionReason}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(quote)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>

          {quote.status === "pending" ? (
            <Button
              size="sm"
              onClick={() => onRespond(quote)}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Quote
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContact(quote)}
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function QuotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const filteredQuotes = quoteRequests.filter((quote) => {
    const matchesSearch =
      quote.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.specifications.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || quote.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || quote.category === filterCategory;
    const matchesPriority =
      filterPriority === "all" || quote.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline);
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "budget":
        return b.budget - a.budget;
      case "date":
        return new Date(b.requestDate) - new Date(a.requestDate);
      default:
        return 0;
    }
  });

  const handleRespond = (quote) => {
    setSelectedQuote(quote);
    setIsQuoteModalOpen(true);
  };

  const handleViewDetails = (quote) => {
  setSelectedQuote(quote);
  setIsQuoteModalOpen(true);
  };

  const handleContact = (quote) => {
    console.log("Contact buyer for:", quote.id);
  };

  const getStatsByStatus = () => {
    const stats = {
      pending: 0,
      responded: 0,
      accepted: 0,
      rejected: 0,
      expired: 0,
    };

    quoteRequests.forEach((quote) => {
      stats[quote.status]++;
    });

    return stats;
  };

  const stats = getStatsByStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-full md:w-96 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            submit Quote
          </Button>
        </div>
      </div>

      {/* Quote Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quoteRequests.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responded</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.responded}
            </div>
            <p className="text-xs text-muted-foreground">Quote submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.accepted}
            </div>
            <p className="text-xs text-muted-foreground">Orders won</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">Quotes declined</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Apparel">Apparel</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Machinery">Machinery</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline (Earliest)</SelectItem>
                <SelectItem value="priority">Priority (High to Low)</SelectItem>
                <SelectItem value="budget">Budget (High to Low)</SelectItem>
                <SelectItem value="date">Request Date (Newest)</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground">
              {filteredQuotes.length} quote
              {filteredQuotes.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table (matches RFQs table design) */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>Manage and respond to RFQ quote requests from buyers</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={createQuoteColumns(handleViewDetails, handleRespond)} data={sortedQuotes} />
        </CardContent>
      </Card>

      {/* Load More */}
      {filteredQuotes.length > 0 && (
        <div className="text-center">
          <Button variant="outline">Load More Quotes</Button>
        </div>
      )}

      {/* No Results */}
      {filteredQuotes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No quote requests found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
                setFilterCategory("all");
                setFilterPriority("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Submit Quote Modal */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Quote for {selectedQuote?.product}</DialogTitle>
            <DialogDescription>
              Provide your competitive quote and terms for this RFQ
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price *</Label>
                  <Input id="unitPrice" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Total Price</Label>
                  <Input
                    id="totalPrice"
                    type="number"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time *</Label>
                  <Input id="leadTime" placeholder="e.g., 15-20 days" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Min. Order Quantity</Label>
                  <Input id="minOrder" type="number" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quoteNotes">Quote Notes</Label>
                <Textarea
                  id="quoteNotes"
                  placeholder="Explain your quote, quality guarantees, additional services..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Services</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="samples" />
                    <Label htmlFor="samples">Provide samples</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="customization" />
                    <Label htmlFor="customization">
                      Customization available
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="warranty" />
                    <Label htmlFor="warranty">Extended warranty</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Submit Quote</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsQuoteModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
