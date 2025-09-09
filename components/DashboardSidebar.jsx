"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Home,
  ShoppingCart,
  Heart,
  User,
  Settings,
  Package,
  DollarSign,
  ListOrdered,
  LogOut,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  Building2,
  Target,

} from "lucide-react";
import useAuthStore from "../store/authStore";
import RoleBadge from "./RoleBadge";
import NavLink from "./NavLink";
import Image from "next/image";

const menuItems = {
  buyer: [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/rfqs", label: "My RFQs", icon: FileText },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/samples", label: "Sample Requests", icon: Award },
    { href: "/dashboard/suppliers", label: "Suppliers", icon: Building2 },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/messaging", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
  seller: [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/quotes", label: "Quote Requests", icon: Target },
    { href: "/dashboard/seller-orders", label: "Orders", icon: ListOrdered },
    { href: "/dashboard/samples", label: "Sample Management", icon: Award },
    { href: "/dashboard/messaging", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ],
};

export function SidebarContent({ onItemClick }) {
  const { user, role, logout } = useAuthStore();
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.buyer;

  const handleLogout = () => {
    logout();
    if (onItemClick) onItemClick();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-center gap-3">
          <div>
            <Link href="/" passHref>
              <Image
                src="/logo.png"
                alt="Xpartex"
                width={150}
                height={150}
                className="cursor-pointer"
              />
            </Link>
            <p className="text-xs text-sidebar-foreground/60">
              Multi-vendor Platform
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-sidebar-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <RoleBadge role={role} />
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href}
                onClick={onItemClick}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of your account and redirected to the
                login page. Any unsaved changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive hover:bg-destructive/90 cursor-pointer"
              >
                Yes, Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  return <SidebarContent />;
}
