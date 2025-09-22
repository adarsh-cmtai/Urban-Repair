"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, Phone, MapPin } from "lucide-react"

interface BookingFormProps {
  serviceType: string
}

export function BookingForm({ serviceType }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    problem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Booking submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Book Your {serviceType} Service
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you within 30 minutes to confirm your appointment.
          </p>
        </div>

        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Service Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none"
                  >
                    <option value="">Select time slot</option>
                    <option value="9-12">9:00 AM - 12:00 PM</option>
                    <option value="12-3">12:00 PM - 3:00 PM</option>
                    <option value="3-6">3:00 PM - 6:00 PM</option>
                    <option value="6-9">6:00 PM - 9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Problem Description (Optional)</label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none resize-none"
                  placeholder="Describe the issue you're experiencing..."
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red/90 text-white px-12 py-4 text-lg font-semibold rounded-2xl"
                >
                  Book My Service Now
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll call you within 30 minutes to confirm your appointment
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
