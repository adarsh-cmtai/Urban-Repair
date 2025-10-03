"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Users, Zap } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    title: "Best Home Service Provider 2023",
    organization: "Hyderabad Business Awards",
    description: "Recognized for excellence in customer service and innovation in the home services sector.",
  },
  {
    icon: Star,
    title: "5-Star Rating on Google",
    organization: "Based on 2,500+ Reviews",
    description: "Consistently rated as the top home service provider by our thousands of satisfied customers.",
  },
  {
    icon: Users,
    title: "10,000+ Happy Customers",
    organization: "Across Hyderabad",
    description: "Trusted by families and businesses throughout the city for all their home service needs.",
  },
  {
    icon: Zap,
    title: "ISO 9001:2015 Certified",
    organization: "Quality Management System",
    description: "Officially certified for maintaining international standards in service quality and customer satisfaction.",
  },
]

const stats = [
  { number: "10,000+", label: "Customers Served" },
  { number: "50,000+", label: "Services Completed" },
  { number: "500+", label: "Interior Projects" },
  { number: "98%", label: "Customer Satisfaction" },
]

export function AchievementsSection() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;
  
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Awards & Recognition
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Our commitment to excellence has been recognized by industry leaders and customers alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 flex items-start gap-6"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="bg-red-100 text-red-600 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{achievement.title}</h3>
                  <p className="text-red-600 font-semibold mb-3">{achievement.organization}</p>
                  <p className="text-slate-600 text-pretty">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative bg-slate-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] opacity-10"></div>
          <div className="relative text-center mb-10">
            <h3 className="font-heading text-3xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">These numbers represent the trust our customers place in us every day.</p>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'backwards' }}
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}