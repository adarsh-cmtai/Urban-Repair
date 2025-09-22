import { Button } from "@/components/ui/button"
import { ArrowRight, IndianRupee, Clock, Shield } from "lucide-react"

export function SellHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-red to-red-700 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Sell Your Old Appliances for <span className="text-accent-yellow">Best Price</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 text-pretty">
              Get instant quotes, free pickup, and immediate payment for your old appliances. We buy all brands in any
              condition - working or non-working.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <IndianRupee className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Best Market Rates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Same Day Pickup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Shield className="h-5 w-5 text-accent-yellow" />
                <span className="font-semibold">Secure Payment</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent-yellow text-black hover:bg-yellow-500 font-semibold">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-red bg-transparent"
              >
                Call Now: +91 9876543210
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/sell-appliances-hero-image.jpg"
              alt="Sell old appliances for cash"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent-yellow text-black p-6 rounded-2xl shadow-xl">
              <div className="text-2xl font-bold">₹15,000+</div>
              <div className="text-sm font-medium">Average Payout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
