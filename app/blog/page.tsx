import { BlogHero } from "@/components/blog-hero"
import { BlogGrid } from "@/components/blog-grid"
import { BlogCategories } from "@/components/blog-categories"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BlogHero />
        <BlogCategories />
        <BlogGrid />
        <NewsletterSignup />
      </main>
      <Footer/>
    </div>
  )
}
