"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqCategories = [
    {
      category: "General Services",
      questions: [
        {
          question: "What areas do you serve in Hyderabad?",
          answer:
            "We provide services across all major areas of Hyderabad including Banjara Hills, Jubilee Hills, Gachibowli, HITEC City, Kondapur, Madhapur, Kukatpally, Secunderabad, and many more. Contact us to confirm service availability in your specific location.",
        },
        {
          question: "How quickly can you respond to emergency repairs?",
          answer:
            "We offer same-day service for emergency repairs. Our technicians can typically reach your location within 2-4 hours of your call, depending on your area and the time of day.",
        },
        {
          question: "Do you provide warranty on your repair services?",
          answer:
            "Yes, we provide a comprehensive warranty on all our repair services. The warranty period varies by service type - typically 30 days for repairs and up to 1 year for part replacements.",
        },
      ],
    },
    {
      category: "Appliance Repairs",
      questions: [
        {
          question: "What brands of appliances do you repair?",
          answer:
            "We repair all major brands including LG, Samsung, Whirlpool, Godrej, Haier, Voltas, Blue Star, and many others. Our technicians are trained to work with both domestic and international brands.",
        },
        {
          question: "How much do appliance repairs typically cost?",
          answer:
            "Repair costs vary depending on the appliance type and issue complexity. We provide free diagnosis and transparent pricing before starting any work. Most repairs range from ₹500 to ₹3,000.",
        },
        {
          question: "Do you use genuine spare parts?",
          answer:
            "Yes, we use only genuine or high-quality compatible spare parts. All parts come with their own warranty, and we maintain a large inventory for quick replacements.",
        },
      ],
    },
    {
      category: "Selling Appliances",
      questions: [
        {
          question: "What condition should my appliance be in to sell?",
          answer:
            "We buy appliances in various conditions - working, partially working, or even non-working. The price depends on the condition, age, and brand of the appliance.",
        },
        {
          question: "How do you determine the price of my appliance?",
          answer:
            "Our experts evaluate your appliance based on brand, model, age, condition, and current market value. We provide instant quotes and ensure fair pricing.",
        },
        {
          question: "Do you provide pickup service for sold appliances?",
          answer:
            "Yes, we provide free pickup service for all appliances purchased from you. Our team will handle the safe removal and transportation.",
        },
      ],
    },
    {
      category: "Interior Design",
      questions: [
        {
          question: "Do you provide 3D design visualization?",
          answer:
            "Yes, we create detailed 3D visualizations of your interior design project so you can see exactly how your space will look before we begin work.",
        },
        {
          question: "What's included in your interior design packages?",
          answer:
            "Our packages include consultation, space planning, 3D visualization, material selection, project management, and installation. We offer both partial and complete home makeover services.",
        },
        {
          question: "How long does an interior design project take?",
          answer:
            "Project timelines vary based on scope and size. A single room typically takes 2-4 weeks, while complete home projects can take 6-12 weeks. We provide detailed timelines during consultation.",
        },
      ],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = categoryIndex * 10 + questionIndex
                const isOpen = openItems.includes(globalIndex)

                return (
                  <div key={questionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
