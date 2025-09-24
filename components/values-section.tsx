"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Heart, Award, Users, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "We stand behind our work with comprehensive warranties and transparent pricing. Your trust is our most valuable asset.",
  },
  {
    icon: Clock,
    title: "Punctuality",
    description: "We respect your time. Our technicians arrive on schedule and complete work within the promised timeframes.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make is centered around providing the best possible experience for our customers.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We use only genuine parts, premium materials, and follow industry best practices in all our services.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our certified technicians and designers undergo continuous training to stay updated with the latest technologies.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace new technologies and methods to provide more efficient and effective solutions for your home.",
  },
]

export function ValuesSection() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <style>{animationStyles}</style>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-100 to-orange-100 rounded-full opacity-50 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-50 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            The principles that guide everything we do and shape our commitment to excellence.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group relative p-px rounded-2xl animate-fade-in-up" 
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-200 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-white/60 backdrop-blur-lg rounded-[15px] p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 shadow-lg">
                    <value.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-pretty leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}