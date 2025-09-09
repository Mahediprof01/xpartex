"use client";

import { useState } from "react";
import { Bell, Search, Menu, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useTheme } from "next-themes";
import useAuthStore from "../store/authStore";
import { SidebarContent } from "./DashboardSidebar";
import { RoleSwitcher } from "./RoleSwitcher";

export default function DashboardHeader() {
  const { user, role } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-background via-card to-accent dark:from-background dark:via-card dark:to-accent border-b border-border px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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

          <div className="hidden sm:flex items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white border-l-4 border-[#00BFFF] rounded-md pl-3">
              {role === "seller" ? "Seller Dashboard" : "Buyer Dashboard"}
            </h1>
            {/* Role switcher placed in dashboard header near the title */}
            <div>
              <RoleSwitcher />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
