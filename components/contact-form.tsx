"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    urgency: "",
    message: "",
  })

  const services = [
    "Appliance Repair",
    "Sell Old Appliances",
    "Interior Design",
    "General Inquiry",
    "Technical Support",
    "Partnership Inquiry",
  ]

  const urgencyLevels = [
    "Emergency (Same Day)",
    "Urgent (Within 24 hours)",
    "Normal (2-3 days)",
    "Flexible (Within a week)",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
          <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-base font-semibold">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                className="mt-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold">
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                className="mt-2"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-base font-semibold">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="mt-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="service" className="text-base font-semibold">
                Service Needed *
              </Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency" className="text-base font-semibold">
                Urgency Level
              </Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-base font-semibold">
              Message *
            </Label>
            <Textarea
              id="message"
              placeholder="Please describe your requirements, issues, or questions in detail..."
              className="mt-2"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex justify-center pt-6">
            <Button size="lg" className="bg-brand-red hover:bg-red-700 px-12">
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
