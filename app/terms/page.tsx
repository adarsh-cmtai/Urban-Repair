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
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-brand-red rounded-full mb-6">
                <FileText className="w-10 h-10" />
              </div>
              <h1 className="font-montserrat text-4xl sm:text-5xl font-extrabold text-neutral-800">
                Terms & Conditions
              </h1>
              <p className="mt-4 text-neutral-500">
                Last Updated: October 26, 2023
              </p>
            </div>

            <div className="prose prose-lg max-w-none prose-h2:font-montserrat prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-a:text-brand-red hover:prose-a:text-red-700">
              <p>
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the
                [Your Website URL] website and the services operated by [Your Company Name] ("us", "we", or "our").
              </p>
              
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part
                of the terms, then you may not access the service.
              </p>
              
              <h2>2. Services</h2>
              <p>
                We provide home appliance repair, sales, and interior design solutions. All services are subject to
                availability and our confirmation. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
              <ul>
                <li><strong>Repair Services:</strong> We provide a 30-day warranty on parts replaced and services rendered. This warranty does not cover issues unrelated to the original repair.</li>
                <li><strong>Sell Appliance Service:</strong> The online quote is an estimate. The final price is subject to a physical inspection of the appliance by our technician. Payment is made upon successful pickup.</li>
                <li><strong>Interior Solutions:</strong> Project timelines and costs will be outlined in a separate, signed agreement.</li>
              </ul>

              <h2>3. User Obligations</h2>
              <p>
                You agree to provide accurate, current, and complete information during the booking process. You are
                responsible for ensuring our technicians have safe access to your property and the appliance at the
                scheduled time.
              </p>
              
              <h2>4. Payments and Cancellations</h2>
              <p>
                All payments for services are due upon completion, unless otherwise agreed. For repair services, a
                visiting charge may be applicable if you decide not to proceed with the repair after diagnosis. You may cancel or reschedule an appointment up to 4 hours before the scheduled time without a fee.
              </p>
              
              <h2>5. Limitation of Liability</h2>
              <p>
                In no event shall [Your Company Name], nor its directors, employees, or partners, be liable for any
                indirect, incidental, special, consequential or punitive damages, including without limitation, loss of
                profits, data, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
              
              <h2>6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Telangana, India, without
                regard to its conflict of law provisions.
              </p>

              <h2>7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
                provide notice of any changes by posting the new Terms on this page.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:support@yourcompany.com">support@yourcompany.com</a><br />
                <strong>Phone:</strong> <a href="tel:+911234567890">+91 123 456 7890</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}