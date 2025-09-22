"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Camera, MapPin } from "lucide-react"

export function SellForm() {
  const [formData, setFormData] = useState({
    appliance: "",
    brand: "",
    model: "",
    age: "",
    condition: "",
    description: "",
    name: "",
    phone: "",
    address: "",
    pincode: "",
  })

  const appliances = [
    "Air Conditioner",
    "Refrigerator",
    "Washing Machine",
    "Microwave",
    "Television",
    "Water Heater",
    "Dishwasher",
    "Other",
  ]

  const brands = [
    "LG",
    "Samsung",
    "Whirlpool",
    "Godrej",
    "Haier",
    "Voltas",
    "Blue Star",
    "IFB",
    "Bosch",
    "Panasonic",
    "Sony",
    "Other",
  ]

  const conditions = ["Excellent (Like New)", "Good (Minor Issues)", "Fair (Needs Repair)", "Poor (Not Working)"]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get Your Instant Quote</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Fill out the form below and get an instant quote for your appliance. Our team will contact you within 30
            minutes.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-brand-red text-white rounded-t-2xl">
            <CardTitle className="text-2xl font-montserrat">Appliance Details</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="appliance" className="text-base font-semibold">
                    Appliance Type *
                  </Label>
                  <Select
                    value={formData.appliance}
                    onValueChange={(value) => setFormData({ ...formData, appliance: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select appliance type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appliances.map((appliance) => (
                        <SelectItem key={appliance} value={appliance}>
                          {appliance}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand" className="text-base font-semibold">
                    Brand *
                  </Label>
                  <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="model" className="text-base font-semibold">
                    Model Number
                  </Label>
                  <Input
                    id="model"
                    placeholder="e.g., LG123ABC"
                    className="mt-2"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-base font-semibold">
                    Age of Appliance *
                  </Label>
                  <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                    <SelectTrigger className="mt-2">
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
              </div>

              <div>
                <Label htmlFor="condition" className="text-base font-semibold">
                  Condition *
                </Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Additional Details
                </Label>
                <Textarea
                  id="description"
                  placeholder="Any additional information about the appliance, issues, accessories included, etc."
                  className="mt-2"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
                <p className="text-gray-600 mb-4">Upload clear photos of your appliance for better pricing</p>
                <div className="flex justify-center gap-4">
                  <Button type="button" variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
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

                <div className="mt-6">
                  <Label htmlFor="address" className="text-base font-semibold">
                    Pickup Address *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Complete address for pickup"
                    className="mt-2"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="pincode" className="text-base font-semibold">
                    Pincode *
                  </Label>
                  <Input
                    id="pincode"
                    placeholder="500001"
                    className="mt-2 max-w-xs"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button size="lg" className="bg-brand-red hover:bg-red-700 px-12">
                  <MapPin className="mr-2 h-5 w-5" />
                  Get Instant Quote
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
