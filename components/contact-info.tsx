import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

export function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-600">Multiple ways to reach us. Choose what works best for you.</p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-brand-red" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Main Line</p>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
                <div>
                  <p className="font-semibold">Emergency Repairs</p>
                  <p className="text-gray-600">+91 9876543211</p>
                </div>
                <div>
                  <p className="font-semibold">Interior Design</p>
                  <p className="text-gray-600">+91 9876543212</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-brand-red" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">General Inquiries</p>
                  <p className="text-gray-600">info@homeservices.com</p>
                </div>
                <div>
                  <p className="font-semibold">Technical Support</p>
                  <p className="text-gray-600">support@homeservices.com</p>
                </div>
                <div>
                  <p className="font-semibold">Interior Design</p>
                  <p className="text-gray-600">interiors@homeservices.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-brand-red" />
                Office Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">Head Office</p>
                <p className="text-gray-600">
                  123 Business District
                  <br />
                  HITEC City, Hyderabad
                  <br />
                  Telangana - 500081
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-brand-red" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-semibold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Service</span>
                  <span className="font-semibold text-brand-red">24/7 Available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-brand-red text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-montserrat text-xl font-bold mb-4">Quick Response Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 justify-center">
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Headphones className="h-5 w-5" />
                    <span>Live Chat</span>
                  </div>
                </div>
                <p className="text-red-100 mt-4 text-sm">For fastest response, call our main line or use WhatsApp</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
