"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Textile Innovation Director",
    company: "Global Textile Institute",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "The future of textiles lies in sustainable innovation. We're seeing remarkable advances in bio-based materials that will revolutionize the industry.",
    expertise: "Sustainable Materials"
  },
  {
    id: 2,
    name: "Mark Johnson",
    title: "Supply Chain Expert",
    company: "International Trade Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Digital transformation is reshaping global supply chains. Companies that embrace AI and automation will lead the next decade.",
    expertise: "Supply Chain"
  },
  {
    id: 3,
    name: "Prof. Lisa Wang",
    title: "Fashion Technology Researcher",
    company: "MIT Fashion Lab",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "Smart textiles are no longer science fiction. We're integrating sensors and electronics directly into fabrics for healthcare and performance applications.",
    expertise: "Smart Textiles"
  },
  {
    id: 4,
    name: "David Kim",
    title: "Manufacturing Consultant",
    company: "Industry 4.0 Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The convergence of IoT, AI, and robotics is creating unprecedented efficiency in textile manufacturing. The factories of tomorrow are being built today.",
    expertise: "Industry 4.0"
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    title: "Circular Economy Specialist",
    company: "Sustainable Fashion Council",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    quote: "Circular business models are essential for the textile industry's future. We must design for recyclability and create closed-loop systems.",
    expertise: "Circular Economy"
  },
  {
    id: 6,
    name: "Alex Thompson",
    title: "Digital Transformation Lead",
    company: "TechTextile Innovations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "Blockchain technology is bringing unprecedented transparency to textile supply chains, enabling true traceability from fiber to finished product.",
    expertise: "Digital Innovation"
  }
]

export function ExpertOpinions() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from industry leaders and researchers shaping the future of textile manufacturing and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-blue-100 group-hover:ring-blue-200 transition-colors">
                      <Image
                        src={expert.image || "/placeholder.svg"}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                        {expert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{expert.title}</p>
                      <p className="text-xs text-blue-600 font-medium">{expert.company}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                    &quot;{expert.quote}&quot;
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                      {expert.expertise}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
