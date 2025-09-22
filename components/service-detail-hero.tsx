import { Button } from "@/components/ui/button"
import { Shield, Wrench, Clock } from "lucide-react"

interface ServiceDetailHeroProps {
  title: string
  description: string
  image: string
  badges: string[]
  startingPrice: string
}

export function ServiceDetailHero({ title, description, image, badges, startingPrice }: ServiceDetailHeroProps) {
  const badgeIcons = [Shield, Wrench, Clock]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-6 text-balance">{title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {badges.map((badge, index) => {
                const Icon = badgeIcons[index]
                return (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border">
                    <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{badge}</span>
                  </div>
                )
              })}
            </div>

            {/* Pricing and CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="font-heading font-bold text-3xl text-brand-red">{startingPrice}</p>
              </div>
              <Button
                size="lg"
                className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl"
              >
                Schedule Your AC Check-up
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
