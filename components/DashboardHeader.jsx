"use client";

import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import useAuthStore from "../store/authStore";
import { SidebarContent } from "./DashboardSidebar";
import { UserProfileDropdown } from "./UserProfileDropdown";

export default function DashboardHeader({ collapsed = false }) {
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between h-full px-6">
  {/* Left section: Mobile menu + Search + Nav Links */}
  <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-sidebar">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          {/* Desktop nav links (kept subtle and responsive) */}
          <div className="hidden md:flex items-center gap-4 ml-2">
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-sky-600">
              Dashboard
            </Link>
            <Link href="/help" className="text-sm font-medium text-gray-700 hover:text-sky-600">
              Help
            </Link>
          </div>
        </div>

        {/* Right section: Actions + Profile */}
        <div className="flex items-center gap-3">
          {/* Desktop Search Icon (visible on md and up) */}
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User Profile */}
          <UserProfileDropdown />
        </div>
      </div>
    </div>
  );
}
