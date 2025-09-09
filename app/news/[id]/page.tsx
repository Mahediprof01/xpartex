"use client";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

const newsArticles = [
  {
  id: 1,
  title: "Top 5 Sourcing Hubs for Apparel Buyers in 2025",
  excerpt: "A concise guide to the five major sourcing hubs apparel buyers should watch in 2025 — strengths, opportunities and what to expect from each market.",
  content: `The apparel industry is evolving rapidly, and sourcing strategies are changing with it. Below are five key hubs buyers should consider in 2025, with a short overview of strengths and opportunities for each.

1. Bangladesh – Affordable Production with Growing Sustainability
Bangladesh continues to be a powerhouse in garment manufacturing, especially for price-competitive, high-volume production. Recent investments in safety and sustainability have improved its appeal to global buyers.

2. Vietnam – Quality and Efficiency
Vietnam offers excellent lead times and consistent quality for a wide range of apparel segments. Its strength lies in nimble factories and growing technical expertise for higher-value items.

3. China – Innovation and Fabric Strength
China remains strong for technical fabrics, vertical integration, and rapid product development. It's ideal when advanced supply chain capabilities and speed-to-market are priorities.

4. India – Textiles and Value-Added Products
India is an important hub for textiles and value-added garments, especially where fabric sourcing and customization are required at scale.

5. Turkey – Speed to Market
Turkey is often chosen for near-market production serving European buyers who prioritise speed, flexibility, and shorter lead times.

 Buyers should balance cost, lead time, sustainability, and quality when selecting a sourcing hub. A diversified sourcing strategy across these five markets often provides the best risk-adjusted outcome`,
  image: "/shop.jpg",
  category: "Market Trends",
  author: "Janice Doe",
  publishedAt: "2025-06-28T09:00:00Z",
  readTime: "6 min read",
  tags: ["Sourcing", "Markets", "2025"],
  },
  {
    id: 2,
    title: "Top 2025 Trends in Sustainable Fashion",
    excerpt: "As environmental consciousness grows, sustainable fashion is taking center stage. From recycled materials to circular fashion models, the industry is embracing eco-friendly practices.",
    content: "As environmental consciousness grows, sustainable fashion is taking center stage. From recycled materials to circular fashion models, the industry is embracing eco-friendly practices. Leading brands are investing heavily in research and development of biodegradable fabrics, waterless dyeing techniques, and zero-waste production methods. The consumer demand for transparency in the supply chain is driving companies to adopt more ethical practices. This shift is not just about environmental impact but also about creating value for stakeholders through innovation and responsible business practices.",
    image: "/fabric.jpg", 
    category: "Sustainability",
    author: "Michael Davis",
    publishedAt: "2024-12-14T14:30:00Z",
    readTime: "7 min read",
    tags: ["Sustainability", "Fashion", "Trends"],
  },
  {
    id: 3,
    title: "New Safety Rules for RMG in Bangladesh",
    excerpt: "Bangladesh's ready-made garment industry is implementing comprehensive safety reforms following international standards and worker welfare initiatives.",
    content: "Bangladesh's ready-made garment industry is implementing comprehensive safety reforms following international standards and worker welfare initiatives. The new regulations cover fire safety, building structural integrity, electrical safety, and worker training programs. These measures are designed to ensure the highest level of workplace safety and compliance with international standards. The government is working closely with industry stakeholders to implement these changes effectively while maintaining the competitiveness of the sector. Training programs for workers and management are being conducted to ensure proper understanding and implementation of safety protocols.",
    image: "/machinary.jpg",
    category: "Regulations",
    author: "Rashida Ahmed",
    publishedAt: "2024-12-13T09:15:00Z",
    readTime: "6 min read",
    tags: ["Safety", "Bangladesh", "RMG"],
  },
  {
    id: 4,
    title: "Export Orders Jump 15% This Quarter",
    excerpt: "The textile export sector is experiencing significant growth with a 15% increase in orders this quarter, driven by rising global demand and improved production capabilities.",
    content: "The textile export sector is experiencing significant growth with a 15% increase in orders this quarter, driven by rising global demand and improved production capabilities. Key markets including the US, EU, and emerging economies are showing strong demand for textile products. The growth is attributed to several factors including competitive pricing, improved quality standards, and diversification of product offerings. Manufacturers are investing in capacity expansion and technology upgrades to meet the growing demand while maintaining quality and delivery timelines.",
    image: "/fabric1.jpg",
    category: "Market Analysis",
    author: "David Wilson",
    publishedAt: "2024-12-12T16:45:00Z",
    readTime: "8 min read",
    tags: ["Exports", "Growth", "Market"],
  },
  {
    id: 5,
    title: "Digital Tools Transform Fashion Choices",
    excerpt: "Digital transformation is revolutionizing the fashion industry, from virtual fitting rooms to AI-powered design tools, changing how consumers shop and designers create.",
    content: "Digital transformation is revolutionizing the fashion industry, from virtual fitting rooms to AI-powered design tools, changing how consumers shop and designers create. Virtual reality shopping experiences, augmented reality try-ons, and personalized recommendation engines are becoming standard features in fashion retail. These technologies are not only enhancing customer experience but also reducing return rates and improving inventory management. The integration of blockchain for supply chain transparency and AI for trend prediction is creating new opportunities for innovation in the fashion industry.",
    image: "/fiber.jpg",
    category: "Technology",
    author: "Sarah Johnson",
    publishedAt: "2024-12-11T11:20:00Z",
    readTime: "4 min read",
    tags: ["Digital", "Fashion", "Technology"],
  },
  {
    id: 6,
    title: "Smart Warehousing Saves Production Time",
    excerpt: "Automated warehousing solutions are reducing production time by up to 40%, improving efficiency and reducing costs in textile manufacturing operations.",
    content: "Automated warehousing solutions are reducing production time by up to 40%, improving efficiency and reducing costs in textile manufacturing operations. Smart inventory management systems using RFID technology, automated sorting mechanisms, and predictive analytics are transforming warehouse operations. These technologies enable real-time tracking of materials, optimize storage space utilization, and reduce human error. The implementation of robotic systems for material handling and AI-driven demand forecasting is creating more responsive and efficient supply chains in the textile industry.",
    image: "/machinary1.jpg",
    category: "Logistics",
    author: "Jennifer Kim",
    publishedAt: "2024-12-10T13:00:00Z",
    readTime: "6 min read",
    tags: ["Automation", "Warehousing", "Efficiency"],
  },
  {
    id: 7,
    title: "EU Enforces Strict Factory Worker Welfare",
    excerpt: "The European Union has introduced stringent regulations to ensure factory worker welfare across its textile supply chain, setting new global standards.",
    content: "The European Union has introduced stringent regulations to ensure factory worker welfare across its textile supply chain, setting new global standards. These regulations cover working hours, wage standards, health and safety protocols, and environmental conditions in manufacturing facilities. Companies trading with the EU must now provide detailed documentation of their labor practices and undergo regular audits. This initiative is part of a broader effort to promote ethical manufacturing and sustainable business practices globally.",
    image: "/fiber1.jpg",
    category: "Regulations",
    author: "Thomas Mueller",
    publishedAt: "2024-12-09T15:30:00Z",
    readTime: "7 min read",
    tags: ["EU", "Welfare", "Regulations"],
  },
  {
    id: 8,
    title: "Denim Sees Export Surge in Western Markets",
    excerpt: "Denim exports to Western markets have increased by 25% this year, driven by growing demand for premium quality and sustainable denim products.",
    content: "Denim exports to Western markets have increased by 25% this year, driven by growing demand for premium quality and sustainable denim products. The surge is attributed to innovations in eco-friendly production methods, including water-saving techniques and organic cotton usage. Western consumers are increasingly conscious about sustainability and are willing to pay premium prices for environmentally responsible products. This trend is encouraging manufacturers to invest in cleaner production technologies and sustainable raw materials.",
    image: "/fiber2.jpg",
    category: "Market Trends",
    author: "Maria Santos",
    publishedAt: "2024-12-08T12:00:00Z",
    readTime: "5 min read",
    tags: ["Denim", "Exports", "Sustainability"],
  },
];

