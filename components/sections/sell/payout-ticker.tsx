"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

const payouts = [
  "Priya S. from Madhapur received ₹8,500 for her Washing Machine.",
  "Rohan K. from Gachibowli received ₹12,000 for his AC.",
  "Anjali V. from Jubilee Hills received ₹15,500 for her TV.",
  "Vikram B. from Banjara Hills received ₹9,000 for his Fridge.",
]

export function PayoutTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % payouts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-brand-red to-red-700 py-4 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 mr-3 text-accent-yellow" />
          <p className="font-medium text-center">
            <span className="font-semibold">Live Payout:</span> {payouts[currentIndex]}
          </p>
        </div>
      </div>
    </div>
  )
}