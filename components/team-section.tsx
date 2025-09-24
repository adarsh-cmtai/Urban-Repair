"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "/team-rajesh-kumar-founder-ceo.jpg",
    bio: "Started the company with a vision to revolutionize home services in Hyderabad with trust and technology.",
  },
  {
    name: "Priya Sharma",
    position: "Head of Interior Design",
    image: "/team-priya-sharma-interior-head.jpg",
    bio: "Award-winning designer with expertise in modern and traditional aesthetics, leading our creative team.",
  },
  {
    name: "Vikram Reddy",
    position: "Technical Operations Manager",
    image: "/team-vikram-reddy-technical-manager.jpg",
    bio: "Certified technician with deep expertise in all major appliance brands, ensuring top-quality service.",
  },
  {
    name: "Anita Patel",
    position: "Customer Experience Manager",
    image: "/team-anita-patel-customer-manager.jpg",
    bio: "Passionate about customer satisfaction, ensuring every interaction exceeds expectations.",
  },
]

export function TeamSection() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            The experienced professionals who lead our mission to transform homes across Hyderabad.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <Card className="w-full bg-white rounded-2xl shadow-lg border-0 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <CardContent className="p-0 text-center flex flex-col">
                  <div className="relative">
                    <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="flex-grow p-6">
                    <h3 className="font-heading text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-red-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm text-pretty mb-4">{member.bio}</p>
                  </div>

                  <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-center gap-3">
                      <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}