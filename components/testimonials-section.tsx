"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useEffect, useState } from "react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      service: "AC Repair",
      rating: 5,
      text: "Excellent service! The technician arrived on time, diagnosed the issue quickly, and fixed my AC in under an hour. Very professional and courteous.",
      image: "/indian-woman-professional-headshot.jpg",
    },
    {
      name: "Rajesh Kumar",
      service: "Refrigerator Repair",
      rating: 5,
      text: "My refrigerator stopped working completely.  fixed it the same day and it's been working perfectly for months now. Highly recommended!",
      image: "/indian-man-professional-headshot.jpg",
    },
    {
      name: "Anita Reddy",
      service: "Interior Design",
      rating: 5,
      text: "They transformed our living room completely. The design team understood our vision perfectly and delivered beyond our expectations. Amazing work!",
      image: "/indian-woman-smiling-professional-headshot.jpg",
    },
    {
      name: "Vikram Singh",
      service: "Washing Machine Repair",
      rating: 5,
      text: "Quick, efficient, and affordable. The technician explained everything clearly and even gave tips for maintenance. Will definitely use again.",
      image: "/indian-man-professional-headshot-with-glasses.jpg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-yellow fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  <div>
                    <div className="font-heading font-semibold text-lg text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-brand-red font-medium">{testimonials[currentIndex].service}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-brand-red" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
