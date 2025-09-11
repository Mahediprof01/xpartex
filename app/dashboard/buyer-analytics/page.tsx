"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
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
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Target,
  Award,
  Building2,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  RefreshCw,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Zap,
} from "lucide-react";

// Enhanced Mock Data for Buyer Analytics
const buyerAnalyticsData = {
  overview: {
    totalSpend: 127500,
    totalOrders: 89,
    activeRFQs: 12,
    avgResponseTime: "2.3 days",
    totalSavings: 18900,
    supplierCount: 24,
    avgOrderValue: 1432,
    completionRate: 94.2,
  },
  spendTrend: [
    { month: "Jan", spend: 12500, orders: 8, savings: 1200 },
    { month: "Feb", spend: 18900, orders: 12, savings: 2100 },
    { month: "Mar", spend: 15600, orders: 10, savings: 1800 },
    { month: "Apr", spend: 23400, orders: 15, savings: 3200 },
    { month: "May", spend: 19800, orders: 13, savings: 2800 },
    { month: "Jun", spend: 26700, orders: 18, savings: 4100 },
    { month: "Jul", spend: 22100, orders: 16, savings: 3400 },
  ],
  topSuppliers: [
    {
      name: "UrbanWear Co.",
      spend: 28900,
      orders: 16,
      rating: 4.8,
      onTimeDelivery: 96,
      responseTime: "2.1 days",
      category: "Apparel",
    },
    {
      name: "EcoFashion Ltd.",
      spend: 22700,
      orders: 14,
      rating: 4.6,
      onTimeDelivery: 94,
      responseTime: "1.8 days",
      category: "Sustainable Fashion",
    },
    {
      name: "StyleHub Manufacturing",
      spend: 19400,
      orders: 11,
      rating: 4.7,
      onTimeDelivery: 98,
      responseTime: "2.4 days",
      category: "Custom Apparel",
    },
    {
      name: "LuxuryFabrics Inc.",
      spend: 16200,
      orders: 8,
      rating: 4.9,
      onTimeDelivery: 100,
      responseTime: "1.5 days",
      category: "Premium Materials",
    },
    {
      name: "PremiumManufacturing",
      spend: 13800,
      orders: 7,
      rating: 4.5,
      onTimeDelivery: 92,
      responseTime: "3.1 days",
      category: "Industrial Apparel",
    },
  ],
  categoryBreakdown: [
    { category: "Apparel & Fashion", spend: 45.2, orders: 35, avgCost: 1650 },
    { category: "Accessories", spend: 22.8, orders: 18, avgCost: 890 },
    { category: "Footwear", spend: 18.4, orders: 12, avgCost: 2100 },
    { category: "Textiles & Fabrics", spend: 13.6, orders: 24, avgCost: 420 },
  ],
  rfqMetrics: {
    total: 48,
    active: 12,
    closed: 28,
    expired: 8,
    avgResponseTime: "2.3 days",
    avgQuotes: 6.8,
    conversionRate: 68.4,
    totalSavings: 18900,
  },
  recentActivity: [
    {
      type: "rfq",
      title: "New RFQ Response",
      description: "UrbanWear Co. submitted quote",
      time: "2 hours ago",
      status: "new",
    },
    {
      type: "order",
      title: "Order Delivered",
      description: "Premium Cotton Hoodies delivered",
      time: "5 hours ago",
      status: "completed",
    },
    {
      type: "sample",
      title: "Sample Approved",
      description: "Denim jacket sample approved",
      time: "1 day ago",
      status: "approved",
    },
    {
      type: "rfq",
      title: "RFQ Expired",
      description: "Winter collection RFQ expired",
      time: "2 days ago",
      status: "expired",
    },
    {
      type: "supplier",
      title: "New Supplier Added",
      description: "EcoFriendly Textiles verified",
      time: "3 days ago",
      status: "new",
    },
  ],
};

