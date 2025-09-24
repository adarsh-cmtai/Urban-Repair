"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

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
    text: "My refrigerator stopped working completely. They fixed it the same day and it's been working perfectly for months now. Highly recommended!",
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
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const nextTestimonial = () => {
    handleNavigation((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    handleNavigation((currentIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Card className="w-full rounded-2xl border-0 shadow-xl overflow-hidden ring-1 ring-black ring-opacity-5">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent"></div>
              </div>
              
              <div className="relative p-8 md:p-12 flex flex-col justify-between">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-red-100/60" />
                <div 
                  className={`transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div className="flex mb-4">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed text-pretty">
                    {activeTestimonial.text}
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="font-heading font-semibold text-lg text-gray-900">
                      {activeTestimonial.name}
                    </div>
                    <div className="text-red-600 font-medium">{activeTestimonial.service}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}