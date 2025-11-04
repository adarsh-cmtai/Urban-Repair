"use client"

import { Star, Clock, Users, Award } from "lucide-react"

const metrics = [
  {
    icon: Award,
    number: "15+",
    text: "Years of Experience",
  },
  {
    icon: Users,
    number: "10,000+",
    text: "Happy Customers",
  },
  {
    icon: Star,
    number: "4.9/5",
    text: "Average Rating",
  },
  {
    icon: Clock,
    number: "24/7",
    text: "Support Available",
  },
]

export function TrustBar() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-2 sm:py-24 bg-white">
      <style>{animationStyles}</style>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 text-balance">
            Why Thousands Trust Our Expertise
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Our commitment to quality and customer satisfaction, reflected in numbers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="group animate-fade-in-up text-center p-6 bg-slate-50 rounded-2xl border border-transparent transition-all duration-300 hover:shadow-xl hover:border-red-200 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mx-auto transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-heading font-extrabold text-5xl text-slate-800 mt-6">
                    {metric.number}
                  </p>
                  <p className="mt-1 text-base text-slate-500 font-medium">{metric.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}