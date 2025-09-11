"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import { Search, Plus, Target, Clock, CheckCircle, Users } from "lucide-react";
import Modal from "../../../components/Modal";
import CustomOrderForm from "../../../components/custom-card/CustomOrderForm";
import { DataTable } from "../../../components/ui/data-table";
import { createOrderColumns } from "../../../components/columns";
import useCustomOrderStore from "../../../store/customOrderStore";

// Keep small, clear mock data mapped into a single orders array used by the table.
const customOrders = [
  {
    id: "CUST-001",
    date: "2024-01-15",
    items: 3,
    budget: 200.0,
    status: "bidding_closed",
    trackingNumber: "TRK123456789",
    products: ["Classic Denim Jacket", "Slim Fit Chinos", "Cotton T-Shirt"],
    requirements: "High-quality denim, sustainable materials, bulk order for retail",
    deadline: "2024-02-15",
    samples: { requested: true, status: "approved", supplier: "UrbanWear Co.", cost: 25.0 },
    bids: [ { supplier: "UrbanWear Co.", price: 189.97, status: "accepted" } ],
  },
  {
    id: "CUST-002",
    date: "2024-01-12",
    items: 2,
    budget: 150.0,
    status: "bidding_active",
    trackingNumber: null,
    products: ["Organic Cotton Hoodie", "Linen Summer Dress"],
    requirements: "100% organic materials, eco-friendly packaging",
    deadline: "2024-02-10",
    samples: { requested: true, status: "pending", supplier: null, cost: 0 },
    bids: [ { supplier: "GreenTextiles", price: 139.98, status: "pending" } ],
  },
];

const retailOrders = [
  {
    id: "RETAIL-001",
    date: "2024-01-08",
    customer: "John Doe",
    items: 2,
    total: "$119.98",
    status: "delivered",
    trackingNumber: "TRK456789123",
    products: ["Floral Maxi Dress", "Lightweight Cardigan"],
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "RETAIL-002",
    date: "2024-01-05",
    customer: "Jane Smith",
    items: 1,
    total: "$89.99",
    status: "shipped",
    trackingNumber: "TRK789123456",
    products: ["Faux Fur Coat"],
    shippingAddress: "456 Oak Ave, Town, State 67890",
  },
];

// Helper to normalize both custom and retail orders into a single table-friendly shape
const normalizeOrders = (customs, retails, extraCustoms = []) => {
  const fromCustom = [...customs, ...extraCustoms].map((o) => ({
    id: o.id,
    product: o.products ? o.products.join(", ") : "Custom Order",
    supplier: (o.bids && o.bids[0] && o.bids[0].supplier) || (o.samples && o.samples.supplier) || "-",
    status: o.status === "bidding_active" ? "pending" : o.status === "bidding_closed" ? "confirmed" : "pending",
    fulfillmentStatus: o.trackingNumber ? "shipped" : "processing",
    quantity: o.items || 0,
    price: o.bids && o.bids[0] ? Number(o.bids[0].price) : Number(o.budget || 0),
    orderDate: o.date,
    estimatedDelivery: o.deadline || new Date().toISOString(),
    trackingNumber: o.trackingNumber || null,
    raw: o,
  // allow the raw order to override the declared type if present (supports 'wholesale')
  type: o.type || "custom",
  }));

  const fromRetail = retails.map((r) => ({
    id: r.id,
    product: r.products ? r.products.join(", ") : "Retail Order",
    supplier: "Retail",
    status: r.status,
    fulfillmentStatus: r.status,
    quantity: r.items || 0,
    price: Number(String(r.total || "").replace(/[^0-9.-]+/g, "")) || 0,
    orderDate: r.date,
    estimatedDelivery: r.date,
    trackingNumber: r.trackingNumber || null,
    raw: r,
  type: r.type || "retail",
  }));

  return [...fromCustom, ...fromRetail];
};

export default function OrdersPage() {
  const router = useRouter();
  const { customOrders: userCustomOrders = [] } = useCustomOrderStore();
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterOrderType, setFilterOrderType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const allOrders = useMemo(() => normalizeOrders(customOrders, retailOrders, userCustomOrders), [userCustomOrders]);

  const stats = useMemo(() => {
    const total = allOrders.length;
    const processing = allOrders.filter((o) => o.fulfillmentStatus === "processing").length;
    const shipped = allOrders.filter((o) => o.fulfillmentStatus === "shipped").length;
    const delivered = allOrders.filter((o) => o.fulfillmentStatus === "delivered").length;
    const revenue = allOrders.reduce((acc, o) => acc + (o.price || 0), 0);
    return { total, processing, shipped, delivered, revenue };
  }, [allOrders]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = allOrders.filter((o) => {
      const matchesQ =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        (o.supplier || "").toLowerCase().includes(q);

      const matchesStatus = filterStatus === "all" || o.status === filterStatus || o.fulfillmentStatus === filterStatus;
      const matchesType = filterType === "all" || o.type === filterType;
      const matchesOrderType = filterOrderType === "all" || o.type === filterOrderType;

      return matchesQ && matchesStatus && matchesType && matchesOrderType;
    });

    // simple sorts
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    } else if (sortBy === "amount-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "amount-low") {
      list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [allOrders, searchQuery, filterStatus, filterType, sortBy]);

  const columns = useMemo(() => createOrderColumns((order) => router.push(`/dashboard/orders/${order.id}`)), [router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-full md:w-96 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => setIsCustomOrderModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
        >
          <Plus className="h-4 w-4 text-white" />
          <span className="font-medium">Place Custom Order</span>
        </Button>
      </div>
{/* Orders Stats - visually match RFQs dashboard style */}
      <div className="grid gap-4 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}>
                <Target className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.05 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg`}>
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}>
                <Target className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.shipped}</div>
              <p className="text-xs text-muted-foreground">On the way</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.15 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}>
                <CheckCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}>
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimated</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full"><SelectValue placeholder="All Types" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Order Types</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                  <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} />
          ) : (
            <div className="py-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or create a new order</p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Shared Custom Order Modal (same form used in CustomOrderCard) */}
      <Modal
        isOpen={isCustomOrderModalOpen}
        onClose={() => setIsCustomOrderModalOpen(false)}
        title="Place Custom Order"
        size="lg"
        headerClassName="bg-gradient-to-r from-sky-600 to-cyan-500 text-white !border-0"
        contentClassName="bg-white/95"
        className="rounded-xl shadow-2xl"
      >
        <CustomOrderForm onClose={() => setIsCustomOrderModalOpen(false)} productInfo={{ title: "", id: "" }} />
      </Modal>
    </div>
  );
}
