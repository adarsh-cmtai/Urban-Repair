"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Home, Palette, Target, CheckCircle } from "lucide-react"

const milestones = [
  {
    year: "2008",
    title: "The Beginning",
    description: "Started as a small appliance repair shop with a vision to provide honest, reliable home services to our community.",
    icon: Wrench,
  },
  {
    year: "2012",
    title: "Expansion into Sales",
    description: "Expanded to include appliance buying & selling, helping customers upgrade their homes affordably and sustainably.",
    icon: Home,
  },
  {
    year: "2016",
    title: "Launched Interior Design",
    description: "Introduced our interior design division, offering complete home transformation solutions from concept to completion.",
    icon: Palette,
  },
  {
    year: "2024",
    title: "Market Leader",
    description: "Proudly serving over 10,000 customers across Hyderabad with a dedicated team of over 100 skilled professionals.",
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
    <section className="py-2 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Our Journey of Trust & Quality
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            From humble beginnings to becoming Hyderabad's most trusted home service provider, our story is built on dedication and customer satisfaction.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 h-full w-1 bg-slate-200 rounded-full"></div>
          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div 
                  key={index} 
                  className="relative pl-20 animate-fade-in-up" 
                  style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="absolute left-6 top-1 h-12 w-12 -translate-x-1/2 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center ring-8 ring-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1">
                    <p className="text-2xl font-bold font-heading text-red-600 mb-2">{milestone.year}</p>
                    <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600 text-pretty">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-28 bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-300/50 border border-slate-200/80">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-4xl font-extrabold text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-700 mb-8 text-pretty">
                To make every home a better place by providing exceptional repair services, facilitating smart appliance upgrades, and creating beautiful spaces that reflect our customers' dreams.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-x-4">
                  <CheckCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Reliability</strong>
                    <p className="text-slate-600">We are committed to providing dependable and timely service every single time.</p>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <CheckCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Quality</strong>
                    <p className="text-slate-600">Using only the best parts and skilled professionals to ensure lasting solutions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <CheckCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Customer Focus</strong>
                    <p className="text-slate-600">We listen to your needs and strive to exceed your expectations in every interaction.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-full w-full min-h-[300px]">
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