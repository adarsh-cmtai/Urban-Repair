"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const categories = ["All", "TV Walls", "Living Rooms", "Kitchens", "Study Walls"]
const projects = [
  { id: 1, title: "Minimalist TV Unit", category: "TV Walls", imageUrl: "/path/to/tv-wall-1.jpg" },
  { id: 2, title: "Modern Living Space", category: "Living Rooms", imageUrl: "/path/to/living-room-1.jpg" },
  { id: 3, title: "Modular Kitchen Design", category: "Kitchens", imageUrl: "/path/to/kitchen-1.jpg" },
  { id: 4, title: "Compact Study Area", category: "Study Walls", imageUrl: "/path/to/study-1.jpg" },
  { id: 5, title: "Floating TV Console", category: "TV Walls", imageUrl: "/path/to/tv-wall-2.jpg" },
  { id: 6, title: "Cozy Family Lounge", category: "Living Rooms", imageUrl: "/path/to/living-room-2.jpg" },
  { id: 7, title: "Sleek Kitchen Island", category: "Kitchens", imageUrl: "/path/to/kitchen-2.jpg" },
  { id: 8, title: "Elegant Entertainment Wall", category: "TV Walls", imageUrl: "/path/to/tv-wall-3.jpg" },
]

export function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Our Signature Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            Explore our portfolio of completed projects and find inspiration for your own space.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${
                activeFilter === category
                  ? "bg-brand-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl shadow-lg">
              <img src={project.imageUrl} alt={project.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-montserrat text-xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-gray-200">{project.category}</p>
                <button className="mt-4 inline-flex items-center gap-2 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-lg">
                  <Search className="w-4 h-4" />
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}