import { MapPin, CheckCircle } from "lucide-react"

export function ServiceAreaMap() {
  const areas = [
    "Madhapur",
    "Gachibowli",
    "Kondapur",
    "Kukatpally",
    "Ameerpet",
    "Begumpet",
    "Secunderabad",
    "Jubilee Hills",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-6 text-balance">
              Serving All of Hyderabad
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We provide comprehensive home services across Hyderabad and surrounding areas. Our strategically located
              service centers ensure quick response times wherever you are.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {areas.map((area, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{area}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-brand-red" />
                <h3 className="font-heading font-semibold text-lg text-gray-900">Not sure if we serve your area?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Enter your pincode and we'll let you know our availability and estimated arrival time.
              </p>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                />
                <button className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-red/90 transition-colors font-semibold">
                  Check
                </button>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
              <img
                src="/hyderabad-city-map-with-service-areas-highlighted.jpg"
                alt="Hyderabad service area map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-red/20 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <MapPin className="w-8 h-8 text-brand-red mx-auto mb-2" />
                  <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">Service Coverage</h3>
                  <p className="text-gray-600 text-sm">Complete Hyderabad Metro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
