"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Problem {
  title: string
  description: string
  price: string
}

interface CommonProblemsProps {
  problems: Problem[]
  serviceType: string
}

export function CommonProblems({ problems, serviceType }: CommonProblemsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Common {serviceType} Problems We Fix
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our expert technicians can diagnose and fix all types of {serviceType.toLowerCase()} issues quickly and
            efficiently.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {problems.map((problem, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === index
                  ? "bg-brand-red text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {problem.title}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <Card className="max-w-4xl mx-auto rounded-2xl border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-4">
                {problems[activeTab].title}
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{problems[activeTab].description}</p>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Estimated Cost</p>
                <p className="font-heading font-bold text-2xl text-brand-red">{problems[activeTab].price}</p>
              </div>
              <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4 rounded-2xl">
                Book This Specific Fix
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
