"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Shield,
  Star,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";

export default function ProfilePage() {
  const { user, role } = useAuthStore();

  const profileStats = {
    buyer: [
      { label: "Orders Placed", value: "24", icon: "📦" },
      { label: "Reviews Given", value: "18", icon: "⭐" },
      { label: "Wishlist Items", value: "12", icon: "❤️" },
      { label: "Member Since", value: "Jan 2023", icon: "📅" },
    ],
    seller: [
      { label: "Products Listed", value: "156", icon: "📦" },
      { label: "Orders Fulfilled", value: "89", icon: "✅" },
      { label: "Average Rating", value: "4.8", icon: "⭐" },
      { label: "Store Since", value: "Mar 2022", icon: "🏪" },
    ],
  };

  const stats = profileStats[role] || profileStats.buyer;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Badge
                className="bg-[#00BFFF] text-white"
                variant={role === "seller" ? "default" : "secondary"}
              >
                {role === "seller" ? "Seller" : "Buyer"}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your account details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue={role === "seller" ? "Seller" : "Buyer"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder={
                  role === "seller"
                    ? "Tell customers about your store..."
                    : "Tell us about yourself..."
                }
                defaultValue={
                  role === "seller"
                    ? "Premium electronics and gadgets store with 5+ years of experience."
                    : "Tech enthusiast and avid online shopper."
                }
                rows={3}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Address Information</h3>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    defaultValue="123 Main Street"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="10001" />
                </div>
              </div>
            </div>

            {role === "seller" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue="TechStore Pro" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      placeholder="Describe your store and what you sell..."
                      defaultValue="We specialize in premium electronics, gadgets, and tech accessories. Quality products with excellent customer service."
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Input
                        id="businessType"
                        defaultValue="Electronics Retailer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input id="taxId" defaultValue="XX-XXXXXXX" />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest account activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Profile updated", time: "2 hours ago", icon: Edit },
              {
                action:
                  role === "seller" ? "New product listed" : "Order placed",
                time: "1 day ago",
                icon: role === "seller" ? "📦" : "🛒",
              },
              { action: "Password changed", time: "3 days ago", icon: Shield },
              {
                action:
                  role === "seller"
                    ? "Store rating received"
                    : "Review submitted",
                time: "1 week ago",
                icon: Star,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {typeof activity.icon === "string" ? (
                    <span className="text-lg">{activity.icon}</span>
                  ) : (
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="font-medium">{activity.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
