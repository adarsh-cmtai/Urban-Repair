import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/sections/careers/careers-hero"
import { PerksSection } from "@/components/sections/careers/perks-section"
import { OpenPositions } from "@/components/sections/careers/open-positions"
import { CultureGallery } from "@/components/sections/careers/culture-gallery"
import { EmployeeTestimonials } from "@/components/sections/careers/employee-testimonials"
import { ApplicationProcess } from "@/components/sections/careers/application-process"
import { JoinUsSection } from "@/components/sections/careers/join-us-section"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CareersHero />
        <PerksSection />
        <OpenPositions />
        <CultureGallery />
        <EmployeeTestimonials />
        <ApplicationProcess />
        <JoinUsSection />
      </main>
      <Footer />
    </div>
  )
}