import { MapPin, CheckCircle } from "lucide-react"

export function ServiceAreas() {
  const areas = [
    "Madhapur",
    "Gachibowli",
    "Kondapur",
    "Kukatpally",
    "Ameerpet",
    "Begumpet",
    "Secunderabad",
    "Jubilee Hills",
    "Banjara Hills",
    "Hitech City",
    "Miyapur",
    "Uppal",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">Service Areas in Hyderabad</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide reliable appliance repair services across all major areas in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{area}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-brand-red">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">Don't see your area? Call us to check availability!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
