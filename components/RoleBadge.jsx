import { User, Store } from "lucide-react";
import { Badge } from "./ui/badge";

export default function RoleBadge({ role }) {
  const roleConfig = {
    buyer: {
      label: "Buyer",
      icon: User,
      variant: "secondary",
    },
    seller: {
      label: "Seller",
      icon: Store,
      variant: "default",
    },
  };

  const config = roleConfig[role] || roleConfig.buyer;
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className="flex items-center gap-1 bg-[#00BFFF] text-white"
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
