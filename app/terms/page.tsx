import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText } from "lucide-react"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                <FileText className="w-10 h-10" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-800">
                Terms & Conditions
              </h1>
              <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
                At Urban Repair Expert, every service is a promise—rooted in Hyderabad’s trust, technical precision, and emotional respect. These terms are designed to ensure transparency, protection, and a luxury-class experience for every customer.
              </p>
            </div>

            <div className="prose prose-lg max-w-none prose-h2:font-heading prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-p:text-slate-600 prose-ul:list-none prose-ul:p-0 prose-li:text-slate-600 prose-li:mb-2 prose-li:flex prose-li:items-start prose-a:text-red-600 prose-a:font-semibold hover:prose-a:text-red-700">

              <h2>1. Service Booking & Confirmation</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>Customers can book services via our website, WhatsApp, or direct call.</li>
                <li><span className="mr-3 text-red-500">→</span>Service confirmation is sent via SMS or email.</li>
                <li><span className="mr-3 text-red-500">→</span>Bookings may be rescheduled or cancelled in advance without penalty.</li>
              </ul>
              
              <h2>2. Payment Terms</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>Payments are accepted via Razorpay, UPI, or cash after service completion.</li>
                <li><span className="mr-3 text-red-500">→</span>Secure payment links will be provided for online transactions.</li>
                <li><span className="mr-3 text-red-500">→</span>Receipts are shared via email or WhatsApp.</li>
              </ul>
              
              <h2>3. Warranty & Guarantee</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>All repair services include a 180-day service warranty (applicable only to parts repaired by our certified technicians).</li>
                <li><span className="mr-3 text-red-500">→</span>Resale appliances carry warranty as per their verified condition.</li>
              </ul>
              <blockquote className="border-l-4 border-red-500 bg-red-50 text-slate-700 p-4 rounded-r-lg mt-6">
                “We don’t just fix—we honour your trust for 180 days.”
              </blockquote>

              <h2>4. Cancellation & Refund Policy</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>Cancellations made at least 2 hours before the scheduled time incur no charges.</li>
                <li><span className="mr-3 text-red-500">→</span>Late cancellations may attract a convenience fee up to ₹100.</li>
                <li><span className="mr-3 text-red-500">→</span>In case of dissatisfaction, we offer re-inspection or resolution. Refunds are considered only in exceptional cases.</li>
              </ul>
              
              <h2>5. Data & Privacy</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>Customer data (mobile, email, location) is used solely for service delivery and communication.</li>
                <li><span className="mr-3 text-red-500">→</span>We do not share your information with third parties.</li>
                <li><span className="mr-3 text-red-500">→</span>All data is securely stored on encrypted AWS S3 servers.</li>
              </ul>
              
              <h2>6. Service Limitations</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>We only service appliances inspected by our certified technicians.</li>
                <li><span className="mr-3 text-red-500">→</span>Warranty does not cover appliances modified or tampered with by third parties.</li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>The name, logo, and content of Urban Repair Expert are protected intellectual property.</li>
                <li><span className="mr-3 text-red-500">→</span>Unauthorized use, reproduction, or redistribution is strictly prohibited.</li>
              </ul>
              
              <h2>8. Dispute Resolution</h2>
              <ul>
                <li><span className="mr-3 text-red-500">→</span>Any disputes are first addressed through respectful dialogue and resolution.</li>
                <li><span className="mr-3 text-red-500">→</span>If required, matters fall under the jurisdiction of Hyderabad, Telangana.</li>
              </ul>
              
              <h2 className="text-center pt-6">🤝 Our Promise</h2>
              <blockquote className="border-none text-center text-xl italic text-slate-700 p-4">
                “Every appliance is a responsibility. And every responsibility is honoured—for 180 days and beyond.”
              </blockquote>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}