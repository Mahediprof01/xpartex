"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Target,
  Award,
  Building2,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";

// Mock data for charts and analytics
const analyticsData = {
  buyer: {
    spendTrend: [
      { month: "Jan", spend: 12500, orders: 8 },
      { month: "Feb", spend: 18900, orders: 12 },
      { month: "Mar", spend: 15600, orders: 10 },
      { month: "Apr", spend: 23400, orders: 15 },
      { month: "May", spend: 19800, orders: 13 },
      { month: "Jun", spend: 26700, orders: 18 },
    ],
    topSuppliers: [
      { name: "UrbanWear Co.", spend: 8900, orders: 6, rating: 4.8 },
      { name: "EcoFashion", spend: 6700, orders: 4, rating: 4.6 },
      { name: "StyleHub", spend: 5400, orders: 3, rating: 4.7 },
      { name: "LuxuryFabrics", spend: 4200, orders: 2, rating: 4.9 },
      { name: "PremiumManufacturing", spend: 3800, orders: 2, rating: 4.5 },
    ],
    categoryBreakdown: [
      { category: "Apparel", spend: 45, count: 12 },
      { category: "Electronics", spend: 25, count: 8 },
      { category: "Furniture", spend: 20, count: 5 },
      { category: "Machinery", spend: 10, count: 2 },
    ],
    rfqMetrics: {
      total: 24,
      active: 8,
      closed: 12,
      expired: 4,
      avgResponseTime: "2.3 days",
      avgQuotes: 6.2,
    },
  },
  seller: {
    revenueTrend: [
      { month: "Jan", revenue: 8900, orders: 12 },
      { month: "Feb", revenue: 12300, orders: 18 },
      { month: "Mar", revenue: 9800, orders: 14 },
      { month: "Apr", revenue: 15600, orders: 22 },
      { month: "May", revenue: 13400, orders: 19 },
      { month: "Jun", revenue: 18900, orders: 26 },
    ],
    topProducts: [
      { name: "Classic Denim Jacket", revenue: 8900, orders: 45, rating: 4.8 },
      { name: "Organic Cotton Hoodie", revenue: 6700, orders: 38, rating: 4.6 },
      { name: "Linen Summer Dress", revenue: 5400, orders: 32, rating: 4.7 },
      { name: "Slim Fit Chinos", revenue: 4200, orders: 28, rating: 4.9 },
      { name: "Wool Blend Overcoat", revenue: 3800, orders: 25, rating: 4.5 },
    ],
    customerBreakdown: [
      { type: "Retail", revenue: 60, count: 156 },
      { type: "B2B", revenue: 35, count: 23 },
      { type: "Wholesale", revenue: 5, count: 8 },
    ],
    quoteMetrics: {
      total: 45,
      pending: 18,
      accepted: 22,
      rejected: 5,
      conversionRate: "48.9%",
      avgResponseTime: "4.2 hours",
    },
  },
  procurement_officer: {
    spendTrend: [
      { month: "Jan", spend: 45000, orders: 15 },
      { month: "Feb", spend: 67000, orders: 22 },
      { month: "Mar", spend: 52000, orders: 18 },
      { month: "Apr", spend: 89000, orders: 28 },
      { month: "May", spend: 72000, orders: 24 },
      { month: "Jun", spend: 105000, orders: 32 },
    ],
    topSuppliers: [
      { name: "GreenTech Solutions", spend: 89000, orders: 28, rating: 4.8 },
      { name: "OfficeMax Pro", spend: 67000, orders: 22, rating: 4.6 },
      { name: "IT Equipment Co.", spend: 54000, orders: 18, rating: 4.7 },
      { name: "Furniture World", spend: 42000, orders: 15, rating: 4.9 },
      { name: "Supply Chain Pro", spend: 38000, orders: 12, rating: 4.5 },
    ],
    categoryBreakdown: [
      { category: "IT Equipment", spend: 40, count: 18 },
      { category: "Office Furniture", spend: 30, count: 15 },
      { category: "Office Supplies", spend: 20, count: 25 },
      { category: "Services", spend: 10, count: 8 },
    ],
    rfqMetrics: {
      total: 36,
      active: 12,
      closed: 18,
      expired: 6,
      avgResponseTime: "3.1 days",
      avgQuotes: 7.8,
      totalSavings: 23400,
    },
  },
};

const MetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {changeType === "up" ? (
          <ArrowUpRight className="h-3 w-3 text-green-500" />
        ) : (
          <ArrowDownRight className="h-3 w-3 text-red-500" />
        )}
        {change}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

const TrendChart = ({ data, title, valueKey, color = "blue" }) => {
  const colorMap = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#22c55e",
    orange: "#f59e0b",
    red: "#ef4444",
    gray: "#9ca3af",
  };
  const barColor = colorMap[color] || colorMap.blue;

  const safeData = Array.isArray(data) ? data : [];
  const hasData =
    safeData.length > 0 && safeData.some((d) => Number(d[valueKey]) > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="h-48 flex items-end justify-between gap-2">
            {safeData.map((item, index) => {
              const maxValue = Math.max(
                ...safeData.map((d) => Number(d[valueKey]) || 0)
              );
              const current = Number(item[valueKey]) || 0;
              const height = maxValue > 0 ? (current / maxValue) * 100 : 0;

              return (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col items-center"
                >
                  <div
                    className="w-full rounded-t transition-all duration-300"
                    style={{ height: `${height}%`, backgroundColor: barColor }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
            No data to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TopList = ({ title, data, valueKey, labelKey, subtitle, icon: Icon }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
      {subtitle && <CardDescription>{subtitle}</CardDescription>}
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-sm">{item[labelKey]}</p>
                {item.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      Rating: {item.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {valueKey === "spend" || valueKey === "revenue"
                  ? `$${item[valueKey].toLocaleString()}`
                  : item[valueKey]}
              </div>
              {item.orders && (
                <div className="text-xs text-muted-foreground">
                  {item.orders} orders
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const PieChartComponent = ({ title, data, valueKey, labelKey }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-48 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const total = data.reduce((sum, d) => sum + d[valueKey], 0);
              const percentage = (item[valueKey] / total) * 100;
              const startAngle = data
                .slice(0, index)
                .reduce((sum, d) => sum + (d[valueKey] / total) * 360, 0);
              const endAngle = startAngle + (item[valueKey] / total) * 360;

              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

              const largeArcFlag = percentage > 50 ? 1 : 0;

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={`hsl(${index * 60}, 70%, 60%)`}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
              ></div>
              <span>{item[labelKey]}</span>
            </div>
            <span className="font-medium">
              {(
                (item[valueKey] /
                  data.reduce((sum, d) => sum + d[valueKey], 0)) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function AnalyticsPage() {
  const { role } = useAuthStore();
  const [timeRange, setTimeRange] = useState("6m");
  const [viewType, setViewType] = useState("overview");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");

  const data = analyticsData[role] || analyticsData.buyer;

  const rangeToCount = (range) => {
    switch (range) {
      case "1m":
        return 1;
      case "3m":
        return 3;
      case "6m":
        return 6;
      case "1y":
        return 12; // fall back to all available
      default:
        return 6;
    }
  };

  const windowedData = useMemo(() => {
    const months = rangeToCount(timeRange);
    const trendKey = role === "seller" ? "revenueTrend" : "spendTrend";
    const source = Array.isArray(data?.[trendKey]) ? data[trendKey] : [];
    const trend = source.slice(-months);
    return {
      trend,
      ordersSeries: trend.map((t) => ({ month: t.month, orders: t.orders })),
    };
  }, [data, role, timeRange]);

  const downloadCsv = () => {
    const rows = [
      ["Month", role === "seller" ? "Revenue" : "Spend", "Orders"],
      ...windowedData.trend.map((t) => [
        t.month,
        (t.revenue ?? t.spend).toString(),
        t.orders.toString(),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_${role}_${timeRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getMetricsByRole = () => {
    if (role === "buyer") {
      return [
        {
          title: "Total Spend",
          value: `$${data.spendTrend
            .reduce((sum, item) => sum + item.spend, 0)
            .toLocaleString()}`,
          change: "+23.4%",
          changeType: "up",
          icon: DollarSign,
          description: "vs. last period",
        },
        {
          title: "Total Orders",
          value: data.spendTrend.reduce((sum, item) => sum + item.orders, 0),
          change: "+18.2%",
          changeType: "up",
          icon: ShoppingCart,
          description: "vs. last period",
        },
        {
          title: "Active RFQs",
          value: data.rfqMetrics.active,
          change: "2 new",
          changeType: "up",
          icon: Target,
          description: "awaiting quotes",
        },
        {
          title: "Avg. Response Time",
          value: data.rfqMetrics.avgResponseTime,
          change: "-0.5 days",
          changeType: "up",
          icon: Calendar,
          description: "vs. last period",
        },
      ];
    } else if (role === "seller") {
      return [
        {
          title: "Total Revenue",
          value: `$${data.revenueTrend
            .reduce((sum, item) => sum + item.revenue, 0)
            .toLocaleString()}`,
          change: "+31.2%",
          changeType: "up",
          icon: DollarSign,
          description: "vs. last period",
        },
        {
          title: "Total Orders",
          value: data.revenueTrend.reduce((sum, item) => sum + item.orders, 0),
          change: "+22.8%",
          changeType: "up",
          icon: ShoppingCart,
          description: "vs. last period",
        },
        {
          title: "Quote Conversion",
          value: data.quoteMetrics.conversionRate,
          change: "+5.2%",
          changeType: "up",
          icon: Target,
          description: "vs. last period",
        },
        {
          title: "Avg. Response Time",
          value: data.quoteMetrics.avgResponseTime,
          change: "-0.8 hours",
          changeType: "up",
          icon: Calendar,
          description: "vs. last period",
        },
      ];
    } else if (role === "procurement_officer") {
      return [
        {
          title: "Total Spend",
          value: `$${data.spendTrend
            .reduce((sum, item) => sum + item.spend, 0)
            .toLocaleString()}`,
          change: "+28.7%",
          changeType: "up",
          icon: DollarSign,
          description: "vs. last period",
        },
        {
          title: "Total Orders",
          value: data.spendTrend.reduce((sum, item) => sum + item.orders, 0),
          change: "+24.3%",
          changeType: "up",
          icon: ShoppingCart,
          description: "vs. last period",
        },
        {
          title: "Active RFQs",
          value: data.rfqMetrics.active,
          change: "3 new",
          changeType: "up",
          icon: Target,
          description: "awaiting quotes",
        },
        {
          title: "Total Savings",
          value: `$${data.rfqMetrics.totalSavings.toLocaleString()}`,
          change: "+12.5%",
          changeType: "up",
          icon: TrendingUp,
          description: "vs. last period",
        },
      ];
    }
    return [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground">
            Comprehensive business intelligence and performance metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="comparison">Comparison</SelectItem>
            </SelectContent>
          </Select>

          {role === "seller" ? (
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="classic-denim-jacket">
                  Classic Denim Jacket
                </SelectItem>
                <SelectItem value="organic-cotton-hoodie">
                  Organic Cotton Hoodie
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button variant="outline" size="sm" onClick={downloadCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getMetricsByRole().map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row 1 */}
      {viewType !== "comparison" && (
        <div className="grid gap-6 md:grid-cols-2">
          <TrendChart
            data={windowedData.trend}
            title={role === "seller" ? "Revenue Trend" : "Spend Trend"}
            valueKey={role === "seller" ? "revenue" : "spend"}
            color="blue"
          />

          <TrendChart
            data={windowedData.trend}
            title="Orders Trend"
            valueKey="orders"
            color="purple"
          />
        </div>
      )}

      {/* Charts Row 2 or Comparison */}
      {viewType === "comparison" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Period</CardTitle>
              <CardDescription>Based on selected time range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title={role === "seller" ? "Revenue" : "Spend"}
                  value={`$${windowedData.trend
                    .reduce((s, t) => s + (t.revenue ?? t.spend), 0)
                    .toLocaleString()}`}
                  change={"—"}
                  changeType="up"
                  icon={DollarSign}
                />
                <MetricCard
                  title="Orders"
                  value={windowedData.trend.reduce((s, t) => s + t.orders, 0)}
                  change={"—"}
                  changeType="up"
                  icon={ShoppingCart}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previous Period</CardTitle>
              <CardDescription>Same length immediately before</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  const months = rangeToCount(timeRange);
                  const trendKey =
                    role === "seller" ? "revenueTrend" : "spendTrend";
                  const trend = data[trendKey] || [];
                  const prev = trend.slice(-(months * 2), -months);
                  const prevSum = prev.reduce(
                    (s, t) => s + (t.revenue ?? t.spend),
                    0
                  );
                  const prevOrders = prev.reduce((s, t) => s + t.orders, 0);
                  return (
                    <>
                      <MetricCard
                        title={role === "seller" ? "Revenue" : "Spend"}
                        value={`$${prevSum.toLocaleString()}`}
                        change={"—"}
                        changeType="down"
                        icon={DollarSign}
                      />
                      <MetricCard
                        title="Orders"
                        value={prevOrders}
                        change={"—"}
                        changeType="down"
                        icon={ShoppingCart}
                      />
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <TopList
            title={role === "seller" ? "Top Products" : "Top Suppliers"}
            data={data.topProducts || data.topSuppliers}
            valueKey={role === "seller" ? "revenue" : "spend"}
            labelKey="name"
            subtitle={role === "seller" ? "By revenue" : "By spend"}
            icon={role === "seller" ? Package : Building2}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                {role === "seller" ? "Quote Performance" : "RFQ Performance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {role === "seller" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Quotes</span>
                      <span className="font-semibold">
                        {data.quoteMetrics.total}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending</span>
                      <span className="font-semibold text-yellow-600">
                        {data.quoteMetrics.pending}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accepted</span>
                      <span className="font-semibold text-green-600">
                        {data.quoteMetrics.accepted}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rejected</span>
                      <span className="font-semibold text-red-600">
                        {data.quoteMetrics.rejected}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-semibold text-blue-600">
                        {data.quoteMetrics.conversionRate}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total RFQs</span>
                      <span className="font-semibold">
                        {data.rfqMetrics.total}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active</span>
                      <span className="font-semibold text-blue-600">
                        {data.rfqMetrics.active}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Closed</span>
                      <span className="font-semibold text-green-600">
                        {data.rfqMetrics.closed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expired</span>
                      <span className="font-semibold text-red-600">
                        {data.rfqMetrics.expired}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Quotes</span>
                      <span className="font-semibold text-blue-600">
                        {data.rfqMetrics.avgQuotes}
                      </span>
                    </div>
                    {data.rfqMetrics.totalSavings && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Savings</span>
                        <span className="font-semibold text-green-600">
                          ${data.rfqMetrics.totalSavings.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • {role === "seller" ? "Revenue" : "Spend"} increased by{" "}
                  {role === "seller" ? "31.2%" : "23.4%"} compared to last
                  period
                </li>
                <li>
                  • Order volume growth of{" "}
                  {role === "seller" ? "22.8%" : "18.2%"}
                </li>
                <li>• Improved response times across all channels</li>
                <li>• Higher customer satisfaction ratings</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-orange-600">
                Areas for Improvement
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • {role === "seller" ? "Quote" : "RFQ"} response time could be
                  optimized
                </li>
                <li>
                  • Consider expanding supplier network for better pricing
                </li>
                <li>• Implement automated follow-up systems</li>
                <li>• Focus on high-value customer segments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
