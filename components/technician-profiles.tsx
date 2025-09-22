import { Card, CardContent } from "@/components/ui/card"
import { Star, Award, Clock } from "lucide-react"

export function TechnicianProfiles() {
  const technicians = [
    {
      name: "Rajesh Kumar",
      experience: "8+ Years",
      specialization: "AC & Refrigeration Expert",
      image: "/technician-rajesh-kumar-profile.jpg",
      rating: 4.9,
      completedJobs: 1200,
    },
    {
      name: "Suresh Reddy",
      experience: "6+ Years",
      specialization: "Washing Machine Specialist",
      image: "/technician-suresh-reddy-profile.jpg",
      rating: 4.8,
      completedJobs: 950,
    },
    {
      name: "Vikram Singh",
      experience: "10+ Years",
      specialization: "All Appliances Expert",
      image: "/technician-vikram-singh-profile.jpg",
      rating: 4.9,
      completedJobs: 1500,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Meet Our Certified Technicians
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals brings expertise and reliability to every service call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technicians.map((tech, index) => (
            <Card key={index} className="rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <img
                  src={tech.image || "/placeholder.svg"}
                  alt={tech.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-brand-red font-medium mb-4">{tech.specialization}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{tech.experience} Experience</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-accent-yellow fill-current" />
                    <span className="text-sm text-gray-600">{tech.rating} Rating</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{tech.completedJobs}+ Jobs Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
