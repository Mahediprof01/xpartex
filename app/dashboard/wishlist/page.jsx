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
import { DataTable } from "../../../components/ui/data-table";
import {
  Search,
  Heart,
  ShoppingCart,
  Package,
  TrendingUp,
  Star,
  X,
  Filter,
  SortAsc,
} from "lucide-react";
import { createWishlistColumns } from "../../../components/columns";

// Mock data - Updated to match WishlistItem type
const wishlistItems = [
  {
    id: "WISH-001",
    name: "Classic Denim Jacket",
    seller: "UrbanWear Co.",
    price: "$79.99",
    originalPrice: "$99.99",
    discount: "20%",
    rating: 4.7,
    reviews: 932,
    image: "/denim-jacket.webp",
    inStock: true,
    addedDate: "2024-01-10",
    category: "Jackets",
  },
  {
    id: "WISH-002",
    name: "Organic Cotton Hoodie",
    seller: "EcoFashion",
    price: "$59.99",
    originalPrice: "$79.99",
    discount: "25%",
    rating: 4.6,
    reviews: 567,
    image: "/cotton-hoodie.webp",
    inStock: true,
    addedDate: "2024-01-08",
    category: "Hoodies",
  },
  {
    id: "WISH-003",
    name: "Linen Summer Dress",
    seller: "Breeze Apparel",
    price: "$69.99",
    originalPrice: "$89.99",
    discount: "22%",
    rating: 4.8,
    reviews: 745,
    image: "/linen-dress.jpg",
    inStock: false,
    addedDate: "2024-01-05",
    category: "Dresses",
  },
  {
    id: "WISH-004",
    name: "Slim Fit Chinos",
    seller: "StyleHub",
    price: "$49.99",
    originalPrice: "$49.99",
    discount: null,
    rating: 4.5,
    reviews: 382,
    image: "/slim-fit-chinos.jpeg",
    inStock: true,
    addedDate: "2024-01-03",
    category: "Pants",
  },
  {
    id: "WISH-005",
    name: "Wool Blend Overcoat",
    seller: "Winter Wardrobe",
    price: "$129.99",
    originalPrice: "$159.99",
    discount: "18%",
    rating: 4.9,
    reviews: 210,
    image: "/wool-overcoat.jpg",
    inStock: true,
    addedDate: "2024-01-01",
    category: "Coats",
  },
  {
    id: "WISH-006",
    name: "Casual Sneakers",
    seller: "FootFlex",
    price: "$89.99",
    originalPrice: "$89.99",
    discount: null,
    rating: 4.4,
    reviews: 1023,
    image: "/casual-sneakers.jpg",
    inStock: true,
    addedDate: "2024-01-15",
    category: "Shoes",
  },
  {
    id: "WISH-007",
    name: "Silk Scarf",
    seller: "Luxury Accessories",
    price: "$35.99",
    originalPrice: "$45.99",
    discount: "22%",
    rating: 4.7,
    reviews: 289,
    image: "/silk-scarf.jpg",
    inStock: false,
    addedDate: "2024-01-12",
    category: "Accessories",
  },
  {
    id: "WISH-008",
    name: "Athletic Shorts",
    seller: "SportStyle",
    price: "$24.99",
    originalPrice: "$34.99",
    discount: "29%",
    rating: 4.3,
    reviews: 654,
    image: "/athletic-shorts.jpg",
    inStock: true,
    addedDate: "2024-01-18",
    category: "Sportswear",
  },
];

const categories = [
  "All Categories",
  "Jackets",
  "Hoodies",
  "Dresses",
  "Pants",
  "Coats",
  "Shoes",
  "Accessories",
  "Sportswear",
];

const sellers = [
  "All Sellers",
  "UrbanWear Co.",
  "EcoFashion",
  "Breeze Apparel",
  "StyleHub",
  "Winter Wardrobe",
  "FootFlex",
  "Luxury Accessories",
  "SportStyle",
];

export default function WishlistPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterSeller, setFilterSeller] = useState("All Sellers");
  const [filterStock, setFilterStock] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort logic
  const filteredItems = wishlistItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "All Categories" || item.category === filterCategory;
      const matchesSeller =
        filterSeller === "All Sellers" || item.seller === filterSeller;
      const matchesStock =
        filterStock === "all" ||
        (filterStock === "in-stock" && item.inStock) ||
        (filterStock === "out-of-stock" && !item.inStock);

      return matchesSearch && matchesCategory && matchesSeller && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
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
        default:
          return 0;
      }
    });

  // Calculate statistics
  const totalItems = wishlistItems.length;
  const inStockItems = wishlistItems.filter((item) => item.inStock).length;
  const totalValue = wishlistItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace("$", ""));
  }, 0);
  const averageRating =
    wishlistItems.reduce((sum, item) => sum + item.rating, 0) /
    wishlistItems.length;

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery ||
    filterCategory !== "All Categories" ||
    filterSeller !== "All Sellers" ||
    filterStock !== "all" ||
    sortBy !== "newest";

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterCategory("All Categories");
    setFilterSeller("All Sellers");
    setFilterStock("all");
    setSortBy("newest");
  };

  // Column handlers
  const handleViewDetails = (item) => {
    router.push(`/dashboard/wishlist/${item.id}`);
  };

  const handleRemoveFromWishlist = (item) => {
    // TODO: Implement remove from wishlist functionality
    console.log("Remove from wishlist:", item.id);
  };

  const handleAddToCart = (item) => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", item.id);
  };

  // Create table columns
  const columns = createWishlistColumns(
    handleViewDetails,
    handleRemoveFromWishlist,
    handleAddToCart
  );

  return (
    <div className="space-y-6">
      {/* Header with Search and Action */}

      <div className="w-1/2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, sellers, or categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Wishlist Stats */}
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
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}
              >
                <Heart className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">In wishlist</p>
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
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}
              >
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {inStockItems}
              </div>
              <p className="text-xs text-muted-foreground">Available items</p>
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
              className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg`}
              >
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${totalValue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Total worth</p>
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
              className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}
              >
                <Star className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Average quality</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-lg">Filter Wishlist</CardTitle>
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
                <Select value={filterSeller} onValueChange={setFilterSeller}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Sellers" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {sellers.map((seller) => (
                      <SelectItem key={seller} value={seller}>
                        {seller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <Select value={filterStock} onValueChange={setFilterStock}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-44">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="newest">Recently Added</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
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

      {/* Wishlist Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Wishlist Items</CardTitle>
          <CardDescription>
            Click on any item to view detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length > 0 ? (
            <DataTable columns={columns} data={filteredItems} />
          ) : (
            <div className="py-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add items to your wishlist
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("All Categories");
                  setFilterSeller("All Sellers");
                  setFilterStock("all");
                  setSortBy("newest");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
