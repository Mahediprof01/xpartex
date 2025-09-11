"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../components/ui/card";
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
      {/* Search and Filters Section */}
      <div className="space-y-4">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, sellers, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="h-10 bg-blue-500 text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart ({inStockItems})
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Items
                </p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  In Stock
                </p>
                <p className="text-2xl font-bold">{inStockItems}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Value
                </p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Rating
                </p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">
                  Filter Options
                </h3>
                <Badge variant="outline" className="text-xs">
                  {filteredItems.length} items
                </Badge>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Filter Controls Grid */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Category Filter */}
              <div className="space-y-1">
                
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seller Filter */}
              <div className="space-y-1">
                
                <Select value={filterSeller} onValueChange={setFilterSeller}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Sellers" />
                  </SelectTrigger>
                  <SelectContent>
                    {sellers.map((seller) => (
                      <SelectItem key={seller} value={seller}>
                        {seller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stock Status Filter */}
              <div className="space-y-1">
                
                <Select value={filterStock} onValueChange={setFilterStock}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="in-stock">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        In Stock
                      </div>
                    </SelectItem>
                    <SelectItem value="out-of-stock">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        Out of Stock
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-1">
              
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Recently Added" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      <div className="flex items-center gap-2">
                        <SortAsc className="h-3 w-3" />
                        Recently Added
                      </div>
                    </SelectItem>
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

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Active Filters:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="text-xs h-6 gap-1">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filterCategory !== "All Categories" && (
                    <Badge variant="secondary" className="text-xs h-6 gap-1">
                      {filterCategory}
                      <button
                        onClick={() => setFilterCategory("All Categories")}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filterSeller !== "All Sellers" && (
                    <Badge variant="secondary" className="text-xs h-6 gap-1">
                      {filterSeller}
                      <button
                        onClick={() => setFilterSeller("All Sellers")}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filterStock !== "all" && (
                    <Badge variant="secondary" className="text-xs h-6 gap-1">
                      {filterStock === "in-stock" ? "In Stock" : "Out of Stock"}
                      <button
                        onClick={() => setFilterStock("all")}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {sortBy !== "newest" && (
                    <Badge variant="secondary" className="text-xs h-6 gap-1">
                      Sort:{" "}
                      {sortBy
                        .replace("-", " ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                      <button
                        onClick={() => setSortBy("newest")}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wishlist Table */}
      <Card>
        <CardContent>
          {filteredItems.length > 0 ? (
            <DataTable columns={columns} data={filteredItems} />
          ) : (
            <div className="py-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {hasActiveFilters
                  ? "No items match your filters"
                  : "Your wishlist is empty"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more results"
                  : "Start browsing and save items you love for later"}
              </p>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button>Browse Products</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
