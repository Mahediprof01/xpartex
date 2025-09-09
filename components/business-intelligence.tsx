"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, BarChart3, Globe, Shield, Zap, Users, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const intelligenceTools = [
  {
    id: 1,
    title: "Market Intelligence",
    description: "Real-time market trends and pricing analytics for informed sourcing decisions",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    features: ["Price Tracking", "Trend Analysis", "Market Reports"],
    badge: "Popular",
    badgeColor: "bg-green-500"
  },
  {
    id: 2,
    title: "Supplier Analytics",
    description: "Comprehensive supplier performance metrics and risk assessment tools",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    features: ["Performance Metrics", "Risk Assessment", "Quality Scores"],
    badge: "New",
    badgeColor: "bg-blue-500"
  },
  {
    id: 3,
    title: "Global Trade Insights",
    description: "International trade data and regulatory compliance information",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&crop=center",
    features: ["Trade Data", "Compliance", "Regulations"],
    badge: "Premium",
    badgeColor: "bg-purple-500"
  },
  {
    id: 4,
    title: "Quality Assurance",
    description: "AI-powered quality control and certification management system",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center",
    features: ["AI Quality Check", "Certifications", "Audit Reports"],
    badge: "AI Powered",
    badgeColor: "bg-orange-500"
  }
]

export function BusinessIntelligence() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Intelligence Suite</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leverage advanced analytics and AI-powered insights to make smarter sourcing decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {intelligenceTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <Image
                      src={tool.image || "/placeholder.svg"}
                      alt={tool.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    <Badge className={`absolute top-4 left-4 ${tool.badgeColor} text-white`}>
                      {tool.badge}
                    </Badge>
                    <div className="absolute bottom-4 left-4">
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-3">{tool.title}</h3>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Zap className="w-4 h-4 text-blue-600 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="bg-gradient-to-r from-[#0040304A] to-[#9782DC] hover:from-[#003028] hover:to-[#8A75D1] text-white group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-[#0040304A] to-[#9782DC] rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join 10,000+ Businesses Using Our Intelligence Suite
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            Get access to premium market insights, supplier analytics, and AI-powered recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Request Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
