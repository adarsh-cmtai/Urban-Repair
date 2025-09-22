"use client"

import { useState, useEffect } from "react"
import { Refrigerator, AirVent, Tv, WashingMachine, Award, Star, ThumbsUp, Sparkles } from "lucide-react"

const applianceTypes = [
  { id: "fridge", name: "Refrigerator", icon: Refrigerator },
  { id: "ac", name: "Air Conditioner", icon: AirVent },
  { id: "tv", name: "Television", icon: Tv },
  { id: "washing_machine", name: "Washing Machine", icon: WashingMachine },
]

const conditions = [
  { id: "like_new", name: "Like New", description: "Perfect condition, no scratches.", icon: Award },
  { id: "good", name: "Good", description: "Fully functional, minor cosmetic wear.", icon: ThumbsUp },
  { id: "functional", name: "Functional", description: "Works well, has visible scratches.", icon: Star },
  { id: "needs_repair", name: "Needs Repair", description: "Not working, for parts.", icon: Sparkles },
]

export function QuoteCalculator() {
  const [formData, setFormData] = useState({
    applianceType: "",
    brand: "",
    year: "",
    condition: "",
  })
  const [estimatedPrice, setEstimatedPrice] = useState({ min: 0, max: 0 })
  const [showPrice, setShowPrice] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const { applianceType, brand, year, condition } = formData
    if (applianceType && brand && year && condition) {
      let basePrice = 3000
      if (applianceType === "fridge") basePrice = 5000
      if (applianceType === "ac") basePrice = 8000
      if (applianceType === "tv") basePrice = 7000

      let yearMultiplier = 1 + (parseInt(year) - 2018) * 0.1
      let conditionMultiplier = 1
      if (condition === "like_new") conditionMultiplier = 1.5
      if (condition === "good") conditionMultiplier = 1.1
      if (condition === "functional") conditionMultiplier = 0.8
      if (condition === "needs_repair") conditionMultiplier = 0.3

      const calculatedMax = Math.round((basePrice * yearMultiplier * conditionMultiplier) / 50) * 50
      const calculatedMin = Math.round(calculatedMax * 0.8 / 50) * 50

      setEstimatedPrice({ min: calculatedMin, max: calculatedMax })
      setShowPrice(true)
    } else {
      setShowPrice(false)
    }
  }, [formData])

  return (
    <section id="quote-calculator" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="font-montserrat text-3xl font-bold text-neutral-800">Get Your Free Quote</h2>
              <p className="mt-2 text-neutral-500">Fill in the details below to get an instant estimate.</p>
              <form className="mt-8 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">1. Select Appliance Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {applianceTypes.map(appliance => (
                      <div key={appliance.id}>
                        <input
                          type="radio"
                          id={appliance.id}
                          name="applianceType"
                          value={appliance.id}
                          className="sr-only peer"
                          onChange={() => handleSelect("applianceType", appliance.id)}
                        />
                        <label
                          htmlFor={appliance.id}
                          className="flex flex-col items-center justify-center text-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-brand-red peer-checked:ring-2 peer-checked:ring-brand-red peer-checked:text-brand-red"
                        >
                          <appliance.icon className="w-8 h-8 mb-1" />
                          <span className="text-sm font-semibold">{appliance.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="brand" className="text-sm font-medium text-gray-700 mb-2 block">
                      2. Select Brand
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      onChange={handleChange}
                      className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400"
                    >
                      <option>Select Brand...</option>
                      <option>Samsung</option>
                      <option>LG</option>
                      <option>Bosch</option>
                      <option>Whirlpool</option>
                      <option>Sony</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-2 block">
                      3. Purchase Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      onChange={handleChange}
                      className="w-full bg-gray-100 border-none rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400"
                    >
                      <option>Select Year...</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                      <option>2018 or Earlier</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">4. Select Condition</label>
                  <div className="grid grid-cols-2 gap-3">
                    {conditions.map(condition => (
                      <div key={condition.id}>
                        <input
                          type="radio"
                          id={condition.id}
                          name="condition"
                          value={condition.id}
                          className="sr-only peer"
                          onChange={() => handleSelect("condition", condition.id)}
                        />
                        <label
                          htmlFor={condition.id}
                          className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-brand-red peer-checked:ring-2 peer-checked:ring-brand-red peer-checked:text-brand-red"
                        >
                          <condition.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-semibold">{condition.name}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-red-50 p-8 sm:p-12 flex flex-col items-center justify-center">
              {showPrice ? (
                <div className="text-center">
                  <p className="text-lg font-medium text-brand-red">Your Estimated Value</p>
                  <div className="my-4">
                    <span className="font-montserrat text-5xl sm:text-7xl font-bold text-accent-yellow">
                      ₹{estimatedPrice.min.toLocaleString("en-IN")}
                    </span>
                    <span className="font-montserrat text-4xl sm:text-5xl font-bold text-neutral-800 mx-2">-</span>
                    <span className="font-montserrat text-5xl sm:text-7xl font-bold text-neutral-800">
                      ₹{estimatedPrice.max.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-neutral-500 max-w-xs mx-auto">
                    This is an estimate. Our technician will provide a final offer upon physical inspection.
                  </p>
                  <button className="mt-8 w-full max-w-sm bg-brand-red text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
                    Schedule Free Pickup
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-12 h-12 text-brand-red" />
                  </div>
                  <h3 className="mt-6 font-montserrat text-2xl font-bold text-neutral-800">
                    Your Estimate Will Appear Here
                  </h3>
                  <p className="mt-2 text-neutral-500">Complete the form to see how much you can earn.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}