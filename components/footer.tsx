import Link from "next/link"
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Urban Repair</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for all home service needs. From appliance repairs to interior design, we bring
              expertise and reliability to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/ac-repair" className="text-gray-300 hover:text-white transition-colors">
                  AC Repair & Service
                </Link>
              </li>
              <li>
                <Link href="/services/refrigerator-repair" className="text-gray-300 hover:text-white transition-colors">
                  Refrigerator Repair
                </Link>
              </li>
              <li>
                <Link href="/services/washing-machine" className="text-gray-300 hover:text-white transition-colors">
                  Washing Machine Fix
                </Link>
              </li>
              <li>
                <Link href="/services/microwave-repair" className="text-gray-300 hover:text-white transition-colors">
                  Microwave Repair
                </Link>
              </li>
              <li>
                <Link href="/sell-appliance" className="text-gray-300 hover:text-white transition-colors">
                  Sell Your Appliance
                </Link>
              </li>
              <li>
                <Link href="/interiors" className="text-gray-300 hover:text-white transition-colors">
                  Interior Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-300 hover:text-white transition-colors">
                  Current Offers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">+91 98765 43210</p>
                  <p className="text-gray-300 text-sm">24/7 Emergency Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@homeservepro.com</p>
                  <p className="text-gray-300 text-sm">General Inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Hyderabad, Telangana</p>
                  <p className="text-gray-300 text-sm">Serving all areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© 2024 Urban Repair. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-300 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
