"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  DollarSign, Package, Store, ShoppingCart, TrendingUp, Users, Eye, ArrowUpRight, 
  UserCheck, ShoppingBag, Star, Clock, BarChart3, PieChart, Activity,
  Target, CheckCircle, AlertCircle, Truck
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie
} from "recharts"

// Sample data for charts
const monthlyData = [
  { month: "Jan", revenue: 15000, orders: 120, customers: 89, vendors: 15 },
  { month: "Feb", revenue: 18000, orders: 145, customers: 102, vendors: 18 },
  { month: "Mar", revenue: 22000, orders: 189, customers: 125, vendors: 22 },
  { month: "Apr", revenue: 25000, orders: 210, customers: 148, vendors: 25 },
  { month: "May", revenue: 28000, orders: 235, customers: 167, vendors: 28 },
  { month: "Jun", revenue: 32000, orders: 280, customers: 189, vendors: 32 },
]

const categoryData = [
  { name: "Yarn & Fibers", value: 32, color: "#8b5cf6" },
  { name: "Knitwear", value: 24, color: "#06b6d4" },
  { name: "Woven Fabric", value: 22, color: "#10b981" },
  { name: "RMG Garments", value: 14, color: "#f59e0b" },
  { name: "Accessories", value: 8, color: "#ef4444" },
]

const recentTransactions = [
  { id: "TXN001", user: "ABC Exports", type: "Order", amount: 12999.99, status: "completed", time: "2 min ago" },
  { id: "TXN002", user: "LoomWorks Ltd.", type: "Order", amount: 5899.00, status: "processing", time: "5 min ago" },
  { id: "TXN003", user: "Dhaka Knits", type: "Order", amount: 7999.50, status: "completed", time: "8 min ago" },
  { id: "TXN004", user: "Riverline Fabrics", type: "Sample Request", amount: 450.00, status: "pending", time: "12 min ago" },
  { id: "TXN005", user: "Global RMG", type: "Order", amount: 19999.99, status: "completed", time: "15 min ago" },
]

const topPerformers = [
  { name: "Ocean Textiles", category: "Woven Fabric", sales: 452300, rating: 4.8, orders: 324 },
  { name: "Dhaka Knits", category: "Knitwear", sales: 389500, rating: 4.6, orders: 298 },
  { name: "Riverline Fabrics", category: "Yarn & Fibers", sales: 321000, rating: 4.7, orders: 245 },
  { name: "Global RMG", category: "RMG Garments", sales: 287500, rating: 4.5, orders: 189 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">Key metrics for textile, yarn, knitwear and RMG product performance</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Platform Active
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sellers">Seller Management</TabsTrigger>
          <TabsTrigger value="buyers">Buyer Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Revenue",
                value: "$180,231",
                change: "+12.5%",
                icon: DollarSign,
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Total Orders",
                value: "1,579",
                change: "+8.2%",
                icon: ShoppingCart,
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Active Buyers",
                value: "12,456",
                change: "+23.1%",
                icon: Users,
                gradient: "from-orange-400 to-red-500",
              },
              {
                title: "Factory Utilization",
                value: "82.4%",
                change: "+3.2%",
                icon: TrendingUp,
                gradient: "from-cyan-400 to-blue-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Revenue & Growth Trends
                </CardTitle>
                <CardDescription>Monthly performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  Product Category Mix
                </CardTitle>
                <CardDescription>Sales distribution across textile & RMG categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Latest platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.status === 'completed' ? 'bg-green-500' :
                        transaction.status === 'processing' ? 'bg-yellow-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{transaction.user}</p>
                        <p className="text-xs text-muted-foreground">{transaction.type} • {transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(transaction.amount)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sellers" className="space-y-6">
          {/* Seller Management */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Sellers",
                value: "1,234",
                change: "+15.2%",
                icon: Store,
                gradient: "from-blue-400 to-purple-500",
              },
              {
                title: "Pending Approvals",
                value: "28",
                change: "-5.1%",
                icon: Clock,
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                title: "Seller Revenue",
                value: "$145,670",
                change: "+18.7%",
                icon: DollarSign,
                gradient: "from-green-400 to-blue-500",
              },
              {
                title: "Average Rating",
                value: "4.6/5",
                change: "+0.2",
                icon: Star,
                gradient: "from-pink-400 to-red-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Performers */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Top Performing Sellers
                </CardTitle>
                <CardDescription>Sellers with highest sales this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((seller, index) => (
                    <div
                      key={seller.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{seller.name}</p>
                          <p className="text-sm text-muted-foreground">{seller.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${seller.sales.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">{seller.rating}</span>
                          <span className="text-sm text-muted-foreground">({seller.orders} orders)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seller Management Tools */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Seller Management
                </CardTitle>
                <CardDescription>Quick actions and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Approval Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Sellers</span>
                    <span className="font-medium">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance Score</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">2.3 hrs</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buyers" className="space-y-6">
          {/* Buyer Management */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Buyers",
                value: "8,945",
                change: "+22.3%",
                icon: UserCheck,
                gradient: "from-cyan-400 to-blue-500",
              },
              {
                title: "Active Buyers",
                value: "6,782",
                change: "+18.9%",
                icon: Users,
                gradient: "from-green-400 to-teal-500",
              },
              {
                title: "Average Order",
                value: "$127.50",
                change: "+8.4%",
                icon: ShoppingBag,
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Retention Rate",
                value: "78.5%",
                change: "+5.2%",
                icon: Target,
                gradient: "from-orange-400 to-red-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Customer Acquisition Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Buyer Acquisition
                </CardTitle>
                <CardDescription>New vs returning buyers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="customers"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      name="New Customers"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                      name="Total Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Customer Satisfaction
                </CardTitle>
                <CardDescription>Support metrics and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Satisfaction</span>
                    <span className="font-medium">4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Support Response</span>
                    <span className="font-medium">1.2 hrs</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Issue Resolution</span>
                    <span className="font-medium">92.3%</span>
                  </div>
                  <Progress value={92.3} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Repeat Purchase</span>
                    <span className="font-medium">68.9%</span>
                  </div>
                  <Progress value={68.9} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-500" />
                Order Management Overview
              </CardTitle>
              <CardDescription>Current order status and fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Pending Orders", value: "127", status: "pending", color: "orange" },
                  { label: "Processing", value: "89", status: "processing", color: "blue" },
                  { label: "Shipped", value: "234", status: "shipped", color: "purple" },
                  { label: "Delivered", value: "1,129", status: "delivered", color: "green" },
                ].map((order) => (
                  <div
                    key={order.label}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${order.color}-500`} />
                      <span className="text-sm font-medium">{order.label}</span>
                    </div>
                    <span className="text-lg font-bold">{order.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
