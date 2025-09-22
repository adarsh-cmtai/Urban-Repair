import { Recycle, Wrench, HeartHandshake } from "lucide-react"

const actions = [
  {
    icon: Wrench,
    title: "Professional Refurbishing",
    description: "Appliances in good condition are expertly refurbished by our technicians, extending their life for a new home.",
  },
  {
    icon: Recycle,
    title: "Responsible Recycling",
    description: "Older, non-functional appliances are sent to certified e-waste partners for safe and eco-friendly recycling.",
  },
  {
    icon: HeartHandshake,
    title: "Community Donations",
    description: "Select functional items are donated to local charities and NGOs, helping those in need within our community.",
  },
]

export function EcoFriendlySection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            What Happens to Your Appliance?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We believe in sustainability. Your old appliance gets a new purpose, not just a new owner.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-12 text-center">
          {actions.map((action, index) => (
            <div key={index}>
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-brand-red rounded-full mx-auto">
                <action.icon className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-bold font-montserrat text-neutral-800">{action.title}</h3>
              <p className="mt-2 text-neutral-500">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}