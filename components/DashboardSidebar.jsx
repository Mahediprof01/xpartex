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
  PanelLeftClose,
  PanelLeftOpen,
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

export function SidebarContent({ onItemClick, collapsed = false, onToggleCollapse }) {
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
      <div className={`mb-4 ${collapsed ? 'px-2' : ''}`}>
        <button
          onClick={() => !collapsed && toggleSection(sectionKey)}
          className="group flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-400 hover:text-white hover:bg-sidebar-accent rounded-lg transition-all duration-300"
          disabled={collapsed}
        >
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 transition-colors ${isExpanded ? 'text-sky-700' : 'text-sky-500 group-hover:text-sky-600'}`} />
            {!collapsed && <span>{title}</span>}
          </div>
          {!collapsed && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
            )
          )}
        </button>
        {(isExpanded || collapsed) && (
          <ul className={`mt-2 space-y-1 ${collapsed ? '' : 'ml-4'}`}>
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  icon={item.icon}
                  isActive={pathname === item.href}
                  onClick={onItemClick}
                  collapsed={collapsed}
                  forceTextWhite={true}
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
    <div className="flex flex-col h-full bg-[#323C55] text-gray-400">
      {/* Branding + collapse button (logo centered) */}
      <div className="relative p-6 border-b border-dotted border-sidebar-border flex-shrink-0">
  <div className="flex items-center justify-start gap-3 min-w-0 pl-4">
          {collapsed ? null : (
            <img 
              src="/logo.png" 
              alt="Xpartex" 
              className="w-32 h-8 object-contain" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          )}
          {!collapsed && (
            <span 
              className="text-xl font-bold text-sky-700 hidden" 
              style={{display: 'none'}}
            >
              Xpartex
            </span>
          )}
        </div>
        {onToggleCollapse && (
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white rounded-md hover:bg-sidebar-accent transition-all duration-200 absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5 text-sky-600" />
            ) : (
              <PanelLeftClose className="h-5 w-5 text-sky-600" />
            )}
          </button>
        )}
      </div>

      {/* Navigation - scrollable */}
      <nav className="flex-1 p-4 overflow-y-auto">
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
            <div className="border-t border-sidebar-border pt-4 mt-6">
              <ul className="space-y-2">
                {menuItems.common.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      icon={item.icon}
                      isActive={pathname === item.href}
                      onClick={onItemClick}
                      collapsed={collapsed}
                      forceTextWhite={true}
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

      {/* Footer spacer */}
      <div className="p-4 border-t border-dotted border-sidebar-border flex-shrink-0">
        {!collapsed && (
          <div className="text-xs text-gray-400 text-center">
            © 2024 Xpartex
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardSidebar({ collapsed = false, onToggleCollapse }) {
  return <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />;
}
