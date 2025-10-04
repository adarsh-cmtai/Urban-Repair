"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, LayoutGrid, Play, ChevronsDown } from "lucide-react";

export function HeroSection() {
  const animationStyles = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ken-burns {
      0% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes pulse-border {
      0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.5); }
      70% { box-shadow: 0 0 0 15px rgba(220, 38, 38, 0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
    .animate-ken-burns { animation: ken-burns 20s ease-out infinite alternate-reverse; }
    .animate-pulse-border { animation: pulse-border 2.5s infinite; }
  `;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-100 text-slate-900">
      <style>{animationStyles}</style>
      
      <div className="relative w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 py-2 px-6 sm:px-10 z-10">
        
        <div className="flex flex-col justify-center items-start text-left gap-y-8">
          <div 
            className="animate-fade-in-up" 
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-6 drop-shadow-sm text-balance">
              Your Home's Complete Care Partner
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-xl text-pretty">
              From instant repairs to dream interiors, we handle it all with expertise and care, ensuring your peace of mind.
            </p>
          </div>

          <div 
            className="flex flex-wrap gap-4 items-center animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            <Link href="/services">
              <Button
                size="lg"
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-8 h-14 text-lg font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Wrench className="w-6 h-6 mr-3" />
                Book a services
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 cursor-pointer text-slate-800 hover:bg-slate-100 hover:border-slate-400 px-8 h-14 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <LayoutGrid className="w-6 h-6 mr-3" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* <Link
            href="/about"
            className="group flex items-center gap-x-4 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-slate-300 group-hover:border-red-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse-border">
              <Play className="w-7 h-7 ml-1 text-slate-600 fill-current group-hover:text-red-500 transition-colors" />
            </div>
            <span className="text-lg font-medium tracking-wider text-slate-700 group-hover:text-red-600 transition-colors duration-300">
              Watch Our Story
            </span>
          </Link> */}
        </div>

        <div 
          className="relative w-full h-[60vh] lg:h-[75vh] animate-fade-in-up rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50"
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          <img
            src="/house-partner.jpg"
            alt="Professional home service technician"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce z-20 hidden md:block">
        {/* <ChevronsDown className="w-8 h-8 opacity-70" /> */}
      </div>
    </section>
  );
}