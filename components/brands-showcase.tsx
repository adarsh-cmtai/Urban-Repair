"use client"

import { useEffect, useState } from "react"

export function BrandsShowcase() {
  const brands = [
    { name: "LG", logo: "/lg-logo.jpg" },
    { name: "Samsung", logo: "/samsung-logo.png" },
    { name: "Whirlpool", logo: "/whirlpool-logo.jpg" },
    { name: "Bosch", logo: "/bosch-logo.png" },
    { name: "Godrej", logo: "/godrej-logo.jpg" },
    { name: "Haier", logo: "/haier-logo.jpg" },
    { name: "Panasonic", logo: "/panasonic-logo.png" },
    { name: "IFB", logo: "/ifb-logo.jpg" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [brands.length])

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-gray-900 mb-4">
            We're Experts With All Major Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our technicians are trained and certified to work with all leading appliance brands, ensuring quality
            service regardless of your appliance make.
          </p>
        </div>

        {/* Desktop Scrolling Brands */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex animate-scroll space-x-12 items-center">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-2 gap-8">
          {brands.slice(0, 4).map((brand, index) => (
            <div key={index} className="flex justify-center items-center p-4 bg-gray-50 rounded-xl">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                className="h-10 w-auto object-contain grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
