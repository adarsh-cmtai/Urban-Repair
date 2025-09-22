import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Home, Palette, Target } from "lucide-react"

export function CompanyStory() {
  const milestones = [
    {
      year: "2008",
      title: "The Beginning",
      description:
        "Started as a small appliance repair service with just 2 technicians and a vision to provide honest, reliable home services.",
      icon: Wrench,
    },
    {
      year: "2012",
      title: "Expansion",
      description:
        "Expanded to include appliance buying & selling services, helping customers upgrade their homes affordably.",
      icon: Home,
    },
    {
      year: "2016",
      title: "Interior Design",
      description:
        "Launched our interior design division, bringing complete home transformation services to our customers.",
      icon: Palette,
    },
    {
      year: "2024",
      title: "Market Leader",
      description:
        "Now serving 50,000+ customers across Hyderabad with 100+ skilled professionals and cutting-edge technology.",
      icon: Target,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 text-pretty max-w-3xl mx-auto">
            From humble beginnings to becoming Hyderabad's most trusted home service provider, our story is built on
            trust, quality, and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {milestones.map((milestone, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 relative">
              <CardContent className="p-8 text-center">
                <div className="bg-brand-red text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <milestone.icon className="h-8 w-8" />
                </div>

                <div className="bg-accent-yellow text-black px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  {milestone.year}
                </div>

                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>

                <p className="text-gray-600 text-pretty">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-montserrat text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6 text-pretty">
                To make every home in Hyderabad a better place to live by providing exceptional repair services,
                facilitating smart appliance upgrades, and creating beautiful interior spaces that reflect our
                customers' dreams.
              </p>
              <p className="text-gray-600 text-pretty">
                We believe that your home should be your sanctuary - a place where every appliance works perfectly,
                every space is beautifully designed, and every moment is comfortable. That's why we've built a
                comprehensive service ecosystem that takes care of all your home needs under one roof.
              </p>
            </div>

            <div className="relative">
              <img
                src="/our-mission-home-transformation.jpg"
                alt="Home transformation"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
