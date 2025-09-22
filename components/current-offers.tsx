import { Calendar, Tag, ArrowRight } from "lucide-react"

export function CurrentOffers() {
  const offers = [
    {
      id: 1,
      title: "AC Service Special",
      description: "Complete AC cleaning and maintenance package",
      discount: "25% OFF",
      originalPrice: "₹2,000",
      salePrice: "₹1,500",
      validUntil: "March 31, 2024",
      code: "AC25OFF",
      popular: true,
    },
    {
      id: 2,
      title: "Appliance Bundle Deal",
      description: "Buy any 2 appliances and get free installation",
      discount: "Free Installation",
      originalPrice: "₹5,000",
      salePrice: "FREE",
      validUntil: "April 15, 2024",
      code: "BUNDLE2024",
    },
    {
      id: 3,
      title: "Interior Consultation",
      description: "Professional home design consultation",
      discount: "50% OFF",
      originalPrice: "₹3,000",
      salePrice: "₹1,500",
      validUntil: "March 25, 2024",
      code: "DESIGN50",
    },
    {
      id: 4,
      title: "Washing Machine Repair",
      description: "Complete diagnosis and repair service",
      discount: "20% OFF",
      originalPrice: "₹1,500",
      salePrice: "₹1,200",
      validUntil: "April 10, 2024",
      code: "WASH20",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Current Offers</h2>
          <p className="text-lg text-gray-600">Limited time deals you don't want to miss</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${offer.popular ? "border-brand-red" : "border-gray-200"}`}
            >
              {offer.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-brand-red text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600">{offer.description}</p>
                </div>
                <div className="text-right">
                  <div className="bg-accent-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {offer.discount}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-brand-red">{offer.salePrice}</span>
                  <span className="text-lg text-gray-500 line-through">{offer.originalPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {offer.validUntil}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>Code: {offer.code}</span>
                </div>
              </div>

              <button className="w-full bg-brand-red text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                Claim Offer
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
