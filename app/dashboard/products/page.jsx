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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
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
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  MoreHorizontal,
} from "lucide-react";

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

export default function ProductsPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Seller dashboard states
  const [selectedProductIds, setSelectedProductIds] = useState(new Set());
  const [activeProduct, setActiveProduct] = useState(null);

  // Seller action dialogs
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [moqLeadOpen, setMoqLeadOpen] = useState(false);
  const [sampleSettingsOpen, setSampleSettingsOpen] = useState(false);

  // Simple filters
  const [filterMOQ, setFilterMOQ] = useState(0);
  const [filterLead, setFilterLead] = useState("any");
  const [filterCert, setFilterCert] = useState("any");
  const [filterRegion, setFilterRegion] = useState("any");

  const toggleSelect = (id) => {
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedCount = selectedProductIds.size;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground">
            Manage your clothing listings and inventory
          </p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
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

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
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
                <Button className="flex-1">Create Product</Button>
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

      {/* Product Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => p.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              87% of total products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => p.stock < 15).length}
            </div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clothing products..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-categories">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
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

          {/* Seller sourcing params */}
          <div className="grid gap-4 sm:grid-cols-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="moq">Min. Order Qty</Label>
              <Input
                id="moq"
                type="number"
                min={0}
                placeholder="0"
                value={filterMOQ}
                onChange={(e) => setFilterMOQ(Number(e.target.value || 0))}
              />
            </div>
            <div className="space-y-2">
              <Label>Lead Time</Label>
              <Select value={filterLead} onValueChange={setFilterLead}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="lt_15">Under 15 days</SelectItem>
                  <SelectItem value="d15_30">15-30 days</SelectItem>
                  <SelectItem value="gt_30">Over 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Certifications</Label>
              <Select value={filterCert} onValueChange={setFilterCert}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="gots">GOTS</SelectItem>
                  <SelectItem value="oeko">OEKO-TEX</SelectItem>
                  <SelectItem value="recycled">Recycled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk selection toolbar */}
      {selectedCount > 0 && (
        <Card>
          <CardContent className="py-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline">Publish</Button>
              <Button variant="outline">Unpublish</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List View */}
      <div className="space-y-3">
        {products.map((product, idx) => {
          const statusInfo = statusConfig[product.status];
          const lowStock = product.stock < 15 && product.stock > 0;

          return (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex items-start gap-3 p-3 md:gap-4 md:p-4">
                {/* Select + Image */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={selectedProductIds.has(product.id)}
                    onCheckedChange={() => toggleSelect(product.id)}
                    aria-label="Select product"
                  />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                    {lowStock && (
                      <Badge
                        variant="outline"
                        className="absolute -bottom-2 left-0 bg-yellow-50 px-1.5 py-0.5 text-[10px]"
                      >
                        Low
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 items-start">
                  <div className="flex-1 space-y-2">
                    {/* Header: SL No, Name, Category */}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="px-2 py-0.5 text-[10px] md:text-xs bg-blue-50 text-[#00BFFF]"
                      >
                        #{String(idx + 1).padStart(2, "0")}
                      </Badge>
                      <CardTitle className="text-base md:text-sm lg:text-base leading-tight truncate">
                        {product.name}
                      </CardTitle>
                      <span className="ml-2 text-xs text-muted-foreground truncate hidden sm:inline">
                        • {product.category}
                      </span>
                    </div>

                    {/* Specs snapshot (placeholder) */}
                    <div className="text-xs text-muted-foreground hidden lg:block">
                      MOQ: — • Lead: — • Sample: —
                    </div>

                    {/* Price + Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg font-semibold">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1 text-xs md:text-sm">
                        <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Meta: Stock, Sold, Updated */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-muted">
                        Stock: {product.stock}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted">
                        Sold: {product.sold}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted hidden md:inline">
                        Updated{" "}
                        {new Date(product.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-col items-end gap-2 ml-3">
                    <Badge
                      variant={statusInfo.variant}
                      className="px-2 py-0.5 text-xs whitespace-nowrap"
                    >
                      {statusInfo.label}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 data-[state=open]:bg-accent"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel>Manage</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveProduct(product);
                            setInventoryOpen(true);
                          }}
                        >
                          Manage Inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveProduct(product);
                            setPricingOpen(true);
                          }}
                        >
                          Set Pricing Tiers
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveProduct(product);
                            setMoqLeadOpen(true);
                          }}
                        >
                          Set MOQ & Lead Time
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveProduct(product);
                            setSampleSettingsOpen(true);
                          }}
                        >
                          Sample Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Publish</DropdownMenuItem>
                        <DropdownMenuItem>Unpublish</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 flex items-center gap-2">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Products</Button>
      </div>

      {/* Manage Inventory */}
      <Dialog open={inventoryOpen} onOpenChange={setInventoryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Inventory</DialogTitle>
            <DialogDescription>
              {activeProduct?.name || "Update stock levels"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="inv-stock">Stock Quantity</Label>
              <Input id="inv-stock" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv-sku">SKU (optional)</Label>
              <Input id="inv-sku" placeholder="SKU-001" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Save</Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setInventoryOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Tiers */}
      <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pricing Tiers</DialogTitle>
            <DialogDescription>
              Set tiered unit prices by quantity
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Min Qty</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Unit Price</Label>
                <Input type="number" placeholder="9.90" />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Min Qty</Label>
                <Input type="number" placeholder="500" />
              </div>
              <div className="space-y-2">
                <Label>Unit Price</Label>
                <Input type="number" placeholder="8.50" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Save</Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPricingOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MOQ & Lead Time */}
      <Dialog open={moqLeadOpen} onOpenChange={setMoqLeadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>MOQ & Lead Time</DialogTitle>
            <DialogDescription>
              Set minimum order quantity and production lead time
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Minimum Order Quantity</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Lead Time (days)</Label>
                <Input type="number" placeholder="20" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Save</Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setMoqLeadOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sample Settings */}
      <Dialog open={sampleSettingsOpen} onOpenChange={setSampleSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sample Settings</DialogTitle>
            <DialogDescription>
              Define sample policy and costs
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Sample Cost</Label>
                <Input type="number" placeholder="15.00" />
              </div>
              <div className="space-y-2">
                <Label>Sample Lead (days)</Label>
                <Input type="number" placeholder="5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                rows={3}
                placeholder="Refundable on order? Packaging?"
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Save</Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSampleSettingsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
