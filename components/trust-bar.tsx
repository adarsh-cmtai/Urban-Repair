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
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <style>{animationStyles}</style>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100/50 rounded-full opacity-50 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full opacity-50 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 text-balance">
            Why Thousands Trust Us
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Our commitment to quality and service speaks for itself through numbers we're proud of.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="animate-fade-in-up flex items-center gap-5 text-left p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-white shadow-xl shadow-slate-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 hover:ring-2 hover:ring-red-500/20"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/40">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-heading font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-red-600">
                    {metric.number}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 font-medium">{metric.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}