// Enhanced Metric Card Component
const MetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
  gradient,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "tween",
      ease: "easeOut",
      duration: 0.45,
      delay: index * 0.05,
    }}
  >
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div
        className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${gradient} text-white shadow-lg`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          {changeType === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          )}
          <span
            className={changeType === "up" ? "text-green-600" : "text-red-600"}
          >
            {change}
          </span>
          {description && <span className="ml-1">{description}</span>}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Professional Area Chart Component
const ProfessionalAreaChart = ({ data, title, valueKey, color = "blue" }) => {
  const colorMap = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#22c55e",
    orange: "#f59e0b",
    indigo: "#6366f1",
  };

  const chartColor = colorMap[color] || colorMap.blue;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-600">
            {valueKey === "spend"
              ? `Spend: $${payload[0].value.toLocaleString()}`
              : `Orders: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`gradient-${color}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(value) =>
                  valueKey === "spend"
                    ? `$${(value / 1000).toFixed(0)}k`
                    : value
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={valueKey}
                stroke={chartColor}
                strokeWidth={3}
                fill={`url(#gradient-${color})`}
                dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: chartColor, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Professional Combined Chart Component
const ProfessionalCombinedChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "spend"
                ? `Spend: $${entry.value.toLocaleString()}`
                : entry.dataKey === "orders"
                ? `Orders: ${entry.value}`
                : `Savings: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="spend"
                fill="#3b82f6"
                name="Spend"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="Orders"
                dot={{ fill: "#8b5cf6", r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="savings"
                stroke="#22c55e"
                strokeWidth={3}
                name="Savings"
                dot={{ fill: "#22c55e", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Top Suppliers Component
const TopSuppliersList = ({ suppliers, title }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Building2 className="h-5 w-5" />
        {title}
      </CardTitle>
      <CardDescription>Based on total spend and performance</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-sm">{supplier.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {supplier.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {supplier.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                ${supplier.spend.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {supplier.orders} orders
              </div>
              <div className="text-xs text-green-600">
                {supplier.onTimeDelivery}% on-time
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Professional Pie Chart Component
const ProfessionalPieChart = ({ data, title }) => {
  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {`${payload[0].value.toFixed(1)}% (${
              payload[0].payload.orders
            } orders)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="spend"
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color, fontWeight: 500 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Activity Component
const RecentActivity = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Recent Activity
      </CardTitle>
      <CardDescription>
        Latest procurement activities and updates
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const getIcon = (type) => {
            switch (type) {
              case "rfq":
                return <FileText className="h-4 w-4" />;
              case "order":
                return <ShoppingCart className="h-4 w-4" />;
              case "sample":
                return <Award className="h-4 w-4" />;
              case "supplier":
                return <Building2 className="h-4 w-4" />;
              default:
                return <Activity className="h-4 w-4" />;
            }
          };

          const getStatusColor = (status) => {
            switch (status) {
              case "completed":
                return "text-green-600 bg-green-50";
              case "approved":
                return "text-blue-600 bg-blue-50";
              case "new":
                return "text-purple-600 bg-purple-50";
              case "expired":
                return "text-red-600 bg-red-50";
              default:
                return "text-gray-600 bg-gray-50";
            }
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}
              >
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </motion.div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default function BuyerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(() => {
    const months =
      timeRange === "1m"
        ? 1
        : timeRange === "3m"
        ? 3
        : timeRange === "6m"
        ? 6
        : 12;
    return {
      ...buyerAnalyticsData,
      spendTrend: buyerAnalyticsData.spendTrend.slice(-months),
    };
  }, [timeRange]);

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const csvData = [
        ["Month", "Spend", "Orders", "Savings"],
        ...filteredData.spendTrend.map((item) => [
          item.month,
          item.spend,
          item.orders,
          item.savings,
        ]),
      ];
      const csv = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `buyer-analytics-${timeRange}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setIsLoading(false);
    }, 1000);
  };

  const keyMetrics = [
    {
      title: "Total Spend",
      value: `$${filteredData.overview.totalSpend.toLocaleString()}`,
      change: "+23.4%",
      changeType: "up",
      description: "vs. last period",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      title: "Total Orders",
      value: filteredData.overview.totalOrders.toString(),
      change: "+18.2%",
      changeType: "up",
      description: "vs. last period",
      icon: ShoppingCart,
      gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      title: "Total Savings",
      value: `$${filteredData.overview.totalSavings.toLocaleString()}`,
      change: "+31.5%",
      changeType: "up",
      description: "cost optimization",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-green-400 to-teal-500",
    },
    {
      title: "Active RFQs",
      value: filteredData.overview.activeRFQs.toString(),
      change: "2 new",
      changeType: "up",
      description: "awaiting quotes",
      icon: Target,
      gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
      title: "Avg. Response Time",
      value: filteredData.overview.avgResponseTime,
      change: "-0.5 days",
      changeType: "up",
      description: "improved efficiency",
      icon: Clock,
      gradient: "bg-gradient-to-br from-indigo-400 to-purple-500",
    },
    {
      title: "Supplier Network",
      value: filteredData.overview.supplierCount.toString(),
      change: "+3 new",
      changeType: "up",
      description: "verified suppliers",
      icon: Building2,
      gradient: "bg-gradient-to-br from-emerald-400 to-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-end gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search analytics..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="apparel">Apparel & Fashion</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="footwear">Footwear</SelectItem>
              <SelectItem value="textiles">Textiles & Fabrics</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:shadow-lg"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {keyMetrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </div>

      {/* Advanced Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfessionalAreaChart
          data={filteredData.spendTrend}
          title="Spend Trend Analysis"
          valueKey="spend"
          color="blue"
        />
        <ProfessionalAreaChart
          data={filteredData.spendTrend}
          title="Order Volume Trend"
          valueKey="orders"
          color="purple"
        />
      </div>

      {/* Combined Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfessionalCombinedChart
            data={filteredData.spendTrend}
            title="Comprehensive Analytics Overview"
          />
        </div>
        <div className="lg:col-span-1">
          <ProfessionalPieChart
            data={filteredData.categoryBreakdown.map((item) => ({
              ...item,
              name: item.category,
            }))}
            title="Spend Distribution"
          />
        </div>
      </div>

      {/* Performance & Activity Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <TopSuppliersList
          suppliers={filteredData.topSuppliers}
          title="Top Performing Suppliers"
        />
        <RecentActivity activities={filteredData.recentActivity} />
      </div>
    </div>
  );
}
