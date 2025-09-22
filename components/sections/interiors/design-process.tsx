import { Lightbulb, Ruler, Wrench, Sparkles } from "lucide-react"

const processSteps = [
  {
    step: "01",
    title: "Consult & Conceptualize",
    description: "We start by understanding your vision, lifestyle, and requirements through an in-depth consultation.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Design & Visualize",
    description: "Our designers create detailed 2D layouts and realistic 3D renders, allowing you to see your space before we build.",
    icon: Ruler,
  },
  {
    step: "03",
    title: "Build & Execute",
    description: "Our skilled craftsmen use premium materials and precision techniques to bring the approved design to life.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Deliver & Delight",
    description: "We conduct a final quality check and hand over your beautifully transformed space, ready for you to enjoy.",
    icon: Sparkles,
  },
]

export function DesignProcess() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Our Signature Design Process</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            A seamless journey from idea to reality, ensuring quality and transparency at every step.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map(item => (
            <div key={item.step} className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-brand-red rounded-full mx-auto">
                <item.icon className="w-8 h-8" />
              </div>
              <p className="mt-6 font-bold text-brand-red">{`Step ${item.step}`}</p>
              <h3 className="mt-2 text-xl font-bold font-montserrat text-neutral-800">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}