"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Clock,
  Package,
  DollarSign,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  ShoppingCart,
  AlertCircle,
  BarChart3,
  Activity,
  Heart,
  Download,
} from "lucide-react";
import { getSupplierById } from "../../../../data/suppliers";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

export default function SupplierDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const supplier = getSupplierById(params.id as string);

  // Dynamic chart data based on supplier metrics
  const orderTrendsData = [
    { month: "Jan", orders: 8, revenue: 3200 },
    { month: "Feb", orders: 12, revenue: 4800 },
    { month: "Mar", orders: 15, revenue: 6000 },
    { month: "Apr", orders: 18, revenue: 7200 },
    { month: "May", orders: 22, revenue: 8800 },
    { month: "Jun", orders: 25, revenue: 10000 },
  ];

  const performanceData = [
    {
      name: "Completion Rate",
      value: supplier?.completionRate || 95,
      color: "#10B981",
    },
    {
      name: "On-Time Delivery",
      value: supplier?.onTimeDelivery || 90,
      color: "#3B82F6",
    },
    {
      name: "Quality Score",
      value: (supplier?.rating || 4.5) * 20,
      color: "#F59E0B",
    },
  ];

  const monthlyRevenueData = [
    {
      month: "Jan",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.15) : 6840,
    },
    {
      month: "Feb",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.18) : 8208,
    },
    {
      month: "Mar",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.12) : 5472,
    },
    {
      month: "Apr",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.16) : 7296,
    },
    {
      month: "May",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.2) : 9120,
    },
    {
      month: "Jun",
      revenue: supplier ? Math.round(supplier.totalSpend * 0.19) : 8664,
    },
  ];

  const categoryBreakdown = [
    { name: "T-Shirts", value: 35, color: "#8B5CF6" },
    { name: "Shirts", value: 25, color: "#06B6D4" },
    { name: "Jeans", value: 20, color: "#10B981" },
    { name: "Jackets", value: 12, color: "#F59E0B" },
    { name: "Others", value: 8, color: "#EF4444" },
  ];

  if (!supplier) {
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
            <h3 className="text-xl font-semibold mb-2">Supplier Not Found</h3>
            <p className="text-muted-foreground">
              The supplier you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "standard":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "basic":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "inactive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
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
                {supplier.name}
              </h1>
              {supplier.verified && (
                <Badge variant="outline" className="text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge
                className={`${getStatusColor(
                  supplier.status
                )} border px-3 py-1`}
              >
                {supplier.status.charAt(0).toUpperCase() +
                  supplier.status.slice(1)}
              </Badge>
              <Badge
                className={`${getTierColor(supplier.tier)} border px-3 py-1`}
              >
                {supplier.tier.charAt(0).toUpperCase() + supplier.tier.slice(1)}{" "}
                Tier
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {supplier.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {supplier.category}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                {supplier.rating} ({supplier.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Add to Favorites
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Request Quote
          </Button>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
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
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Spend
                </p>
                <p className="text-xl font-bold">
                  ${supplier.totalSpend.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <p className="text-xl font-bold">{supplier.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completion Rate
                </p>
                <p className="text-xl font-bold">{supplier.completionRate}%</p>
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
                  Response Time
                </p>
                <p className="text-xl font-bold">{supplier.responseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Company Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {supplier.description}
                  </p>

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Category
                      </Label>
                      <p className="text-sm mt-1">{supplier.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Location
                      </Label>
                      <p className="text-sm  mt-1">{supplier.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Min Order Quantity
                      </Label>
                      <p className="text-sm mt-1">{supplier.minOrder} units</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Lead Time
                      </Label>
                      <p className="text-sm mt-1">{supplier.leadTime}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Specialties
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {supplier.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications & Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {supplier.certified.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{cert}</p>
                          <p className="text-xs text-muted-foreground">
                            Certified
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Order Completion Rate
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {supplier.completionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${supplier.completionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          On-Time Delivery
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {supplier.onTimeDelivery}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${supplier.onTimeDelivery}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths & Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle>Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <div className="space-y-2">
                        {supplier.strengths.map((strength, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-2">
                        {supplier.weaknesses.map((weakness, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Quick Info */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{supplier.contact.phone}</p>
                        <p className="text-sm text-muted-foreground">Phone</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{supplier.contact.email}</p>
                        <p className="text-sm text-muted-foreground">Email</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {supplier.contact.website}
                        </p>
                        <p className="text-sm text-muted-foreground">Website</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium">{supplier.location}</p>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Min. Order Quantity:
                      </span>
                      <span className="font-medium">
                        {supplier.minOrder} units
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Lead Time:
                      </span>
                      <span className="font-medium">{supplier.leadTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Response Time:
                      </span>
                      <span className="font-medium">
                        {supplier.responseTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Member Since:
                      </span>
                      <span className="font-medium">
                        {new Date(supplier.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Active Orders:
                      </span>
                      <span className="font-medium">
                        {supplier.activeOrders}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Request Sample
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Place Order
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6">
            {/* Top Row - Two Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Order Trends (Last 6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={orderTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "orders" ? `${value} orders` : `$${value}`,
                            name === "orders" ? "Orders" : "Revenue",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="orders"
                          stackId="1"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stackId="2"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Performance"]}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row - Two Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Monthly Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Monthly Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Revenue"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                          activeDot={{
                            r: 8,
                            stroke: "#3B82F6",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Product Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center">
                    <div className="flex-1">
                      <ResponsiveContainer width="60%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Share"]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2">
                      {categoryBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Performance Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {supplier.completionRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completion Rate
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {supplier.onTimeDelivery}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      On-Time Delivery
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      $
                      {Math.round(
                        supplier.totalSpend / supplier.totalOrders
                      ).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Order Value
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {supplier.rating}/5.0
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Customer Rating
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
