import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Heart, Award, Users, Lightbulb } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "We stand behind our work with comprehensive warranties and transparent pricing. Your trust is our most valuable asset.",
    },
    {
      icon: Clock,
      title: "Punctuality",
      description:
        "We respect your time. Our technicians arrive on schedule and complete work within promised timeframes.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make is centered around providing the best possible experience for our customers.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "We use only genuine parts, premium materials, and follow industry best practices in all our services.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our certified technicians and designers undergo continuous training to stay updated with latest technologies.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new technologies and methods to provide more efficient and effective solutions for your home.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 text-pretty">
            The principles that guide everything we do and shape our commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardContent className="p-8 text-center">
                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <value.icon className="h-8 w-8 text-brand-red group-hover:text-white" />
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-4">{value.title}</h3>

                <p className="text-gray-600 text-pretty">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
