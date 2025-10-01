import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, User, Clock } from "lucide-react";
import { notFound } from 'next/navigation';

async function getArticle(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/blogs/${slug}`, { cache: 'no-store' });
        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pb-20">
                <div className="relative h-72 sm:h-96">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-8">
                    <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
                        <p className="text-brand-red font-semibold mb-2">{article.category}</p>
                        <h1 className="font-montserrat text-3xl sm:text-5xl font-extrabold text-neutral-800">{article.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 my-6 border-y py-4">
                           <div className="flex items-center gap-2"><User className="w-4 h-4"/>{article.author}</div>
                           <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4"/>
                                {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                           </div>
                           <div className="flex items-center gap-2"><Clock className="w-4 h-4"/>{article.readTime}</div>
                        </div>
                        <div
                            className="prose prose-lg max-w-none prose-h2:font-montserrat prose-img:rounded-lg"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}