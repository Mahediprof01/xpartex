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
  Search,
  Heart,
  ShoppingCart,
  Eye,
  Trash2,
  Star,
  Tag,
} from "lucide-react";

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
];

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
        <p className="text-muted-foreground">Save items you love for later</p>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg">
              Saved Items ({wishlistItems.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
              <Button variant="outline" size="sm">
                Share Wishlist
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search wishlist..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="smart-home">Smart Home</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Recently Added</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Best Discounts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Wishlist Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  <Tag className="h-3 w-3 mr-1" />
                  {item.discount} OFF
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base line-clamp-2">
                  {item.name}
                </CardTitle>
              </div>
              <CardDescription>{item.seller}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({item.reviews})
                </span>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{item.price}</span>
                {item.originalPrice !== item.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {item.originalPrice}
                  </span>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                Added {new Date(item.addedDate).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button
                  className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-2 px-4 transition-all duration-300 flex-1"
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
                <Button className="bg-accent" variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (hidden when items exist) */}
      {wishlistItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="mb-2">Your wishlist is empty</CardTitle>
            <CardDescription className="mb-4">
              Start browsing and save items you love for later
            </CardDescription>
            <Button>Browse Products</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
