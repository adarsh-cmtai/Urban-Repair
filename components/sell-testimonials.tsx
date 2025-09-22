import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function SellTestimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Banjara Hills",
      appliance: "LG Refrigerator",
      amount: "₹18,500",
      rating: 5,
      review:
        "Excellent service! Got the best price for my 3-year-old refrigerator. The team was professional and the pickup was on time. Highly recommended!",
      image: "/customer-rajesh-kumar.jpg",
    },
    {
      name: "Priya Sharma",
      location: "Jubilee Hills",
      appliance: "Samsung AC",
      amount: "₹22,000",
      rating: 5,
      review:
        "I was skeptical at first, but they offered much more than other buyers. The entire process was smooth and transparent. Got paid instantly!",
      image: "/customer-priya-sharma.jpg",
    },
    {
      name: "Mohammed Ali",
      location: "Gachibowli",
      appliance: "Whirlpool Washing Machine",
      amount: "₹12,800",
      rating: 5,
      review:
        "Quick and hassle-free experience. They picked up my old washing machine and paid me on the spot. Great service and fair pricing!",
      image: "/customer-mohammed-ali.jpg",
    },
    {
      name: "Sunita Reddy",
      location: "Kondapur",
      appliance: "Multiple Appliances",
      amount: "₹35,000",
      rating: 5,
      review:
        "Sold my entire kitchen setup when moving abroad. They handled everything professionally and gave me the best rates. Saved me so much time!",
      image: "/customer-sunita-reddy.jpg",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-brand-red opacity-20" />
                </div>

                <p className="text-gray-700 mb-6 text-pretty leading-relaxed">"{testimonial.review}"</p>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Sold: {testimonial.appliance}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-red">{testimonial.amount}</p>
                    <p className="text-sm text-gray-600">Received</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-red mb-2">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-red mb-2">₹2.5 Cr+</div>
                <div className="text-gray-600">Total Payouts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-red mb-2">4.8/5</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
