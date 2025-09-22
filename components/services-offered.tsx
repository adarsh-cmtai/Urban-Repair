import { Card, CardContent } from "@/components/ui/card"
import { Home, Sofa, Utensils, Bed, Building, Palette } from "lucide-react"

export function ServicesOffered() {
  const services = [
    {
      icon: Home,
      title: "Complete Home Interiors",
      description: "End-to-end interior design solutions for your entire home with personalized styling.",
      features: ["Space Planning", "Furniture Selection", "Color Coordination", "Lighting Design"],
      price: "Starting ₹2,50,000",
    },
    {
      icon: Sofa,
      title: "Living Room Design",
      description: "Create stunning living spaces that are both functional and aesthetically pleasing.",
      features: ["Seating Arrangement", "Entertainment Units", "Decor Elements", "Storage Solutions"],
      price: "Starting ₹75,000",
    },
    {
      icon: Bed,
      title: "Bedroom Makeover",
      description: "Design peaceful and comfortable bedrooms that promote rest and relaxation.",
      features: ["Wardrobe Design", "Bed Selection", "Lighting Setup", "Storage Optimization"],
      price: "Starting ₹60,000",
    },
    {
      icon: Utensils,
      title: "Modular Kitchen",
      description: "Functional and beautiful kitchen designs with modern appliances and storage.",
      features: ["Cabinet Design", "Appliance Integration", "Counter Selection", "Storage Planning"],
      price: "Starting ₹1,20,000",
    },
    {
      icon: Building,
      title: "Office Interiors",
      description: "Professional workspace design that enhances productivity and company culture.",
      features: ["Workspace Planning", "Meeting Rooms", "Reception Design", "Branding Elements"],
      price: "Starting ₹1,50,000",
    },
    {
      icon: Palette,
      title: "Consultation & Planning",
      description: "Expert advice and detailed planning for your interior design project.",
      features: ["Design Consultation", "3D Visualization", "Material Selection", "Project Timeline"],
      price: "Starting ₹5,000",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Interior Services</h2>
          <p className="text-lg text-gray-600 text-pretty max-w-3xl mx-auto">
            From single rooms to complete homes, we offer comprehensive interior design services tailored to your needs
            and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="p-8">
                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <service.icon className="h-8 w-8 text-brand-red group-hover:text-white" />
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>

                <p className="text-gray-600 mb-6 text-center text-pretty">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-brand-red rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <div className="bg-accent-yellow text-black px-4 py-2 rounded-lg font-semibold mb-4">
                    {service.price}
                  </div>
                  <button className="w-full bg-brand-red text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Get Quote
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
