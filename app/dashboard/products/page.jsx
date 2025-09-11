"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { DataTable } from "../../../components/ui/data-table";
import {
  Search,
  Plus,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  ShoppingCart,
} from "lucide-react";
// import { createProductColumns } from "../../../components/columns";

const products = [
  {
    id: "PROD-001",
    name: "Classic Denim Jacket",
    category: "Jackets",
    price: "$79.99",
    stock: 45,
    sold: 234,
    rating: 4.8,
    reviews: 156,
    status: "active",
    image: "/denim-jacket.webp",
    dateAdded: "2024-01-15",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-002",
    name: "Organic Cotton Hoodie",
    category: "Hoodies",
    price: "$59.99",
    stock: 12,
    sold: 89,
    rating: 4.6,
    reviews: 67,
    status: "active",
    image: "/cotton-hoodie.webp",
    dateAdded: "2024-01-10",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-003",
    name: "Linen Summer Dress",
    category: "Dresses",
    price: "$69.99",
    stock: 0,
    sold: 156,
    rating: 4.7,
    reviews: 89,
    status: "out_of_stock",
    image: "/linen-dress.jpg",
    dateAdded: "2024-01-05",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-004",
    name: "Slim Fit Chinos",
    category: "Pants",
    price: "$49.99",
    stock: 28,
    sold: 67,
    rating: 4.9,
    reviews: 45,
    status: "active",
    image: "/slim-fit-chinos.jpeg",
    dateAdded: "2024-01-01",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-005",
    name: "Wool Blend Overcoat",
    category: "Coats",
    price: "$129.99",
    stock: 8,
    sold: 34,
    rating: 4.9,
    reviews: 23,
    status: "active",
    image: "/wool-overcoat.jpg",
    dateAdded: "2024-01-12",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-006",
    name: "Silk Blouse",
    category: "Tops",
    price: "$89.99",
    stock: 15,
    sold: 78,
    rating: 4.5,
    reviews: 56,
    status: "active",
    image: "/silk-blouse.jpg",
    dateAdded: "2024-01-08",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-007",
    name: "Athletic Leggings",
    category: "Activewear",
    price: "$39.99",
    stock: 32,
    sold: 145,
    rating: 4.7,
    reviews: 98,
    status: "active",
    image: "/athletic-leggings.jpg",
    dateAdded: "2024-01-03",
    lastUpdated: "2025-08-27",
  },
  {
    id: "PROD-008",
    name: "Floral Maxi Dress",
    category: "Dresses",
    price: "$89.99",
    stock: 5,
    sold: 23,
    rating: 4.6,
    reviews: 18,
    status: "active",
    image: "/floral-maxi-dress.jpg",
    dateAdded: "2024-01-20",
    lastUpdated: "2025-08-27",
  },
];

const categories = [
  "All Categories",
  "Jackets",
  "Hoodies",
  "Dresses",
  "Pants",
  "Coats",
  "Tops",
  "Activewear",
  "Shirts",
  "Skirts",
  "Accessories",
];

const statuses = ["All Statuses", "Active", "Out of Stock", "Draft", "Paused"];

const statusConfig = {
  active: { label: "Active", variant: "default", color: "text-green-600" },
  out_of_stock: {
    label: "Out of Stock",
    variant: "destructive",
    color: "text-red-600",
  },
  draft: { label: "Draft", variant: "secondary", color: "text-gray-600" },
  paused: { label: "Paused", variant: "outline", color: "text-yellow-600" },
};

