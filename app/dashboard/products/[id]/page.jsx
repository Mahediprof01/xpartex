"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import {
  ArrowLeft,
  Star,
  Package,
  ShoppingCart,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Eye,
} from "lucide-react";

// Mock data - in real app, this would come from an API
const getProductById = (id) => {
  const products = [
    {
      id: "PROD-001",
      name: "Classic Denim Jacket",
      category: "Jackets",
      price: "$79.99",
      originalPrice: "$99.99",
      discount: "20%",
      stock: 45,
      sold: 234,
      rating: 4.8,
      reviews: 156,
      status: "active",
      image: "/denim-jacket.webp",
      dateAdded: "2024-01-15",
      lastUpdated: "2025-08-27",
      description:
        "A timeless classic denim jacket made from premium cotton denim. Perfect for layering and adds a casual-chic vibe to any outfit.",
      features: [
        "100% Premium Cotton Denim",
        "Classic button-front closure",
        "Two chest pockets with button flaps",
        "Adjustable button cuffs",
        "Machine washable",
      ],
      specifications: {
        Material: "100% Cotton Denim",
        Weight: "450gsm",
        Care: "Machine wash cold, tumble dry low",
        Origin: "Made in Bangladesh",
        Sizes: "XS, S, M, L, XL, XXL",
        Colors: "Classic Blue, Light Blue, Dark Blue",
      },
      moq: 100,
      leadTime: "15-20 days",
      sampleCost: "$15.00",
      sampleLeadTime: "5-7 days",
    },
    {
      id: "PROD-002",
      name: "Organic Cotton Hoodie",
      category: "Hoodies",
      price: "$59.99",
      originalPrice: "$79.99",
      discount: "25%",
      stock: 12,
      sold: 89,
      rating: 4.6,
      reviews: 67,
      status: "active",
      image: "/cotton-hoodie.webp",
      dateAdded: "2024-01-10",
      lastUpdated: "2025-08-27",
      description:
        "Soft and comfortable organic cotton hoodie perfect for casual wear. Made with sustainable materials and ethical manufacturing practices.",
      features: [
        "100% Organic Cotton",
        "Kangaroo pocket",
        "Drawstring hood",
        "Ribbed cuffs and hem",
        "GOTS certified",
      ],
      specifications: {
        Material: "100% Organic Cotton",
        Weight: "320gsm",
        Care: "Machine wash cold, hang dry",
        Origin: "Made in India",
        Sizes: "XS, S, M, L, XL",
        Colors: "Natural, Gray, Navy, Black",
      },
      moq: 50,
      leadTime: "10-15 days",
      sampleCost: "$12.00",
      sampleLeadTime: "3-5 days",
    },
    // ... other products would be here
  ];

  return products.find((p) => p.id === id) || null;
};

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Product not found</h3>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/dashboard/products")}>
              View All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const status = statusConfig[product.status];
  const lowStock = product.stock < 15 && product.stock > 0;
  const outOfStock = product.stock === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">Product Details & Management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Product Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {lowStock && (
                      <Badge
                        variant="outline"
                        className="absolute -bottom-2 -right-2 bg-yellow-50 px-2 py-1 text-xs"
                      >
                        Low Stock
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold">
                          {product.name}
                        </h2>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {product.category}
                      </p>
                      <p className="text-sm">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-2xl font-bold">
                          {product.price}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="font-medium text-sm">{key}</span>
                        <span className="text-sm text-muted-foreground">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="space-y-6">
          {/* Product Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Product Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Stock Level
                  </span>
                  <span
                    className={`font-semibold ${
                      outOfStock
                        ? "text-red-600"
                        : lowStock
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Sold
                  </span>
                  <span className="font-semibold">{product.sold}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Date Added
                  </span>
                  <span className="font-semibold text-sm">
                    {new Date(product.dateAdded).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                  <span className="font-semibold text-sm">
                    {new Date(product.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Business Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">MOQ</span>
                  <span className="font-semibold">{product.moq} units</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Lead Time
                  </span>
                  <span className="font-semibold">{product.leadTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sample Cost
                  </span>
                  <span className="font-semibold">{product.sampleCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sample Lead
                  </span>
                  <span className="font-semibold">
                    {product.sampleLeadTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Inventory
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Set Pricing Tiers
                </Button>
                <Button className="w-full" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Update MOQ & Lead Time
                </Button>
                <Button className="w-full" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Sample Settings
                </Button>
                <Separator />
                <Button
                  className="w-full"
                  variant={
                    product.status === "active" ? "secondary" : "default"
                  }
                >
                  {product.status === "active"
                    ? "Unpublish Product"
                    : "Publish Product"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alerts */}
          {(lowStock || outOfStock) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">
                      {outOfStock ? "Out of Stock" : "Low Stock Alert"}
                    </span>
                  </div>
                  <p className="text-sm text-orange-600 mt-2">
                    {outOfStock
                      ? "This product is currently out of stock. Restock to continue selling."
                      : "Stock level is below 15 units. Consider restocking soon."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
