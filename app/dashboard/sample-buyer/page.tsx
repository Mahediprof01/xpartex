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
import { Checkbox } from "../../../components/ui/checkbox";
import { DataTable } from "../../../components/ui/data-table";
import {
  Search,
  Plus,
  Award,
  Package,
  Clock,
  DollarSign,
  Star,
  X,
  Download,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";
import useSampleStore from "../../../store/sampleStore";
import { createSampleColumns } from "../../../components/columns";

// Sample Request Form Component
function SampleRequestForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    productName: "",
    supplier: "",
    quantity: 1,
    specifications: "",
    notes: "",
    priority: "medium",
    deadline: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      productName: "",
      supplier: "",
      quantity: 1,
      specifications: "",
      notes: "",
      priority: "medium",
      deadline: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Request Product Sample</DialogTitle>
          <DialogDescription>
            Request a sample to evaluate product quality before placing bulk
            orders
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) =>
                  setFormData({ ...formData, supplier: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UrbanWear Co.">UrbanWear Co.</SelectItem>
                  <SelectItem value="EcoFashion">EcoFashion</SelectItem>
                  <SelectItem value="StyleHub">StyleHub</SelectItem>
                  <SelectItem value="GreenTextiles">GreenTextiles</SelectItem>
                  <SelectItem value="LuxuryFabrics">LuxuryFabrics</SelectItem>
                  <SelectItem value="PremiumManufacturing">
                    PremiumManufacturing
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Input
              id="specifications"
              placeholder="Size, color, material, etc."
              value={formData.specifications}
              onChange={(e) =>
                setFormData({ ...formData, specifications: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or questions..."
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-blue-500 text-white">
              Submit Request
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

// Sample Detail View Component
function SampleDetailView({ sample, isOpen, onClose, onAction }) {
  if (!sample) return null;

  const getStatusBadge = (status) => {
    const statusMap = {
      pending_approval: { label: "Pending Approval", variant: "secondary" },
      approved: { label: "Approved", variant: "default" },
      shipped: { label: "Shipped", variant: "outline" },
      delivered: { label: "Delivered", variant: "default" },
      rejected: { label: "Rejected", variant: "destructive" },
    };
    return statusMap[status] || { label: status, variant: "secondary" };
  };

  const statusInfo = getStatusBadge(sample.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Sample Request: {sample.productName}
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </DialogTitle>
          <DialogDescription>
            {sample.status === "pending_approval" && "Awaiting seller response"}
            {sample.status === "approved" && "Sample approved for shipping"}
            {sample.status === "shipped" && "Sample in transit"}
            {sample.status === "delivered" && "Sample received by buyer"}
            {sample.status === "rejected" && "Sample request denied"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium">Sample Information</Label>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <p>
                  <strong>Product:</strong> {sample.productName}
                </p>
                <p>
                  <strong>Specifications:</strong> {sample.specifications}
                </p>
                <p>
                  <strong>Quantity:</strong> {sample.quantity}
                </p>
                <p>
                  <strong>Cost:</strong> ${sample.cost?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Request Details</Label>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <p>
                  <strong>Supplier:</strong> {sample.supplier}
                </p>
                <p>
                  <strong>Request Date:</strong>{" "}
                  {new Date(sample.requestDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Priority:</strong> {sample.priority || "Medium"}
                </p>
                {sample.deadline && (
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(sample.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label className="font-medium">Request Timeline</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>
                  Requested: {new Date(sample.requestDate).toLocaleDateString()}
                </span>
              </div>
              {sample.approvalDate && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>
                    Approved:{" "}
                    {new Date(sample.approvalDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {sample.shippingDate && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>
                    Shipped:{" "}
                    {new Date(sample.shippingDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {sample.deliveryDate && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>
                    Delivered:{" "}
                    {new Date(sample.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes and Communication */}
          <div className="space-y-4">
            {sample.buyerNotes && (
              <div className="space-y-2">
                <Label className="font-medium">Your Notes</Label>
                <div className="bg-muted p-3 rounded-md">
                  {sample.buyerNotes}
                </div>
              </div>
            )}

            {sample.sellerResponse && (
              <div className="space-y-2">
                <Label className="font-medium">Supplier Response</Label>
                <div className="bg-muted p-3 rounded-md">
                  {sample.sellerResponse}
                </div>
              </div>
            )}

            {sample.shippingDetails && (
              <div className="space-y-2">
                <Label className="font-medium">Shipping Information</Label>
                <div className="bg-muted p-3 rounded-md space-y-1">
                  <p>
                    <strong>Carrier:</strong> {sample.shippingDetails.carrier}
                  </p>
                  <p>
                    <strong>Tracking:</strong>{" "}
                    {sample.shippingDetails.trackingNumber}
                  </p>
                  {sample.shippingDetails.estimatedDelivery && (
                    <p>
                      <strong>Estimated Delivery:</strong>{" "}
                      {new Date(
                        sample.shippingDetails.estimatedDelivery
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {sample.feedback && (
              <div className="space-y-2">
                <Label className="font-medium">Your Feedback</Label>
                <div className="bg-muted p-3 rounded-md">
                  <p>{sample.feedback}</p>
                  {sample.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= sample.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({sample.rating}/5)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            {sample.status === "delivered" && !sample.feedback && (
              <Button onClick={() => onAction("rate", sample)}>
                Rate Sample
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Feedback Dialog Component
function FeedbackDialog({ sample, isOpen, onClose, onSubmit }) {
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    comments: "",
    willOrder: false,
    orderNotes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    onSubmit(sample.id, feedbackData);
    setFeedbackData({
      rating: 0,
      comments: "",
      willOrder: false,
      orderNotes: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sample Feedback & Rating</DialogTitle>
          <DialogDescription>
            Evaluate the sample quality and provide feedback for{" "}
            {sample?.productName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sample Details */}
          <div className="bg-muted p-3 rounded-md space-y-2">
            <p>
              <strong>Product:</strong> {sample?.productName}
            </p>
            <p>
              <strong>Supplier:</strong> {sample?.supplier}
            </p>
            <p>
              <strong>Specifications:</strong> {sample?.specifications}
            </p>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Sample Quality Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFeedbackData({ ...feedbackData, rating: star })
                  }
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= feedbackData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {feedbackData.rating === 0 && "Click to rate"}
              {feedbackData.rating === 1 && "Poor - Below expectations"}
              {feedbackData.rating === 2 && "Fair - Some issues"}
              {feedbackData.rating === 3 && "Good - Meets basic requirements"}
              {feedbackData.rating === 4 && "Very Good - Exceeds expectations"}
              {feedbackData.rating === 5 && "Excellent - Outstanding quality"}
            </p>
          </div>

          {/* Feedback Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Detailed Feedback *</Label>
            <Textarea
              id="comments"
              placeholder="Describe the sample quality, workmanship, material quality, and any issues or positive aspects..."
              rows={4}
              value={feedbackData.comments}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, comments: e.target.value })
              }
              required
            />
          </div>

          {/* Will Place Order */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="willOrder"
                checked={feedbackData.willOrder}
                onCheckedChange={(checked) =>
                  setFeedbackData({ ...feedbackData, willOrder: !!checked })
                }
              />
              <Label htmlFor="willOrder">
                I plan to place a bulk order based on this sample
              </Label>
            </div>
          </div>

          {/* Order Notes */}
          {feedbackData.willOrder && (
            <div className="space-y-2">
              <Label htmlFor="orderNotes">Order Notes</Label>
              <Textarea
                id="orderNotes"
                placeholder="Any specific requirements, modifications, or notes for the bulk order..."
                rows={3}
                value={feedbackData.orderNotes}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    orderNotes: e.target.value,
                  })
                }
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Submit Feedback
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

export default function SampleBuyerPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { sampleRequests, addSampleRequest, updateSampleRequest } =
    useSampleStore();

  const [isRequestSampleOpen, setIsRequestSampleOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSamples = sampleRequests
    .filter((sample) => {
      const matchesStatus =
        filterStatus === "all" || sample.status === filterStatus;

      const matchesPriority =
        filterPriority === "all" || sample.priority === filterPriority;

      const matchesSearch =
        sample.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sample.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      // Apply sorting
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

  const handleSubmitSampleRequest = (formData) => {
    const sampleData = {
      productName: formData.productName,
      supplier: formData.supplier,
      buyer: user?.name || "Current Buyer",
      quantity: formData.quantity,
      specifications: formData.specifications,
      buyerNotes: formData.notes,
      priority: formData.priority,
      deadline: formData.deadline,
    };

    addSampleRequest(sampleData);
  };

  const handleViewDetails = (sample) => {
    // Navigate to the detailed view page
    router.push(`/dashboard/sample-buyer/${sample.id}`);
  };

  const handleSampleAction = (action, sample) => {
    if (action === "rate") {
      setSelectedSample(sample);
      setIsFeedbackDialogOpen(true);
    }
  };

  const handleFeedbackSubmit = (sampleId, feedbackData) => {
    updateSampleRequest(sampleId, {
      feedback: feedbackData.comments,
      rating: feedbackData.rating,
      willOrder: feedbackData.willOrder,
      orderNotes: feedbackData.orderNotes,
    });
    setSelectedSample(null);
  };

  const getStats = () => {
    return [
      {
        title: "Total Requests",
        value: sampleRequests.length,
        description: "Samples requested",
        icon: Award,
      },
      {
        title: "Pending",
        value: sampleRequests.filter((s) => s.status === "pending_approval")
          .length,
        description: "Awaiting approval",
        icon: Clock,
      },
      {
        title: "Delivered",
        value: sampleRequests.filter((s) => s.status === "delivered").length,
        description: "Samples received",
        icon: Package,
      },
      {
        title: "Total Spent",
        value: `$${sampleRequests
          .reduce((acc, s) => acc + (s.cost || 0), 0)
          .toFixed(2)}`,
        description: "On samples",
        icon: DollarSign,
      },
    ];
  };

  const stats = getStats();

  // Create columns with handlers
  const columns = createSampleColumns(handleViewDetails);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search samples..."
            className="pl-10 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-500 text-white"
          onClick={() => setIsRequestSampleOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Request Sample
        </Button>
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
              <SelectItem value="pending_approval">Pending</SelectItem>
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

      {/* Active Filters Display - Only if filters are active */}
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
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Sample Requests</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ||
                filterStatus !== "all" ||
                filterPriority !== "all" ||
                dateRange !== "all"
                  ? "No samples match your current filters"
                  : "Start by requesting your first product sample"}
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
              ) : (
                <Button onClick={() => setIsRequestSampleOpen(true)}>
                  Request Sample
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <SampleRequestForm
        isOpen={isRequestSampleOpen}
        onClose={() => setIsRequestSampleOpen(false)}
        onSubmit={handleSubmitSampleRequest}
      />

      <SampleDetailView
        sample={selectedSample}
        isOpen={isDetailViewOpen}
        onClose={() => {
          setIsDetailViewOpen(false);
          setSelectedSample(null);
        }}
        onAction={handleSampleAction}
      />

      <FeedbackDialog
        sample={selectedSample}
        isOpen={isFeedbackDialogOpen}
        onClose={() => {
          setIsFeedbackDialogOpen(false);
          setSelectedSample(null);
        }}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
