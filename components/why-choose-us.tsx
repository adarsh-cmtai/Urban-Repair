"use client"

import { ShieldCheck, Receipt, Clock, Users } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Trained Experts",
    description: "Our technicians are certified professionals with years of experience and ongoing training.",
  },
  {
    icon: Receipt,
    title: "Transparent Pricing",
    description: "No hidden costs. You get a clear, upfront estimate before any work begins.",
  },
  {
    icon: Clock,
    title: "On-Time & Reliable Service",
    description: "We value your time. Our team arrives on schedule and works efficiently to get the job done right.",
  },
  {
    icon: Users,
    title: "Customer-First Approach",
    description: "Your satisfaction is our top priority. We're not happy until you're 100% satisfied.",
  },
]

export function WhyChooseUs() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="animate-fade-in-up order-2 lg:order-1" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <div className="mb-10">
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
                The Urban Repair Advantage
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl text-pretty">
                We've built our reputation on trust, quality, and an exceptional service that goes beyond just fixing things.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index} 
                    className="animate-fade-in-up bg-gradient-to-br from-white to-slate-50/50 p-6 rounded-2xl shadow-xl shadow-slate-300/40 border border-white transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 hover:ring-2 hover:ring-red-500/20"
                    style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'backwards' }}
                  >
                    <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/40">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-slate-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="relative animate-fade-in-up order-1 lg:order-2" style={{ animationFillMode: 'backwards' }}>
            <div className="relative aspect-[4/5] max-w-md mx-auto">
                <img
                    src="/why-choose-us.jpg"
                    alt="Friendly technician providing excellent service"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-slate-400/40"
                />
                <div className="absolute -bottom-8 -left-8 w-48 h-48">
                    <img
                        src="/why-choose-us.jpg"
                        alt="Close-up of a repair"
                        className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-slate-400/60 border-4 border-white"
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}