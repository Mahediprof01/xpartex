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
  Package,
  Users,
  Percent,
} from "lucide-react";

// Types
interface ChartDataItem {
  month: string;
  revenue?: number;
  orders?: number;
  customers?: number;
  rating?: number;
}

interface ProductItem {
  name: string;
  revenue: number;
  orders: number;
  rating: number;
  stock: number;
  category: string;
  margin: number;
}

interface CustomerSegment {
  segment: string;
  revenue: number;
  orders: number;
  avgOrder: number;
  name?: string;
}

interface ActivityItem {
  type: string;
  title: string;
  description: string;
  time: string;
  status: string;
}

interface SalesMetrics {
  totalQuotes: number;
  acceptedQuotes: number;
  pendingQuotes: number;
  rejectedQuotes: number;
  conversionRate: number;
  avgResponseTime: string;
  totalCustomers: number;
  returningCustomers: number;
}

// Enhanced Mock Data for Seller Analytics
const sellerAnalyticsData = {
  overview: {
    totalRevenue: 245800,
    totalOrders: 156,
    activeProducts: 28,
    avgOrderValue: 1576,
    conversionRate: 12.4,
    customerCount: 89,
    avgRating: 4.7,
    responseTime: "2.1 hours",
  },
  revenueTrend: [
    { month: "Jan", revenue: 18900, orders: 12, customers: 8, rating: 4.5 },
    { month: "Feb", revenue: 24300, orders: 18, customers: 12, rating: 4.6 },
    { month: "Mar", revenue: 19800, orders: 14, customers: 10, rating: 4.4 },
    { month: "Apr", revenue: 32400, orders: 22, customers: 16, rating: 4.7 },
    { month: "May", revenue: 28100, orders: 19, customers: 14, rating: 4.8 },
    { month: "Jun", revenue: 35600, orders: 26, customers: 18, rating: 4.9 },
    { month: "Jul", revenue: 39200, orders: 28, customers: 20, rating: 4.7 },
  ],
  topProducts: [
    {
      name: "Premium Cotton Hoodie",
      revenue: 45600,
      orders: 76,
      rating: 4.8,
      stock: 245,
      category: "Apparel",
      margin: 34.5,
    },
    {
      name: "Classic Denim Jacket",
      revenue: 38900,
      orders: 65,
      rating: 4.6,
      stock: 189,
      category: "Outerwear",
      margin: 42.1,
    },
    {
      name: "Organic Linen Shirt",
      revenue: 32400,
      orders: 54,
      rating: 4.7,
      stock: 156,
      category: "Casual Wear",
      margin: 38.9,
    },
    {
      name: "Slim Fit Chinos",
      revenue: 28700,
      orders: 48,
      rating: 4.9,
      stock: 98,
      category: "Pants",
      margin: 45.2,
    },
    {
      name: "Wool Blend Overcoat",
      revenue: 24800,
      orders: 41,
      rating: 4.5,
      stock: 67,
      category: "Luxury",
      margin: 52.8,
    },
  ],
  customerSegments: [
    { segment: "Retail Customers", revenue: 45.8, orders: 98, avgOrder: 1245 },
    { segment: "B2B Partners", revenue: 32.4, orders: 34, avgOrder: 2890 },
    { segment: "Wholesale Buyers", revenue: 21.8, orders: 24, avgOrder: 3650 },
  ],
  salesMetrics: {
    totalQuotes: 89,
    acceptedQuotes: 67,
    pendingQuotes: 15,
    rejectedQuotes: 7,
    conversionRate: 75.3,
    avgResponseTime: "2.1 hours",
    totalCustomers: 89,
    returningCustomers: 56,
  },
  recentActivity: [
    {
      type: "order",
      title: "New Order Received",
      description: "Premium Cotton Hoodie - 12 units",
      time: "1 hour ago",
      status: "new",
    },
    {
      type: "quote",
      title: "Quote Accepted",
      description: "B2B Partner accepted bulk order quote",
      time: "3 hours ago",
      status: "completed",
    },
    {
      type: "product",
      title: "Product Updated",
      description: "Classic Denim Jacket inventory restocked",
      time: "6 hours ago",
      status: "updated",
    },
    {
      type: "review",
      title: "New Review",
      description: "5-star review for Organic Linen Shirt",
      time: "1 day ago",
      status: "positive",
    },
    {
      type: "customer",
      title: "New Customer",
      description: "Fashion Retailer Co. registered",
      time: "2 days ago",
      status: "new",
    },
  ],
};

