"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"
import { Progress } from "../../../components/ui/progress"
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Wallet, Target, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

const earningsData = {
  totalRevenue: 12345.67,
  monthlyRevenue: 2456.78,
  pendingPayouts: 1234.56,
  availableBalance: 987.65,
  monthlyGrowth: 15.3,
  yearlyGrowth: 42.8,
}

const monthlyEarnings = [
  { month: "Jan", revenue: 1890.45, orders: 23 },
  { month: "Feb", revenue: 2134.67, orders: 28 },
  { month: "Mar", revenue: 1756.89, orders: 19 },
  { month: "Apr", revenue: 2456.78, orders: 31 },
  { month: "May", revenue: 2890.12, orders: 35 },
  { month: "Jun", revenue: 2234.56, orders: 27 },
]

const topProducts = [
  { name: "Premium Wireless Earbuds", revenue: 1234.56, units: 62, percentage: 35, color: "#8b5cf6" },
  { name: "Smart Security Camera", revenue: 987.65, units: 45, percentage: 28, color: "#06b6d4" },
  { name: "Professional Coffee Grinder", revenue: 756.89, units: 28, percentage: 22, color: "#10b981" },
  { name: "Organic Cotton Hoodie", revenue: 543.21, units: 34, percentage: 15, color: "#f59e0b" },
]

const recentPayouts = [
  { date: "2024-01-20", amount: "$1,234.56", status: "completed", method: "Bank Transfer" },
  { date: "2024-01-13", amount: "$987.65", status: "completed", method: "Bank Transfer" },
  { date: "2024-01-06", amount: "$1,456.78", status: "completed", method: "Bank Transfer" },
  { date: "2024-01-01", amount: "$2,123.45", status: "pending", method: "Bank Transfer" },
]

