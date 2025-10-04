"use client"

import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
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

function TestimonialSkeleton() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center bg-white p-6 rounded-2xl shadow-lg">
          <div className="md:col-span-2 aspect-square bg-slate-200 rounded-xl"></div>
          <div className="md:col-span-3 space-y-6">
            <div className="flex space-x-1">
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
              <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-6 bg-slate-300 rounded w-1/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
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
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 50);
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
    if (testimonials.length > 1 && !isAnimating) {
        const timer = setInterval(nextTestimonial, 7000);
        return () => clearInterval(timer);
    }
  }, [currentIndex, isAnimating, testimonials.length]);

  const animationStyles = `
    @keyframes ken-burns {
      0% { transform: scale(1) translate(0, 0); }
      100% { transform: scale(1.1) translate(-2%, 2%); }
    }
    .animate-ken-burns {
      animation: ken-burns 15s ease-out infinite alternate;
    }
    @keyframes slide-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-in-up {
      animation: slide-in-up 0.5s ease-out forwards;
    }
  `;

  if (isLoading) return <TestimonialSkeleton />;
  if (testimonials.length === 0) return null;

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Voices of Our Valued Customers
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Real stories from real people who trust Urban Repair Expert for their home appliance needs.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8 items-center">
              <div className="md:col-span-2 w-full h-64 md:h-full overflow-hidden">
                 <div key={activeTestimonial._id} className="w-full h-full">
                    <img
                      src={activeTestimonial.imageUrl}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover animate-ken-burns"
                    />
                 </div>
              </div>

              <div className="relative md:col-span-3 p-8 md:p-12">
                <Quote className="absolute top-6 right-6 w-20 h-20 text-slate-100" />
                <div 
                  key={activeTestimonial._id} 
                  className={`relative ${isAnimating ? 'opacity-0' : 'animate-slide-in-up'}`}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 transition-colors ${i < activeTestimonial.rating ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-700 mb-6 leading-relaxed italic text-pretty">
                    “{activeTestimonial.text}”
                  </blockquote>
                  <div>
                    <div className="font-heading font-bold text-lg text-slate-800">{activeTestimonial.name}</div>
                    <div className="text-red-600 font-medium">{activeTestimonial.service}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 right-8 md:bottom-8 md:right-12 z-10 flex space-x-2">
            <button onClick={prevTestimonial} className="w-12 h-12 cursor-pointer bg-white rounded-full shadow-lg border flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"><ChevronLeft/></button>
            <button onClick={nextTestimonial} className="w-12 h-12 cursor-pointer bg-white rounded-full shadow-lg border flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"><ChevronRight/></button>
          </div>

          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-red-600 w-8" : "bg-slate-300 w-2 hover:bg-slate-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}