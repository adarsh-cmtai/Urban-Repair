import { Calendar, User, ArrowRight } from "lucide-react"

export function BlogGrid() {
  const articles = [
    {
      id: 1,
      title: "10 Signs Your AC Needs Professional Repair",
      excerpt:
        "Don't wait for a complete breakdown. Learn the warning signs that indicate your air conditioner needs immediate attention from our experts.",
      category: "Appliance Care",
      author: "Rajesh Kumar",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/blog-ac-repair-signs.jpg",
    },
    {
      id: 2,
      title: "Modern Kitchen Design Trends for 2024",
      excerpt:
        "Discover the latest kitchen design trends that combine functionality with style. From smart appliances to sustainable materials.",
      category: "Interior Design",
      author: "Priya Sharma",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "/blog-kitchen-trends.jpg",
    },
    {
      id: 3,
      title: "How to Extend Your Washing Machine's Lifespan",
      excerpt:
        "Simple maintenance tips that can add years to your washing machine's life and save you money on repairs and replacements.",
      category: "Maintenance Tips",
      author: "Amit Patel",
      date: "March 10, 2024",
      readTime: "4 min read",
      image: "/blog-washing-machine-care.jpg",
    },
    {
      id: 4,
      title: "Smart Home Integration: A Complete Guide",
      excerpt:
        "Transform your home with smart technology. Learn about the best smart appliances and how to integrate them seamlessly.",
      category: "Buying Guides",
      author: "Sneha Reddy",
      date: "March 8, 2024",
      readTime: "8 min read",
      image: "/blog-smart-home.jpg",
    },
    {
      id: 5,
      title: "Refrigerator Not Cooling? Quick Fixes",
      excerpt:
        "Before calling for service, try these troubleshooting steps that might solve your refrigerator cooling problems instantly.",
      category: "Troubleshooting",
      author: "Vikram Singh",
      date: "March 5, 2024",
      readTime: "3 min read",
      image: "/blog-fridge-troubleshooting.jpg",
    },
    {
      id: 6,
      title: "Creating a Cozy Living Room on a Budget",
      excerpt:
        "Interior design doesn't have to break the bank. Discover affordable ways to transform your living space into a cozy retreat.",
      category: "Interior Design",
      author: "Anita Gupta",
      date: "March 3, 2024",
      readTime: "6 min read",
      image: "/blog-budget-living-room.jpg",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={`/abstract-geometric-shapes.png?height=240&width=400&query=${encodeURIComponent(article.title)}`}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <span className="font-medium">{article.readTime}</span>
                </div>

                <button className="flex items-center gap-2 text-brand-red font-medium hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-brand-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  )
}
