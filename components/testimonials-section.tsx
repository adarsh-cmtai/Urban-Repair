"use client"

import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/services/api";

interface Testimonial {
  _id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  imageUrl: string;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchTestimonials = async () => {
          try {
              const res = await api.get('/public/testimonials');
              setTestimonials(res.data.data);
          } catch (error) {
              console.error("Failed to fetch testimonials");
          } finally {
              setIsLoading(false);
          }
      };
      fetchTestimonials();
  }, []);

  const handleNavigation = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    handleNavigation((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    handleNavigation((currentIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    if (testimonials.length > 1) {
        const timer = setInterval(() => {
          nextTestimonial();
        }, 5000);
        return () => clearInterval(timer);
    }
  }, [currentIndex, isAnimating, testimonials.length]);

  if (isLoading) return <div className="py-12 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>;
  if (testimonials.length === 0) return null;

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here's what our satisfied customers have to say about our services.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Card className="w-full rounded-2xl border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={activeTestimonial.imageUrl}
                  alt={activeTestimonial.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
              <div className="relative p-8 md:p-12 flex flex-col justify-between">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-red-100/60" />
                <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex mb-4">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {activeTestimonial.text}
                  </blockquote>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="font-heading font-semibold text-lg text-gray-900">{activeTestimonial.name}</div>
                    <div className="text-red-600 font-medium">{activeTestimonial.service}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={prevTestimonial} className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center text-gray-600 hover:bg-red-50"><ChevronLeft/></button>
                    <button onClick={nextTestimonial} className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center text-gray-600 hover:bg-red-50"><ChevronRight/></button>
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
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}