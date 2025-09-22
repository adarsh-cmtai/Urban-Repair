import { Phone, Wrench, CheckCircle, Star } from "lucide-react"

export function ServiceProcess() {
  const steps = [
    {
      icon: Phone,
      title: "Book Your Service",
      description: "Call us or book online. We'll schedule a convenient time for you.",
      color: "bg-blue-500",
    },
    {
      icon: Wrench,
      title: "Expert Diagnosis",
      description: "Our certified technician arrives and diagnoses the issue thoroughly.",
      color: "bg-green-500",
    },
    {
      icon: CheckCircle,
      title: "Quality Repair",
      description: "We fix the problem using genuine parts and proven techniques.",
      color: "bg-purple-500",
    },
    {
      icon: Star,
      title: "Service Guarantee",
      description: "We test everything and provide warranty on our work.",
      color: "bg-brand-red",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">Our Service Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a systematic approach to ensure quality service and customer satisfaction every time.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
