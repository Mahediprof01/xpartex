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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Search,
  Filter,
  Star,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Clock,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  MessageSquare,
  Eye,
  Heart,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const suppliers = [
  {
    id: "SUP-001",
    name: "UrbanWear Co.",
    category: "Apparel",
    location: "New York, USA",
    rating: 4.8,
    reviews: 156,
    verified: true,
    certified: ["ISO 9001", "GOTS", "OEKO-TEX"],
    specialties: ["Denim", "Sustainable Fashion", "Bulk Manufacturing"],
    minOrder: 100,
    leadTime: "15-20 days",
    responseTime: "2 hours",
    totalOrders: 89,
    totalSpend: 45600,
    lastOrder: "2024-01-15",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "sales@urbanwear.com",
      website: "www.urbanwear.com",
    },
    description:
      "Premium denim and sustainable fashion manufacturer with over 15 years of experience in the industry.",
    strengths: ["Quality", "Sustainability", "Fast Response"],
    weaknesses: ["Higher Pricing", "Limited Customization"],
    status: "active",
  },
  {
    id: "SUP-002",
    name: "EcoFashion",
    category: "Apparel",
    location: "Los Angeles, USA",
    rating: 4.6,
    reviews: 98,
    verified: true,
    certified: ["GOTS", "Fair Trade", "Organic"],
    specialties: ["Organic Cotton", "Eco-friendly", "Small Batch"],
    minOrder: 50,
    leadTime: "20-25 days",
    responseTime: "4 hours",
    totalOrders: 67,
    totalSpend: 28900,
    lastOrder: "2024-01-18",
    contact: {
      phone: "+1 (555) 987-6543",
      email: "info@ecofashion.com",
      website: "www.ecofashion.com",
    },
    description:
      "Specialized in organic and sustainable fashion with a focus on environmental responsibility.",
    strengths: ["Sustainability", "Organic Materials", "Ethical Practices"],
    weaknesses: ["Longer Lead Times", "Higher MOQ"],
    status: "active",
  },
  {
    id: "SUP-003",
    name: "GreenTech Solutions",
    category: "Electronics",
    location: "San Francisco, USA",
    rating: 4.9,
    reviews: 234,
    verified: true,
    certified: ["ISO 14001", "RoHS", "Energy Star"],
    specialties: ["Green Technology", "IoT Devices", "Smart Home"],
    minOrder: 200,
    leadTime: "25-30 days",
    responseTime: "1 hour",
    totalOrders: 145,
    totalSpend: 89000,
    lastOrder: "2024-01-20",
    contact: {
      phone: "+1 (555) 456-7890",
      email: "sales@greentech.com",
      website: "www.greentech.com",
    },
    description:
      "Leading provider of sustainable electronics and smart home solutions with cutting-edge technology.",
    strengths: ["Innovation", "Quality", "Customer Service"],
    weaknesses: ["Premium Pricing", "Complex Products"],
    status: "active",
  },
  {
    id: "SUP-004",
    name: "OfficeMax Pro",
    category: "Furniture",
    location: "Chicago, USA",
    rating: 4.7,
    reviews: 187,
    verified: true,
    certified: ["FSC", "GREENGUARD", "BIFMA"],
    specialties: ["Office Furniture", "Ergonomic Design", "Modular Solutions"],
    minOrder: 25,
    leadTime: "18-22 days",
    responseTime: "3 hours",
    totalOrders: 112,
    totalSpend: 67000,
    lastOrder: "2024-01-12",
    contact: {
      phone: "+1 (555) 321-0987",
      email: "orders@officemaxpro.com",
      website: "www.officemaxpro.com",
    },
    description:
      "Premium office furniture manufacturer specializing in ergonomic and sustainable workplace solutions.",
    strengths: ["Design", "Quality", "Sustainability"],
    weaknesses: ["Higher Costs", "Limited Stock"],
    status: "active",
  },
  {
    id: "SUP-005",
    name: "StyleHub",
    category: "Apparel",
    location: "Miami, USA",
    rating: 4.5,
    reviews: 76,
    verified: false,
    certified: ["ISO 9001"],
    specialties: ["Fashion", "Trendy Styles", "Quick Turnaround"],
    minOrder: 75,
    leadTime: "12-18 days",
    responseTime: "6 hours",
    totalOrders: 43,
    totalSpend: 18900,
    lastOrder: "2024-01-10",
    contact: {
      phone: "+1 (555) 654-3210",
      email: "contact@stylehub.com",
      website: "www.stylehub.com",
    },
    description:
      "Fast-fashion manufacturer with quick turnaround times and trendy designs.",
    strengths: ["Speed", "Trendy Designs", "Competitive Pricing"],
    weaknesses: ["Quality Variability", "Limited Sustainability"],
    status: "pending",
  },
];

const categories = [
  "All Categories",
  "Apparel",
  "Electronics",
  "Furniture",
  "Machinery",
  "Chemicals",
  "Food & Beverage",
  "Automotive",
  "Construction",
  "Healthcare",
];

