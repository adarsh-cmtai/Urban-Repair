import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from '@/components/ui/button';

export function BlogGrid({ articles }: { articles: any[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-2 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl text-red-900 mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay informed with our latest articles, tips, and insights from our team of experts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article._id}
              className="group bg-white rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              <Link href={`/blog/${article.slug}`} className="block overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">{article.excerpt}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <BookOpen className="w-4 h-4" />
                        <span>{article.readTime} read</span>
                    </div>
                    <Link href={`/blog/${article.slug}`} className="group/link inline-flex items-center gap-2 text-red-600 font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* <div className="text-center mt-20">
          <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 font-semibold px-8 h-14 text-lg rounded-xl">
            Load More Articles
          </Button>
        </div> */}
      </div>
    </section>
  )
}