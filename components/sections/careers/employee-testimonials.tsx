const testimonials = [
  {
    name: "Arjun Reddy",
    role: "Senior Technician",
    quote: "The best part about working here is the focus on quality and training. I'm constantly learning new skills, which helps me provide better service and grow in my career.",
    image: "/path-to-employee-1.jpg",
  },
  {
    name: "Sneha Patel",
    role: "Interior Designer",
    quote: "I love the creative freedom and the supportive team. We collaborate on amazing projects, and it's so rewarding to see our clients' dreams come to life.",
    image: "/path-to-employee-2.jpg",
  },
]

export function EmployeeTestimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Hear From Our Team</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200/80">
              <p className="text-neutral-600 italic text-lg">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="h-14 w-14 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold text-neutral-800">{testimonial.name}</div>
                  <div className="text-sm font-semibold text-brand-red">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}