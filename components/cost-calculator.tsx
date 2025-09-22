"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

interface CostCalculatorProps {
  serviceType: string
}

export function CostCalculator({ serviceType }: CostCalculatorProps) {
  const [selectedType, setSelectedType] = useState("")
  const [selectedProblem, setSelectedProblem] = useState("")
  const [estimatedCost, setEstimatedCost] = useState("")

  const acTypes = [
    { value: "window", label: "Window AC", basePrice: 399 },
    { value: "split", label: "Split AC", basePrice: 499 },
    { value: "central", label: "Central AC", basePrice: 799 },
    { value: "cassette", label: "Cassette AC", basePrice: 599 },
  ]

  const problems = [
    { value: "not-cooling", label: "Not Cooling", multiplier: 1.2 },
    { value: "water-leak", label: "Water Leakage", multiplier: 1.0 },
    { value: "noise", label: "Strange Noises", multiplier: 0.8 },
    { value: "not-starting", label: "Not Starting", multiplier: 1.5 },
  ]

  const calculateCost = () => {
    if (selectedType && selectedProblem) {
      const typeData = acTypes.find((type) => type.value === selectedType)
      const problemData = problems.find((problem) => problem.value === selectedProblem)

      if (typeData && problemData) {
        const baseCost = typeData.basePrice * problemData.multiplier
        const minCost = Math.floor(baseCost)
        const maxCost = Math.floor(baseCost * 1.5)
        setEstimatedCost(`₹${minCost} - ₹${maxCost}`)
      }
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Interactive Cost Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an instant estimate for your {serviceType.toLowerCase()} repair based on your specific requirements.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto rounded-2xl border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">{serviceType} Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                  >
                    <option value="">Select {serviceType} Type</option>
                    {acTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Problem Type</label>
                  <select
                    value={selectedProblem}
                    onChange={(e) => setSelectedProblem(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                  >
                    <option value="">Select Problem</option>
                    {problems.map((problem) => (
                      <option key={problem.value} value={problem.value}>
                        {problem.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={calculateCost}
                  disabled={!selectedType || !selectedProblem}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-3 rounded-lg font-semibold"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Estimate
                </Button>
              </div>

              {/* Right Column - Result */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Calculator className="w-16 h-16 text-brand-red" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">Estimated Cost</h3>
                  {estimatedCost ? (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-heading font-bold text-3xl text-brand-red mb-2">{estimatedCost}</p>
                      <p className="text-sm text-gray-600">*Final cost may vary based on actual diagnosis</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Select options above to see estimate</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
