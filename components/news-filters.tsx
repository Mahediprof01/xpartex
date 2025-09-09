import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface NewsFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onClose?: () => void
}

const categories = [
  { name: 'All Categories', value: '', count: 25 },
  { name: 'Market News', value: 'Market News', count: 8 },
  { name: 'Innovation', value: 'Innovation', count: 6 },
  { name: 'Sustainability', value: 'Sustainability', count: 5 },
  { name: 'Technology', value: 'Technology', count: 4 },
  { name: 'Events', value: 'Events', count: 2 }
]

export function NewsFilters({ selectedCategory, onCategoryChange, onClose }: NewsFiltersProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Categories</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              selectedCategory === category.value
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'hover:bg-muted'
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
