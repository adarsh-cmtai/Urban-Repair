import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Users, Zap } from "lucide-react"

export function AchievementsSection() {
  const achievements = [
    {
      icon: Trophy,
      title: "Best Home Service Provider 2023",
      organization: "Hyderabad Business Awards",
      description: "Recognized for excellence in customer service and innovation in home services sector.",
    },
    {
      icon: Star,
      title: "5-Star Rating on Google",
      organization: "Based on 2,500+ Reviews",
      description: "Consistently rated as the top home service provider by our satisfied customers.",
    },
    {
      icon: Users,
      title: "50,000+ Happy Customers",
      organization: "Across Hyderabad",
      description: "Trusted by families and businesses throughout the city for all their home service needs.",
    },
    {
      icon: Zap,
      title: "ISO 9001:2015 Certified",
      organization: "Quality Management System",
      description: "Certified for maintaining international standards in service quality and customer satisfaction.",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Customers Served" },
    { number: "1,00,000+", label: "Services Completed" },
    { number: "500+", label: "Interior Projects" },
    { number: "98%", label: "Customer Satisfaction" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Our commitment to excellence has been recognized by industry leaders and customers alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="bg-brand-red text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <achievement.icon className="h-8 w-8" />
                </div>

                <div>
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-brand-red font-semibold mb-3">{achievement.organization}</p>
                  <p className="text-gray-600 text-pretty">{achievement.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-red to-red-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="font-montserrat text-2xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-red-100">These numbers represent the trust our customers place in us every day.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-accent-yellow mb-2">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
