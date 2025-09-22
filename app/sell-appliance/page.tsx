import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SellHero } from "@/components/sections/sell/sell-hero"
import { QuoteCalculator } from "@/components/sections/sell/quote-calculator"
import { HowItWorks } from "@/components/sections/sell/how-it-works"
import { ComparisonSection } from "@/components/sections/sell/comparison-section"
import { PayoutTicker } from "@/components/sections/sell/payout-ticker"
import { EcoFriendlySection } from "@/components/sections/sell/eco-friendly-section"
import { SellTestimonials } from "@/components/sections/sell/sell-testimonials"
import { SellFAQ } from "@/components/sections/sell/sell-faq"

export default function SellAppliancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SellHero />
        <QuoteCalculator />
        <HowItWorks />
        <ComparisonSection />
        <PayoutTicker />
        <EcoFriendlySection />
        <SellTestimonials />
        <SellFAQ />
      </main>
      <Footer />
    </div>
  )
}