"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Package,
  Truck,
  Shield,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";

// Mock data - complete list matching the main page
const getWishlistItemById = (id) => {
  const items = [
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
      description:
        "A timeless classic denim jacket made from premium sustainable cotton. Features a relaxed fit, classic button closure, and multiple pockets for both style and functionality.",
      features: [
        "100% Sustainable Cotton",
        "Classic Button Closure",
        "Multiple Pockets",
        "Relaxed Fit",
        "Machine Washable",
      ],
      specifications: {
        material: "100% Cotton",
        weight: "1.2 kg",
        origin: "USA",
        careInstructions: "Machine wash cold, tumble dry low",
      },
      sellerInfo: {
        rating: 4.8,
        yearsInBusiness: 5,
        totalProducts: 150,
        responseTime: "Within 2 hours",
      },
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
      description:
        "Comfortable and sustainable organic cotton hoodie perfect for casual wear. Made with GOTS certified organic cotton and eco-friendly dyes.",
      features: [
        "GOTS Certified Organic Cotton",
        "Eco-Friendly Dyes",
        "Soft Fleece Lining",
        "Adjustable Hood",
        "Kangaroo Pocket",
      ],
      specifications: {
        material: "100% Organic Cotton",
        weight: "0.8 kg",
        origin: "India",
        careInstructions: "Machine wash cold, air dry",
      },
      sellerInfo: {
        rating: 4.6,
        yearsInBusiness: 3,
        totalProducts: 85,
        responseTime: "Within 4 hours",
      },
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
      description:
        "Elegant and breathable linen summer dress perfect for warm weather. Features a flowing silhouette and comfortable fit for all-day wear.",
      features: [
        "100% Pure Linen",
        "Flowing Silhouette",
        "Breathable Fabric",
        "Side Pockets",
        "Midi Length",
      ],
      specifications: {
        material: "100% Linen",
        weight: "0.4 kg",
        origin: "Portugal",
        careInstructions: "Hand wash or gentle cycle, hang dry",
      },
      sellerInfo: {
        rating: 4.7,
        yearsInBusiness: 7,
        totalProducts: 120,
        responseTime: "Within 3 hours",
      },
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
      description:
        "Modern slim fit chinos crafted from premium cotton blend. Perfect for both casual and semi-formal occasions with a contemporary cut.",
      features: [
        "Cotton Blend Fabric",
        "Slim Fit Design",
        "Wrinkle Resistant",
        "Multiple Colors Available",
        "Belt Loops",
      ],
      specifications: {
        material: "97% Cotton, 3% Elastane",
        weight: "0.6 kg",
        origin: "Turkey",
        careInstructions: "Machine wash warm, tumble dry medium",
      },
      sellerInfo: {
        rating: 4.4,
        yearsInBusiness: 4,
        totalProducts: 200,
        responseTime: "Within 6 hours",
      },
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
      description:
        "Luxurious wool blend overcoat designed for cold weather protection without compromising style. Features premium tailoring and classic design.",
      features: [
        "Premium Wool Blend",
        "Tailored Fit",
        "Double Breasted",
        "Interior Pockets",
        "Wind Resistant",
      ],
      specifications: {
        material: "80% Wool, 20% Polyester",
        weight: "2.1 kg",
        origin: "Italy",
        careInstructions: "Dry clean only",
      },
      sellerInfo: {
        rating: 4.9,
        yearsInBusiness: 12,
        totalProducts: 75,
        responseTime: "Within 1 hour",
      },
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
      description:
        "Comfortable and stylish casual sneakers perfect for everyday wear. Features advanced cushioning technology and durable construction.",
      features: [
        "Advanced Cushioning",
        "Breathable Mesh Upper",
        "Durable Rubber Sole",
        "Lightweight Design",
        "Multiple Color Options",
      ],
      specifications: {
        material: "Synthetic Mesh & Rubber",
        weight: "0.9 kg",
        origin: "Vietnam",
        careInstructions: "Spot clean, air dry",
      },
      sellerInfo: {
        rating: 4.5,
        yearsInBusiness: 8,
        totalProducts: 300,
        responseTime: "Within 5 hours",
      },
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
      description:
        "Elegant silk scarf with beautiful patterns and vibrant colors. Perfect accessory to elevate any outfit with a touch of luxury.",
      features: [
        "100% Pure Silk",
        "Hand-Printed Patterns",
        "Vibrant Colors",
        "Versatile Styling",
        "Gift Box Included",
      ],
      specifications: {
        material: "100% Silk",
        weight: "0.1 kg",
        origin: "France",
        careInstructions: "Dry clean recommended",
      },
      sellerInfo: {
        rating: 4.8,
        yearsInBusiness: 15,
        totalProducts: 50,
        responseTime: "Within 2 hours",
      },
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
      description:
        "High-performance athletic shorts designed for intense workouts and sports activities. Features moisture-wicking technology and flexible fit.",
      features: [
        "Moisture-Wicking Fabric",
        "Flexible Fit",
        "Quick Dry Technology",
        "Side Pockets",
        "Elastic Waistband",
      ],
      specifications: {
        material: "90% Polyester, 10% Spandex",
        weight: "0.3 kg",
        origin: "China",
        careInstructions: "Machine wash cold, tumble dry low",
      },
      sellerInfo: {
        rating: 4.2,
        yearsInBusiness: 6,
        totalProducts: 180,
        responseTime: "Within 8 hours",
      },
    },
  ];

  return items.find((item) => item.id === id);
};

export default function WishlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(() => getWishlistItemById(params.id));

  if (!item) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wishlist
          </Button>
        </div>
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Item Not Found</h3>
            <p className="text-muted-foreground">
              The wishlist item you&apos;re looking for doesn&apos;t exist or
              has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRemoveFromWishlist = () => {
    // TODO: Implement remove from wishlist
    console.log("Remove from wishlist:", item.id);
    router.push("/dashboard/wishlist");
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    console.log("Add to cart:", item.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wishlist
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveFromWishlist}
          >
            <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
            Remove from Wishlist
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Product Image */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.discount && (
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {item.discount} OFF
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          {item.specifications && (
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-muted last:border-0"
                    >
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{item.name}</h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    by {item.seller}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant="outline">{item.category}</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    {item.price}
                  </span>
                  {item.originalPrice !== item.price && (
                    <span className="text-xl text-muted-foreground line-through">
                      {item.originalPrice}
                    </span>
                  )}
                  {item.discount && (
                    <Badge className="bg-red-100 text-red-800">
                      Save {item.discount}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      item.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    <Package className="h-3 w-3 mr-1" />
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  {item.inStock && (
                    <Badge variant="outline">
                      <Truck className="h-3 w-3 mr-1" />
                      Fast Shipping
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  disabled={!item.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Added to wishlist on{" "}
                {new Date(item.addedDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          {item.features && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Seller Information */}
          {item.sellerInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Seller Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {item.sellerInfo.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Years in Business</span>
                    <span className="font-medium">
                      {item.sellerInfo.yearsInBusiness} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Products</span>
                    <span className="font-medium">
                      {item.sellerInfo.totalProducts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">
                      {item.sellerInfo.responseTime}
                    </span>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
