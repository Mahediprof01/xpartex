"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Heart,
  Star,
  Eye,
  FileText,
  Target,
  Award,
  Building2,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import useAuthStore from "../../store/authStore";

const buyerStats = [
  {
    title: "Total Orders",
    value: "24",
    description: "+2 from last month",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Total Spent",
    value: "$1,234.56",
    description: "+$123 from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active RFQs",
    value: "8",
    description: "3 awaiting quotes",
    icon: FileText,
    trend: "neutral",
  },
  {
    title: "Sample Requests",
    value: "12",
    description: "5 approved, 3 pending",
    icon: Award,
    trend: "neutral",
  },
  {
    title: "Suppliers",
    value: "15",
    description: "3 new this month",
    icon: Building2,
    trend: "up",
  },
  {
    title: "Unread Messages",
    value: "7",
    description: "From suppliers",
    icon: MessageSquare,
    trend: "neutral",
  },
];

const sellerStats = [
  {
    title: "Total Products",
    value: "156",
    description: "+12 this month",
    icon: Package,
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$12,345.67",
    description: "+15% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Orders Received",
    value: "89",
    description: "+8 from yesterday",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Quote Requests",
    value: "23",
    description: "12 pending response",
    icon: Target,
    trend: "up",
  },
  {
    title: "Sample Requests",
    value: "18",
    description: "8 approved, 5 pending",
    icon: Award,
    trend: "neutral",
  },
  {
    title: "Profile Views",
    value: "2,341",
    description: "+234 this week",
    icon: Eye,
    trend: "up",
  },
];

const procurementStats = [
  {
    title: "Purchase Orders",
    value: "45",
    description: "+5 this month",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Total Spend",
    value: "$45,678.90",
    description: "+12% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active RFQs",
    value: "12",
    description: "8 awaiting quotes",
    icon: FileText,
    trend: "neutral",
  },
  {
    title: "Suppliers",
    value: "28",
    description: "5 new this quarter",
    icon: Building2,
    trend: "up",
  },
  {
    title: "Contracts",
    value: "15",
    description: "3 expiring soon",
    icon: FileText,
    trend: "neutral",
  },
  {
    title: "Savings",
    value: "$8,234",
    description: "vs. last year",
    icon: TrendingUp,
    trend: "up",
  },
];

const recentActivity = {
  buyer: [
    {
      action: "RFQ submitted",
      item: "Denim Jackets (500 units)",
      time: "2 hours ago",
      status: "pending",
    },
    {
      action: "Sample approved",
      item: "Cotton Hoodies",
      time: "1 day ago",
      status: "completed",
    },
    {
      action: "Order placed",
      item: "Wireless Headphones",
      time: "3 days ago",
      status: "processing",
    },
    {
      action: "Quote received",
      item: "Linen Dresses",
      time: "5 days ago",
      status: "new",
    },
  ],
  seller: [
    {
      action: "New quote request",
      item: "Denim Jackets (500 units)",
      time: "1 hour ago",
      status: "new",
    },
    {
      action: "Sample request approved",
      item: "Cotton Hoodies",
      time: "4 hours ago",
      status: "completed",
    },
    {
      action: "Payment received",
      item: "Order #5678",
      time: "1 day ago",
      status: "completed",
    },
    {
      action: "Product updated",
      item: "Wireless Mouse",
      time: "2 days ago",
      status: "updated",
    },
  ],
  procurement_officer: [
    {
      action: "RFQ published",
      item: "Office Furniture (100 sets)",
      time: "2 hours ago",
      status: "active",
    },
    {
      action: "Contract signed",
      item: "IT Equipment Supply",
      time: "1 day ago",
      status: "completed",
    },
    {
      action: "Supplier approved",
      item: "GreenTech Solutions",
      time: "3 days ago",
      status: "completed",
    },
    {
      action: "Purchase order sent",
      item: "Office Supplies",
      time: "5 days ago",
      status: "processing",
    },
  ],
};

const getStatsByRole = (role) => {
  switch (role) {
    case "buyer":
      return buyerStats;
    case "seller":
      return sellerStats;
    case "procurement_officer":
      return procurementStats;
    default:
      return buyerStats;
  }
};

const getQuickActionsByRole = (role) => {
  switch (role) {
    case "buyer":
      return [
        {
          icon: FileText,
          title: "Submit RFQ",
          description: "Request quotes from suppliers",
          href: "/dashboard/rfqs/new",
        },
        {
          icon: Award,
          title: "Request Samples",
          description: "Get product samples",
          href: "/dashboard/samples/new",
        },
        {
          icon: Building2,
          title: "Find Suppliers",
          description: "Discover new suppliers",
          href: "/dashboard/suppliers",
        },
      ];
    case "seller":
      return [
        {
          icon: Package,
          title: "Add Product",
          description: "List a new item",
          href: "/dashboard/products/new",
        },
        {
          icon: Target,
          title: "View Quote Requests",
          description: "Respond to RFQs",
          href: "/dashboard/quotes",
        },
        {
          icon: Award,
          title: "Manage Samples",
          description: "Handle sample requests",
          href: "/dashboard/samples",
        },
      ];
    case "procurement_officer":
      return [
        {
          icon: FileText,
          title: "Create RFQ",
          description: "Publish new request",
          href: "/dashboard/rfqs/new",
        },
        {
          icon: Building2,
          title: "Manage Suppliers",
          description: "Review suppliers",
          href: "/dashboard/suppliers",
        },
        {
          icon: FileText,
          title: "View Contracts",
          description: "Manage agreements",
          href: "/dashboard/contracts",
        },
      ];
    default:
      return [];
  }
};

export default function DashboardPage() {
  const { user, role } = useAuthStore();
  const stats = getStatsByRole(role);
  const activities = recentActivity[role] || recentActivity.buyer;
  const quickActions = getQuickActionsByRole(role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          {role === "seller"
            ? "Here's what's happening with your store today."
            : role === "procurement_officer"
            ? "Here's your procurement overview."
            : "Here's your B2B shopping activity overview."}
        </p>
      </div>

  {/* Role Switcher removed from overview (header contains it) */}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest{" "}
            {role === "seller"
              ? "store"
              : role === "procurement_officer"
              ? "procurement"
              : "B2B"}{" "}
            activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.item}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className="bg-accent"
                    variant={
                      activity.status === "new"
                        ? "default"
                        : activity.status === "processing"
                        ? "secondary"
                        : activity.status === "completed"
                        ? "outline"
                        : activity.status === "pending"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {role === "seller"
              ? "Manage your store efficiently"
              : role === "procurement_officer"
              ? "Streamline your procurement process"
              : "Continue your B2B shopping journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <Icon className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* B2B Insights */}
      <Card>
        <CardHeader>
          <CardTitle>B2B Insights</CardTitle>
          <CardDescription>
            Key metrics and trends for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground">
                Quote Response Rate
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12.5 days</div>
              <div className="text-sm text-muted-foreground">
                Avg. Lead Time
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-muted-foreground">
                Sample Approval Rate
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$2.3K</div>
              <div className="text-sm text-muted-foreground">
                Avg. Order Value
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