const locations = [
  "All Locations",
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Africa",
];

const SupplierCard = ({ supplier, onViewDetails, onContact, onFavorite }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { label: "Active", variant: "default" };
      case "pending":
        return { label: "Pending", variant: "secondary" };
      case "inactive":
        return { label: "Inactive", variant: "destructive" };
      default:
        return { label: status, variant: "outline" };
    }
  };

  const statusInfo = getStatusBadge(supplier.status);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{supplier.name}</h3>
              {supplier.verified && (
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {supplier.location}
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {supplier.category}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= supplier.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-medium ml-1">
                  {supplier.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({supplier.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onFavorite(supplier.id)}
              className="h-8 w-8"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {supplier.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-green-600">
              ${supplier.totalSpend.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Spend</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {supplier.totalOrders}
            </div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Min. Order:</span>
            <span className="font-medium">{supplier.minOrder} units</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lead Time:</span>
            <span className="font-medium">{supplier.leadTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Response Time:</span>
            <span className="font-medium">{supplier.responseTime}</span>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Certifications:</h4>
          <div className="flex flex-wrap gap-2">
            {supplier.certified.map((cert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">
              Strengths
            </h4>
            <div className="space-y-1">
              {supplier.strengths.map((strength, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  • {strength}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-orange-600 mb-2">
              Areas for Improvement
            </h4>
            <div className="space-y-1">
              {supplier.weaknesses.map((weakness, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  • {weakness}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(supplier)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button
            size="sm"
            onClick={() => onContact(supplier)}
            className="flex-1"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SupplierListItem = ({
  supplier,
  onViewDetails,
  onContact,
  onFavorite,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { label: "Active", variant: "default" };
      case "pending":
        return { label: "Pending", variant: "secondary" };
      case "inactive":
        return { label: "Inactive", variant: "destructive" };
      default:
        return { label: status, variant: "outline" };
    }
  };

  const statusInfo = getStatusBadge(supplier.status);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-semibold text-lg">{supplier.name}</h3>
              {supplier.verified && (
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{supplier.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{supplier.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>
                  {supplier.rating} ({supplier.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>${supplier.totalSpend.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
              {supplier.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Min. Order:</span>
                <span className="font-medium ml-2">
                  {supplier.minOrder} units
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Lead Time:</span>
                <span className="font-medium ml-2">{supplier.leadTime}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Response Time:</span>
                <span className="font-medium ml-2">
                  {supplier.responseTime}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Total Orders:</span>
                <span className="font-medium ml-2">{supplier.totalOrders}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {supplier.certified.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onFavorite(supplier.id)}
              className="h-8 w-8"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(supplier)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" onClick={() => onContact(supplier)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterLocation, setFilterLocation] = useState("All Locations");
  const [filterRating, setFilterRating] = useState("all");
  const [filterVerified, setFilterVerified] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      filterCategory === "All Categories" ||
      supplier.category === filterCategory;
    const matchesLocation =
      filterLocation === "All Locations" ||
      supplier.location.includes(
        filterLocation.split(",")[1]?.trim() || filterLocation
      );
    const matchesRating =
      filterRating === "all" ||
      (filterRating === "4+" && supplier.rating >= 4) ||
      (filterRating === "3+" && supplier.rating >= 3);
    const matchesVerified =
      filterVerified === "all" ||
      (filterVerified === "verified" && supplier.verified) ||
      (filterVerified === "unverified" && !supplier.verified);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesRating &&
      matchesVerified
    );
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "orders":
        return b.totalOrders - a.totalOrders;
      case "spend":
        return b.totalSpend - a.totalSpend;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleViewDetails = (supplier) => {
    console.log("View details for:", supplier.name);
  };

  const handleContact = (supplier) => {
    console.log("Contact:", supplier.name);
  };

  const handleFavorite = (supplierId) => {
    console.log("Favorite supplier:", supplierId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground">
            Discover and manage your supplier relationships
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers, specialties..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterVerified} onValueChange={setFilterVerified}>
              <SelectTrigger>
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="spend">Highest Spend</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  </div>
                  <span className="ml-2">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <div className="flex flex-col gap-1 w-4 h-4">
                    <div className="w-full h-1 bg-current rounded-sm"></div>
                    <div className="w-full h-1 bg-current rounded-sm"></div>
                    <div className="w-full h-1 bg-current rounded-sm"></div>
                  </div>
                  <span className="ml-2">List</span>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredSuppliers.length} supplier
              {filteredSuppliers.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Display */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onViewDetails={handleViewDetails}
              onContact={handleContact}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedSuppliers.map((supplier) => (
            <SupplierListItem
              key={supplier.id}
              supplier={supplier}
              onViewDetails={handleViewDetails}
              onContact={handleContact}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredSuppliers.length > 0 && (
        <div className="text-center">
          <Button variant="outline">Load More Suppliers</Button>
        </div>
      )}

      {/* No Results */}
      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No suppliers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("All Categories");
                setFilterLocation("All Locations");
                setFilterRating("all");
                setFilterVerified("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
