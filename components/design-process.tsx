import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Palette, Hammer, CheckCircle } from "lucide-react"

export function DesignProcess() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Consultation & Planning",
      description: "We start with understanding your vision, lifestyle, and budget requirements.",
      details: ["Initial consultation", "Space assessment", "Requirement analysis", "Budget planning"],
      duration: "1-2 days",
    },
    {
      icon: Palette,
      title: "Design & Visualization",
      description: "Our designers create detailed plans and 3D visualizations of your space.",
      details: ["Concept development", "3D modeling", "Material selection", "Design approval"],
      duration: "5-7 days",
    },
    {
      icon: Hammer,
      title: "Execution & Installation",
      description: "Professional execution with quality materials and skilled craftsmen.",
      details: ["Material procurement", "Site preparation", "Installation work", "Quality checks"],
      duration: "15-30 days",
    },
    {
      icon: CheckCircle,
      title: "Final Handover",
      description: "Final inspection, styling, and handover of your beautifully designed space.",
      details: ["Final inspection", "Styling & decoration", "Client walkthrough", "Warranty handover"],
      duration: "1-2 days",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Design Process</h2>
          <p className="text-lg text-gray-600 text-pretty max-w-3xl mx-auto">
            From initial consultation to final handover, we follow a systematic approach to ensure your dream space
            becomes reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-brand-red" />
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

                <p className="text-gray-600 mb-6 text-pretty">{step.description}</p>

                <ul className="space-y-2 mb-6 text-left">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-brand-red rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="bg-accent-yellow text-black px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {step.duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your interior design needs and create a space that truly reflects your style and
              personality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-brand-red text-brand-red px-8 py-3 rounded-lg font-semibold hover:bg-brand-red hover:text-white transition-colors">
                Call: +91 9876543210
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
