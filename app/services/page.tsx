import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { ServicesGrid } from "@/components/services-grid-detailed"
import { ServiceAreas } from "@/components/service-areas"
import { ServiceGuarantee } from "@/components/service-guarantee"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ServiceGuarantee />
        <ServiceAreas />
      </main>
      <Footer />
    </div>
  )
}
