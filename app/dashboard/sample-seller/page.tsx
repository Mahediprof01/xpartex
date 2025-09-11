"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
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
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { DataTable } from "../../../components/ui/data-table";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  DollarSign,
  X,
  Download,
} from "lucide-react";
import useSampleStore from "../../../store/sampleStore";
import { createSellerSampleColumns } from "../../../components/columns";

// Approval Dialog Component
function ApprovalDialog({ sample, isOpen, onClose, onSubmit }) {
  const [approvalData, setApprovalData] = useState({
    action: "approve", // approve or reject
    cost: sample?.cost || 0,
    estimatedShippingDays: 3,
    notes: "",
    rejectionReason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sample.id, approvalData);
    setApprovalData({
      action: "approve",
      cost: 0,
      estimatedShippingDays: 3,
      notes: "",
      rejectionReason: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Review Sample Request</DialogTitle>
          <DialogDescription>
            Review and respond to sample request for {sample?.productName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sample Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>
              <strong>Product:</strong> {sample?.productName}
            </p>
            <p>
              <strong>Buyer:</strong> {sample?.buyer}
            </p>
            <p>
              <strong>Quantity:</strong> {sample?.quantity}
            </p>
            <p>
              <strong>Specifications:</strong> {sample?.specifications}
            </p>
            {sample?.buyerNotes && (
              <p>
                <strong>Buyer Notes:</strong> {sample.buyerNotes}
              </p>
            )}
          </div>

          {/* Action Selection */}
          <div className="space-y-2">
            <Label>Decision *</Label>
            <Select
              value={approvalData.action}
              onValueChange={(value) =>
                setApprovalData({ ...approvalData, action: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Approve Request
                  </div>
                </SelectItem>
                <SelectItem value="reject">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    Reject Request
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {approvalData.action === "approve" && (
            <>
              {/* Sample Cost */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cost">Sample Cost ($) *</Label>
                  <Input
                    id="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={approvalData.cost}
                    onChange={(e) =>
                      setApprovalData({
                        ...approvalData,
                        cost: parseFloat(e.target.value) || 0,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingDays">
                    Estimated Shipping (days)
                  </Label>
                  <Input
                    id="shippingDays"
                    type="number"
                    min="1"
                    max="30"
                    value={approvalData.estimatedShippingDays}
                    onChange={(e) =>
                      setApprovalData({
                        ...approvalData,
                        estimatedShippingDays: parseInt(e.target.value) || 3,
                      })
                    }
                  />
                </div>
              </div>

              {/* Approval Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Response Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional information for the buyer..."
                  rows={3}
                  value={approvalData.notes}
                  onChange={(e) =>
                    setApprovalData({ ...approvalData, notes: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {approvalData.action === "reject" && (
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason *</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Please explain why this request cannot be fulfilled..."
                rows={3}
                value={approvalData.rejectionReason}
                onChange={(e) =>
                  setApprovalData({
                    ...approvalData,
                    rejectionReason: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className={`flex-1 ${
                approvalData.action === "approve"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {approvalData.action === "approve" ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Request
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Request
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Shipping Dialog Component
function ShippingDialog({ sample, isOpen, onClose, onSubmit }) {
  const [shippingData, setShippingData] = useState({
    carrier: "DHL Express",
    trackingNumber: "",
    estimatedDelivery: "",
    shippingCost: 0,
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sample.id, shippingData);
    setShippingData({
      carrier: "DHL Express",
      trackingNumber: "",
      estimatedDelivery: "",
      shippingCost: 0,
      notes: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Ship Sample</DialogTitle>
          <DialogDescription>
            Record shipping details for {sample?.productName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sample Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>
              <strong>Product:</strong> {sample?.productName}
            </p>
            <p>
              <strong>Buyer:</strong> {sample?.buyer}
            </p>
            <p>
              <strong>Quantity:</strong> {sample?.quantity}
            </p>
          </div>

          {/* Shipping Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="carrier">Shipping Carrier *</Label>
              <Select
                value={shippingData.carrier}
                onValueChange={(value) =>
                  setShippingData({ ...shippingData, carrier: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DHL Express">DHL Express</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="USPS">USPS</SelectItem>
                  <SelectItem value="Local Courier">Local Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trackingNumber">Tracking Number *</Label>
              <Input
                id="trackingNumber"
                placeholder="Enter tracking number"
                value={shippingData.trackingNumber}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    trackingNumber: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <Input
                id="estimatedDelivery"
                type="date"
                value={shippingData.estimatedDelivery}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    estimatedDelivery: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingCost">Shipping Cost ($)</Label>
              <Input
                id="shippingCost"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={shippingData.shippingCost}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    shippingCost: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          {/* Shipping Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Shipping Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special handling instructions or notes..."
              rows={3}
              value={shippingData.notes}
              onChange={(e) =>
                setShippingData({ ...shippingData, notes: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-blue-500 text-white">
              <Truck className="h-4 w-4 mr-2" />
              Ship Sample
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function SampleSellerPage() {
  const router = useRouter();
  const { sampleRequests, updateSampleRequest } = useSampleStore();

  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter samples relevant to this seller (in real app, filter by supplier)
  const sellerSamples = sampleRequests.filter(
    () =>
      // In real implementation, filter by supplier === current user company
      true // For now, show all samples
  );

  const filteredSamples = sellerSamples
    .filter((sample) => {
      const matchesStatus =
        filterStatus === "all" || sample.status === filterStatus;

      const matchesPriority =
        filterPriority === "all" || sample.priority === filterPriority;

      const matchesSearch =
        sample.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sample.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sample.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Date range filter
      const matchesDateRange = (() => {
        if (dateRange === "all") return true;

        const sampleDate = new Date(sample.requestDate);
        const now = new Date();

        switch (dateRange) {
          case "today":
            return sampleDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return sampleDate >= weekAgo;
          case "month":
            return (
              sampleDate.getMonth() === now.getMonth() &&
              sampleDate.getFullYear() === now.getFullYear()
            );
          case "quarter":
            const quarter = Math.floor(now.getMonth() / 3);
            const sampleQuarter = Math.floor(sampleDate.getMonth() / 3);
            return (
              sampleQuarter === quarter &&
              sampleDate.getFullYear() === now.getFullYear()
            );
          case "year":
            return sampleDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      })();

      return (
        matchesStatus && matchesPriority && matchesSearch && matchesDateRange
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.requestDate).getTime() -
            new Date(a.requestDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.requestDate).getTime() -
            new Date(b.requestDate).getTime()
          );
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
          );
        case "status":
          return a.status.localeCompare(b.status);
        case "cost":
          return (b.cost || 0) - (a.cost || 0);
        case "deadline":
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        default:
          return (
            new Date(b.requestDate).getTime() -
            new Date(a.requestDate).getTime()
          );
      }
    });

  const handleViewDetails = (sample) => {
    router.push(`/dashboard/sample-seller/${sample.id}`);
  };

  const handleApproveReject = (sample) => {
    setSelectedSample(sample);
    setIsApprovalDialogOpen(true);
  };

  const handleShip = (sample) => {
    setSelectedSample(sample);
    setIsShippingDialogOpen(true);
  };

  const handleApprovalSubmit = (sampleId, approvalData) => {
    const updates = {
      status: approvalData.action === "approve" ? "approved" : "rejected",
      approvalDate: new Date().toISOString().split("T")[0],
      cost: approvalData.cost || 0,
      sellerResponse: approvalData.notes || approvalData.rejectionReason,
      rejectionReason:
        approvalData.action === "reject" ? approvalData.rejectionReason : null,
      estimatedShippingDays: approvalData.estimatedShippingDays || null,
    };

    updateSampleRequest(sampleId, updates);
    setSelectedSample(null);
  };

  const handleShippingSubmit = (sampleId, shippingData) => {
    const updates = {
      status: "shipped",
      shippingDate: new Date().toISOString().split("T")[0],
      shippingDetails: {
        carrier: shippingData.carrier,
        trackingNumber: shippingData.trackingNumber,
        estimatedDelivery: shippingData.estimatedDelivery,
        shippingCost: shippingData.shippingCost,
        notes: shippingData.notes,
      },
    };

    updateSampleRequest(sampleId, updates);
    setSelectedSample(null);
  };

  const getStats = () => {
    return [
      {
        title: "Total Requests",
        value: sellerSamples.length,
        description: "Sample requests received",
        icon: Package,
      },
      {
        title: "Pending Review",
        value: sellerSamples.filter((s) => s.status === "pending_approval")
          .length,
        description: "Awaiting your response",
        icon: Clock,
      },
      {
        title: "Shipped",
        value: sellerSamples.filter((s) => s.status === "shipped").length,
        description: "Samples in transit",
        icon: Truck,
      },
      {
        title: "Total Revenue",
        value: `$${sellerSamples
          .reduce((acc, s) => acc + (s.cost || 0), 0)
          .toFixed(2)}`,
        description: "From samples",
        icon: DollarSign,
      },
    ];
  };

  const stats = getStats();

  // Create columns with handlers
  const columns = createSellerSampleColumns(
    handleViewDetails,
    handleApproveReject,
    handleShip
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Sample Management
          </h1>
          <p className="text-muted-foreground">
            Review and manage incoming sample requests
          </p>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-10 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sample Stats - Enhanced Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = [
            {
              bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
              iconBg: "bg-blue-500",
              iconColor: "text-white",
              accent: "border-blue-200",
              textGradient:
                "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
            },
            {
              bg: "bg-gradient-to-br from-amber-50 to-orange-100",
              iconBg: "bg-amber-500",
              iconColor: "text-white",
              accent: "border-amber-200",
              textGradient:
                "bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent",
            },
            {
              bg: "bg-gradient-to-br from-emerald-50 to-green-100",
              iconBg: "bg-emerald-500",
              iconColor: "text-white",
              accent: "border-emerald-200",
              textGradient:
                "bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent",
            },
            {
              bg: "bg-gradient-to-br from-purple-50 to-violet-100",
              iconBg: "bg-purple-500",
              iconColor: "text-white",
              accent: "border-purple-200",
              textGradient:
                "bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent",
            },
          ];
          const color = colors[index % colors.length];

          return (
            <Card
              key={stat.title}
              className={`relative overflow-hidden border-2 ${color.accent} ${color.bg} hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                <div className="absolute inset-0 bg-white rounded-full transform translate-x-4 -translate-y-4"></div>
                <div className="absolute inset-1 bg-white rounded-full transform translate-x-5 -translate-y-2"></div>
              </div>

              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  {/* Icon and Stats */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${color.iconBg} shadow-sm transform hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className={`h-4 w-4 ${color.iconColor}`} />
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide leading-tight">
                        {stat.title}
                      </h3>
                      <div
                        className={`text-xl font-bold ${color.textGradient} leading-tight`}
                      >
                        {stat.value}
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 leading-tight">
                        <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Subtle glow effect */}
              <div
                className={`absolute inset-0 rounded-lg ${color.iconBg} opacity-0 hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </Card>
          );
        })}
      </div>

      {/* Compact Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-end">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending_approval">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Only show Clear button when there are active filters */}
          {(searchQuery ||
            filterStatus !== "all" ||
            filterPriority !== "all" ||
            dateRange !== "all" ||
            sortBy !== "recent") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
                setFilterPriority("all");
                setDateRange("all");
                setSortBy("recent");
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
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery ||
        filterStatus !== "all" ||
        filterPriority !== "all" ||
        dateRange !== "all") && (
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
            {filterStatus !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterStatus.replace("_", " ")}
                <button
                  onClick={() => setFilterStatus("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterPriority !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {filterPriority}
                <button
                  onClick={() => setFilterPriority("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {dateRange !== "all" && (
              <Badge variant="secondary" className="text-xs h-6">
                {dateRange}
                <button
                  onClick={() => setDateRange("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Samples Data Table */}
      <Card>
        <CardContent>
          {filteredSamples.length > 0 ? (
            <DataTable columns={columns} data={filteredSamples} />
          ) : (
            <div className="py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Sample Requests</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ||
                filterStatus !== "all" ||
                filterPriority !== "all" ||
                dateRange !== "all"
                  ? "No requests match your current filters"
                  : "No sample requests received yet"}
              </p>
              {searchQuery ||
              filterStatus !== "all" ||
              filterPriority !== "all" ||
              dateRange !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                    setFilterPriority("all");
                    setDateRange("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ApprovalDialog
        sample={selectedSample}
        isOpen={isApprovalDialogOpen}
        onClose={() => {
          setIsApprovalDialogOpen(false);
          setSelectedSample(null);
        }}
        onSubmit={handleApprovalSubmit}
      />

      <ShippingDialog
        sample={selectedSample}
        isOpen={isShippingDialogOpen}
        onClose={() => {
          setIsShippingDialogOpen(false);
          setSelectedSample(null);
        }}
        onSubmit={handleShippingSubmit}
      />
    </div>
  );
}
