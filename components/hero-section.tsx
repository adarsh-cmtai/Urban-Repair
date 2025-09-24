"use client"

import { Button } from "@/components/ui/button";
import { Wrench, DollarSign, LayoutGrid, Play, ChevronsDown } from "lucide-react";

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
      0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
    .animate-ken-burns { animation: ken-burns 15s ease-out infinite alternate-reverse; }
    .animate-pulse-border { animation: pulse-border 2.5s infinite; }
  `;

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-red-950 to-black">
      <style>{animationStyles}</style>

      <div className="relative w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 py-20 px-6 sm:px-10">
        
        <div className="z-10 text-left text-white">
          <div 
            className="animate-fade-in-up" 
            style={{ animationFillMode: 'backwards', animationDelay: '0.2s' }}
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg text-balance">
              Your Home's Complete Care Partner
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl text-pretty">
              From Instant Repairs to Dream Interiors, We Handle It All with Expertise and Care.
            </p>
          </div>

          <div 
            className="flex flex-wrap gap-4 items-center mb-12 animate-fade-in-up"
            style={{ animationFillMode: 'backwards', animationDelay: '0.4s' }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Wrench className="w-6 h-6 mr-3" />
              Book a Repair
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 px-8 h-14 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/10 backdrop-blur-sm"
            >
              <LayoutGrid className="w-6 h-6 mr-3" />
              Design My Space
            </Button>
          </div>

          <div 
            className="flex justify-start animate-fade-in-up"
            style={{ animationFillMode: 'backwards', animationDelay: '0.6s' }}
          >
            <button className="group flex items-center space-x-4 text-white hover:text-red-400 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full border-2 border-white/80 group-hover:border-red-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse-border">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>
              <span className="text-lg font-medium tracking-wider">Watch Our Story</span>
            </button>
          </div>
        </div>

        <div className="relative w-full h-[60vh] lg:h-[80vh] animate-fade-in-up">
          <div className="absolute inset-0 w-full h-full lg:rounded-l-3xl overflow-hidden shadow-2xl">
            <img
              src="/professional-home-technician-repairing-appliances-.jpg"
              alt="Professional home service"
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 lg:rounded-l-3xl"></div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-20">
        <ChevronsDown className="w-8 h-8 opacity-70" />
      </div>
    </section>
  );
}