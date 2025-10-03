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
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-300/50 border border-slate-200/80">
          <div className="text-center mb-10">
            <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-4">Send Us a Message</h2>
            <p className="text-lg text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold text-slate-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold text-slate-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-base font-semibold text-slate-700">
                  Service Needed *
                </Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service} className="text-base">
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-base font-semibold text-slate-700">
                  Urgency Level
                </Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level} className="text-base">
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-semibold text-slate-700">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Please describe your requirements, issues, or questions in detail..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="text-base"
              />
            </div>

            <div className="pt-6">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-lg font-semibold h-14 rounded-xl">
                <Send className="mr-3 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}