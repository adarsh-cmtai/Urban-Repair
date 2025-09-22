import { OffersHero } from "@/components/offers-hero"
import { CurrentOffers } from "@/components/current-offers"
import { LoyaltyProgram } from "@/components/loyalty-program"

export default function OffersPage() {
  return (
    <main>
      <OffersHero />
      <CurrentOffers />
      <LoyaltyProgram />
    </main>
  )
}
