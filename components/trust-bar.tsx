import { Star, Clock, Users, Award } from "lucide-react"

export function TrustBar() {
  const metrics = [
    {
      icon: Award,
      number: "15+",
      text: "Years of Trust",
    },
    {
      icon: Users,
      number: "10,000+",
      text: "Homes Serviced",
    },
    {
      icon: Star,
      number: "4.9/5 ★",
      text: "Customer Rating",
    },
    {
      icon: Clock,
      number: "30-Min",
      text: "Response Time",
    },
  ]

  return (
    <section className="py-12 bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-red" />
                  </div>
                </div>
                <div className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-1">{metric.number}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{metric.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
