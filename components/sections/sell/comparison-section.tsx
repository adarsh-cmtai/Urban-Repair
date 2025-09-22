import { CheckCircle2, XCircle } from "lucide-react"

const ourWay = [
  "Instant Online Quote",
  "Free Doorstep Pickup",
  "Verified Professionals",
  "Instant Digital Payment",
  "Transparent Process",
]

const oldWay = [
  "Endless Haggling & Calls",
  "You Have to Transport It",
  "Unknown & Unverified Personnel",
  "Cash Payment Delays",
  "No Price Guarantee",
]

export function ComparisonSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            The Smart Way vs. The Hard Way
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-green-200 shadow-lg">
            <h3 className="text-2xl font-bold font-montserrat text-green-600">Our Way</h3>
            <ul className="mt-6 space-y-4">
              {ourWay.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold font-montserrat text-gray-500">The Old Way</h3>
            <ul className="mt-6 space-y-4">
              {oldWay.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-6 w-6 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}