import { Search } from "lucide-react"

export function ServicesHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
          Expert Care for Every Appliance
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto text-pretty">
          Professional repair and maintenance services for all your home appliances. Quick, reliable, and affordable
          solutions.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for your appliance or service..."
              className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none bg-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
