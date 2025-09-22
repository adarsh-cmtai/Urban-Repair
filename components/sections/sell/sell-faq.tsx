const faqs = [
  {
    question: "Is the online quote guaranteed?",
    answer: "The online quote is a close estimate based on the details you provide. The final offer is confirmed by our technician after a quick physical inspection at your doorstep to verify the condition.",
  },
  {
    question: "Can I sell an appliance that is not working?",
    answer: "Absolutely! We buy appliances in any condition, working or not. Just select the 'Needs Repair' option in the quote calculator. We will offer a fair price based on its value for parts and recycling.",
  },
  {
    question: "How and when do I get paid?",
    answer: "You get paid instantly, on the spot. As soon as you accept the final offer and our team picks up the appliance, we will transfer the money via your preferred method: UPI, bank transfer, or cash.",
  },
  {
    question: "Is the pickup service really free?",
    answer: "Yes, our doorstep pickup service is 100% free across all our serviceable areas in Hyderabad. There are no hidden transportation or labor charges.",
  },
]

export function SellFAQ() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            Have more questions? We have answers.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-50 p-6 rounded-lg border border-gray-200"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-neutral-800 list-none">
                {faq.question}
                <span className="transition-transform duration-300 group-open:rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </span>
              </summary>
              <p className="mt-4 text-neutral-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}