import { MessageCircle, Phone, Mail } from "lucide-react"

export function FaqContact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Can't find what you're looking for? Our support team is here to help.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <MessageCircle className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team</p>
            <button className="text-brand-red font-medium hover:underline">Start Chat</button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Phone className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <a href="tel:+919876543210" className="text-brand-red font-medium hover:underline">
              +91 9876543210
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Mail className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us your questions</p>
            <a href="mailto:support@homeservices.com" className="text-brand-red font-medium hover:underline">
              support@homeservices.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
