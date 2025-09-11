"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import { Separator } from "../../../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  ArrowLeft,
  Package,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Star,
  Calendar,
  Clock,
  Truck,
  Building2,
  FileText,
  Download,
  Send,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Hash,
  Package2,
  Activity,
  User,
} from "lucide-react";
import useSampleStore from "../../../../store/sampleStore";

// Mock data - in real implementation this would come from API
const getSampleById = (id) => {
  const samples = [
    {
      id: "SAMPLE-001",
      productName: "Classic Denim Jacket",
      supplier: "UrbanWear Co.",
      buyer: "Fashion Retail Co.",
      status: "pending_approval",
      requestDate: "2024-01-15",
      approvalDate: null,
      shippingDate: null,
      deliveryDate: null,
      cost: 25.0,
      quantity: 2,
      specifications: "Size M & L, Blue denim, Sustainable cotton",
      buyerNotes:
        "Need to check fabric quality and stitching for potential bulk order of 500+ units. Looking for consistent quality across different sizes.",
      sellerResponse: null,
      rejectionReason: null,
      priority: "high",
      deadline: "2024-02-15",
      feedback: null,
      rating: null,
      shippingDetails: null,
      contactInfo: {
        name: "Sarah Johnson",
        email: "sarah@urbanwear.com",
        phone: "+1 (555) 123-4567",
        address: "123 Fashion District, NY 10001",
      },
      orderHistory: [
        {
          orderId: "ORD-001",
          date: "2023-12-01",
          quantity: 100,
          amount: 2500,
          status: "completed",
        },
        {
          orderId: "ORD-002",
          date: "2023-11-15",
          quantity: 250,
          amount: 6250,
          status: "completed",
        },
      ],
    },
    {
      id: "SAMPLE-002",
      productName: "Organic Cotton Hoodie",
      supplier: "EcoFashion",
      buyer: "GreenStyle Inc.",
      status: "delivered",
      requestDate: "2024-01-20",
      approvalDate: "2024-01-22",
      shippingDate: "2024-01-25",
      deliveryDate: "2024-01-28",
      cost: 15.0,
      quantity: 1,
      specifications: "Size L, Natural color, GOTS certified",
      buyerNotes:
        "Interested in sustainable materials for eco-conscious customers",
      sellerResponse:
        "Sample approved and prepared. Shipped via DHL Express with tracking number DHL123456789. Expected delivery within 3-4 business days.",
      rejectionReason: null,
      priority: "medium",
      deadline: "2024-02-10",
      feedback: "Outstanding quality, will place bulk order",
      rating: 5,
      shippingDetails: {
        carrier: "DHL Express",
        trackingNumber: "DHL123456789",
        estimatedDelivery: "2024-01-28",
        deliveredDate: "2024-01-28",
        shippingCost: 12.5,
      },
      contactInfo: {
        name: "Mike Chen",
        email: "mike@ecofashion.com",
        phone: "+1 (555) 987-6543",
        address: "456 Eco Street, CA 90210",
      },
      orderHistory: [
        {
          orderId: "ORD-002",
          date: "2024-01-30",
          quantity: 50,
          amount: 750,
          status: "processing",
        },
      ],
    },
  ];

  return samples.find((sample) => sample.id === id);
};

const statusConfig = {
  pending_approval: {
    label: "Pending Approval",
    variant: "secondary",
    bgColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "Awaiting seller response",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    variant: "default",
    bgColor: "bg-green-50 text-green-700 border-green-200",
    description: "Sample approved for shipping",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    variant: "outline",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Sample in transit",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    variant: "default",
    bgColor: "bg-green-50 text-green-700 border-green-200",
    description: "Sample received by buyer",
    icon: Package,
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    bgColor: "bg-red-50 text-red-700 border-red-200",
    description: "Sample request denied",
    icon: AlertTriangle,
  },
};

