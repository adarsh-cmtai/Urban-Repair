"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, ArrowRight } from "lucide-react"

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Complete Home"]

  const projects = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      category: "Complete Home",
      location: "Banjara Hills",
      image: "/portfolio-modern-luxury-villa-living-room.jpg",
      description: "Complete interior transformation of a 4BHK villa with contemporary design elements.",
      budget: "₹15,00,000",
    },
    {
      id: 2,
      title: "Minimalist Living Space",
      category: "Living Room",
      location: "Jubilee Hills",
      image: "/portfolio-minimalist-living-room-design.jpg",
      description: "Clean lines and neutral tones create a serene living environment.",
      budget: "₹2,50,000",
    },
    {
      id: 3,
      title: "Contemporary Kitchen",
      category: "Kitchen",
      location: "Gachibowli",
      image: "/portfolio-contemporary-modular-kitchen.jpg",
      description: "Functional modular kitchen with island counter and premium appliances.",
      budget: "₹4,50,000",
    },
    {
      id: 4,
      title: "Master Bedroom Suite",
      category: "Bedroom",
      location: "Kondapur",
      image: "/portfolio-master-bedroom-suite-design.jpg",
      description: "Elegant bedroom design with walk-in wardrobe and reading nook.",
      budget: "₹3,20,000",
    },
    {
      id: 5,
      title: "Corporate Office",
      category: "Office",
      location: "HITEC City",
      image: "/portfolio-corporate-office-interior.jpg",
      description: "Modern office space designed for productivity and collaboration.",
      budget: "₹8,00,000",
    },
    {
      id: 6,
      title: "Cozy Apartment",
      category: "Complete Home",
      location: "Madhapur",
      image: "/portfolio-cozy-apartment-interior.jpg",
      description: "Smart space utilization in a compact 2BHK apartment.",
      budget: "₹6,50,000",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 text-pretty max-w-3xl mx-auto">
            Explore our stunning collection of interior design projects that showcase our expertise and creativity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`${
                activeFilter === filter
                  ? "bg-brand-red hover:bg-red-700"
                  : "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
                <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.location}</p>
                <p className="text-gray-700 mb-4 text-pretty">{project.description}</p>

                <div className="flex justify-between items-center">
                  <span className="text-brand-red font-semibold">{project.budget}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-red hover:bg-red-700">
            View Complete Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