export default function NewsDetail() {
  const params = useParams();
  const newsId = parseInt(params.id as string);
  const article = newsArticles.find((a) => a.id === newsId) || newsArticles[0];

  const relatedArticles = newsArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="container w-full mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Most Viewed (desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className=" mb-6">
            <h4 className="text-sm font-semibold mb-3">Most Viewed</h4>
            <div className="space-y-3">
              {newsArticles.slice(0,5).map((n) => (
                <a key={n.id} href={`/news/${n.id}`} className="flex items-start gap-3 group">
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={n.image} alt={n.title} width={160} height={120} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900 line-clamp-2">{n.title}</h5>
                    <div className="text-xs text-gray-500 mt-1">{new Date(n.publishedAt).toLocaleDateString()}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Stacked promo images to mimic screenshot */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden">
              <Image src="/fabric2.jpg" alt="ad1" width={256} height={140} className="w-full h-32 object-cover rounded-lg" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image src="/cloth1.jpg" alt="ad2" width={256} height={140} className="w-full h-32 object-cover rounded-lg" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image src="/Xpartex-04.png" alt="ad3" width={256} height={140} className="w-full h-32 object-cover rounded-lg" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Article Header */}
          <div className="mb-6">
            <div className="mb-4">
              <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <Image 
              src={article.image} 
              alt={article.title} 
              width={800}
              height={400}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <div className="text-gray-700 leading-relaxed text-base">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* main article ends here - simplified for screenshot match */}
        </main>

        {/* Right Sidebar: Related News + Ad */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          {/* Top sponsor card to mimic screenshot */}
          <div className=" mb-6">
            <div className="rounded-lg overflow-hidden">
              <Image src="/Xpartex-01.png" alt="sponsor" width={320} height={120} className="w-full h-24 object-cover rounded-md" />
            </div>
          </div>

          <div className=" mb-6">
            <h3 className="font-semibold text-lg mb-4">Related News</h3>
            <div className="space-y-4">
              {relatedArticles.map((r) => (
                <a key={r.id} href={`/news/${r.id}`} className="flex items-start gap-3 group">
                  <div className="w-20 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={r.image} alt={r.title} width={160} height={120} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900 line-clamp-2">{r.title}</h5>
                    <div className="text-xs text-gray-500 mt-1">{r.author} • {new Date(r.publishedAt).toLocaleDateString()}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className=" mb-6">
            <div className="rounded-lg overflow-hidden">
              <Image src="/Xpartex-01.png" alt="sponsor" width={320} height={120} className="w-full h-24 object-cover rounded-md" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
