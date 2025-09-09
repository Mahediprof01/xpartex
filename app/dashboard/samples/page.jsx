"use client";

import { useState, useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import useSampleStore from "../../../store/sampleStore";
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
  Award,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  DollarSign,
  Calendar,
  MessageSquare,
  Download,
  MoreHorizontal,
  Star,
  Send,
  X,
  ArrowRight,
  ArrowLeft,
  Shield,
  TrendingDown,
} from "lucide-react";

// Sample data with proper flow states and demerit tracking
const sampleRequests = [
  {
    id: "SAMPLE-001",
    productName: "Classic Denim Jacket",
    supplier: "UrbanWear Co.",
    buyer: "Fashion Retail Co.",
    status: "pending_approval", // New status for flow
    requestDate: "2024-01-15",
    approvalDate: null,
    shippingDate: null,
    deliveryDate: null,
    cost: 25.0,
    quantity: 2,
    specifications: "Size M & L, Blue denim, Sustainable cotton",
    notes: "Sample requested for quality assessment",
    feedback: null,
    rating: null,
    buyerNotes: "Need to check fabric quality and stitching",
    sellerResponse: null,
    rejectionReason: null, // New field for rejection reasons
    demeritPoints: 0, // New field for tracking demerits
    demeritHistory: [], // New field for tracking demerit history
    qualityScore: 100, // New field for seller quality score
    shippingDetails: null,
  },
  {
    id: "SAMPLE-002",
    productName: "Organic Cotton Hoodie",
    supplier: "EcoFashion",
    buyer: "GreenStyle Inc.",
    status: "approved",
    requestDate: "2024-01-20",
    approvalDate: "2024-01-22",
    shippingDate: null,
    deliveryDate: null,
    cost: 15.0,
    quantity: 1,
    specifications: "Size L, Natural color, GOTS certified",
    notes: "Sample approved and ready for shipping",
    feedback: null,
    rating: null,
    buyerNotes: "Interested in sustainable materials",
    sellerResponse: "Sample approved. Will ship within 2 business days.",
    rejectionReason: null,
    demeritPoints: 0,
    demeritHistory: [],
    qualityScore: 100,
    shippingDetails: null,
  },
  {
    id: "SAMPLE-003",
    productName: "Linen Summer Dress",
    supplier: "StyleHub",
    buyer: "Boutique Fashion",
    status: "shipped",
    requestDate: "2024-01-18",
    approvalDate: "2024-01-19",
    shippingDate: "2024-01-22",
    deliveryDate: null,
    cost: 30.0,
    quantity: 1,
    specifications: "Size S, White linen, Natural dyes",
    notes: "Sample shipped via express delivery",
    feedback: null,
    rating: null,
    buyerNotes: "Looking for summer collection items",
    sellerResponse: "Sample shipped via DHL Express. Tracking: DHL123456789",
    rejectionReason: null,
    demeritPoints: 0,
    demeritHistory: [],
    qualityScore: 100,
    shippingDetails: {
      carrier: "DHL Express",
      trackingNumber: "DHL123456789",
      estimatedDelivery: "2024-01-25",
    },
  },
  {
    id: "SAMPLE-004",
    productName: "Wool Blend Overcoat",
    supplier: "LuxuryFabrics",
    buyer: "Premium Retail",
    status: "delivered",
    requestDate: "2024-01-10",
    approvalDate: "2024-01-12",
    shippingDate: "2024-01-15",
    deliveryDate: "2024-01-20",
    cost: 45.0,
    quantity: 1,
    specifications: "Size M, Charcoal wool, Premium finish",
    notes: "Sample delivered successfully",
    feedback: "Outstanding quality, will place bulk order",
    rating: 5,
    buyerNotes: "Premium market requirements",
    sellerResponse: "Sample delivered. Please provide feedback.",
    rejectionReason: null,
    demeritPoints: 0,
    demeritHistory: [],
    qualityScore: 100,
    shippingDetails: {
      carrier: "FedEx",
      trackingNumber: "FDX987654321",
      deliveredDate: "2024-01-20",
    },
  },
  {
    id: "SAMPLE-005",
    productName: "Silk Blouse",
    supplier: "PremiumManufacturing",
    buyer: "Luxury Brands",
    status: "rejected",
    requestDate: "2024-01-12",
    approvalDate: "2024-01-14",
    shippingDate: "2024-01-16",
    deliveryDate: "2024-01-21",
    cost: 35.0,
    quantity: 1,
    specifications: "Size S, Ivory silk, Designer quality",
    notes: "Sample quality below expectations",
    feedback: "Material quality not meeting standards",
    rating: 2,
    buyerNotes: "High-end boutique requirements",
    sellerResponse: "Sample rejected due to quality concerns.",
    rejectionReason: "Quality standards not met",
    demeritPoints: 2,
    demeritHistory: [
      {
        date: "2024-01-14",
        reason: "Quality standards not met",
        points: 2,
        type: "rejection",
      },
    ],
    qualityScore: 90,
    shippingDetails: {
      carrier: "UPS",
      trackingNumber: "UPS456789123",
      deliveredDate: "2024-01-21",
    },
  },
  {
    id: "SAMPLE-006",
    productName: "Denim Jeans",
    supplier: "FastFashion Co.",
    buyer: "Trendy Retail",
    status: "rejected",
    requestDate: "2024-01-08",
    approvalDate: "2024-01-10",
    shippingDate: null,
    deliveryDate: null,
    cost: 20.0,
    quantity: 1,
    specifications: "Size 32x32, Blue denim, Stretch fabric",
    notes: "Sample request declined",
    feedback: null,
    rating: null,
    buyerNotes: "Looking for trendy denim options",
    sellerResponse: "Sample request declined.",
    rejectionReason: "No reason provided",
    demeritPoints: 3,
    demeritHistory: [
      {
        date: "2024-01-10",
        reason: "No reason provided",
        points: 3,
        type: "rejection",
      },
    ],
    qualityScore: 85,
    shippingDetails: null,
  },
];

