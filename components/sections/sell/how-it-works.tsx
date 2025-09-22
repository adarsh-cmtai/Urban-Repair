import { PencilLine, Truck, CircleDollarSign } from "lucide-react"

const steps = [
  {
    icon: PencilLine,
    title: "Get Your Quote Online",
    description: "Fill out our simple form in 60 seconds to get an instant, fair price estimate for your appliance.",
  },
  {
    icon: Truck,
    title: "Schedule Free Pickup",
    description: "Choose a time that works for you. Our professional team will arrive on time for a hassle-free pickup.",
  },
  {
    icon: CircleDollarSign,
    title: "Get Paid Instantly",
    description: "Receive your payment on the spot via UPI, bank transfer, or cash as soon as our team picks up the item.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            Just 3 Simple Steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We've streamlined the entire process to be as fast and easy as possible.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-12 text-center">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-center w-20 h-20 bg-brand-red text-white rounded-full mx-auto">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-bold font-montserrat text-neutral-800">{step.title}</h3>
              <p className="mt-2 text-neutral-500">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full">
                  <svg className="h-20 w-full text-gray-300" fill="none" viewBox="0 0 230 40">
                     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6, 8" d="M1 20 C40 20, 60 0, 115 20 S 190 20, 229 20"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}