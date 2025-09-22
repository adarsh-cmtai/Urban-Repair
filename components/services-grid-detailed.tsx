import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Refrigerator, Wind, Zap, Microwave, Droplets, Wrench, ArrowRight } from "lucide-react"

export function ServicesGrid() {
  const services = [
    {
      id: "ac-repair",
      icon: Wind,
      title: "AC Repair & Service",
      description:
        "Complete air conditioning solutions including repair, maintenance, installation, and gas refilling.",
      image: "/ac-repair-service-professional-technician.jpg",
      features: ["Same-day service", "All brands covered", "1-year warranty", "Free diagnosis"],
      startingPrice: "₹499",
    },
    {
      id: "refrigerator-repair",
      icon: Refrigerator,
      title: "Refrigerator Repair",
      description: "Expert refrigerator repair for cooling issues, compressor problems, and electrical faults.",
      image: "/refrigerator-repair-technician-working.jpg",
      features: ["Genuine parts", "Quick diagnosis", "30-day warranty", "All models"],
      startingPrice: "₹399",
    },
    {
      id: "washing-machine-repair",
      icon: Zap,
      title: "Washing Machine Repair",
      description: "Professional washing machine repair for all types including front-load and top-load models.",
      image: "/washing-machine-repair-service.jpg",
      features: ["Expert technicians", "Original spares", "Quick turnaround", "Best prices"],
      startingPrice: "₹349",
    },
    {
      id: "microwave-repair",
      icon: Microwave,
      title: "Microwave Repair",
      description: "Specialized microwave oven repair services for heating issues and electrical problems.",
      image: "/microwave-repair-professional-service.jpg",
      features: ["Safety certified", "Quick fixes", "Affordable rates", "Quality assured"],
      startingPrice: "₹299",
    },
    {
      id: "water-purifier-service",
      icon: Droplets,
      title: "Water Purifier Service",
      description: "Complete water purifier maintenance including filter replacement and system cleaning.",
      image: "/water-purifier-service-maintenance.jpg",
      features: ["Filter replacement", "System cleaning", "Quality testing", "Regular maintenance"],
      startingPrice: "₹199",
    },
    {
      id: "general-appliance-repair",
      icon: Wrench,
      title: "General Appliance Repair",
      description: "Expert repair services for all types of home appliances including small and large appliances.",
      image: "/general-appliance-repair-service.jpg",
      features: ["All appliances", "Expert diagnosis", "Fair pricing", "Quality service"],
      startingPrice: "₹249",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                className="group overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button className="w-full bg-brand-red hover:bg-brand-red/90 text-white">
                        View Details & Pricing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-gray-900">{service.title}</h3>
                      <p className="text-brand-red font-semibold">Starting from {service.startingPrice}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/services/${service.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white bg-transparent"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
