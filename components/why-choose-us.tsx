"use client"

import { ShieldCheck, Receipt, Clock, Users } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Trained Experts",
    description: "Our technicians are certified professionals with years of experience and ongoing training to handle any issue.",
  },
  {
    icon: Receipt,
    title: "Transparent Pricing",
    description: "No hidden costs or surprise charges. You get a clear, upfront estimate before any work begins.",
  },
  {
    icon: Clock,
    title: "On-Time & Reliable Service",
    description: "We value your time. Our team arrives on schedule and works efficiently to get the job done right.",
  },
  {
    icon: Users,
    title: "Customer-First Approach",
    description: "Your satisfaction is our top priority. We're not happy until you're 100% satisfied with our service.",
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
    <section className="py-12 bg-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
            <div className="relative aspect-w-4 aspect-h-5">
              <img
                src="/choose us.jpg"
                alt="Friendly technician providing excellent service"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4 text-balance">
                The Urban Repair Advantage
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl text-pretty">
                We've built our reputation on trust, quality, and an exceptional service that goes beyond just fixing things.
              </p>
              <div className="mt-4 h-1 w-20 bg-red-600 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index} 
                    className="group flex items-start space-x-4 p-4 rounded-xl transition-colors duration-300 hover:bg-slate-50"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full transition-all duration-300 group-hover:bg-red-100 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-gray-500 transition-colors duration-300 group-hover:text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}