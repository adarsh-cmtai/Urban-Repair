"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Home, Palette, Target, CheckCircle } from "lucide-react"

const milestones = [
  {
    year: "2008",
    title: "The Beginning",
    description: "Started as a small appliance repair service with a vision to provide honest, reliable home services.",
    icon: Wrench,
  },
  {
    year: "2012",
    title: "Expansion into Sales",
    description: "Expanded to include appliance buying & selling, helping customers upgrade their homes affordably.",
    icon: Home,
  },
  {
    year: "2016",
    title: "Launched Interior Design",
    description: "Introduced our interior design division, offering complete home transformation solutions.",
    icon: Palette,
  },
  {
    year: "2024",
    title: "Market Leader",
    description: "Serving 50,000+ customers across Hyderabad with over 100 skilled professionals.",
    icon: Target,
  },
]

export function CompanyStory() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(30px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.7s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Our Journey of Trust & Quality
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            From humble beginnings to becoming Hyderabad's most trusted home service provider, our story is built on dedication and customer satisfaction.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="relative animate-fade-in-up" 
                style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'backwards' }}
              >
                <div className="sm:flex items-center sm:space-x-8 group">
                  <div className="sm:w-1/2">
                    <div className={`text-right sm:pr-8 mb-4 sm:mb-0 ${index % 2 !== 0 ? 'sm:order-2 sm:text-left sm:pl-8 sm:pr-0' : ''}`}>
                      <p className="text-2xl font-bold font-heading text-red-600">{milestone.year}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 top-1 sm:left-1/2 h-8 w-8 -translate-x-1/2 bg-red-600 text-white rounded-full flex items-center justify-center ring-8 ring-slate-50">
                    <milestone.icon className="h-4 w-4" />
                  </div>
                  <div className="sm:w-1/2">
                    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${index % 2 !== 0 ? 'sm:-ml-8' : 'sm:ml-8'}`}>
                      <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-pretty">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6 text-pretty">
                To make every home a better place by providing exceptional repair services, facilitating smart appliance upgrades, and creating beautiful spaces that reflect our customers' dreams.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">Reliability:</strong> We are committed to providing dependable and timely service every single time.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">Quality:</strong> Using only the best parts and skilled professionals to ensure lasting solutions.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-gray-800">Customer Focus:</strong> We listen to your needs and strive to exceed your expectations.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>
              <img
                src="/our-mission-home-transformation.jpg"
                alt="Home transformation reflecting our mission"
                className="relative rounded-2xl shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}