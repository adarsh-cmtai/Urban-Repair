import { Card, CardContent } from "@/components/ui/card"
import { Shield, TrendingUp, Clock, Users, Award, Headphones } from "lucide-react"

export function WhySellWithUs() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Best Market Rates",
      description: "We offer the highest prices in the market based on real-time valuations and demand.",
      highlight: "Up to 30% more than competitors",
    },
    {
      icon: Clock,
      title: "Quick & Convenient",
      description: "Same-day pickup and instant payment. No waiting, no hassles, no paperwork.",
      highlight: "30-minute response time",
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "Licensed, insured, and verified team. Your safety and security is our priority.",
      highlight: "Fully insured transactions",
    },
    {
      icon: Users,
      title: "Trusted by 50,000+",
      description: "Join thousands of satisfied customers who have sold their appliances with us.",
      highlight: "4.8/5 customer rating",
    },
    {
      icon: Award,
      title: "All Brands Accepted",
      description: "We buy all brands and models - working or non-working. No appliance is too old.",
      highlight: "Any condition accepted",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated customer support team available 24/7 to assist you throughout the process.",
      highlight: "24/7 customer support",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 text-pretty max-w-3xl mx-auto">
            We're not just another appliance buyer. We're your trusted partner in getting the best value for your
            appliances with complete peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="p-8">
                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <benefit.icon className="h-8 w-8 text-brand-red group-hover:text-white" />
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3 text-center">{benefit.title}</h3>

                <p className="text-gray-600 mb-4 text-center text-pretty">{benefit.description}</p>

                <div className="bg-accent-yellow text-black px-4 py-2 rounded-lg text-sm font-semibold text-center">
                  {benefit.highlight}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-brand-red to-red-700 rounded-2xl p-8 text-white text-center">
          <h3 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-red-100 mb-6 text-lg">
            Our appliance experts are here to help you get the best deal for your appliances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
              Chat with Expert
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-red transition-colors">
              Call Now: +91 9876543210
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
