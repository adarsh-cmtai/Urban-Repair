import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { CompanyStory } from "@/components/company-story"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { AchievementsSection } from "@/components/achievements-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <CompanyStory />
        <ValuesSection />
        {/* <TeamSection /> */}
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  )
}
