"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  FileText,
  Download,
  Edit,
  Trash2,
  Package,
  Truck,
  MoreHorizontal,
} from "lucide-react";

// Generic type definitions for different data types
export type RFQ = {
  id: string;
  title: string;
  buyer: string;
  seller: string;
  status: "open" | "negotiating" | "closed" | "expired";
  category: string;
  priority: "high" | "medium" | "low";
  budget: number;
  quantity: number;
  deadline: string;
  description: string;
  requirements: string;
  files: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  responses: number;
  createdAt: string;
  negotiationRounds: number;
  timeLimit: string;
  buyerNotes: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  quote?: {
    id: string;
    supplier: string;
    price: number;
    leadTime: string;
    status: string;
    submittedAt: string;
    acceptedAt?: string;
    rejectedAt?: string;
    notes: string;
    rating: number;
    previousOrders: number;
    orderDetails?: {
      orderId: string;
      orderDate: string;
      deliveryDate: string;
    };
    rejectionReason?: string;
  };
};

export type Order = {
  id: string;
  rfqId?: string;
  quoteId?: string;
  buyer: string;
  supplier: string;
  product: string;
  category: string;
  quantity: number;
  price: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  orderDate: string;
  deliveryDate?: string;
  paymentTerms: string;
  requirements?: string;
  specifications?: string;
  fulfillmentStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  trackingNumber?: string;
  estimatedDelivery: string;
  lastUpdated?: string;
};

export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  rating: number;
  totalOrders: number;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
  location: string;
  specialties: string[];
  verified: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  supplier: string;
  stock: number;
  status: "available" | "out_of_stock" | "discontinued";
  createdAt: string;
  updatedAt: string;
  images: string[];
  specifications: Record<string, any>;
};

export type SampleRequest = {
  id: string;
  productName: string;
  supplier: string;
  buyer: string;
  buyerCompany?: string;
  productCategory?: string;
  status:
    | "pending_approval"
    | "approved"
    | "shipped"
    | "delivered"
    | "rejected";
  requestDate: string;
  approvalDate?: string;
  shippingDate?: string;
  deliveryDate?: string;
  cost: number;
  quantity: number;
  specifications: string;
  buyerNotes?: string;
  sellerResponse?: string;
  rejectionReason?: string;
  priority?: "high" | "medium" | "low";
  deadline?: string;
  feedback?: string;
  rating?: number;
  shippingDetails?: {
    carrier: string;
    trackingNumber: string;
    estimatedDelivery?: string;
    deliveredDate?: string;
  };
};

