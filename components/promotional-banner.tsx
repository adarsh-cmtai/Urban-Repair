import { Button } from "@/components/ui/button"
import { Phone, Calendar, Gift } from "lucide-react"

export function PromotionalBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-red to-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-accent-yellow text-gray-900 px-4 py-2 rounded-full font-semibold mb-6">
            <Gift className="w-5 h-5" />
            <span>Limited Time Offer</span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
            Get 20% Off Your First Service
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto text-pretty">
            New customers save big on any appliance repair or maintenance service. Book now and experience the HomeServe
            Pro difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-brand-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Now & Save
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-red px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px] bg-transparent"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call for Quote
            </Button>
          </div>

          <div className="mt-8 text-sm text-red-100">
            *Valid for new customers only. Cannot be combined with other offers. Expires in 30 days.
          </div>
        </div>
      </div>
    </section>
  )
}
