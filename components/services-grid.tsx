import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Refrigerator, Zap, Droplets, Wind, Microwave, ArrowRight } from "lucide-react"

export function ServicesGrid() {
  const services = [
    {
      icon: Refrigerator,
      title: "Refrigerator Repair",
      description: "Expert diagnosis and repair for all refrigerator brands and models.",
      color: "bg-blue-50 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Wind,
      title: "AC Service & Repair",
      description: "Complete AC maintenance, repair, and installation services.",
      color: "bg-green-50 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Zap,
      title: "Washing Machine Fix",
      description: "Quick fixes for all washing machine issues and maintenance.",
      color: "bg-purple-50 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Microwave,
      title: "Microwave Repair",
      description: "Professional microwave repair and replacement services.",
      color: "bg-orange-50 hover:bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Droplets,
      title: "Water Purifier Service",
      description: "Installation, maintenance, and repair of water purification systems.",
      color: "bg-cyan-50 hover:bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: Wrench,
      title: "General Appliance Repair",
      description: "Expert repair services for all types of home appliances.",
      color: "bg-red-50 hover:bg-red-100",
      iconColor: "text-red-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Expert Care for Every Appliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            From emergency repairs to routine maintenance, our certified technicians handle it all with precision and
            care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-2xl border-0 ${service.color}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button
                    variant="ghost"
                    className="text-brand-red hover:text-brand-red hover:bg-brand-red/10 p-0 h-auto font-semibold group"
                  >
                    Explore Service
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
