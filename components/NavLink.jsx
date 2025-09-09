"use client";

import Link from "next/link";
import { cn } from "../lib/utils";

export default function NavLink({
  href,
  icon: Icon,
  children,
  isActive,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg transform scale-[1.02]"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:transform hover:scale-[1.01]"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-colors",
          isActive ? "text-primary-foreground" : "text-sidebar-foreground"
        )}
      />
      {children}
    </Link>
  );
}
