import { Shield, CheckCircle, Clock, Award } from "lucide-react"

export function ServiceGuarantee() {
  return (
    <section className="py-20 bg-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Service Guarantee</span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-balance">
            The Urban Repair Service Guarantee
          </h2>

          <p className="text-xl text-red-100 mb-12 max-w-3xl mx-auto text-pretty">
            We stand behind our work with comprehensive warranties and satisfaction guarantees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">30-Day Warranty</h3>
              <p className="text-red-100 text-sm">All repairs covered for 30 days</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">100% Satisfaction</h3>
              <p className="text-red-100 text-sm">Money-back guarantee</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Genuine Parts</h3>
              <p className="text-red-100 text-sm">Only authentic spare parts used</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">On-Time Service</h3>
              <p className="text-red-100 text-sm">Punctual and reliable</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