// Enhanced Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
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
interface ProfessionalAreaChartProps {
  data: ChartDataItem[];
  title: string;
  valueKey: string;
  color?: string;
}

const ProfessionalAreaChart: React.FC<ProfessionalAreaChartProps> = ({
  data,
  title,
  valueKey,
  color = "blue",
}) => {
  const colorMap = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#22c55e",
    orange: "#f59e0b",
    indigo: "#6366f1",
    red: "#ef4444",
  };

  const chartColor = colorMap[color] || colorMap.blue;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-600">
            {valueKey === "revenue"
              ? `Revenue: $${payload[0].value.toLocaleString()}`
              : valueKey === "orders"
              ? `Orders: ${payload[0].value}`
              : valueKey === "customers"
              ? `Customers: ${payload[0].value}`
              : `Rating: ${payload[0].value}/5`}
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
                  valueKey === "revenue"
                    ? `$${(value / 1000).toFixed(0)}k`
                    : valueKey === "rating"
                    ? value.toFixed(1)
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
interface ProfessionalCombinedChartProps {
  data: ChartDataItem[];
  title: string;
}

const ProfessionalCombinedChart: React.FC<ProfessionalCombinedChartProps> = ({
  data,
  title,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "revenue"
                ? `Revenue: $${entry.value.toLocaleString()}`
                : entry.dataKey === "orders"
                ? `Orders: ${entry.value}`
                : entry.dataKey === "customers"
                ? `Customers: ${entry.value}`
                : `Rating: ${entry.value}/5`}
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
                dataKey="revenue"
                fill="#3b82f6"
                name="Revenue"
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
                yAxisId="right"
                type="monotone"
                dataKey="customers"
                stroke="#22c55e"
                strokeWidth={3}
                name="Customers"
                dot={{ fill: "#22c55e", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Professional Pie Chart Component
interface ProfessionalPieChartProps {
  data: CustomerSegment[];
  title: string;
}

const ProfessionalPieChart: React.FC<ProfessionalPieChartProps> = ({
  data,
  title,
}) => {
  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
  ];

  const CustomTooltip = ({ active, payload }: any) => {
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
  }: any) => {
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
          <Users className="h-5 w-5" />
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
                dataKey="revenue"
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

// Top Products Component
interface TopProductsListProps {
  products: ProductItem[];
  title: string;
}

const TopProductsList: React.FC<TopProductsListProps> = ({
  products,
  title,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Package className="h-5 w-5" />
        {title}
      </CardTitle>
      <CardDescription>
        Based on revenue and performance metrics
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {products.map((product, index) => (
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
                <p className="font-semibold text-sm">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                ${product.revenue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {product.orders} orders
              </div>
              <div className="text-xs text-green-600">
                {product.margin}% margin
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Sales Performance Component
interface SalesPerformanceProps {
  metrics: SalesMetrics;
}

const SalesPerformance: React.FC<SalesPerformanceProps> = ({ metrics }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Target className="h-5 w-5" />
        Sales Performance
      </CardTitle>
      <CardDescription>Quote and sales conversion analytics</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium">Total Quotes</span>
            <span className="font-bold text-blue-600">
              {metrics.totalQuotes}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium">Accepted</span>
            <span className="font-bold text-green-600">
              {metrics.acceptedQuotes}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm font-medium">Pending</span>
            <span className="font-bold text-yellow-600">
              {metrics.pendingQuotes}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <span className="text-sm font-medium">Rejected</span>
            <span className="font-bold text-red-600">
              {metrics.rejectedQuotes}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {metrics.conversionRate}%
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">
              Response Time
            </div>
            <div className="text-lg font-bold text-orange-600">
              {metrics.avgResponseTime}
            </div>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">
              Total Customers
            </div>
            <div className="text-lg font-bold text-teal-600">
              {metrics.totalCustomers}
            </div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <div className="text-sm font-medium text-muted-foreground">
              Returning
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {metrics.returningCustomers}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Recent Activity Component
interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Recent Activity
      </CardTitle>
      <CardDescription>Latest sales activities and updates</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const getIcon = (type) => {
            switch (type) {
              case "order":
                return <ShoppingCart className="h-4 w-4" />;
              case "quote":
                return <FileText className="h-4 w-4" />;
              case "product":
                return <Package className="h-4 w-4" />;
              case "review":
                return <Star className="h-4 w-4" />;
              case "customer":
                return <Users className="h-4 w-4" />;
              default:
                return <Activity className="h-4 w-4" />;
            }
          };

          const getStatusColor = (status) => {
            switch (status) {
              case "completed":
                return "text-green-600 bg-green-50";
              case "positive":
                return "text-blue-600 bg-blue-50";
              case "new":
                return "text-purple-600 bg-purple-50";
              case "updated":
                return "text-orange-600 bg-orange-50";
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

export default function SellerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [productFilter, setProductFilter] = useState("all");
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
      ...sellerAnalyticsData,
      revenueTrend: sellerAnalyticsData.revenueTrend.slice(-months),
    };
  }, [timeRange]);

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const csvData = [
        ["Month", "Revenue", "Orders", "Customers", "Rating"],
        ...filteredData.revenueTrend.map((item) => [
          item.month,
          item.revenue,
          item.orders,
          item.customers,
          item.rating,
        ]),
      ];
      const csv = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `seller-analytics-${timeRange}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setIsLoading(false);
    }, 1000);
  };

  const keyMetrics = [
    {
      title: "Total Revenue",
      value: `$${filteredData.overview.totalRevenue.toLocaleString()}`,
      change: "+31.2%",
      changeType: "up" as const,
      description: "vs. last period",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      title: "Total Orders",
      value: filteredData.overview.totalOrders.toString(),
      change: "+22.8%",
      changeType: "up" as const,
      description: "vs. last period",
      icon: ShoppingCart,
      gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      title: "Conversion Rate",
      value: `${filteredData.overview.conversionRate}%`,
      change: "+5.2%",
      changeType: "up" as const,
      description: "quote to order",
      icon: Percent,
      gradient: "bg-gradient-to-br from-green-400 to-teal-500",
    },
    {
      title: "Avg Order Value",
      value: `$${filteredData.overview.avgOrderValue.toLocaleString()}`,
      change: "+12.4%",
      changeType: "up" as const,
      description: "per transaction",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
      title: "Response Time",
      value: filteredData.overview.responseTime,
      change: "-0.8 hours",
      changeType: "up" as const,
      description: "avg. response",
      icon: Clock,
      gradient: "bg-gradient-to-br from-indigo-400 to-purple-500",
    },
    {
      title: "Customer Rating",
      value: `${filteredData.overview.avgRating}/5`,
      change: "+0.2",
      changeType: "up" as const,
      description: "average rating",
      icon: Star,
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

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="casual">Casual Wear</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 hover:shadow-lg"
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
          data={filteredData.revenueTrend}
          title="Revenue Trend Analysis"
          valueKey="revenue"
          color="blue"
        />
        <ProfessionalAreaChart
          data={filteredData.revenueTrend}
          title="Customer Growth"
          valueKey="customers"
          color="green"
        />
      </div>

      {/* Combined Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfessionalCombinedChart
            data={filteredData.revenueTrend}
            title="Sales Performance Overview"
          />
        </div>
        <div className="lg:col-span-1">
          <ProfessionalPieChart
            data={filteredData.customerSegments.map((item) => ({
              ...item,
              name: item.segment,
            }))}
            title="Customer Segments"
          />
        </div>
      </div>

      {/* Performance & Activity Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <TopProductsList
          products={filteredData.topProducts}
          title="Top Performing Products"
        />
        <SalesPerformance metrics={filteredData.salesMetrics} />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={filteredData.recentActivity} />
    </div>
  );
}
