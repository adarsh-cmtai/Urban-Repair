import { HelpCircle, Search } from "lucide-react"

export function FaqHero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <HelpCircle className="w-16 h-16 mx-auto mb-6 text-blue-200" />
        <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 text-balance">Frequently Asked Questions</h1>
        <p className="text-xl lg:text-2xl mb-8 text-blue-100 text-pretty">
          Find quick answers to common questions about our services
        </p>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </section>
  )
}
