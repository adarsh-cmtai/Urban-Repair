import { FaqHero } from "@/components/faq-hero"
import { FaqAccordion } from "@/components/faq-accordion"
import { FaqContact } from "@/components/faq-contact"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FaqHero />
        <FaqAccordion />
        <FaqContact />
      </main>
      <Footer />
    </div>
  )
}
