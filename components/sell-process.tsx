import { Card, CardContent } from "@/components/ui/card"
import { Phone, Camera, Truck, IndianRupee } from "lucide-react"

export function SellProcess() {
  const steps = [
    {
      icon: Phone,
      title: "Submit Details",
      description: "Fill out our simple form with your appliance details and upload photos for accurate pricing.",
      time: "2 minutes",
    },
    {
      icon: Camera,
      title: "Get Quote",
      description: "Receive an instant quote via call/SMS. Our expert will verify details and confirm the price.",
      time: "30 minutes",
    },
    {
      icon: Truck,
      title: "Free Pickup",
      description: "Schedule a convenient pickup time. Our team will collect your appliance from your doorstep.",
      time: "Same day",
    },
    {
      icon: IndianRupee,
      title: "Get Paid",
      description: "Receive immediate payment via cash, UPI, or bank transfer after final inspection.",
      time: "Instant",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Selling your appliances has never been easier. Follow these simple steps to get cash for your old
            appliances.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-brand-red" />
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

                <p className="text-gray-600 mb-4 text-pretty">{step.description}</p>

                <div className="bg-accent-yellow text-black px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {step.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-4">Ready to Sell Your Appliance?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who have sold their appliances with us. Get started now and turn
              your old appliances into instant cash!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Start Selling Now
              </button>
              <button className="border-2 border-brand-red text-brand-red px-8 py-3 rounded-lg font-semibold hover:bg-brand-red hover:text-white transition-colors">
                Call: +91 9876543210
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
