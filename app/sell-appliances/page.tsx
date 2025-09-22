import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SellHero } from "@/components/sell-hero"
import { SellForm } from "@/components/sell-form"
import { PriceEstimator } from "@/components/price-estimator"
import { SellProcess } from "@/components/sell-process"
import { WhySellWithUs } from "@/components/why-sell-with-us"
import { SellTestimonials } from "@/components/sell-testimonials"

export default function SellAppliancesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SellHero />
        <SellForm />
        <PriceEstimator />
        <SellProcess />
        <WhySellWithUs />
        <SellTestimonials />
      </main>
      <Footer />
    </div>
  )
}
