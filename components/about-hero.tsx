import { Button } from "@/components/ui/button"
import { Award, Users, Clock, Heart } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-red to-red-700 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Your Trusted <span className="text-accent-yellow">Home Service</span> Partner
            </h1>
            <p className="text-xl mb-8 text-red-100 text-pretty">
              For over 15 years, we've been transforming homes across Hyderabad with reliable appliance repair, seamless
              buying & selling services, and stunning interior design solutions.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-accent-yellow rounded-full p-2">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-red-100">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent-yellow rounded-full p-2">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-red-100">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent-yellow rounded-full p-2">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-red-100">Support Available</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent-yellow rounded-full p-2">
                  <Heart className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-red-100">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-accent-yellow text-black hover:bg-yellow-500 font-semibold">
              Learn Our Story
            </Button>
          </div>

          <div className="relative">
            <img
              src="/about-us-team-photo-home-services.jpg"
              alt="Our professional team"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 rounded-2xl shadow-xl">
              <div className="text-brand-red text-2xl font-bold">Since 2008</div>
              <div className="text-sm font-medium">Serving Hyderabad</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
