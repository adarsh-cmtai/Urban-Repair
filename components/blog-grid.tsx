import Link from 'next/link';
import { Calendar, User, ArrowRight } from "lucide-react";

export function BlogGrid({ articles }: { articles: any[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                </div>

                <div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>
                        <span className="font-medium">{article.readTime}</span>
                    </div>

                    <Link href={`/blog/${article.slug}`}>
                        <button className="flex items-center gap-2 text-brand-red font-medium hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* You can implement pagination or a "Load More" button here later */}
        {/* <div className="text-center mt-12">
          <button className="bg-brand-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Load More Articles
          </button>
        </div> */}
      </div>
    </section>
  )
}