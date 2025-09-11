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
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import CreateRFQDialog from "../../../components/CreateRFQDialog";
import FileUploadCard from "../../../components/FileUploadCard";
import { DataTable } from "../../../components/ui/data-table";
import { createRFQColumns } from "../../../components/columns";
import {
  Search,
  Plus,
  FileText,
  Upload,
  Eye,
  Trash2,
  Clock,
  Package,
  Target,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Download,
  Users,
  Star,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";

// Enhanced RFQ data with proper flow states - One-to-One with Seller
const rfqs = [
  {
    id: "RFQ-001",
    title: "Custom Denim Collection",
    buyer: "Fashion Retail Co.",
    seller: "UrbanWear Co.",
    status: "open",
    category: "Apparel",
    priority: "high",
    budget: 5000,
    quantity: 500,
    deadline: "2024-02-15",
    description: "Custom denim jackets and jeans for spring collection",
    requirements: "Sustainable materials, premium finish, bulk pricing",
    files: [
      { name: "design-specs.pdf", type: "pdf", size: "2.3 MB" },
      { name: "sample-images.jpg", type: "image", size: "1.1 MB" },
    ],
    responses: 0,
    createdAt: "2024-01-15",
    negotiationRounds: 3,
    timeLimit: "2024-01-30",
    buyerNotes: "Looking for premium quality with quick turnaround",
    contactInfo: {
      name: "John Smith",
      email: "john@fashionretail.com",
      phone: "+1 (555) 123-4567",
    },
    quote: null, // Single quote instead of multiple quotes
  },
  {
    id: "RFQ-002",
    title: "Organic Cotton Products",
    buyer: "EcoFashion",
    seller: "GreenTextiles",
    status: "negotiating",
    category: "Textiles",
    priority: "medium",
    budget: 3000,
    quantity: 200,
    deadline: "2024-02-10",
    description: "Organic cotton hoodies and t-shirts",
    requirements: "GOTS certified, eco-friendly packaging",
    files: [{ name: "product-specs.docx", type: "word", size: "1.8 MB" }],
    responses: 1,
    createdAt: "2024-01-12",
    negotiationRounds: 2,
    timeLimit: "2024-01-25",
    buyerNotes: "Sustainability is our top priority",
    contactInfo: {
      name: "Sarah Johnson",
      email: "sarah@ecostyle.com",
      phone: "+1 (555) 987-6543",
    },
    quote: {
      id: "QUOTE-003",
      supplier: "GreenTextiles",
      price: 2800,
      leadTime: "12-15 days",
      status: "accepted",
      submittedAt: "2024-01-14",
      acceptedAt: "2024-01-20",
      notes: "GOTS certified materials with eco-friendly packaging",
      rating: 4.9,
      previousOrders: 5,
      orderDetails: {
        orderId: "ORD-001",
        orderDate: "2024-01-20",
        deliveryDate: "2024-02-05",
      },
    },
  },
  {
    id: "RFQ-003",
    title: "Luxury Home Decor",
    buyer: "StyleHub",
    seller: "LuxuryFabrics",
    status: "closed",
    category: "Home & Garden",
    priority: "low",
    budget: 8000,
    quantity: 100,
    deadline: "2024-02-20",
    description: "Premium home decoration items",
    requirements: "Luxury materials, designer quality",
    files: [
      { name: "design-concept.ai", type: "ai", size: "5.2 MB" },
      { name: "materials-list.xlsx", type: "excel", size: "0.8 MB" },
    ],
    responses: 1,
    createdAt: "2024-01-10",
    negotiationRounds: 3,
    timeLimit: "2024-01-28",
    buyerNotes: "Quality over cost, must be exceptional",
    contactInfo: {
      name: "Emily Chen",
      email: "emily@luxurybrands.com",
      phone: "+1 (555) 321-0987",
    },
    quote: {
      id: "QUOTE-004",
      supplier: "LuxuryFabrics",
      price: 8500,
      leadTime: "25-30 days",
      status: "rejected",
      submittedAt: "2024-01-15",
      rejectedAt: "2024-01-22",
      notes: "Premium materials and craftsmanship",
      rating: 4.7,
      previousOrders: 2,
      rejectionReason: "Price exceeded budget expectations",
    },
  },
];

const statusConfig = {
  open: {
    label: "Open",
    icon: Clock,
    variant: "default",
    color: "text-blue-600",
    description: "Awaiting supplier response",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    variant: "default",
    color: "text-orange-600",
    description: "In negotiation phase",
  },
  closed: {
    label: "Closed",
    icon: CheckCircle,
    variant: "default",
    color: "text-green-600",
    description: "RFQ completed",
  },
  expired: {
    label: "Expired",
    icon: AlertCircle,
    variant: "destructive",
    color: "text-red-600",
    description: "Deadline passed",
  },
};

const priorityConfig = {
  high: { label: "High", color: "bg-red-100 text-red-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Low", color: "bg-green-100 text-green-800" },
};

// Quote Response Component
function QuoteResponseCard({ quote, onAccept, onReject, onNegotiate }) {
  const statusColors = {
    submitted: "bg-blue-50 border-blue-200",
    accepted: "bg-green-50 border-green-200",
    rejected: "bg-red-50 border-red-200",
    negotiating: "bg-orange-50 border-orange-200",
  };

  return (
    <div className={`p-4 border rounded-lg ${statusColors[quote.status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-lg">{quote.supplier}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{quote.rating}/5</span>
            <span>•</span>
            <span>{quote.previousOrders} previous orders</span>
          </div>
        </div>
        <Badge
          variant={
            quote.status === "accepted"
              ? "default"
              : quote.status === "rejected"
              ? "destructive"
              : "outline"
          }
        >
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <span className="text-sm font-medium">Price:</span>
          <div className="text-lg font-bold text-green-600">
            ${quote.price.toLocaleString()}
          </div>
        </div>
        <div>
          <span className="text-sm font-medium">Lead Time:</span>
          <div className="text-sm">{quote.leadTime}</div>
        </div>
      </div>

      {quote.notes && (
        <p className="text-sm text-muted-foreground mb-3">{quote.notes}</p>
      )}

      {quote.status === "submitted" && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onAccept(quote.id)}
            className="flex-1"
          >
            Accept Quote
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNegotiate(quote.id)}
            className="flex-1"
          >
            Negotiate
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReject(quote.id)}
          >
            Reject
          </Button>
        </div>
      )}

      {quote.status === "accepted" && quote.orderDetails && (
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <h5 className="font-medium text-green-800 mb-1">Order Accepted!</h5>
          <div className="text-sm text-green-700">
            <p>Order ID: {quote.orderDetails.orderId}</p>
            <p>
              Delivery:{" "}
              {new Date(quote.orderDetails.deliveryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {quote.status === "rejected" && quote.rejectionReason && (
        <div className="bg-red-50 p-3 rounded border border-red-200">
          <h5 className="font-medium text-red-800 mb-1">Quote Rejected</h5>
          <p className="text-sm text-red-700">{quote.rejectionReason}</p>
        </div>
      )}
    </div>
  );
}

// RFQ Detail View Component
function RFQDetailView({ rfq, isOpen, onClose, onAction }) {
  const statusInfo = statusConfig[rfq?.status];

  if (!rfq) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {rfq.title}
            <Badge variant={statusInfo?.variant} className={statusInfo?.color}>
              {statusInfo?.label}
            </Badge>
          </DialogTitle>
          <DialogDescription>{statusInfo?.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium">RFQ Information</Label>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <p>
                  <strong>Category:</strong> {rfq.category}
                </p>
                <p>
                  <strong>Priority:</strong> {rfq.priority}
                </p>
                <p>
                  <strong>Budget:</strong> ${rfq.budget.toLocaleString()}
                </p>
                <p>
                  <strong>Quantity:</strong> {rfq.quantity.toLocaleString()}
                </p>
                <p>
                  <strong>Supplier:</strong> {rfq.seller}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Timeline</Label>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(rfq.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(rfq.deadline).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time Limit:</strong>{" "}
                  {new Date(rfq.timeLimit).toLocaleDateString()}
                </p>
                <p>
                  <strong>Responses:</strong> {rfq.responses}
                </p>
              </div>
            </div>
          </div>

          {/* Description & Requirements */}
          <div className="space-y-4">
            <div>
              <Label className="font-medium">Description</Label>
              <div className="bg-muted p-3 rounded-md">{rfq.description}</div>
            </div>
            <div>
              <Label className="font-medium">Requirements</Label>
              <div className="bg-muted p-3 rounded-md">{rfq.requirements}</div>
            </div>
            {rfq.buyerNotes && (
              <div>
                <Label className="font-medium">Buyer Notes</Label>
                <div className="bg-muted p-3 rounded-md">{rfq.buyerNotes}</div>
              </div>
            )}
          </div>

          {/* Files */}
          {rfq.files.length > 0 && (
            <div>
              <Label className="font-medium">
                Attachments ({rfq.files.length})
              </Label>
              <div className="grid gap-2">
                {rfq.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({file.size})
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quote Response */}
          {rfq.quote && (
            <div>
              <Label className="font-medium">Supplier Response</Label>
              <div className="space-y-3">
                <QuoteResponseCard
                  quote={rfq.quote}
                  onAccept={(quoteId) => onAction("accept", quoteId)}
                  onReject={(quoteId) => onAction("reject", quoteId)}
                  onNegotiate={(quoteId) => onAction("negotiate", quoteId)}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// (FileUploadCard and CreateRFQDialog moved to components/FileUploadCard.jsx and components/CreateRFQDialog.jsx)

// RFQ Card Component
const RFQCard = ({ rfq, onViewDetails, onEdit, onDelete }) => {
  const statusInfo = statusConfig[rfq.status];
  const priorityInfo = priorityConfig[rfq.priority];

  // Resolve icon safely to avoid JSX parsing issues for dynamic components
  const Icon = statusInfo?.icon || null;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">{rfq.title}</CardTitle>
            <CardDescription>
              Created on {new Date(rfq.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>
            <Badge
              variant={statusInfo?.variant || "secondary"}
              className="flex items-center gap-1"
            >
              {Icon && <Icon className="h-3 w-3" />}
              {statusInfo?.label || rfq.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Budget:</span>
              <div className="text-muted-foreground">
                ${rfq.budget.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="font-medium">Quantity:</span>
              <div className="text-muted-foreground">{rfq.quantity}</div>
            </div>
            <div>
              <span className="font-medium">Category:</span>
              <div className="text-muted-foreground">{rfq.category}</div>
            </div>
            <div>
              <span className="font-medium">Supplier:</span>
              <div className="text-muted-foreground">{rfq.seller}</div>
            </div>
          </div>

          {/* Description & Requirements */}
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{rfq.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Requirements</h4>
            <p className="text-sm text-muted-foreground">{rfq.requirements}</p>
          </div>

          {/* Files */}
          {rfq.files.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">
                Attachments ({rfq.files.length})
              </h4>
              <div className="space-y-3">
                {rfq.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        console.log("Downloading file:", file.name)
                      }
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Negotiation Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Negotiation Rounds:</span>
              <div className="text-muted-foreground">
                {rfq.negotiationRounds}
              </div>
            </div>
            <div>
              <span className="font-medium">Time Limit:</span>
              <div className="text-muted-foreground">
                {new Date(rfq.timeLimit).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Deadlines */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Order Deadline:</span>
              <div className="text-muted-foreground">
                {new Date(rfq.deadline).toLocaleDateString()}
              </div>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <div className="text-muted-foreground">
                {rfq.status === "open"
                  ? "Awaiting supplier response"
                  : rfq.status === "negotiating"
                  ? "In negotiation"
                  : "Closed"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onViewDetails(rfq)}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              View Response ({rfq.responses})
            </Button>

            {rfq.status === "open" && (
              <Button size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Start Negotiation
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Negotiation Dialog Component
function NegotiationDialog({
  open,
  onOpenChange,
  onSubmit,
  negotiationData,
  setNegotiationData,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Start Negotiation
          </DialogTitle>
          <DialogDescription>
            Submit your counter-offer to negotiate with the supplier
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Counter Price *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={negotiationData.price}
              onChange={(e) =>
                setNegotiationData({
                  ...negotiationData,
                  price: e.target.value,
                })
              }
              placeholder="Enter your counter price"
              required
            />
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label htmlFor="timeline">Delivery Timeline *</Label>
            <Input
              id="timeline"
              type="text"
              value={negotiationData.timeline}
              onChange={(e) =>
                setNegotiationData({
                  ...negotiationData,
                  timeline: e.target.value,
                })
              }
              placeholder="e.g., 2-3 weeks, ASAP, etc."
              required
            />
          </div>

          {/* Terms */}
          <div className="space-y-2">
            <Label htmlFor="terms">Payment Terms</Label>
            <Input
              id="terms"
              type="text"
              value={negotiationData.terms}
              onChange={(e) =>
                setNegotiationData({
                  ...negotiationData,
                  terms: e.target.value,
                })
              }
              placeholder="e.g., 50% advance, 50% on delivery"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={negotiationData.notes}
              onChange={(e) =>
                setNegotiationData({
                  ...negotiationData,
                  notes: e.target.value,
                })
              }
              placeholder="Any additional requirements or conditions..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Submit Counter-Offer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Orders Section Component
function OrdersSection({ orders, onFulfillmentUpdate }) {
  const fulfillmentStatuses = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
    shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800" },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Orders will appear here when you accept quotes from suppliers
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Orders & Fulfillment</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{order.product}</CardTitle>
                <CardDescription>Order ID: {order.id}</CardDescription>
              </div>
              <Badge
                className={
                  fulfillmentStatuses[order.fulfillmentStatus]?.color ||
                  "bg-gray-100 text-gray-800"
                }
              >
                {fulfillmentStatuses[order.fulfillmentStatus]?.label ||
                  order.fulfillmentStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium">Supplier:</span>
                <div className="text-sm text-muted-foreground">
                  {order.supplier}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Quantity:</span>
                <div className="text-sm text-muted-foreground">
                  {order.quantity}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Price:</span>
                <div className="text-sm text-muted-foreground">
                  ${order.price.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Order Date:</span>
                <div className="text-sm text-muted-foreground">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium">Estimated Delivery:</span>
                <div className="text-sm text-muted-foreground">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Payment Terms:</span>
                <div className="text-sm text-muted-foreground">
                  {order.paymentTerms}
                </div>
              </div>
              {order.trackingNumber && (
                <div>
                  <span className="text-sm font-medium">Tracking:</span>
                  <div className="text-sm text-muted-foreground">
                    {order.trackingNumber}
                  </div>
                </div>
              )}
            </div>

            {/* Fulfillment Actions */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Update Fulfillment Status</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(fulfillmentStatuses).map(([status, config]) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={
                      order.fulfillmentStatus === status ? "default" : "outline"
                    }
                    onClick={() => onFulfillmentUpdate(order.id, status)}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>

              {/* Tracking Number Input */}
              {order.fulfillmentStatus === "shipped" && (
                <div className="mt-3">
                  <Label htmlFor={`tracking-${order.id}`}>
                    Tracking Number
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={`tracking-${order.id}`}
                      placeholder="Enter tracking number"
                      value={order.trackingNumber || ""}
                      onChange={(e) =>
                        onFulfillmentUpdate(order.id, "shipped", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function RFQsPage() {
  const { role } = useAuthStore();
  const router = useRouter();
  const [rfqList, setRfqList] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("rfqs");
        return stored ? JSON.parse(stored) : rfqs;
      }
    } catch (e) {
      // ignore
    }
    return rfqs;
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // New state variables for quotation flow
  const [negotiationDialogOpen, setNegotiationDialogOpen] = useState(false);
  const [negotiationData, setNegotiationData] = useState({
    price: "",
    timeline: "",
    terms: "",
    notes: "",
  });
  const [orders, setOrders] = useState([]);

  const handleCreateRFQ = (newRFQ) => {
    // Use functional update to avoid stale closures and ensure latest state
    setRfqList((prev) => [newRFQ, ...prev]);
  };

  // Persist RFQs to localStorage whenever list changes
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("rfqs", JSON.stringify(rfqList));
      }
    } catch (e) {}
  }, [rfqList]);

  // Listen for cross-window/component updates (dispatched by other components)
  React.useEffect(() => {
    const handler = () => {
      try {
        const stored = localStorage.getItem("rfqs");
        if (stored) setRfqList(JSON.parse(stored));
      } catch (e) {}
    };

    window.addEventListener("rfqs-updated", handler);
    return () => window.removeEventListener("rfqs-updated", handler);
  }, []);

  const handleViewDetails = (rfq) => {
    // Navigate to the detailed view page
    router.push(`/dashboard/rfqs/${rfq.id}`);
  };

  const handleViewDetailsModal = (rfq) => {
    setSelectedRFQ(rfq);
    setDetailViewOpen(true);
  };

  const handleStartNegotiation = (rfq) => {
    setSelectedRFQ(rfq);
    setNegotiationDialogOpen(true);
  };

  const handleRFQAction = (action, quoteId) => {
    const rfq = selectedRFQ;
    if (!rfq) return;

    if (action === "accept") {
      // Create order from accepted quote
      const newOrder = {
        id: `ORD-${Date.now()}`,
        rfqId: rfq.id,
        quoteId: quoteId,
        buyer: rfq.buyer,
        supplier: rfq.seller,
        product: rfq.title,
        category: rfq.category,
        quantity: rfq.quantity,
        price: rfq.quote?.price || rfq.budget,
        status: "confirmed",
        orderDate: new Date().toISOString(),
        deliveryDate: calculateDeliveryDate(rfq.quote?.leadTime || 30),
        paymentTerms: rfq.quote?.paymentTerms || "30% advance, 70% on delivery",
        requirements: rfq.requirements,
        specifications: rfq.quote?.specifications || "As per RFQ requirements",
        fulfillmentStatus: "pending",
        trackingNumber: null,
        estimatedDelivery: calculateDeliveryDate(rfq.quote?.leadTime || 30),
      };

      // Update RFQ status to closed
      setRfqList((prev) =>
        prev.map((r) =>
          r.id === rfq.id
            ? {
                ...r,
                status: "closed",
                quote: r.quote ? { ...r.quote, status: "accepted" } : null,
              }
            : r
        )
      );

      // Add order to orders list
      setOrders((prev) => [newOrder, ...prev]);

  // Show success notification (removed toast)

      // Close detail view
      setDetailViewOpen(false);
      setSelectedRFQ(null);
    } else if (action === "reject") {
      // Update quote status to rejected
      setRfqList((prev) =>
        prev.map((r) =>
          r.id === rfq.id
            ? {
                ...r,
                quote: r.quote ? { ...r.quote, status: "rejected" } : null,
              }
            : r
        )
      );

  // Show rejection notification (removed toast)
    } else if (action === "negotiate") {
      // Open negotiation dialog
      setNegotiationDialogOpen(true);
    }
  };

  // Helper function to calculate delivery date
  const calculateDeliveryDate = (leadTimeDays = 30) => {
    const date = new Date();
    date.setDate(date.getDate() + leadTimeDays);
    return date.toISOString();
  };

  // Handle negotiation submission
  const handleNegotiationSubmit = (e) => {
    e.preventDefault();

    if (!selectedRFQ) return;

    // Update RFQ status to negotiating
    setRfqList((prev) =>
      prev.map((r) =>
        r.id === selectedRFQ.id ? { ...r, status: "negotiating" } : r
      )
    );

    // Add negotiation round
    const negotiationRound = {
      round: 1,
      type: "buyer_counter_offer",
      buyer: selectedRFQ.buyer,
      price: parseFloat(negotiationData.price),
      timeline: negotiationData.timeline,
      terms: negotiationData.terms,
      notes: negotiationData.notes,
      date: new Date().toISOString(),
      status: "pending_supplier_response",
    };

    // Update RFQ with negotiation data
    setRfqList((prev) =>
      prev.map((r) =>
        r.id === selectedRFQ.id
          ? {
              ...r,
              status: "negotiating",
              negotiationRounds: [
                ...(r.negotiationRounds || []),
                negotiationRound,
              ],
            }
          : r
      )
    );

  // Show negotiation notification (removed toast)

    // Close negotiation dialog
    setNegotiationDialogOpen(false);
    setNegotiationData({ price: "", timeline: "", terms: "", notes: "" });
  };

  // Handle order fulfillment updates
  const handleOrderFulfillment = (orderId, status, trackingNumber = null) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              fulfillmentStatus: status,
              trackingNumber: trackingNumber || order.trackingNumber,
              lastUpdated: new Date().toISOString(),
            }
          : order
      )
    );

  // Show fulfillment notification (removed toast)
  };

  const filteredRFQs = rfqList.filter((rfq) => {
    const matchesSearch =
      rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || rfq.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || rfq.category === filterCategory;
    const matchesPriority =
      filterPriority === "all" || rfq.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStats = () => {
    const stats = {
      total: rfqList.length,
      open: rfqList.filter((rfq) => rfq.status === "open").length,
      negotiating: rfqList.filter((rfq) => rfq.status === "negotiating").length,
      closed: rfqList.filter((rfq) => rfq.status === "closed").length,
      totalResponses: rfqList.reduce((acc, rfq) => acc + rfq.responses, 0),
    };
    return stats;
  };

  const stats = getStats();

  // Create columns with handlers
  const columns = createRFQColumns(handleViewDetails, handleStartNegotiation, role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
  <div className="w-full md:w-96 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search RFQs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
        >
          <Plus className="h-4 w-4 text-white" />
          <span className="font-medium">Create RFQ</span>
        </Button>
      </div>

      {/* RFQ Stats */}

      <div className="grid gap-4 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
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
              <CardTitle className="text-sm font-medium">Open</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg`}>
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
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
              <CardTitle className="text-sm font-medium">Negotiating</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}>
                <MessageSquare className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.negotiating}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
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
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}>
                <CheckCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.closed}</div>
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
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}>
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalResponses}</div>
              <p className="text-xs text-muted-foreground">From suppliers</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter RFQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Textiles">Textiles</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-44">
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RFQ Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">RFQ List</CardTitle>
          <CardDescription>
            Click on any RFQ ID to view detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRFQs.length > 0 ? (
            <DataTable columns={columns} data={filteredRFQs} />
          ) : (
            <div className="py-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No RFQs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new RFQ
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                  setFilterCategory("all");
                  setFilterPriority("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateRFQDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateRFQ}
      />

      <RFQDetailView
        rfq={selectedRFQ}
        isOpen={detailViewOpen}
        onClose={() => {
          setDetailViewOpen(false);
          setSelectedRFQ(null);
        }}
        onAction={handleRFQAction}
      />

      <NegotiationDialog
        open={negotiationDialogOpen}
        onOpenChange={setNegotiationDialogOpen}
        onSubmit={handleNegotiationSubmit}
        negotiationData={negotiationData}
        setNegotiationData={setNegotiationData}
      />

      {/* Orders Section */}
      {orders.length > 0 && (
        <div className="mt-8">
          <OrdersSection
            orders={orders}
            onFulfillmentUpdate={handleOrderFulfillment}
          />
        </div>
      )}
    </div>
  );
}
