import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBar } from "@/components/trust-bar"
import { SellApplianceSection } from "@/components/services-grid"
import { WhyChooseUs } from "@/components/why-choose-us"
import { BrandsShowcase } from "@/components/brands-showcase"
import { ServiceAreaMap } from "@/components/service-area-map"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PromotionalBanner } from "@/components/promotional-banner"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SellApplianceSection />
        <HeroSection />
        <TrustBar />
        <WhyChooseUs />
        {/* <BrandsShowcase /> */}
        <ServiceAreaMap />
        <TestimonialsSection />
        <PromotionalBanner />
      </main>
      <Footer />
    </div>
  )
}
