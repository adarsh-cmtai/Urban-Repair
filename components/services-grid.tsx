"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Refrigerator, Zap, Tv, Wind, Microwave, ArrowRight } from "lucide-react"
import { applianceCategories } from "@/lib/appliance-data"

const icons = {
  Wind,
  Refrigerator,
  Zap,
  Tv,
}

export function SellApplianceSection() {
  const [activeCategory, setActiveCategory] = useState(applianceCategories[0])

  const animationStyles = `
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Our Expert Repair Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            From ACs to Washing Machines, we provide reliable and professional repair services. Select a category to see more.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 sticky top-24">
            <div className="space-y-3">
              {applianceCategories.map((category) => {
                const Icon = icons[category.icon as keyof typeof icons] || Wrench;
                const isActive = activeCategory.title === category.title
                return (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full group flex items-center text-left p-4 rounded-xl border-2 transition-all duration-300 transform ${
                      isActive
                        ? "bg-red-50 border-red-600 shadow-md"
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mr-4 flex-shrink-0 transition-colors ${isActive ? "text-red-600" : "text-gray-500 group-hover:text-red-600"}`} />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div key={activeCategory.title} className="lg:col-span-8 animate-fade-in">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-6">
              Services for <span className="text-red-600">{activeCategory.title.replace(' Repair', '')}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCategory.subCategories.map((subCategory) => (
                <Card
                  key={subCategory.title}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-red-500 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.title} 
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{subCategory.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">{subCategory.description}</p>
                    <Link href={`/services/${subCategory.serviceId}?selected=${subCategory.subServiceId}`} passHref>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-semibold self-start text-red-600 hover:text-red-600"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}