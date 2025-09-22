export function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-brand-red to-red-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 text-balance">Home Care Tips & Insights</h1>
        <p className="text-xl lg:text-2xl mb-8 text-red-100 max-w-3xl mx-auto text-pretty">
          Expert advice, maintenance tips, and the latest trends in home appliances and interior design
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <span className="text-sm font-medium">Latest Articles</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <span className="text-sm font-medium">Expert Tips</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <span className="text-sm font-medium">Maintenance Guides</span>
          </div>
        </div>
      </div>
    </section>
  )
}
