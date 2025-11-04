"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/services/api";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  _id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  imageUrl: string;
}

function TestimonialCardSkeleton() {
    return (
        <Card className="h-full bg-white p-6 rounded-2xl shadow-lg animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-2 mt-4">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
            <div className="flex mt-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-slate-200 rounded-full mr-1"></div>
                ))}
            </div>
        </Card>
    );
}

function TestimonialSkeleton() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <div className="h-12 bg-slate-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-1/2 mx-auto mt-4 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCardSkeleton />
            <TestimonialCardSkeleton />
            <TestimonialCardSkeleton />
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
  
  const customStyles = `
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background-color: #cbd5e1;
      opacity: 1;
      transition: all 0.3s ease;
    }
    .swiper-pagination-bullet-active {
      width: 24px;
      border-radius: 99px;
      background-color: #ef4444;
    }
    .swiper-button-next, .swiper-button-prev {
      background-color: white;
      width: 44px;
      height: 44px;
      border-radius: 9999px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      color: #ef4444;
      transition: all 0.2s ease-in-out;
    }
    .swiper-button-next:hover, .swiper-button-prev:hover {
      background-color: #ef4444;
      color: white;
      transform: scale(1.05);
    }
    .swiper-button-next:after, .swiper-button-prev:after {
      font-size: 18px;
    }
  `;

  if (isLoading) return <TestimonialSkeleton />;
  if (testimonials.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <style>{customStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Voices of Our Valued Customers
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Real stories from people who trust us for their home appliance needs.
          </p>
        </div>

        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
        >
            {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="h-full !flex">
                    <Card className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col w-full p-6 border border-slate-200/60 hover:-translate-y-1">
                        <CardContent className="p-0 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div>
                                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                                    <p className="text-sm text-red-600 font-medium">{testimonial.service}</p>
                                </div>
                            </div>
                            <blockquote className="text-slate-600 leading-relaxed flex-grow line-clamp-4 italic relative pl-5">
                                <Quote className="absolute -left-1 -top-1 w-8 h-8 text-slate-100" />
                                “{testimonial.text}”
                            </blockquote>
                            <div className="flex mt-auto pt-4 border-t border-slate-100">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  )
}