"use client"

import { Button } from "@/components/ui/button"
import { Award, Users, Clock, Heart, ArrowRight } from "lucide-react"

export function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <h1 className="font-heading text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
              Your Trusted Home Service Partner
            </h1>
            <p className="text-xl mb-12 text-slate-600 text-pretty">
              For over 15 years, we've been transforming homes across Hyderabad with reliable appliance repair, seamless buying & selling services, and stunning interior design solutions.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-12 text-left">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">10,000+</div>
                  <div className="text-slate-500">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">15+</div>
                  <div className="text-slate-500">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-slate-500">Support Available</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Heart className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-slate-500">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 font-semibold px-8 h-14 text-lg rounded-xl group">
              Learn Our Story
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="relative order-1 lg:order-2">
            <img
              src="/about-us-team-photo-home-services.jpg"
              alt="Our professional team"
              className="rounded-3xl shadow-2xl shadow-slate-300/60 aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-sm text-slate-800 p-5 rounded-2xl shadow-xl border border-white/50">
              <div className="text-red-600 text-3xl font-bold">Since 2008</div>
              <div className="font-medium">Serving Hyderabad With Pride</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}