import { FileText, Users, Handshake } from "lucide-react"

const process = [
  { icon: FileText, title: "Submit Application", description: "Apply to one of our open roles or send us your resume." },
  { icon: Users, title: "Interview Process", description: "Meet with our team for a technical and cultural fit interview." },
  { icon: Handshake, title: "Receive Offer", description: "If you're a great fit, we'll extend an offer to join our team." },
]

export function ApplicationProcess() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Our Hiring Process</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We keep our process simple, transparent, and respectful of your time.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-brand-red rounded-full mx-auto">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-bold font-montserrat text-neutral-800">{step.title}</h3>
              <p className="mt-2 text-neutral-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}