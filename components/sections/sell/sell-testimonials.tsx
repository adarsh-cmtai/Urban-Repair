import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sunita Iyer",
    location: "Kondapur",
    quote: "The entire process was unbelievably simple. I got a quote online, they came the next day, and I got paid via UPI on the spot. So much better than dealing with endless calls!",
    rating: 5,
    image: "/path-to-customer-1.jpg",
  },
  {
    name: "Rajesh Kumar",
    location: "Hitech City",
    quote: "I was surprised by the fair price they offered for my 4-year-old AC. The pickup team was professional and quick. Highly recommended for anyone looking to sell old electronics.",
    rating: 5,
    image: "/path-to-customer-2.jpg",
  },
  {
    name: "Priya Singh",
    location: "Madhapur",
    quote: "I loved the transparency. The online quote was very close to the final offer. No hidden deductions or last-minute haggling. A very trustworthy service.",
    rating: 5,
    image: "/path-to-customer-3.jpg",
  },
]

export function SellTestimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            Trusted By Thousands of Sellers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            Hear what our happy customers have to say about our seamless selling experience.
          </p>
        </div>
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200/80">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent-yellow fill-accent-yellow" />
                ))}
              </div>
              <p className="text-neutral-600 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold text-neutral-800">{testimonial.name}</div>
                  <div className="text-sm text-neutral-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}