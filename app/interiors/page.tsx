import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteriorHero } from "@/components/sections/interiors/interior-hero"
import { ProjectGallery } from "@/components/sections/interiors/project-gallery"
import { DesignProcess } from "@/components/sections/interiors/design-process"
import { MaterialsShowcase } from "@/components/sections/interiors/materials-showcase"
import { VirtualTours } from "@/components/sections/interiors/virtual-tours"
import { BeforeAfter } from "@/components/sections/interiors/before-after"
import { LeadDesigner } from "@/components/sections/interiors/lead-designer"
import { ConsultationForm } from "@/components/sections/interiors/consultation-form"

export default function InteriorSolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <InteriorHero />
        <ProjectGallery />
        <DesignProcess />
        <MaterialsShowcase />
        <VirtualTours />
        <BeforeAfter />
        <LeadDesigner />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  )
}