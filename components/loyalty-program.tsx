import { Star, Gift, Crown, Zap } from "lucide-react"

export function LoyaltyProgram() {
  const tiers = [
    {
      name: "Bronze",
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      benefits: ["5% discount on all services", "Priority booking", "Free annual maintenance reminder"],
      requirement: "₹5,000+ spent",
    },
    {
      name: "Silver",
      icon: Gift,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      benefits: ["10% discount on all services", "Free emergency consultation", "Extended warranty on repairs"],
      requirement: "₹15,000+ spent",
    },
    {
      name: "Gold",
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      benefits: ["15% discount on all services", "Free annual AC service", "24/7 priority support"],
      requirement: "₹30,000+ spent",
    },
    {
      name: "Platinum",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      benefits: ["20% discount on all services", "Free interior consultation", "Exclusive member events"],
      requirement: "₹50,000+ spent",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loyalty Rewards Program</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The more you use our services, the more you save. Join our loyalty program and unlock exclusive benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => {
            const IconComponent = tier.icon
            return (
              <div
                key={tier.name}
                className={`${tier.bgColor} ${tier.borderColor} border-2 rounded-2xl p-6 text-center`}
              >
                <div className={`${tier.color} mb-4`}>
                  <IconComponent className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-4 font-medium">{tier.requirement}</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-red rounded-full mt-2 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-brand-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Join Loyalty Program
          </button>
        </div>
      </div>
    </section>
  )
}
