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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  ArrowLeft,
  Package,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  X,
  Truck,
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
  Calendar,
  Clock,
  ShoppingCart,
} from "lucide-react";
import useSampleStore from "../../../../store/sampleStore";

// Mock data for seller perspective - in real implementation this would come from API
const getSampleById = (id) => {
  const samples = [
    {
      id: "SAMPLE-001",
      productName: "Classic Denim Jacket",
      supplier: "UrbanWear Co.",
      buyer: "Fashion Retail Co.",
      buyerCompany: "Fashion Retail Co.",
      productCategory: "Apparel",
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
      buyerContactInfo: {
        name: "John Smith",
        email: "john@fashionretail.com",
        phone: "+1 (555) 987-6543",
        address: "789 Retail Plaza, NY 10002",
        company: "Fashion Retail Co.",
      },
      productDetails: {
        sku: "UW-DJ-001",
        category: "Outerwear",
        material: "100% Sustainable Cotton Denim",
        colors: ["Blue", "Black", "Gray"],
        sizes: ["S", "M", "L", "XL"],
        weight: "0.8 kg",
        origin: "USA",
      },
      businessInfo: {
        potentialOrderSize: "500-1000 units",
        estimatedValue: "$12,500 - $25,000",
        buyerHistory: "Previous orders: $85,000 total",
        relationship: "Established Customer",
      },
    },
    {
      id: "SAMPLE-002",
      productName: "Organic Cotton Hoodie",
      supplier: "EcoFashion",
      buyer: "GreenStyle Inc.",
      buyerCompany: "GreenStyle Inc.",
      productCategory: "Apparel",
      status: "shipped",
      requestDate: "2024-01-20",
      approvalDate: "2024-01-22",
      shippingDate: "2024-01-25",
      deliveryDate: null,
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
      feedback: null,
      rating: null,
      shippingDetails: {
        carrier: "DHL Express",
        trackingNumber: "DHL123456789",
        estimatedDelivery: "2024-01-28",
        deliveredDate: null,
        shippingCost: 12.5,
      },
      buyerContactInfo: {
        name: "Emily Green",
        email: "emily@greenstyle.com",
        phone: "+1 (555) 456-7890",
        address: "321 Eco Avenue, CA 90210",
        company: "GreenStyle Inc.",
      },
      productDetails: {
        sku: "EF-OH-002",
        category: "Casual Wear",
        material: "100% Organic Cotton",
        colors: ["Natural", "Forest Green", "Stone Gray"],
        sizes: ["M", "L", "XL"],
        weight: "0.6 kg",
        origin: "India",
      },
      businessInfo: {
        potentialOrderSize: "200-500 units",
        estimatedValue: "$3,000 - $7,500",
        buyerHistory: "New customer",
        relationship: "First-time buyer",
      },
    },
  ];

  return samples.find((sample) => sample.id === id);
};

