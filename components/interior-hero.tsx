import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Home, Award } from "lucide-react"

export function InteriorHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-red to-red-700 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Transform Your <span className="text-accent-yellow">Dream Home</span> Into Reality
            </h1>
            <p className="text-xl mb-8 text-red-100 text-pretty">
              From concept to completion, we create stunning interior spaces that reflect your personality and
              lifestyle. Experience luxury design at affordable prices.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Palette className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Custom Designs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Home className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Complete Solutions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Award className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Award Winning</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent-yellow text-black hover:bg-yellow-500 font-semibold">
                Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-red bg-transparent"
              >
                View Portfolio
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/interior-design-hero-modern-living-room.jpg"
              alt="Modern interior design showcase"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-accent-yellow text-black p-6 rounded-2xl shadow-xl">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm font-medium">Happy Homes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
