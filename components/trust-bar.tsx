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
    <section className="py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800">
            Why Thousands Trust Us
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our commitment to quality and service speaks for itself through numbers we're proud of.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="animate-fade-in-up flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/80 shadow-xl shadow-slate-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 hover:border-white"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/40">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-heading font-extrabold text-5xl text-slate-900">
                  {metric.number}
                </p>
                <p className="mt-2 text-base text-slate-600 font-medium">{metric.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}