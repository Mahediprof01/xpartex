"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical, CheckCircle, GitPullRequest } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Bid = {
  name: string
  amount: number
  time: string
  description?: string
  material?: string
  size?: string
  color?: string
  quality?: string
  packaging?: string
  deliveryTime?: string
  attachment?: string
}

interface ColumnsProps {
  onViewDetails: (bid: Bid) => void
}

export const createColumns = ({ onViewDetails }: ColumnsProps): ColumnDef<Bid>[] => [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "amount",
    header: "Bid Amount",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const bid = row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(bid)}>
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {bid.name === 'Interloop Limited' && <CheckCircle className="h-4 w-4 mr-2" />}
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem>
                {bid.name === 'Interloop Limited' && <GitPullRequest className="h-4 w-4 mr-2" />}
                Counter Bid
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
