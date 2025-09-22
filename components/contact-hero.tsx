import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactHero() {
  return (
    <section className="bg-gradient-to-br from-brand-red to-red-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-montserrat text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Get in <span className="text-accent-yellow">Touch</span> With Us
          </h1>
          <p className="text-xl text-red-100 text-pretty max-w-3xl mx-auto">
            Ready to transform your home? Have questions about our services? We're here to help! Reach out to us through
            any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-accent-yellow text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-red-100">+91 9876543210</p>
            <p className="text-red-100">+91 9876543211</p>
          </div>

          <div className="text-center">
            <div className="bg-accent-yellow text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-red-100">info@homeservices.com</p>
            <p className="text-red-100">support@homeservices.com</p>
          </div>

          <div className="text-center">
            <div className="bg-accent-yellow text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p className="text-red-100">123 Business District</p>
            <p className="text-red-100">Hyderabad, Telangana</p>
          </div>

          <div className="text-center">
            <div className="bg-accent-yellow text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
            <p className="text-red-100">Mon-Sat: 9AM-7PM</p>
            <p className="text-red-100">Sun: 10AM-5PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
