import { ShieldCheck, Receipt, Clock, Users } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified & Trained Experts",
      description: "All our technicians are certified professionals with years of experience and ongoing training.",
    },
    {
      icon: Receipt,
      title: "Transparent Pricing",
      description: "No hidden costs or surprise charges. You know exactly what you're paying for upfront.",
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      description: "Most repairs completed the same day with our efficient scheduling and well-stocked vans.",
    },
    {
      icon: Users,
      title: "Customer-First Approach",
      description: "Your satisfaction is our priority. We don't consider the job done until you're happy.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Why Choose Urban Repair?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            We've built our reputation on trust, quality, and exceptional service that goes beyond just fixing
            appliances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center group-hover:bg-brand-red group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-brand-red group-hover:text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