// Configuration objects
const statusConfigs = {
  rfq: {
    open: {
      label: "Open",
      icon: Clock,
      variant: "default" as const,
      color: "text-blue-600",
      bgColor: "bg-blue-100 text-blue-800",
    },
    negotiating: {
      label: "Negotiating",
      icon: MessageSquare,
      variant: "default" as const,
      color: "text-orange-600",
      bgColor: "bg-orange-100 text-orange-800",
    },
    closed: {
      label: "Closed",
      icon: CheckCircle,
      variant: "default" as const,
      color: "text-green-600",
      bgColor: "bg-green-100 text-green-800",
    },
    expired: {
      label: "Expired",
      icon: AlertCircle,
      variant: "destructive" as const,
      color: "text-red-600",
      bgColor: "bg-red-100 text-red-800",
    },
  },
  order: {
    pending: {
      label: "Pending",
      icon: Clock,
      variant: "default" as const,
      bgColor: "bg-yellow-100 text-yellow-800",
    },
    confirmed: {
      label: "Confirmed",
      icon: CheckCircle,
      variant: "default" as const,
      bgColor: "bg-blue-100 text-blue-800",
    },
    processing: {
      label: "Processing",
      icon: Package,
      variant: "default" as const,
      bgColor: "bg-purple-100 text-purple-800",
    },
    shipped: {
      label: "Shipped",
      icon: Truck,
      variant: "default" as const,
      bgColor: "bg-indigo-100 text-indigo-800",
    },
    delivered: {
      label: "Delivered",
      icon: CheckCircle,
      variant: "default" as const,
      bgColor: "bg-green-100 text-green-800",
    },
    cancelled: {
      label: "Cancelled",
      icon: AlertCircle,
      variant: "destructive" as const,
      bgColor: "bg-red-100 text-red-800",
    },
  },
  supplier: {
    active: {
      label: "Active",
      icon: CheckCircle,
      variant: "default" as const,
      bgColor: "bg-green-100 text-green-800",
    },
    inactive: {
      label: "Inactive",
      icon: AlertCircle,
      variant: "default" as const,
      bgColor: "bg-gray-100 text-gray-800",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      variant: "default" as const,
      bgColor: "bg-yellow-100 text-yellow-800",
    },
  },
  product: {
    available: {
      label: "Available",
      icon: CheckCircle,
      variant: "default" as const,
      bgColor: "bg-green-100 text-green-800",
    },
    out_of_stock: {
      label: "Out of Stock",
      icon: AlertCircle,
      variant: "default" as const,
      bgColor: "bg-red-100 text-red-800",
    },
    discontinued: {
      label: "Discontinued",
      icon: AlertCircle,
      variant: "destructive" as const,
      bgColor: "bg-gray-100 text-gray-800",
    },
  },
  sample: {
    pending_approval: {
      label: "Pending Approval",
      icon: Clock,
      variant: "default" as const,
      bgColor: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      label: "Approved",
      icon: CheckCircle,
      variant: "default" as const,
      bgColor: "bg-green-100 text-green-800",
    },
    shipped: {
      label: "Shipped",
      icon: Truck,
      variant: "default" as const,
      bgColor: "bg-blue-100 text-blue-800",
    },
    delivered: {
      label: "Delivered",
      icon: Package,
      variant: "default" as const,
      bgColor: "bg-green-100 text-green-800",
    },
    rejected: {
      label: "Rejected",
      icon: AlertCircle,
      variant: "destructive" as const,
      bgColor: "bg-red-100 text-red-800",
    },
  },
};

