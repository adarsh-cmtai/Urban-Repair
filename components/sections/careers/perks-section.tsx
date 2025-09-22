import { HeartHandshake, TrendingUp, ShieldCheck, BookOpen, Smile, Coffee } from "lucide-react"

const perks = [
  {
    icon: ShieldCheck,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family's peace of mind.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "We invest in your future with clear paths for advancement and skill development.",
  },
  {
    icon: BookOpen,
    title: "Paid Training",
    description: "Continuous learning opportunities to help you master your craft and stay ahead.",
  },
  {
    icon: HeartHandshake,
    title: "Positive Culture",
    description: "A supportive, respectful, and collaborative work environment where everyone matters.",
  },
  {
    icon: Smile,
    title: "Performance Bonus",
    description: "We recognize and reward your hard work and dedication with competitive bonuses.",
  },
  {
    icon: Coffee,
    title: "Team Events",
    description: "Regular team outings, lunches, and events to build strong bonds and have fun.",
  },
]

export function PerksSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Why You'll Love Working With Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We empower our team to do their best work by providing exceptional benefits and a thriving culture.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map(perk => (
            <div key={perk.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-red-100 text-brand-red rounded-lg">
                <perk.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800">{perk.title}</h3>
                <p className="mt-1 text-neutral-500">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}