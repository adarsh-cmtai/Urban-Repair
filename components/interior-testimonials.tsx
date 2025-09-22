import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function InteriorTestimonials() {
  const testimonials = [
    {
      name: "Arjun & Meera Patel",
      location: "Banjara Hills Villa",
      project: "Complete Home Interior",
      rating: 5,
      review:
        "Absolutely stunning transformation! The team understood our vision perfectly and delivered beyond our expectations. Every detail was carefully planned and executed. Our home now feels like a luxury resort.",
      image: "/client-arjun-meera-patel.jpg",
      beforeAfter: "/before-after-banjara-hills-villa.jpg",
    },
    {
      name: "Rohit Sharma",
      location: "Gachibowli Apartment",
      project: "Living Room & Kitchen",
      rating: 5,
      review:
        "The modular kitchen design is both beautiful and highly functional. The living room transformation created so much more space and light. Professional team with excellent attention to detail.",
      image: "/client-rohit-sharma.jpg",
      beforeAfter: "/before-after-gachibowli-apartment.jpg",
    },
    {
      name: "Kavitha Reddy",
      location: "Jubilee Hills Home",
      project: "Master Bedroom Suite",
      rating: 5,
      review:
        "My bedroom is now my favorite space in the house! The walk-in wardrobe and reading corner are exactly what I dreamed of. The color scheme and lighting create such a peaceful atmosphere.",
      image: "/client-kavitha-reddy.jpg",
      beforeAfter: "/before-after-jubilee-hills-bedroom.jpg",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-lg text-gray-600 text-pretty">
            See how we've transformed homes and lives with our interior design expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.location}</p>
                    <p className="text-sm text-brand-red font-medium">{testimonial.project}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-brand-red opacity-20" />
                </div>

                <p className="text-gray-700 mb-6 text-pretty leading-relaxed">"{testimonial.review}"</p>

                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={testimonial.beforeAfter || "/placeholder.svg"}
                    alt="Before and after transformation"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Before & After
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-brand-red to-red-700 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-accent-yellow mb-2">500+</div>
                <div className="text-red-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-yellow mb-2">98%</div>
                <div className="text-red-100">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-yellow mb-2">15+</div>
                <div className="text-red-100">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