const priorityConfig = {
  high: {
    label: "High",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  low: {
    label: "Low",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
};

// Column creators for different data types
export const createRFQColumns = (
  onViewDetails: (rfq: RFQ) => void,
  onStartNegotiation?: (rfq: RFQ) => void,
  userRole?: string
): ColumnDef<RFQ>[] => [
  {
    accessorKey: "id",
    header: "RFQ ID",
    cell: ({ row }) => {
      const rfq = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(rfq)}
          >
            {rfq.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const rfq = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{rfq.title}</div>
          <div className="text-sm text-muted-foreground truncate">
            {rfq.description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "seller",
    header: "Supplier",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("seller")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusConfigs.rfq;
      const statusInfo = statusConfigs.rfq[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as keyof typeof priorityConfig;
      const priorityInfo = priorityConfig[priority];

      return (
        <Badge className={priorityInfo?.color}>{priorityInfo?.label}</Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const budget = row.getValue("budget") as number;
      return (
        <div className="font-medium text-green-600">
          ${budget.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return <div className="text-sm">{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as string;
      return (
        <div className="text-sm">{new Date(deadline).toLocaleDateString()}</div>
      );
    },
  },
  {
    accessorKey: "responses",
    header: "Responses",
    cell: ({ row }) => {
      const responses = row.getValue("responses") as number;
      const rfq = row.original;

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm">{responses}</span>
          {rfq.quote && userRole === "seller" && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {rfq.quote.rating}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => {
      const files = row.getValue("files") as Array<any>;

      if (files.length === 0) {
        return <span className="text-muted-foreground text-sm">No files</span>;
      }

      return (
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{files.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rfq = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(rfq)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Response ({rfq.responses})
            </DropdownMenuItem>
            {rfq.status === "open" && onStartNegotiation && (
              <DropdownMenuItem onClick={() => onStartNegotiation(rfq)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Negotiation
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const createOrderColumns = (
  onViewDetails: (order: Order) => void,
  onEdit?: (order: Order) => void,
  onDelete?: (order: Order) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(order)}
          >
            {order.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{order.product}</div>
          <div className="text-sm text-muted-foreground truncate">
            {order.category}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("supplier")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusConfigs.order;
      const statusInfo = statusConfigs.order[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "fulfillmentStatus",
    header: "Fulfillment",
    cell: ({ row }) => {
      const status = row.getValue(
        "fulfillmentStatus"
      ) as keyof typeof statusConfigs.order;
      const statusInfo = statusConfigs.order[status];

      return (
        <Badge variant="outline" className={statusInfo?.bgColor}>
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return <div className="text-sm">{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="font-medium text-green-600">
          ${price.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const orderDate = row.getValue("orderDate") as string;
      return (
        <div className="text-sm">
          {new Date(orderDate).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "estimatedDelivery",
    header: "Est. Delivery",
    cell: ({ row }) => {
      const estimatedDelivery = row.getValue("estimatedDelivery") as string;
      return (
        <div className="text-sm">
          {new Date(estimatedDelivery).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking",
    cell: ({ row }) => {
      const trackingNumber = row.getValue("trackingNumber") as string;
      return <div className="text-sm">{trackingNumber || "N/A"}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(order)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(order)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Order
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(order)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Order
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const createSupplierColumns = (
  onViewDetails: (supplier: Supplier) => void,
  onEdit?: (supplier: Supplier) => void,
  onDelete?: (supplier: Supplier) => void
): ColumnDef<Supplier>[] => [
  {
    accessorKey: "id",
    header: "Supplier ID",
    cell: ({ row }) => {
      const supplier = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(supplier)}
          >
            {supplier.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const supplier = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{supplier.name}</div>
          <div className="text-sm text-muted-foreground truncate">
            {supplier.company}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
    cell: ({ row }) => {
      const totalOrders = row.getValue("totalOrders") as number;
      return <div className="text-sm">{totalOrders.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as keyof typeof statusConfigs.supplier;
      const statusInfo = statusConfigs.supplier[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.getValue("verified") as boolean;
      return (
        <Badge variant={verified ? "default" : "outline"}>
          {verified ? "Verified" : "Unverified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("location")}</div>;
    },
  },
  {
    accessorKey: "joinedDate",
    header: "Joined",
    cell: ({ row }) => {
      const joinedDate = row.getValue("joinedDate") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(joinedDate).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const supplier = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(supplier)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(supplier)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Supplier
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(supplier)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Supplier
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const createProductColumns = (
  onViewDetails: (product: Product) => void,
  onEdit?: (product: Product) => void,
  onDelete?: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(product)}
          >
            {product.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{product.name}</div>
          <div className="text-sm text-muted-foreground truncate">
            {product.description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("supplier")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="font-medium text-green-600">
          ${price.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return <div className="text-sm">{stock.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as keyof typeof statusConfigs.product;
      const statusInfo = statusConfigs.product[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(updatedAt).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(product)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(product)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Sample Columns - for sample-buyer module
export const createSampleColumns = (
  onViewDetails: (sample: SampleRequest) => void,
  onEdit?: (sample: SampleRequest) => void,
  onDelete?: (sample: SampleRequest) => void,
  onRate?: (sample: SampleRequest) => void
): ColumnDef<SampleRequest>[] => [
  {
    accessorKey: "id",
    header: "Sample ID",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(sample)}
          >
            {sample.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{sample.productName}</div>
          <div className="text-sm text-muted-foreground truncate">
            {sample.specifications}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("supplier")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as keyof typeof statusConfigs.sample;
      const statusInfo = statusConfigs.sample[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as keyof typeof priorityConfig;
      const priorityInfo = priorityConfig[priority || "medium"];

      return (
        <Badge className={priorityInfo?.color}>{priorityInfo?.label}</Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return <div className="text-sm">{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const cost = row.getValue("cost") as number;
      return (
        <div className="font-medium text-green-600">${cost.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Requested",
    cell: ({ row }) => {
      const requestDate = row.getValue("requestDate") as string;
      return (
        <div className="text-sm">
          {new Date(requestDate).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as string;
      return (
        <div className="text-sm">
          {deadline ? new Date(deadline).toLocaleDateString() : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      const sample = row.original;

      if (!rating && sample.status === "delivered" && !sample.feedback) {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRate?.(sample)}
            className="text-xs"
          >
            Rate
          </Button>
        );
      }

      if (rating) {
        return (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        );
      }

      return <span className="text-muted-foreground text-sm">N/A</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sample = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(sample)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Supplier
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </DropdownMenuItem>
            {sample.status === "pending_approval" && onEdit && (
              <DropdownMenuItem onClick={() => onEdit(sample)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Request
              </DropdownMenuItem>
            )}
            {sample.status === "delivered" && !sample.feedback && onRate && (
              <DropdownMenuItem onClick={() => onRate(sample)}>
                <Star className="mr-2 h-4 w-4" />
                Rate Sample
              </DropdownMenuItem>
            )}
            {sample.status === "pending_approval" && onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(sample)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel Request
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Seller Sample Columns - for sample-seller module
export const createSellerSampleColumns = (
  onViewDetails: (sample: SampleRequest) => void,
  onApproveReject?: (sample: SampleRequest) => void,
  onShip?: (sample: SampleRequest) => void
): ColumnDef<SampleRequest>[] => [
  {
    accessorKey: "id",
    header: "Sample ID",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="font-medium">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => onViewDetails(sample)}
          >
            {sample.id}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">
            {sample.buyer || "John Doe"}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {sample.buyerCompany || "Fashion Corp"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{sample.productName}</div>
          <div className="text-sm text-muted-foreground truncate">
            {sample.productCategory || "Apparel"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as keyof typeof statusConfigs.sample;
      const statusInfo = statusConfigs.sample[status];
      const StatusIcon = statusInfo?.icon;

      return (
        <Badge className={statusInfo?.bgColor}>
          {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
          {statusInfo?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as keyof typeof priorityConfig;
      const priorityInfo = priorityConfig[priority];
      const PriorityIcon = priorityInfo?.icon;

      return (
        <Badge variant="outline" className={priorityInfo?.color}>
          {PriorityIcon && <PriorityIcon className="h-3 w-3 mr-1" />}
          {priorityInfo?.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return <div className="font-medium">{quantity} pcs</div>;
    },
  },
  {
    accessorKey: "cost",
    header: "Sample Cost",
    cell: ({ row }) => {
      const cost = row.getValue("cost") as number;
      return (
        <div className="font-medium text-green-600">
          ${cost > 0 ? cost.toFixed(2) : "Free"}
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const requestDate = row.getValue("requestDate") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(requestDate).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const sample = row.original;
      const deadline = sample.deadline;
      if (!deadline)
        return <div className="text-sm text-muted-foreground">-</div>;

      const deadlineDate = new Date(deadline);
      const isOverdue =
        deadlineDate < new Date() && sample.status === "pending_approval";

      return (
        <div
          className={`text-sm ${
            isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"
          }`}
        >
          {deadlineDate.toLocaleDateString()}
          {isOverdue && <span className="ml-1">(Overdue)</span>}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sample = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(sample)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            {sample.status === "pending_approval" && onApproveReject && (
              <DropdownMenuItem onClick={() => onApproveReject(sample)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Review Request
              </DropdownMenuItem>
            )}

            {sample.status === "approved" && onShip && (
              <DropdownMenuItem onClick={() => onShip(sample)}>
                <Truck className="mr-2 h-4 w-4" />
                Ship Sample
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Buyer
            </DropdownMenuItem>

            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Generate Invoice
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Package className="mr-2 h-4 w-4" />
              Track Package
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Export all types and configurations for use in other components
export { statusConfigs, priorityConfig };
