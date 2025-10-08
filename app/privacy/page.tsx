import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShieldCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-800">
                Our Policies
              </h1>
              <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
                At Urban Repair Expert, we believe that the information you share with us is not just data — it’s a matter of trust. We handle every client’s privacy with utmost respect, responsibility, and care.
              </p>
            </div>

            <div className="prose prose-lg max-w-none prose-h2:font-heading prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h3:font-heading prose-h3:font-semibold prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8 prose-p:text-slate-600 prose-ul:list-none prose-ul:p-0 prose-li:text-slate-600 prose-li:mb-2 prose-li:flex prose-li:items-start prose-a:text-red-600 prose-a:font-semibold hover:prose-a:text-red-700">
              
              <h2>📋 Privacy Policy</h2>
              <h3>Information We Collect</h3>
              <ul>
                <li><span className="mr-3 text-red-500">✓</span>Your name, mobile number, and email address</li>
                <li><span className="mr-3 text-red-500">✓</span>Location information (to provide our services)</li>
                <li><span className="mr-3 text-red-500">✓</span>Details of your appliances (for repair or resale purposes)</li>
                <li><span className="mr-3 text-red-500">✓</span>Payment details through Razorpay</li>
                <li><span className="mr-3 text-red-500">✓</span>Website usage data, such as cookies and session information</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <ul>
                <li><span className="mr-3 text-red-500">✓</span>To process and deliver services</li>
                <li><span className="mr-3 text-red-500">✓</span>To send updates related to your service</li>
                <li><span className="mr-3 text-red-500">✓</span>To manage complaints and follow-ups efficiently</li>
                <li><span className="mr-3 text-red-500">✓</span>To ensure secure payment and data storage via verified platforms like Razorpay and AWS</li>
              </ul>
              <blockquote className="border-l-4 border-red-500 bg-red-50 text-slate-700 p-4 rounded-r-lg mt-6">
                We never share your personal information with third parties without your explicit consent.
              </blockquote>

              <h3>Data Security</h3>
              <p>
                Your data is stored securely and encrypted on our AWS S3 servers. We follow industry-standard security measures to ensure your information is tamper-proof and protected from unauthorized access.
              </p>

              <h2>🚚 Service Delivery Policy</h2>
              <p>
                As we primarily offer on-site repair services, our delivery policy refers to how our technicians provide their services at your location.
              </p>
              <ul>
                <li><span className="mr-3 text-red-500">✓</span><strong>Scheduling:</strong> Once you book a service, we schedule an appointment at a time convenient for you.</li>
                <li><span className="mr-3 text-red-500">✓</span><strong>Technician Assignment:</strong> A verified and skilled technician is assigned to your service request based on your location and the nature of the repair.</li>
                <li><span className="mr-3 text-red-500">✓</span><strong>Service Timeframe:</strong> We strive to provide same-day or next-day service. The exact timeframe will be confirmed with you during the booking process.</li>
                <li><span className="mr-3 text-red-500">✓</span><strong>Communication:</strong> You will receive timely updates via SMS and email regarding your technician's arrival time. Any potential delays will be communicated to you promptly.</li>
              </ul>

              <h2>🔄 Cancellation & Refund Policy</h2>
              <p>
                We offer a flexible cancellation and refund policy to ensure complete customer satisfaction.
              </p>
              <h3>Cancellation</h3>
              <ul>
                <li><span className="mr-3 text-red-500">✓</span>You can cancel your service request by contacting our customer support at least 4 hours before the scheduled appointment to avoid any charges.</li>
                <li><span className="mr-3 text-red-500">✓</span>Cancellations made less than 4 hours before the appointment may be subject to a nominal visiting or inspection fee.</li>
              </ul>

              <h3>Refunds</h3>
              <ul>
                <li><span className="mr-3 text-red-500">✓</span>If you are not satisfied with our service, you can request a follow-up visit at no extra cost.</li>
                <li><span className="mr-3 text-red-500">✓</span>Refunds are processed in cases where a service cannot be completed or if a payment was made in error. Please note that the initial inspection charge is non-refundable.</li>
                <li><span className="mr-3 text-red-500">✓</span>Approved refunds will be credited back to the original payment method within 5-7 business days.</li>
              </ul>

              <h2>🧾 Cookies & Tracking</h2>
              <p>
                Our website uses certain cookies to enhance your browsing experience and help us improve our services. You may disable cookies through your browser settings if you prefer.
              </p>
              
              <h2>📞 Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time. To exercise these rights, please email us at: <a href="mailto:support@urbanrepairexpert.com">support@urbanrepairexpert.com</a>
              </p>

              <h2 className="text-center pt-6">🤝 Our Commitment</h2>
              <blockquote className="border-none text-center text-xl italic text-slate-700 p-4">
                “Your data is not just information to us — it’s a responsibility. We handle it with care, sensitivity, and complete respect.”
              </blockquote>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}