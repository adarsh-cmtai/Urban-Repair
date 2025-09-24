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
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
            Why Thousands Trust Us
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Our commitment to quality and service speaks for itself.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-md">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-4xl text-gray-900 mb-1">
                    {metric.number}
                    {metric.text.includes("Rating") && <span className="text-2xl text-yellow-500"> ★</span>}
                  </p>
                  <p className="text-base text-gray-600 font-medium">{metric.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}