// Temporary inline product columns
const createProductColumns = (
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus
) => [
  {
    accessorKey: "image",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      const lowStock = product.stock < 15 && product.stock > 0;

      return (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
            {lowStock && (
              <Badge
                variant="outline"
                className="absolute -bottom-1 -right-1 bg-yellow-50 px-1 py-0 text-[10px]"
              >
                Low
              </Badge>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{product.name}</div>
            <div className="text-xs text-muted-foreground">
              {product.category}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return <div className="font-semibold text-lg">{product.price}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const product = row.original;
      const stockLevel = product.stock;
      const isLowStock = stockLevel < 15 && stockLevel > 0;
      const isOutOfStock = stockLevel === 0;

      return (
        <div className="flex flex-col">
          <span
            className={`font-medium ${
              isOutOfStock
                ? "text-red-600"
                : isLowStock
                ? "text-orange-600"
                : "text-green-600"
            }`}
          >
            {stockLevel} units
          </span>
          <span className="text-xs text-muted-foreground">
            Sold: {product.sold}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const statusConfigs = {
        active: { label: "Active", variant: "default" },
        out_of_stock: { label: "Out of Stock", variant: "destructive" },
        draft: { label: "Draft", variant: "secondary" },
        paused: { label: "Paused", variant: "outline" },
      };

      const config = statusConfigs[product.status];

      return (
        <Badge variant={config.variant} className="whitespace-nowrap">
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-sm">
          {new Date(product.lastUpdated).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </Button>
      );
    },
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "All Categories" ||
        product.category === filterCategory;
      const matchesStatus =
        filterStatus === "All Statuses" ||
        (filterStatus === "Active" && product.status === "active") ||
        (filterStatus === "Out of Stock" &&
          product.status === "out_of_stock") ||
        (filterStatus === "Draft" && product.status === "draft") ||
        (filterStatus === "Paused" && product.status === "paused");

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        case "oldest":
          return (
            new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
          );
        case "price-low":
          return (
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
          );
        case "price-high":
          return (
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
          );
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "stock-low":
          return a.stock - b.stock;
        case "stock-high":
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  // Calculate statistics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const lowStockProducts = products.filter((p) => p.stock < 15).length;
  const averageRating =
    products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery ||
    filterCategory !== "All Categories" ||
    filterStatus !== "All Statuses" ||
    sortBy !== "newest";

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterCategory("All Categories");
    setFilterStatus("All Statuses");
    setSortBy("newest");
  };

  // Column handlers
  const handleViewDetails = (product) => {
    router.push(`/dashboard/products/${product.id}`);
  };

  const handleEditProduct = (product) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", product.id);
  };

  const handleDeleteProduct = (product) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", product.id);
  };

  const handleToggleStatus = (product) => {
    // TODO: Implement status toggle functionality
    console.log("Toggle status:", product.id);
  };

  // Create table columns
  const columns = createProductColumns(
    handleViewDetails,
    handleEditProduct,
    handleDeleteProduct,
    handleToggleStatus
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Product */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, categories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-b from-sky-500 to-cyan-500 text-white">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new clothing product listing for your store
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jackets">Jackets</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="coats">Coats</SelectItem>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="activewear">Activewear</SelectItem>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="skirts">Skirts</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Types</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jackets">B2B</SelectItem>
                      <SelectItem value="hoodies">Wholesale</SelectItem>
                      <SelectItem value="dresses">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your clothing product..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-gradient-to-b from-sky-500 to-cyan-500 text-white">
                  Create Product
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddProductOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Stats - Enhanced Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.45,
            delay: 0,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}
              >
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">In inventory</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.45,
            delay: 0.05,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Listings
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}
              >
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeProducts}
              </div>
              <p className="text-xs text-muted-foreground">
                Published products
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.45,
            delay: 0.1,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}
              >
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {lowStockProducts}
              </div>
              <p className="text-xs text-muted-foreground">Need restocking</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            ease: "easeOut",
            duration: 0.45,
            delay: 0.15,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg`}
              >
                <Star className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Product quality</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-lg">Filter Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-48">
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-44">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="newest">Recently Updated</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="stock-low">
                      Stock: Low to High
                    </SelectItem>
                    <SelectItem value="stock-high">
                      Stock: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Inventory</CardTitle>
          <CardDescription>
            Click on any product to view detailed information and manage
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <DataTable columns={columns} data={filteredProducts} />
          ) : (
            <div className="py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add new products to your
                inventory
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
