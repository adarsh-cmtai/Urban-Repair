"use client"

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
    description: "Every decision we make is centered around providing the best possible experience and outcome for our customers.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We use only genuine parts, premium materials, and follow industry best practices in all of our services.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our certified technicians and designers undergo continuous training to stay ahead with the latest technologies.",
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
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <style>{animationStyles}</style>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full opacity-40 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-40 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            The principles that guide everything we do and shape our commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2" 
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-pretty leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}