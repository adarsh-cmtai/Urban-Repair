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
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-brand-red rounded-full mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h1 className="font-montserrat text-4xl sm:text-5xl font-extrabold text-neutral-800">
                Privacy Policy
              </h1>
              <p className="mt-4 text-neutral-500">
                Last Updated: October 26, 2023
              </p>
            </div>

            <div className="prose prose-lg max-w-none prose-h2:font-montserrat prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-a:text-brand-red hover:prose-a:text-red-700">
              <p>
                Welcome to [Your Company Name] ("we," "our," or "us"). We are committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website [Your Website URL] and use our services.
              </p>
              
              <h2>1. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you book a service, sell an
                appliance, request a consultation, or contact us. This information may include:
              </p>
              <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address.</li>
                <li><strong>Appliance Information:</strong> Details about the appliances you wish to repair or sell, such as model, brand, and condition.</li>
                <li><strong>Payment Information:</strong> While we use third-party payment processors, we may collect transaction details. We do not store your credit card information.</li>
                <li><strong>Communication Data:</strong> Records of your correspondence with us, including emails and chat logs.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, operate, and maintain our services.</li>
                <li>Process your transactions and manage your appointments.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates, and for marketing purposes.</li>
                <li>Prevent fraudulent activities.</li>
              </ul>

              <h2>3. Disclosure of Your Information</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
              
              <h2>4. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>

              <h2>5. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul>
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              </ul>
              
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
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