export default function EarningsPage() {
  const [payoutSchedule, setPayoutSchedule] = useState("weekly")
  const [minPayout, setMinPayout] = useState(50)
  const [payoutMethod, setPayoutMethod] = useState("bank")
  const [bankDetails, setBankDetails] = useState({ accountName: "", accountNumber: "", bankName: "", ifsc: "" })
  const [autoPayout, setAutoPayout] = useState(false)
  const [saving, setSaving] = useState(false)

  const nextPayoutDate = (() => {
    const now = new Date()
    const copy = new Date(now)
    if (payoutSchedule === "daily") copy.setDate(now.getDate() + 1)
    if (payoutSchedule === "weekly") copy.setDate(now.getDate() + 7)
    if (payoutSchedule === "monthly") copy.setMonth(now.getMonth() + 1)
    return copy.toLocaleDateString()
  })()

  const handleSaveSettings = async () => {
    setSaving(true)
    // simulate save
    await new Promise((r) => setTimeout(r, 700))
    console.log("Saved payout settings", { payoutSchedule, minPayout, payoutMethod, bankDetails, autoPayout })
    setSaving(false)
  }

  const canRequestPayout = Number(earningsData.availableBalance) >= Number(minPayout)

  return (
    <div className="space-y-6">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Earnings Dashboard</h1>
          <p className="text-muted-foreground">Track your revenue and financial performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-48">
      <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0 }}>
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg`}>
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold">${earningsData.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />+{earningsData.yearlyGrowth}% from last year
                  </p>
                </div>
                <div className="w-32 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyEarnings}>
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#ffffff" 
                        strokeWidth={2}
                        dot={false}
                        strokeOpacity={0.8}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.05 }}>
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg`}>
                <Calendar className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earningsData.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />+{earningsData.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.1 }}>
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg`}>
                <Wallet className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earningsData.availableBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Ready for payout</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", ease: "easeOut", duration: 0.45, delay: 0.15 }}>
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg`}>
                <CreditCard className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earningsData.pendingPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Processing</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Revenue and order trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs fill-muted-foreground"
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-3 border rounded-lg shadow-md">
                            <p className="font-semibold">{`${label} 2024`}</p>
                            <p className="text-sm text-cyan-600">
                              {`Revenue: $${payload[0]?.value?.toLocaleString()}`}
                            </p>
                            <p className="text-sm text-orange-600">
                              {`Orders: ${payload[1]?.value}`}
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Revenue"
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="url(#ordersGradient)"
                    radius={[4, 4, 0, 0]}
                    yAxisId="right"
                    name="Orders"
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Top Performing Products
            </CardTitle>
            <CardDescription>Your best-selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="percentage"
                    label={({ name, percentage }) => `${percentage}%`}
                    labelLine={false}
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background p-3 border rounded-lg shadow-md">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Revenue: ${data.revenue.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Units: {data.units}
                            </p>
                            <p className="text-sm font-medium">
                              {data.percentage}% of total revenue
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="truncate">{product.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payouts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Payouts</CardTitle>
                <CardDescription>Your payment history and pending transfers</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All Payouts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayouts.map((payout, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-gray-50/50 border rounded-lg shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      payout.status === "completed" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-orange-100 text-orange-600"
                    }`}>
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{payout.method}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payout.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={payout.status === "completed" ? "default" : "secondary"}
                      className={payout.status === "completed" ? "bg-green-100 text-green-800" : ""}
                    >
                      {payout.status}
                    </Badge>
                    <span className="font-bold text-lg group-hover:text-primary transition-colors">
                      {payout.amount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earnings Summary</CardTitle>
            <CardDescription>Quick overview of your finances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Earned</span>
                <span className="font-bold">${earningsData.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <span className="font-semibold text-green-600">
                  ${earningsData.monthlyRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available</span>
                <span className="font-semibold text-blue-600">
                  ${earningsData.availableBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending</span>
                <span className="font-semibold text-orange-600">
                  ${earningsData.pendingPayouts.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-1">
                  +{earningsData.monthlyGrowth}%
                </p>
                <p className="text-xs text-muted-foreground">Growth this month</p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600">
              Request Payout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Configure how and when you receive funds</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: preferences */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Payout Schedule</label>
                <div className="flex items-center gap-3">
                  <Select value={payoutSchedule} onValueChange={setPayoutSchedule}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={payoutSchedule === 'daily' ? 'Daily' : payoutSchedule === 'weekly' ? 'Weekly' : 'Monthly'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="ml-2 text-sm text-muted-foreground">Next: <span className="font-semibold">{nextPayoutDate}</span></div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Minimum Payout Amount</label>
                <div className="flex items-center gap-3">
                  <Select value={String(minPayout)} onValueChange={(v) => setMinPayout(Number(v))}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder={`$${minPayout}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">$25</SelectItem>
                      <SelectItem value="50">$50</SelectItem>
                      <SelectItem value="100">$100</SelectItem>
                      <SelectItem value="250">$250</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="number" value={minPayout} onChange={(e) => setMinPayout(Number(e.target.value))} className="w-28" />
                  <div className="text-sm text-muted-foreground">Available: <span className="font-semibold">${earningsData.availableBalance.toLocaleString()}</span></div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Payout Method</label>
                <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={payoutMethod === 'bank' ? 'Bank Transfer' : 'PayPal'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-medium">Auto Payout</p>
                  <p className="text-xs text-muted-foreground">Automatically send payouts when balance reaches minimum</p>
                </div>
                <div
                  role="button"
                  onClick={() => setAutoPayout(!autoPayout)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${autoPayout ? 'bg-emerald-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${autoPayout ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </div>
              </div>
            </div>

            {/* Right: payment details & preview */}
            <div className="space-y-4">
              <div className="bg-white border rounded-md p-4 shadow-sm">
                <label className="text-sm font-medium block mb-2">Payment Details</label>
                {payoutMethod === 'bank' ? (
                  <div className="space-y-2">
                    <Input placeholder="Account Name" value={bankDetails.accountName} onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Account Number" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} />
                      <Input placeholder="IFSC / Routing" value={bankDetails.ifsc} onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value})} />
                    </div>
                    <Input placeholder="Bank Name" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} />
                  </div>
                ) : (
                  <Input placeholder="PayPal Email" value={bankDetails.accountName} onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} />
                )}
              </div>

              <div className="p-4 rounded-md bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Next payout preview</p>
                    <p className="text-lg font-semibold mt-1">{nextPayoutDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Amount</p>
                    <p className="text-xl font-bold">{canRequestPayout ? `$${earningsData.availableBalance.toLocaleString()}` : `Min $${minPayout}`}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</Button>
                <Button className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white" onClick={() => { if (canRequestPayout) console.log('Requesting payout'); else alert('Available balance below minimum payout amount') }}>
                  Request Payout
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
