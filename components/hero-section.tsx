import { Button } from "@/components/ui/button"
import { Wrench, DollarSign, LayoutGrid, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <img
            src="/professional-home-technician-repairing-appliances-.jpg"
            alt="Professional home service"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 text-balance">
            Your Home's Complete Care Partner
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 text-pretty">
            From Instant Repairs to Dream Interiors, We Handle It All
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]"
            >
              <Wrench className="w-6 h-6 mr-3" />
              Book a Repair
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px] bg-transparent"
            >
              <DollarSign className="w-6 h-6 mr-3" />
              Sell Your Appliance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px] bg-transparent"
            >
              <LayoutGrid className="w-6 h-6 mr-3" />
              Design My Space
            </Button>
          </div>

          {/* Video Play Button */}
          <div className="flex justify-center">
            <button className="group flex items-center space-x-3 text-white hover:text-accent-yellow transition-colors">
              <div className="w-16 h-16 rounded-full border-2 border-white group-hover:border-accent-yellow flex items-center justify-center group-hover:scale-110 transition-all">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <span className="text-lg font-medium">Watch Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
