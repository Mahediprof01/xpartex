"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
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
  Building2,
  Star,
  DollarSign,
  Package,
  X,
  Download,
  Plus,
} from "lucide-react";
import { createSupplierColumns } from "../../../components/columns";
import { suppliers } from "../../../data/suppliers";

const categories = ["All Categories", "Apparel"];

const countries = ["All Countries", "USA", "India", "Turkey", "Bangladesh"];

export default function SuppliersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterCountry, setFilterCountry] = useState("All Countries");
  const [filterRating, setFilterRating] = useState("all");
  const [filterVerified, setFilterVerified] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSuppliers = suppliers
    .filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        supplier.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        filterCategory === "All Categories" ||
        supplier.category === filterCategory;

      const matchesCountry =
        filterCountry === "All Countries" || supplier.country === filterCountry;

      const matchesRating =
        filterRating === "all" ||
        (filterRating === "4+" && supplier.rating >= 4) ||
        (filterRating === "3+" && supplier.rating >= 3);

      const matchesVerified =
        filterVerified === "all" ||
        (filterVerified === "verified" && supplier.verified) ||
        (filterVerified === "unverified" && !supplier.verified);

      const matchesTier = filterTier === "all" || supplier.tier === filterTier;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCountry &&
        matchesRating &&
        matchesVerified &&
        matchesTier
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "spend":
          return b.totalSpend - a.totalSpend;
        case "name":
          return a.name.localeCompare(b.name);
        case "completion":
          return b.completionRate - a.completionRate;
        case "delivery":
          return b.onTimeDelivery - a.onTimeDelivery;
        default:
          return b.rating - a.rating;
      }
    });

  const handleViewDetails = (supplier) => {
    router.push(`/dashboard/suppliers/${supplier.id}`);
  };

  const handleContact = (supplier) => {
    console.log("Contact supplier:", supplier.name);
    // TODO: Implement contact functionality
  };

  const handleAddToFavorites = (supplier) => {
    console.log("Add to favorites:", supplier.name);
    // TODO: Implement favorites functionality
  };

  const getStats = () => {
    const activeSuppliers = suppliers.filter(
      (s) => s.status === "active"
    ).length;
    const totalSpend = suppliers.reduce((acc, s) => acc + s.totalSpend, 0);
    const avgRating =
      suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length;
    const totalOrders = suppliers.reduce((acc, s) => acc + s.totalOrders, 0);

    return [
      {
        title: "Active Suppliers",
        value: activeSuppliers,
        description: "Verified & active",
        icon: Building2,
      },
      {
        title: "Total Spend",
        value: `$${totalSpend.toLocaleString()}`,
        description: "All-time procurement",
        icon: DollarSign,
      },
      {
        title: "Avg Rating",
        value: avgRating.toFixed(1),
        description: "Supplier quality score",
        icon: Star,
      },
      {
        title: "Total Orders",
        value: totalOrders.toLocaleString(),
        description: "Completed orders",
        icon: Package,
      },
    ];
  };

  const stats = getStats();

  // Create columns with handlers
  const columns = createSupplierColumns(
    handleViewDetails,
    handleContact,
    handleAddToFavorites
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative w-1/2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          className="pl-10 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Supplier Stats */}
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
                Active Suppliers
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}
              >
                <Building2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats[0].value}</div>
              <p className="text-xs text-muted-foreground">
                {stats[0].description}
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
            delay: 0.05,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}
              >
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats[1].value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats[1].description}
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
                {stats[2].value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats[2].description}
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
            delay: 0.15,
          }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}
              >
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats[3].value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats[3].description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Compact Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country Filter */}
          <Select value={filterCountry} onValueChange={setFilterCountry}>
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="h-9 w-[100px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4+">4+ Stars</SelectItem>
              <SelectItem value="3+">3+ Stars</SelectItem>
            </SelectContent>
          </Select>

          {/* Verification Filter */}
          <Select value={filterVerified} onValueChange={setFilterVerified}>
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue placeholder="Verification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>

          {/* Tier Filter */}
          <Select value={filterTier} onValueChange={setFilterTier}>
            <SelectTrigger className="h-9 w-[100px]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="orders">Most Orders</SelectItem>
              <SelectItem value="spend">Highest Spend</SelectItem>
              <SelectItem value="completion">Best Completion</SelectItem>
              <SelectItem value="delivery">On-Time Delivery</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Only show Clear button when there are active filters */}
          {(searchQuery ||
            filterCategory !== "All Categories" ||
            filterCountry !== "All Countries" ||
            filterRating !== "all" ||
            filterVerified !== "all" ||
            filterTier !== "all" ||
            sortBy !== "rating") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("All Categories");
                setFilterCountry("All Countries");
                setFilterRating("all");
                setFilterVerified("all");
                setFilterTier("all");
                setSortBy("rating");
              }}
              className="h-9 px-3"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
          <Button variant="outline" size="sm" className="h-9 px-3">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button
            size="sm"
            className="h-9 px-3 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery ||
        filterCategory !== "All Categories" ||
        filterCountry !== "All Countries" ||
        filterRating !== "all" ||
        filterVerified !== "all" ||
        filterTier !== "all") && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
          <span className="text-xs text-muted-foreground">Filters:</span>
          <div className="flex flex-wrap gap-1">
            {searchQuery && (
              <Badge variant="secondary" className="text-xs h-6">
                &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterCategory !== "All Categories" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterCategory}
                <button
                  onClick={() => setFilterCategory("All Categories")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterCountry !== "All Countries" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterCountry}
                <button
                  onClick={() => setFilterCountry("All Countries")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterRating !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterRating} rating
                <button
                  onClick={() => setFilterRating("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterVerified !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterVerified}
                <button
                  onClick={() => setFilterVerified("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterTier !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterTier} tier
                <button
                  onClick={() => setFilterTier("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Suppliers Data Table */}
      <Card>
        <CardContent>
          {filteredSuppliers.length > 0 ? (
            <DataTable columns={columns} data={filteredSuppliers} />
          ) : (
            <div className="py-12 text-center">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Suppliers Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ||
                filterCategory !== "All Categories" ||
                filterCountry !== "All Countries" ||
                filterRating !== "all" ||
                filterVerified !== "all" ||
                filterTier !== "all"
                  ? "No suppliers match your current filters"
                  : "Start by adding your first supplier"}
              </p>
              {searchQuery ||
              filterCategory !== "All Categories" ||
              filterCountry !== "All Countries" ||
              filterRating !== "all" ||
              filterVerified !== "all" ||
              filterTier !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("All Categories");
                    setFilterCountry("All Countries");
                    setFilterRating("all");
                    setFilterVerified("all");
                    setFilterTier("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
