import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteriorHero } from "@/components/interior-hero"
import { ServicesOffered } from "@/components/services-offered"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { DesignProcess } from "@/components/design-process"
import { InteriorTestimonials } from "@/components/interior-testimonials"
import { ConsultationForm } from "@/components/consultation-form"

export default function InteriorSolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <InteriorHero />
        <ServicesOffered />
        <PortfolioGallery />
        <DesignProcess />
        <InteriorTestimonials />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  )
}