const statusConfig = {
  pending_approval: {
    label: "Pending Approval",
    variant: "secondary",
    color: "text-yellow-600",
    description: "Awaiting seller response",
  },
  approved: {
    label: "Approved",
    variant: "default",
    color: "text-green-600",
    description: "Sample approved for shipping",
  },
  shipped: {
    label: "Shipped",
    variant: "outline",
    color: "text-blue-600",
    description: "Sample in transit",
  },
  delivered: {
    label: "Delivered",
    variant: "default",
    color: "text-green-600",
    description: "Sample received by buyer",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    color: "text-red-600",
    description: "Sample request denied",
  },
};

const categories = [
  "Apparel",
  "Electronics",
  "Furniture",
  "Machinery",
  "Chemicals",
  "Food & Beverage",
  "Automotive",
  "Construction",
  "Healthcare",
  "Textiles",
];

// Sample Request Form Component
function SampleRequestForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    productName: "",
    supplier: "",
    quantity: 1,
    specifications: "",
    notes: "",
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
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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
              <Input
                id="supplier"
                placeholder="Enter supplier name"
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
            <Button type="submit" className="flex-1">
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

// Seller Response Dialog Component
function SellerResponseDialog({ sample, isOpen, onClose, onRespond }) {
  const [response, setResponse] = useState({
    action: "approve", // approve, reject
    message: "",
    cost: sample?.cost || 0,
    shippingDetails: "",
    rejectionReason: "", // New field for rejection reasons
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate rejection reason if rejecting
    if (
      response.action === "reject" &&
      (!response.rejectionReason || response.rejectionReason.trim().length < 10)
    ) {
      alert(
        "Please provide a detailed rejection reason (minimum 10 characters)"
      );
      return;
    }

    onRespond(sample.id, response);
    setResponse({
      action: "approve",
      message: "",
      cost: sample?.cost || 0,
      shippingDetails: "",
      rejectionReason: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Respond to Sample Request</DialogTitle>
          <DialogDescription>
            Review and respond to the sample request from {sample?.buyer}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Sample Request Details</Label>
            <div className="bg-muted p-3 rounded-md space-y-2">
              <p>
                <strong>Product:</strong> {sample?.productName}
              </p>
              <p>
                <strong>Buyer:</strong> {sample?.buyer}
              </p>
              <p>
                <strong>Specifications:</strong> {sample?.specifications}
              </p>
              <p>
                <strong>Notes:</strong> {sample?.buyerNotes}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Response Action</Label>
            <Select
              value={response.action}
              onValueChange={(value) =>
                setResponse({ ...response, action: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">Approve Sample Request</SelectItem>
                <SelectItem value="reject">Reject Sample Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {response.action === "approve" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cost">Sample Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={response.cost}
                  onChange={(e) =>
                    setResponse({
                      ...response,
                      cost: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingDetails">Shipping Details</Label>
                <Input
                  id="shippingDetails"
                  placeholder="Carrier, estimated delivery, etc."
                  value={response.shippingDetails}
                  onChange={(e) =>
                    setResponse({
                      ...response,
                      shippingDetails: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {response.action === "reject" && (
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason *</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Provide a detailed reason for rejecting the sample request. This helps maintain transparency and may affect your seller rating."
                rows={3}
                value={response.rejectionReason}
                onChange={(e) =>
                  setResponse({ ...response, rejectionReason: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Poor or no rejection reasons may result in demerit points
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Response Message</Label>
            <Textarea
              id="message"
              placeholder="Provide details about your decision..."
              rows={3}
              value={response.message}
              onChange={(e) =>
                setResponse({ ...response, message: e.target.value })
              }
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {response.action === "approve"
                ? "Approve & Send Response"
                : "Reject Request"}
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
  const { role } = useAuthStore();
  const statusInfo = statusConfig[sample?.status];

  if (!sample) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Sample Request: {sample.productName}
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
              <Label className="font-medium">Product Information</Label>
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
                  <strong>Cost:</strong> ${sample.cost.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Parties</Label>
              <div className="bg-muted p-3 rounded-md space-y-1">
                <p>
                  <strong>Buyer:</strong> {sample.buyer}
                </p>
                <p>
                  <strong>Supplier:</strong> {sample.supplier}
                </p>
                <p>
                  <strong>Request Date:</strong>{" "}
                  {new Date(sample.requestDate).toLocaleDateString()}
                </p>
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
                <Label className="font-medium">Buyer Notes</Label>
                <div className="bg-muted p-3 rounded-md">
                  {sample.buyerNotes}
                </div>
              </div>
            )}

            {sample.sellerResponse && (
              <div className="space-y-2">
                <Label className="font-medium">Seller Response</Label>
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
                <Label className="font-medium">Buyer Feedback</Label>
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
            {role === "seller" && sample.status === "pending_approval" && (
              <Button onClick={() => onAction("respond", sample)}>
                Respond to Request
              </Button>
            )}
            {role === "buyer" &&
              sample.status === "delivered" &&
              !sample.feedback && (
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

// Demerit Points Display Component - Only shows for rejected samples with demerits
function DemeritPointsDisplay({ sample }) {
  // Only show for rejected samples that have demerit points
  if (!sample || sample.status !== "rejected" || sample.demeritPoints === 0)
    return null;

  const getDemeritLevel = (points) => {
    if (points <= 2)
      return {
        level: "Low",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    if (points <= 5)
      return {
        level: "Medium",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    return { level: "High", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const demeritLevel = getDemeritLevel(sample.demeritPoints);

  return (
    <div className={`p-3 rounded-lg border ${demeritLevel.bgColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <TrendingDown className={`h-4 w-4 ${demeritLevel.color}`} />
        <span className={`text-sm font-medium ${demeritLevel.color}`}>
          Demerit Points: {sample.demeritPoints}
        </span>
        <Badge variant="outline" className={`text-xs ${demeritLevel.color}`}>
          {demeritLevel.level} Risk
        </Badge>
      </div>

      {sample.demeritHistory && sample.demeritHistory.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Rejection Reason:</p>
          {sample.demeritHistory.slice(-1).map((history, index) => (
            <div key={index} className="text-xs text-muted-foreground">
              • {history.reason} ({history.points} pts)
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        Seller Quality Score: {sample.qualityScore}/100  
      </div>
    </div>
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
                  setFeedbackData({ ...feedbackData, willOrder: checked })
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

export default function SamplesPage() {
  const { role } = useAuthStore();
  const { sampleRequests: userSampleRequests } = useSampleStore();
  const [samples, setSamples] = useState([...sampleRequests, ...userSampleRequests]);
  const [isRequestSampleOpen, setIsRequestSampleOpen] = useState(false);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [selectedSampleIds, setSelectedSampleIds] = useState(new Set());
  const [activeSample, setActiveSample] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  // Update samples when user's sample requests change
  useEffect(() => {
    setSamples([...sampleRequests, ...userSampleRequests]);
  }, [userSampleRequests, sampleRequests]);

  const toggleSelect = (id) => {
    setSelectedSampleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedCount = selectedSampleIds.size;

  const filteredSamples = samples.filter((sample) => {
    let matchesStatus = true;

    if (filterStatus === "all") {
      matchesStatus = true;
    } else if (filterStatus === "with_demerits") {
      matchesStatus = sample.demeritPoints > 0;
    } else {
      matchesStatus = sample.status === filterStatus;
    }

    const matchesSearch =
      sample.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.buyer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleSubmitSampleRequest = (formData) => {
    const { addSampleRequest } = useSampleStore.getState();
    
    const sampleData = {
      productName: formData.productName,
      supplier: formData.supplier,
      buyer: "Current Buyer", // This would come from auth
      quantity: formData.quantity,
      specifications: formData.specifications,
      buyerNotes: formData.notes,
    };
    
    // Add to the store
    addSampleRequest(sampleData);
  };

  // Demerit point calculation function
  const calculateDemeritPoints = (rejectionReason) => {
    if (!rejectionReason || rejectionReason.trim().length === 0) {
      return 3; // No reason provided
    }

    const reason = rejectionReason.trim().toLowerCase();
    const length = rejectionReason.trim().length;

    // Poor reasons that get higher demerits
    const poorReasons = [
      "no",
      "nope",
      "sorry",
      "busy",
      "can't",
      "cannot",
      "not available",
      "don't have",
      "don't want",
      "decline",
      "reject",
    ];

    // Check for poor reasons
    const hasPoorReason = poorReasons.some((poor) => reason.includes(poor));

    if (hasPoorReason && length < 20) {
      return 2; // Poor reason with short explanation
    } else if (length < 15) {
      return 1; // Short explanation
    } else if (length < 25) {
      return 0.5; // Acceptable explanation
    }

    return 0; // Good explanation
  };

  const handleSellerResponse = (sampleId, response) => {
    setSamples(
      samples.map((sample) => {
        if (sample.id === sampleId) {
          let newDemeritPoints = 0;
          let newDemeritHistory = sample.demeritHistory || [];

          if (response.action === "reject") {
            newDemeritPoints = calculateDemeritPoints(response.rejectionReason);
            newDemeritHistory = [
              ...newDemeritHistory,
              {
                date: new Date().toISOString().split("T")[0],
                reason: response.rejectionReason,
                points: newDemeritPoints,
                type: "rejection",
              },
            ];
          }

          const updatedDemeritPoints = sample.demeritPoints + newDemeritPoints;
          const newQualityScore = Math.max(0, 100 - updatedDemeritPoints * 5);

          return {
            ...sample,
            status: response.action === "approve" ? "approved" : "rejected",
            approvalDate:
              response.action === "approve"
                ? new Date().toISOString().split("T")[0]
                : null,
            cost: response.cost,
            sellerResponse:
              response.action === "approve"
                ? response.message
                : response.rejectionReason,
            rejectionReason:
              response.action === "reject" ? response.rejectionReason : null,
            demeritPoints: updatedDemeritPoints,
            demeritHistory: newDemeritHistory,
            qualityScore: newQualityScore,
            shippingDetails: response.shippingDetails
              ? {
                  carrier: response.shippingDetails,
                  trackingNumber: "",
                  estimatedDelivery: "",
                }
              : null,
          };
        }
        return sample;
      })
    );
  };

  const handleSampleAction = (action, sample) => {
    if (action === "respond") {
      setActiveSample(sample);
      setIsResponseDialogOpen(true);
    } else if (action === "view") {
      setActiveSample(sample);
      setIsDetailViewOpen(true);
    } else if (action === "rate") {
      setActiveSample(sample);
      setIsFeedbackDialogOpen(true);
    }
  };

  const handleFeedbackSubmit = (sampleId, feedbackData) => {
    setSamples(
      samples.map((sample) => {
        if (sample.id === sampleId) {
          return {
            ...sample,
            feedback: feedbackData.comments,
            rating: feedbackData.rating,
            willOrder: feedbackData.willOrder,
            orderNotes: feedbackData.orderNotes,
          };
        }
        return sample;
      })
    );
    setActiveSample(null);
  };

  const getStatsByRole = () => {
    if (role === "seller") {
      const totalDemerits = samples.reduce(
        (acc, s) => acc + s.demeritPoints,
        0
      );
      const avgQualityScore =
        samples.length > 0
          ? Math.round(
              samples.reduce((acc, s) => acc + s.qualityScore, 0) /
                samples.length
            )
          : 100;

      return [
        {
          title: "Pending Requests",
          value: samples.filter((s) => s.status === "pending_approval").length,
          description: "Awaiting your response",
          icon: Clock,
        },
        {
          title: "Approved",
          value: samples.filter((s) => s.status === "approved").length,
          description: "Samples approved",
          icon: CheckCircle,
        },
        {
          title: "Quality Score",
          value: `${avgQualityScore}/100`,
          description:
            totalDemerits > 0
              ? `${totalDemerits} demerit points`
              : "No demerits",
          icon: Shield,
          color: totalDemerits > 0 ? "text-orange-600" : "text-green-600",
        },
        {
          title: "Total Revenue",
          value: `$${samples.reduce((acc, s) => acc + s.cost, 0).toFixed(2)}`,
          description: "From sample sales",
          icon: DollarSign,
        },
      ];
    } else {
      return [
        {
          title: "Total Requests",
          value: samples.length,
          description: "Samples requested",
          icon: Award,
        },
        {
          title: "Pending",
          value: samples.filter((s) => s.status === "pending_approval").length,
          description: "Awaiting approval",
          icon: Clock,
        },
        {
          title: "Delivered",
          value: samples.filter((s) => s.status === "delivered").length,
          description: "Samples received",
          icon: Package,
        },
        {
          title: "Total Spent",
          value: `$${samples.reduce((acc, s) => acc + s.cost, 0).toFixed(2)}`,
          description: "On samples",
          icon: DollarSign,
        },
      ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {role === "seller" ? "Sample Management" : "Sample Requests"}
          </h1>
          <p className="text-muted-foreground">
            {role === "seller"
              ? "Manage sample requests from potential buyers"
              : "Track your sample requests and evaluate product quality"}
          </p>
        </div>
        {role !== "seller" && (
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsRequestSampleOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Request Sample
          </Button>
        )}
      </div>

      {/* Sample Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {getStatsByRole().map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon
                  className={`h-4 w-4 ${stat.color || "text-muted-foreground"}`}
                />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color || ""}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Samples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search samples..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_approval">
                  Pending Approval
                </SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                {role === "seller" && (
                  <SelectItem value="with_demerits">
                    With Demerit Points
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <Card>
          <CardContent className="py-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedCount} sample{selectedCount > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              {role === "seller" ? (
                <>
                  <Button variant="outline">Approve Selected</Button>
                  <Button variant="outline">Reject Selected</Button>
                </>
              ) : (
                <Button variant="outline">Download Invoices</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Samples List */}
      <div className="space-y-4">
        {filteredSamples.map((sample) => {
          const statusInfo = statusConfig[sample.status];
          const isBuyer = role !== "seller";

          return (
            <Card key={sample.id} className="overflow-hidden">
              <div className="flex items-start gap-4 p-4">
                {/* Select + Status */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedSampleIds.has(sample.id)}
                    onCheckedChange={() => toggleSelect(sample.id)}
                    aria-label="Select sample"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Badge
                      variant={statusInfo?.variant || "secondary"}
                      className="px-2 py-1 text-xs"
                    >
                      {statusInfo?.label || sample.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      ${sample.cost.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {sample.productName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isBuyer
                          ? `Supplier: ${sample.supplier}`
                          : `Buyer: ${sample.buyer}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ${sample.cost.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sample Cost
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Specifications:
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                      {sample.specifications}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Requested:{" "}
                      {new Date(sample.requestDate).toLocaleDateString()}
                    </span>
                    {sample.approvalDate && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approved:{" "}
                        {new Date(sample.approvalDate).toLocaleDateString()}
                      </span>
                    )}
                    {sample.shippingDate && (
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        Shipped:{" "}
                        {new Date(sample.shippingDate).toLocaleDateString()}
                      </span>
                    )}
                    {sample.deliveryDate && (
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        Delivered:{" "}
                        {new Date(sample.deliveryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Notes & Feedback */}
                  {sample.buyerNotes && (
                    <div className="text-sm">
                      <span className="font-medium">Buyer Notes: </span>
                      <span className="text-muted-foreground">
                        {sample.buyerNotes}
                      </span>
                    </div>
                  )}

                  {sample.sellerResponse && (
                    <div className="text-sm">
                      <span className="font-medium">Seller Response: </span>
                      <span className="text-muted-foreground">
                        {sample.sellerResponse}
                      </span>
                    </div>
                  )}

                  {/* Demerit Points Display */}
                  <DemeritPointsDisplay sample={sample} />

                  {sample.feedback && (
                    <div className="text-sm">
                      <span className="font-medium">Feedback: </span>
                      <span className="text-muted-foreground">
                        {sample.feedback}
                      </span>
                      {sample.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= sample.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({sample.rating}/5)
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleSampleAction("view", sample)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact {isBuyer ? "Supplier" : "Buyer"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </DropdownMenuItem>
                      {role === "seller" &&
                        sample.status === "pending_approval" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() =>
                                handleSampleAction("respond", sample)
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Respond to Request
                            </DropdownMenuItem>
                          </>
                        )}
                      {role !== "seller" && sample.status === "delivered" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleSampleAction("rate", sample)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Rate Sample
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      {filteredSamples.length > 0 && (
        <div className="text-center">
          <Button variant="outline">Load More Samples</Button>
        </div>
      )}

      {/* Dialogs */}
      <SampleRequestForm
        isOpen={isRequestSampleOpen}
        onClose={() => setIsRequestSampleOpen(false)}
        onSubmit={handleSubmitSampleRequest}
      />

      <SellerResponseDialog
        sample={activeSample}
        isOpen={isResponseDialogOpen}
        onClose={() => {
          setIsResponseDialogOpen(false);
          setActiveSample(null);
        }}
        onRespond={handleSellerResponse}
      />

      <SampleDetailView
        sample={activeSample}
        isOpen={isDetailViewOpen}
        onClose={() => {
          setIsDetailViewOpen(false);
          setActiveSample(null);
        }}
        onAction={handleSampleAction}
      />

      <FeedbackDialog
        sample={activeSample}
        isOpen={isFeedbackDialogOpen}
        onClose={() => {
          setIsFeedbackDialogOpen(false);
          setActiveSample(null);
        }}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
