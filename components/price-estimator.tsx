"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, IndianRupee } from "lucide-react"

export function PriceEstimator() {
  const [selectedAppliance, setSelectedAppliance] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedAge, setSelectedAge] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("")
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const priceData = {
    "Air Conditioner": {
      LG: { "0-1": { Excellent: 25000, Good: 20000, Fair: 12000, Poor: 5000 } },
      Samsung: { "0-1": { Excellent: 24000, Good: 19000, Fair: 11000, Poor: 4500 } },
      Voltas: { "0-1": { Excellent: 22000, Good: 17000, Fair: 10000, Poor: 4000 } },
    },
    Refrigerator: {
      LG: { "0-1": { Excellent: 30000, Good: 25000, Fair: 15000, Poor: 6000 } },
      Samsung: { "0-1": { Excellent: 28000, Good: 23000, Fair: 14000, Poor: 5500 } },
      Whirlpool: { "0-1": { Excellent: 26000, Good: 21000, Fair: 13000, Poor: 5000 } },
    },
    "Washing Machine": {
      LG: { "0-1": { Excellent: 20000, Good: 16000, Fair: 10000, Poor: 4000 } },
      Samsung: { "0-1": { Excellent: 19000, Good: 15000, Fair: 9000, Poor: 3500 } },
      IFB: { "0-1": { Excellent: 18000, Good: 14000, Fair: 8500, Poor: 3000 } },
    },
  }

  const calculatePrice = () => {
    if (selectedAppliance && selectedBrand && selectedAge && selectedCondition) {
      const basePrice = priceData[selectedAppliance]?.[selectedBrand]?.[selectedAge]?.[selectedCondition] || 0

      // Apply age multiplier
      let ageMultiplier = 1
      if (selectedAge === "1-3") ageMultiplier = 0.8
      else if (selectedAge === "3-5") ageMultiplier = 0.6
      else if (selectedAge === "5-10") ageMultiplier = 0.4
      else if (selectedAge === "10+") ageMultiplier = 0.2

      const finalPrice = Math.round(basePrice * ageMultiplier)
      setEstimatedPrice(finalPrice)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quick Price Estimator</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Get an instant estimate of your appliance's value. Actual prices may vary based on inspection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-brand-red" />
                Price Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Appliance Type</label>
                <Select value={selectedAppliance} onValueChange={setSelectedAppliance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appliance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Air Conditioner">Air Conditioner</SelectItem>
                    <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                    <SelectItem value="Washing Machine">Washing Machine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedAppliance &&
                      Object.keys(priceData[selectedAppliance] || {}).map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Age</label>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent (Like New)</SelectItem>
                    <SelectItem value="Good">Good (Minor Issues)</SelectItem>
                    <SelectItem value="Fair">Fair (Needs Repair)</SelectItem>
                    <SelectItem value="Poor">Poor (Not Working)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculatePrice}
                className="w-full bg-brand-red hover:bg-red-700"
                disabled={!selectedAppliance || !selectedBrand || !selectedAge || !selectedCondition}
              >
                Calculate Estimated Price
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {estimatedPrice !== null && (
              <Card className="shadow-lg border-brand-red border-2">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <IndianRupee className="h-8 w-8 text-brand-red" />
                    <span className="text-4xl font-bold text-brand-red">{estimatedPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Estimated Value</p>
                  <p className="text-sm text-gray-600">
                    *Final price may vary based on actual inspection and market conditions
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Price Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Brand Value</span>
                  <span className="text-green-600">+15-25%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Excellent Condition</span>
                  <span className="text-green-600">+20-30%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Original Accessories</span>
                  <span className="text-green-600">+10-15%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Warranty Remaining</span>
                  <span className="text-green-600">+5-10%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Market Demand</span>
                  <span className="text-green-600">Variable</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
