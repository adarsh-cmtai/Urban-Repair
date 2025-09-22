export function BlogCategories() {
  const categories = [
    { name: "All Articles", count: 24, active: true },
    { name: "Appliance Care", count: 8 },
    { name: "Interior Design", count: 6 },
    { name: "Maintenance Tips", count: 5 },
    { name: "Buying Guides", count: 3 },
    { name: "Troubleshooting", count: 2 },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category.active
                  ? "bg-brand-red text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
