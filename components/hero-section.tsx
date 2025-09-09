"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Trending Banner Section */}
          <div className=" bg-white text-black px-4 py-6 mb-4  rounded-md">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#00BFFF] text-white p-4 rounded text-sm font-medium">★ Trending</span>
                <span className="text-sm">
                  Premium Cotton Jersey Fabric - Soft, Breathable & Stretchy - Perfect for Tees & Dresses @৳397.80/m
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:bg-cyan-600 rounded" />
                <ChevronRight className="w-4 h-4 cursor-pointer hover:bg-cyan-600 rounded" />
              </div>
            </div>
          </div>
          {/* Main Hero Section */}
          <div
            className="relative rounded-lg shadow-sm p-8 mb-8 overflow-hidden"
            style={{
              backgroundImage: "url('/heroimg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Find Trusted <span className="text-cyan-500">Buyers & Sellers</span>
                  <br />
                  for Your Apparel Business
                </h1>
                <div className="space-y-3 text-gray-600">
                  <p>
                    From raw materials to finished apparel, Xpartex simplifies sourcing and ensures seamless supply
                    chain solutions.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm text-gray-700">Connect with 10,000+ verified global suppliers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm text-gray-700">Request quotes instantly across categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm text-gray-700">Compare prices, quality & delivery timelines</span>
                  </div>
                </div>
              </div>
              {/* Right Form */}
              <div className="bg-gray-50 p-6 rounded-lg relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <RadioGroup defaultValue="buyer" className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer" className="text-cyan-600 font-medium">
                          🛒 I am a Buyer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label htmlFor="seller" className="font-medium">
                          📦 I am a Seller
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Input placeholder="🔍 Search Product" className="h-12" />
                  <Input placeholder="Product Description" className="h-12" />
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <input type="checkbox" className="rounded" />
                    <span>
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-cyan-500 hover:underline">
                        Terms of Use
                      </a>{" "}
                      &{" "}
                      <a href="#" className="text-cyan-500 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                  <Button className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-medium">Submit</Button>
                </div>
              </div>
            </div>
          </div>
          {/* Statistics Section with Product Showcase */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            {/* Background with people image effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-600/90"></div>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "url('/heroimg2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="relative p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Source Your Products at the</h2>
                  <h3 className="text-2xl font-bold mb-4">Lowest Possible Budget</h3>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2">Shop Now</Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center border-l border-white/20 pl-4">
                    <div className="text-3xl font-bold">1K+</div>
                    <div className="text-sm text-gray-300">Verified Suppliers</div>
                  </div>
                  <div className="text-center border-l border-white/20 pl-4">
                    <div className="text-3xl font-bold">20K+</div>
                    <div className="text-sm text-gray-300">Resale Product Collections</div>
                  </div>
                  <div className="text-center border-l border-white/20 pl-4">
                    <div className="text-3xl font-bold">24H</div>
                    <div className="text-sm text-gray-300">Customize Order Facilities</div>
                  </div>
                  <div className="text-center border-l border-white/20 pl-4">
                    <div className="text-3xl font-bold">100+</div>
                    <div className="text-sm text-gray-300">Rental Facilities</div>
                  </div>
                </div>
              </div>

              {/* Product Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Buy Again Section */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Buy Again</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products2.jpg?height=80&width=80"
                            alt="Snap Fastener Tool"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">Snap Fastener Tool</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳250</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products3.jpg?height=80&width=80"
                            alt="Fat Quarters Fabric"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">Fat Quarters Fabric</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳120</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products4.jpg?height=80&width=80"
                            alt="Textured background soil"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">Textured background soil</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳150</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bulk Order Section */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Bulk Order</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products5.jpg?height=80&width=80"
                            alt="Wood Shirt Buttons"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">Wood Shirt Buttons</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳1.5-2</p>
                        <p className="text-xs text-gray-500">MOQ: 500pcs</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products6.jpg?height=80&width=80"
                            alt="Zipper Olive Wood"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">Zipper Olive Wood</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳3-6</p>
                        <p className="text-xs text-gray-500">MOQ: 200pcs</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                      <div className="text-center">
                        <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <Image
                            src="/products7.jpg?height=80&width=80"
                            alt="16 Sets Hook"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900">16 Sets Hook</p>
                        <p className="text-xs text-cyan-600 font-semibold">৳4-5</p>
                        <p className="text-xs text-gray-500">MOQ: 350pcs</p>
                        <p className="text-xs text-gray-500">50,580 sold</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
