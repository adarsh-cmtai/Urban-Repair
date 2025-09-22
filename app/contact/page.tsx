import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { LocationMap } from "@/components/location-map"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <div className="grid lg:grid-cols-2 gap-0">
          <ContactForm />
          <ContactInfo />
        </div>
        <LocationMap />
      </main>
      <Footer />
    </div>
  )
}
