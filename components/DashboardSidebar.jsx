"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Package,
  DollarSign,
  ListOrdered,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  Building2,
  Target,
  ChevronDown,
  ChevronRight,
  Store,
  Users,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import NavLink from "./NavLink";

const menuItems = {
  buyerManagement: [
    { href: "/dashboard/rfqs", label: "My RFQs", icon: FileText },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/samples", label: "Sample Requests", icon: Award },
    { href: "/dashboard/suppliers", label: "Suppliers", icon: Building2 },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/messaging", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/analytics", label: "Buyer Analytics", icon: BarChart3 },
  ],
  sellerManagement: [
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/quotes", label: "Quote Requests", icon: Target },
    { href: "/dashboard/seller-orders", label: "Seller Orders", icon: ListOrdered },
    { href: "/dashboard/samples", label: "Sample Management", icon: Award },
    { href: "/dashboard/messaging", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/analytics", label: "Seller Analytics", icon: BarChart3 },
  ],
};

export function SidebarContent({ onItemClick }) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({
    buyerManagement: true,
    sellerManagement: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    logout();
    if (onItemClick) onItemClick();
  };

  const CollapsibleSection = ({ title, items, sectionKey, icon: Icon }) => {
    if (!items || items.length === 0) return null;

    const isExpanded = expandedSections[sectionKey];

    return (
      <div className="mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="group flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 transition-colors ${isExpanded ? 'text-sky-700' : 'text-sky-500 group-hover:text-sky-600'}`} />
            <span>{title}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <ul className="mt-2 space-y-1 ml-4">
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
        )}
      </div>
    );
  };

  return (
    // Sidebar wrapper: fill parent height (controlled by layout) and allow inner nav to scroll.
    <div className="flex flex-col h-full min-h-0">
      {/* Sidebar navigation only - branding and user moved to header */}
  <nav className="flex-1 p-4 overflow-y-auto min-h-0">
        <div className="space-y-4">
          <CollapsibleSection
            title="Buyer Management"
            items={menuItems.buyerManagement}
            sectionKey="buyerManagement"
            icon={Users}
          />
          
          <CollapsibleSection
            title="Seller Management"
            items={menuItems.sellerManagement}
            sectionKey="sellerManagement"
            icon={Store}
          />

          {/* Common items */}
          {menuItems.common && menuItems.common.length > 0 && (
            <div className="border-t border-sidebar-border pt-4">
              <ul className="space-y-2">
                {menuItems.common.map((item) => (
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
            </div>
          )}
        </div>
      </nav>

  {/* Footer area kept empty since profile/logout moved to header dropdown */}
  <div className="p-4 border-t border-sidebar-border flex-shrink-0" />
    </div>
  );
}

export default function DashboardSidebar() {
  return <SidebarContent />;
}
