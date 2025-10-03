import { BlogHero } from "@/components/blog-hero";
import { BlogGrid } from "@/components/blog-grid";
import { BlogCategories } from "@/components/blog-categories";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

async function getArticles() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/blogs`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Failed to fetch articles:', res.statusText);
            return [];
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BlogHero />
        {/* <BlogCategories /> */}
        <BlogGrid articles={articles} />
        <NewsletterSignup />
      </main>
      <Footer/>
    </div>
  );
}