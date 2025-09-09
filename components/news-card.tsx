import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, TrendingUp, ArrowRight } from 'lucide-react'

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  trending: boolean
  tags: string[]
}

interface NewsCardProps {
  article: NewsArticle
  featured?: boolean
}

const categoryColors = {
  "Market News": "bg-blue-500",
  "Innovation": "bg-purple-500",
  "Sustainability": "bg-green-500",
  "Technology": "bg-orange-500",
  "Events": "bg-teal-500"
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card className={`group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden ${featured ? 'h-full' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={`${categoryColors[article.category as keyof typeof categoryColors]} text-white`}>
            {article.category}
          </Badge>
          {article.trending && (
            <Badge className="bg-red-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <Link href={`/news/${article.id}`}>
          <h3 className={`font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {article.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
          <div className="flex items-center text-blue-600 font-medium">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <Link href={`/news/${article.id}`}>
          <Button className="w-full bg-gradient-to-r from-[#0040304A] to-[#9782DC] hover:from-[#003028] hover:to-[#8A75D1] text-white group">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
