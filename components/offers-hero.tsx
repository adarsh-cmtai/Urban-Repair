import { Percent, Gift, Clock } from "lucide-react"

export function OffersHero() {
  return (
    <section className="bg-gradient-to-br from-accent-yellow to-yellow-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-montserrat text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Exclusive Offers & Deals
          </h1>
          <p className="text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto text-pretty">
            Save big on repairs, appliance purchases, and interior design services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Percent className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Up to 30% Off</h3>
            <p className="text-gray-600">On all repair services this month</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Gift className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Free Installation</h3>
            <p className="text-gray-600">With every appliance purchase</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Clock className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Same Day Service</h3>
            <p className="text-gray-600">Emergency repairs at no extra cost</p>
          </div>
        </div>
      </div>
    </section>
  )
}