const priorityConfig = {
  high: {
    label: "High Priority",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  medium: {
    label: "Medium Priority",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  low: {
    label: "Low Priority",
    color: "bg-green-50 text-green-700 border-green-200",
  },
};

// Feedback Dialog Component
function FeedbackDialog({ sample, isOpen, onClose, onSubmit }) {
  const [feedbackData, setFeedbackData] = useState({
    rating: sample?.rating || 0,
    comments: sample?.feedback || "",
    willOrder: sample?.willOrder || false,
    orderNotes: sample?.orderNotes || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    onSubmit(feedbackData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Sample Feedback & Rating</DialogTitle>
          <DialogDescription>
            Evaluate the sample quality and provide feedback for{" "}
            {sample?.productName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sample Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
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
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Sample Quality Rating *
            </Label>
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
            <Label htmlFor="comments" className="text-base font-semibold">
              Detailed Feedback *
            </Label>
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

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Star className="h-4 w-4 mr-2" />
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

// Edit Sample Dialog Component
function EditSampleDialog({ sample, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    productName: sample?.productName || "",
    supplier: sample?.supplier || "",
    quantity: sample?.quantity || 1,
    specifications: sample?.specifications || "",
    buyerNotes: sample?.buyerNotes || "",
    priority: sample?.priority || "medium",
    deadline: sample?.deadline || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Sample Request</DialogTitle>
          <DialogDescription>
            Update your sample request details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Input
              id="specifications"
              value={formData.specifications}
              onChange={(e) =>
                setFormData({ ...formData, specifications: e.target.value })
              }
              placeholder="Size, color, material, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyerNotes">Additional Notes</Label>
            <Textarea
              id="buyerNotes"
              value={formData.buyerNotes}
              onChange={(e) =>
                setFormData({ ...formData, buyerNotes: e.target.value })
              }
              placeholder="Any special requirements or questions..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-blue-500 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Update Request
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

export default function SampleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { sampleRequests, updateSampleRequest, deleteSampleRequest } =
    useSampleStore();

  // Get sample from the store or fallback to mock data
  const [sample, setSample] = useState(() => {
    const storeSample = sampleRequests.find((s) => s.id === params.id);
    return storeSample || getSampleById(params.id as string);
  });

  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Update sample when store changes
  useEffect(() => {
    const storeSample = sampleRequests.find((s) => s.id === params.id);
    if (storeSample) {
      setSample(storeSample);
    }
  }, [sampleRequests, params.id]);

  if (!sample) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Card>
          <CardContent className="py-16 text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sample Not Found</h3>
            <p className="text-muted-foreground">
              The sample request you&apos;re looking for doesn&apos;t exist or
              has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = statusConfig[sample.status];
  const priorityInfo = priorityConfig[sample.priority || "medium"];
  const StatusIcon = statusInfo?.icon || Package;

  const handleFeedbackSubmit = (feedbackData) => {
    updateSampleRequest(sample.id, {
      feedback: feedbackData.comments,
      rating: feedbackData.rating,
      willOrder: feedbackData.willOrder,
      orderNotes: feedbackData.orderNotes,
    });
    setSample((prev) => ({
      ...prev,
      feedback: feedbackData.comments,
      rating: feedbackData.rating,
      willOrder: feedbackData.willOrder,
      orderNotes: feedbackData.orderNotes,
    }));
  };

  const handleEditSubmit = (formData) => {
    updateSampleRequest(sample.id, formData);
    setSample((prev) => ({ ...prev, ...formData }));
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to cancel this sample request?")) {
      deleteSampleRequest(sample.id);
      router.push("/dashboard/sample-buyer");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" onClick={() => router.back()} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {sample.productName}
              </h1>
              <Badge className={`${statusInfo?.bgColor} border px-3 py-1`}>
                <StatusIcon className="h-4 w-4 mr-2" />
                {statusInfo?.label}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                {sample.id}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {sample.supplier}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Requested {new Date(sample.requestDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {sample.status === "pending_approval" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
          {sample.status === "delivered" && !sample.feedback && (
            <Button size="sm" onClick={() => setIsFeedbackDialogOpen(true)}>
              <Star className="h-4 w-4 mr-2" />
              Rate Sample
            </Button>
          )}
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Supplier
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Quantity
                </p>
                <p className="text-xl font-bold">{sample.quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Sample Cost
                </p>
                <p className="text-xl font-bold">
                  ${sample.cost?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Priority
                </p>
                <Badge className={`${priorityInfo.color} border text-xs`}>
                  {priorityInfo.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Deadline
                </p>
                <p className="text-sm font-semibold">
                  {sample.deadline
                    ? new Date(sample.deadline).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Sample Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Product Name
                  </Label>
                  <p className="text-base mt-1">{sample.productName}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Supplier
                  </Label>
                  <p className="text-base mt-1">{sample.supplier}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-muted-foreground">
                  Specifications
                </Label>
                <p className="text-base mt-1 text-muted-foreground">
                  {sample.specifications || "No specifications provided"}
                </p>
              </div>

              {sample.buyerNotes && (
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Your Notes
                  </Label>
                  <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{sample.buyerNotes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Request Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Request Date */}
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Sample Requested</p>
                      <span className="text-sm text-muted-foreground">
                        {new Date(sample.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Request submitted to supplier
                    </p>
                  </div>
                </div>

                {sample.approvalDate && (
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Sample Approved</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sample.approvalDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Supplier approved the request
                      </p>
                    </div>
                  </div>
                )}

                {sample.shippingDate && (
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Sample Shipped</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sample.shippingDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Package dispatched by supplier
                      </p>
                    </div>
                  </div>
                )}

                {sample.deliveryDate && (
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">Sample Delivered</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sample.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sample received successfully
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Communication */}
          {sample.sellerResponse && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Supplier Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{sample.sellerResponse}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Details */}
          {sample.shippingDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Carrier
                    </Label>
                    <p className="text-base mt-1">
                      {sample.shippingDetails.carrier}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Tracking Number
                    </Label>
                    <p className="text-base mt-1 font-mono">
                      {sample.shippingDetails.trackingNumber}
                    </p>
                  </div>
                  {sample.shippingDetails.estimatedDelivery && (
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Estimated Delivery
                      </Label>
                      <p className="text-base mt-1">
                        {new Date(
                          sample.shippingDetails.estimatedDelivery
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {sample.shippingDetails.shippingCost && (
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Shipping Cost
                      </Label>
                      <p className="text-base mt-1 font-semibold text-green-600">
                        ${sample.shippingDetails.shippingCost.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback Section */}
          {sample.feedback && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Your Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sample.rating && (
                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Rating
                    </Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= sample.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        ({sample.rating}/5)
                      </span>
                    </div>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Comments
                  </Label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{sample.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Supplier & Actions */}
        <div className="space-y-6">
          {/* Supplier Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Supplier Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-muted-foreground">
                  Company
                </Label>
                <p className="text-lg font-semibold mt-1">{sample.supplier}</p>
              </div>

              {sample.contactInfo && <Separator />}

              {sample.contactInfo && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{sample.contactInfo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Contact Person
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{sample.contactInfo.email}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{sample.contactInfo.phone}</p>
                      <p className="text-sm text-muted-foreground">Phone</p>
                    </div>
                  </div>

                  {sample.contactInfo.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">
                          {sample.contactInfo.address}
                        </p>
                        <p className="text-sm text-muted-foreground">Address</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History */}
          {sample.orderHistory && sample.orderHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sample.orderHistory.map((order) => (
                    <div key={order.orderId} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{order.orderId}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Quantity: {order.quantity.toLocaleString()} units</p>
                        <p>Amount: ${order.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Supplier
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              {sample.status === "delivered" && !sample.feedback && (
                <Button
                  className="w-full justify-start"
                  onClick={() => setIsFeedbackDialogOpen(true)}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Rate Sample
                </Button>
              )}
              {sample.feedback && sample.rating >= 4 && (
                <Button className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Place Bulk Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <FeedbackDialog
        sample={sample}
        isOpen={isFeedbackDialogOpen}
        onClose={() => setIsFeedbackDialogOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />

      <EditSampleDialog
        sample={sample}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}
