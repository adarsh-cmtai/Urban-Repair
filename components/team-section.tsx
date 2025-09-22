import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"

export function TeamSection() {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      experience: "15+ years",
      specialization: "Business Strategy & Operations",
      image: "/team-rajesh-kumar-founder-ceo.jpg",
      bio: "Started the company with a vision to revolutionize home services in Hyderabad. Expert in appliance technology and business operations.",
    },
    {
      name: "Priya Sharma",
      position: "Head of Interior Design",
      experience: "12+ years",
      specialization: "Residential & Commercial Interiors",
      image: "/team-priya-sharma-interior-head.jpg",
      bio: "Award-winning interior designer with expertise in modern and traditional Indian design aesthetics. Leads our creative team.",
    },
    {
      name: "Vikram Reddy",
      position: "Technical Operations Manager",
      experience: "10+ years",
      specialization: "Appliance Repair & Maintenance",
      image: "/team-vikram-reddy-technical-manager.jpg",
      bio: "Certified technician with deep expertise in all major appliance brands. Ensures quality standards across all repair services.",
    },
    {
      name: "Anita Patel",
      position: "Customer Experience Manager",
      experience: "8+ years",
      specialization: "Customer Relations & Quality Assurance",
      image: "/team-anita-patel-customer-manager.jpg",
      bio: "Passionate about customer satisfaction. Manages our customer support team and ensures every interaction exceeds expectations.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 text-pretty">
            The experienced professionals who lead our mission to transform homes across Hyderabad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-brand-red font-semibold mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {member.experience} • {member.specialization}
                  </p>
                  <p className="text-gray-700 text-sm text-pretty">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
