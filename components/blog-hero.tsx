"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Newspaper, Lightbulb, Wrench } from "lucide-react"

const categories = [
  { name: "Latest Articles", icon: Newspaper },
  { name: "Expert Tips", icon: Lightbulb },
  { name: "Maintenance Guides", icon: Wrench },
]

export function BlogHero() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="font-heading font-extrabold text-4xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
          Home Care Tips & Insights
        </h1>
        <p className="text-xl text-slate-600 mb-12 text-pretty">
          Expert advice, maintenance tips, and the latest trends in home appliances and interior design.
        </p>

        <div className="relative max-w-2xl mx-auto mb-8">
          <Input 
            type="search" 
            placeholder="Search for articles, tips, and guides..."
            className="h-16 pl-6 pr-16 text-lg rounded-full shadow-inner bg-slate-100 border-slate-200 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-red-600 hover:bg-red-700"
          >
            <Search className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-slate-600 font-medium">Popular topics:</span>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button key={category.name} variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all">
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  )
}