const statusConfig = {
  pending_approval: {
    label: "Pending Review",
    variant: "secondary",
    bgColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "Awaiting your approval decision",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    variant: "default",
    bgColor: "bg-green-50 text-green-700 border-green-200",
    description: "Ready for shipping",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    variant: "outline",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Sample in transit to buyer",
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
    description: "Sample request declined",
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

// Approval/Rejection Dialog Component
function ApprovalDialog({ sample, isOpen, onClose, onSubmit }) {
  const [decision, setDecision] = useState("");
  const [response, setResponse] = useState("");
  const [estimatedShipping, setEstimatedShipping] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!decision) {
      alert("Please select approve or reject");
      return;
    }
    if (!response.trim()) {
      alert("Please provide a response message");
      return;
    }
    onSubmit({
      decision,
      response,
      estimatedShipping: decision === "approve" ? estimatedShipping : null,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Review Sample Request</DialogTitle>
          <DialogDescription>
            Make a decision on the sample request for {sample?.productName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sample Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p>
              <strong>Product:</strong> {sample?.productName}
            </p>
            <p>
              <strong>Buyer:</strong> {sample?.buyer}
            </p>
            <p>
              <strong>Quantity:</strong> {sample?.quantity} pieces
            </p>
            <p>
              <strong>Specifications:</strong> {sample?.specifications}
            </p>
          </div>

          {/* Decision */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Decision *</Label>
            <Select value={decision} onValueChange={setDecision}>
              <SelectTrigger>
                <SelectValue placeholder="Select your decision" />
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
                    <X className="h-4 w-4 text-red-600" />
                    Reject Request
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Response Message */}
          <div className="space-y-2">
            <Label htmlFor="response" className="text-base font-semibold">
              Response Message *
            </Label>
            <Textarea
              id="response"
              placeholder={
                decision === "approve"
                  ? "Sample request approved. Will prepare and ship within..."
                  : decision === "reject"
                  ? "Unfortunately, we cannot fulfill this request because..."
                  : "Provide details about your decision..."
              }
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
            />
          </div>

          {/* Estimated Shipping (only for approval) */}
          {decision === "approve" && (
            <div className="space-y-2">
              <Label htmlFor="shipping" className="text-base font-semibold">
                Estimated Shipping Date
              </Label>
              <Input
                id="shipping"
                type="date"
                value={estimatedShipping}
                onChange={(e) => setEstimatedShipping(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className={`flex-1 bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out${
                decision === "approve"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : decision === "reject"
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
              }`}
            >
              {decision === "approve" && (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              {decision === "reject" && <X className="h-4 w-4 mr-2" />}
              {decision === "approve"
                ? "Approve Request"
                : decision === "reject"
                ? "Reject Request"
                : "Submit Decision"}
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
    carrier: "",
    trackingNumber: "",
    estimatedDelivery: "",
    shippingCost: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingData.carrier || !shippingData.trackingNumber) {
      alert("Please provide carrier and tracking information");
      return;
    }
    onSubmit(shippingData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Ship Sample</DialogTitle>
          <DialogDescription>
            Enter shipping details for {sample?.productName}
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
              <strong>Quantity:</strong> {sample?.quantity} pieces
            </p>
          </div>

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
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DHL Express">DHL Express</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="USPS">USPS</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tracking">Tracking Number *</Label>
              <Input
                id="tracking"
                value={shippingData.trackingNumber}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    trackingNumber: e.target.value,
                  })
                }
                placeholder="Enter tracking number"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="delivery">Estimated Delivery</Label>
              <Input
                id="delivery"
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
              <Label htmlFor="cost">Shipping Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={shippingData.shippingCost}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    shippingCost: e.target.value,
                  })
                }
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Shipping Notes</Label>
            <Textarea
              id="notes"
              value={shippingData.notes}
              onChange={(e) =>
                setShippingData({ ...shippingData, notes: e.target.value })
              }
              placeholder="Any special instructions or notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out"
            >
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

export default function SampleSellerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { sampleRequests, updateSampleRequest } = useSampleStore();

  // Get sample from the store or fallback to mock data
  const [sample, setSample] = useState(() => {
    const storeSample = sampleRequests.find((s) => s.id === params.id);
    return storeSample || getSampleById(params.id as string);
  });

  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);

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

  const handleApprovalSubmit = (approvalData) => {
    const updates: Record<string, string> = {
      status: approvalData.decision === "approve" ? "approved" : "rejected",
      sellerResponse: approvalData.response,
      approvalDate: new Date().toISOString().split("T")[0],
    };

    if (approvalData.decision === "reject") {
      updates.rejectionReason = approvalData.response;
    }

    updateSampleRequest(sample.id, updates);
    setSample((prev) => ({ ...prev, ...updates }));
  };

  const handleShippingSubmit = (shippingData) => {
    const updates = {
      status: "shipped",
      shippingDate: new Date().toISOString().split("T")[0],
      shippingDetails: {
        carrier: shippingData.carrier,
        trackingNumber: shippingData.trackingNumber,
        estimatedDelivery: shippingData.estimatedDelivery,
        shippingCost: parseFloat(shippingData.shippingCost) || 0,
        notes: shippingData.notes,
      },
    };

    updateSampleRequest(sample.id, updates);
    setSample((prev) => ({ ...prev, ...updates }));
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
                <User className="h-4 w-4" />
                {sample.buyer}
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
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
              onClick={() => setIsApprovalDialogOpen(true)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Request
            </Button>
          )}
          {sample.status === "approved" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out"
              size="sm"
              onClick={() => setIsShippingDialogOpen(true)}
            >
              <Truck className="h-4 w-4 mr-2" />
              Ship Sample
            </Button>
          )}
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Buyer
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
                <p className="text-xl font-bold">{sample.quantity} pcs</p>
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
                  ${sample.cost?.toFixed(2) || "Free"}
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
                    Category
                  </Label>
                  <p className="text-base mt-1">
                    {sample.productCategory || "Apparel"}
                  </p>
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
                    Buyer Requirements
                  </Label>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm">{sample.buyerNotes}</p>
                  </div>
                </div>
              )}

              {/* Product Details */}
              {sample.productDetails && (
                <>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        SKU
                      </Label>
                      <p className="text-base mt-1">
                        {sample.productDetails.sku}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Material
                      </Label>
                      <p className="text-base mt-1">
                        {sample.productDetails.material}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Weight
                      </Label>
                      <p className="text-base mt-1">
                        {sample.productDetails.weight}
                      </p>
                    </div>
                  </div>
                </>
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
                      Request received from buyer
                    </p>
                  </div>
                </div>

                {sample.approvalDate && (
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        sample.status === "rejected"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          {sample.status === "rejected"
                            ? "Request Rejected"
                            : "Request Approved"}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sample.approvalDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {sample.status === "rejected"
                          ? "Request declined by supplier"
                          : "Request approved by supplier"}
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
                        Package dispatched to buyer
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
                        Sample received by buyer
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
                  Your Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
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

          {/* Buyer Feedback */}
          {sample.feedback && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Buyer Feedback
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
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= sample.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
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
                  <div className="mt-2 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm">{sample.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Buyer & Business Info */}
        <div className="space-y-6">
          {/* Buyer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Buyer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-muted-foreground">
                  Company
                </Label>
                <p className="text-lg font-semibold mt-1">
                  {sample.buyerCompany || sample.buyer}
                </p>
              </div>

              {sample.buyerContactInfo && <Separator />}

              {sample.buyerContactInfo && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {sample.buyerContactInfo.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contact Person
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {sample.buyerContactInfo.email}
                      </p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {sample.buyerContactInfo.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">Phone</p>
                    </div>
                  </div>

                  {sample.buyerContactInfo.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">
                          {sample.buyerContactInfo.address}
                        </p>
                        <p className="text-sm text-muted-foreground">Address</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Opportunity */}
          {sample.businessInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Business Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Potential Order Size
                  </Label>
                  <p className="text-base mt-1 font-semibold text-green-600">
                    {sample.businessInfo.potentialOrderSize}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Estimated Value
                  </Label>
                  <p className="text-base mt-1 font-semibold text-green-600">
                    {sample.businessInfo.estimatedValue}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Buyer History
                  </Label>
                  <p className="text-sm mt-1">
                    {sample.businessInfo.buyerHistory}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Relationship
                  </Label>
                  <Badge variant="outline" className="mt-1">
                    {sample.businessInfo.relationship}
                  </Badge>
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
              {sample.status === "pending_approval" && (
                <Button
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsApprovalDialogOpen(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Request
                </Button>
              )}
              {sample.status === "approved" && (
                <Button
                  className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-250 ease-out"
                  onClick={() => setIsShippingDialogOpen(true)}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Ship Sample
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Buyer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Details
              </Button>
              {sample.feedback && sample.rating >= 4 && (
                <Button className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Follow Up Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <ApprovalDialog
        sample={sample}
        isOpen={isApprovalDialogOpen}
        onClose={() => setIsApprovalDialogOpen(false)}
        onSubmit={handleApprovalSubmit}
      />

      <ShippingDialog
        sample={sample}
        isOpen={isShippingDialogOpen}
        onClose={() => setIsShippingDialogOpen(false)}
        onSubmit={handleShippingSubmit}
      />
    </div>
  );
}
