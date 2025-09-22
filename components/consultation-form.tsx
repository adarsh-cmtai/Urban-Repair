"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Phone } from "lucide-react"

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    projectType: "",
    budget: "",
    timeline: "",
    address: "",
    requirements: "",
    consultationType: "",
  })

  const propertyTypes = ["Apartment", "Villa", "Independent House", "Office", "Commercial Space"]
  const projectTypes = ["Complete Home", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Office Interior"]
  const budgets = ["Under ₹2 Lakhs", "₹2-5 Lakhs", "₹5-10 Lakhs", "₹10-20 Lakhs", "₹20+ Lakhs"]
  const timelines = ["Within 1 Month", "1-3 Months", "3-6 Months", "6+ Months", "Flexible"]
  const consultationTypes = ["Home Visit", "Office Visit", "Video Call", "Phone Call"]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Free Consultation</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Ready to transform your space? Schedule a free consultation with our interior design experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-brand-red text-white rounded-t-2xl">
                <CardTitle className="text-2xl font-montserrat">Consultation Request</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
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
                      Email Address
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
                      <Label htmlFor="propertyType" className="text-base font-semibold">
                        Property Type *
                      </Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectType" className="text-base font-semibold">
                        Project Type *
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget" className="text-base font-semibold">
                        Budget Range *
                      </Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-base font-semibold">
                        Project Timeline
                      </Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="consultationType" className="text-base font-semibold">
                      Consultation Preference *
                    </Label>
                    <Select
                      value={formData.consultationType}
                      onValueChange={(value) => setFormData({ ...formData, consultationType: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-base font-semibold">
                      Property Address
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Complete address of the property"
                      className="mt-2"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements" className="text-base font-semibold">
                      Project Requirements
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="Tell us about your vision, style preferences, specific requirements, etc."
                      className="mt-2"
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button size="lg" className="bg-brand-red hover:bg-red-700 px-12">
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Free Consultation
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-6 w-6 text-brand-red" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Phone</h4>
                  <p className="text-gray-600">+91 9876543210</p>
                  <p className="text-gray-600">+91 9876543211</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-gray-600">interiors@homeservices.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Office Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-brand-red" />
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Banjara Hills</li>
                  <li>• Jubilee Hills</li>
                  <li>• Gachibowli</li>
                  <li>• HITEC City</li>
                  <li>• Kondapur</li>
                  <li>• Madhapur</li>
                  <li>• Kukatpally</li>
                  <li>• Secunderabad</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-brand-red text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-montserrat text-xl font-bold mb-4">Free Consultation Includes:</h3>
                <ul className="space-y-2 text-red-100">
                  <li>• Site visit & measurement</li>
                  <li>• Design consultation</li>
                  <li>• Budget estimation</li>
                  <li>• 3D visualization preview</li>
                  <li>• Material recommendations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
