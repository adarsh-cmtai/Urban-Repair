import Link from "next/link"
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-12 border-b border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
              <p className="text-gray-400">Subscribe to our newsletter for the latest offers, tips, and news.</p>
            </div>
            <form className="flex w-full max-w-md ml-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-gray-800 text-white px-4 py-3 rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors flex items-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/40">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-white">Urban Repair</span>
            </div>
            <p className="mb-6 leading-relaxed max-w-sm">
              Your trusted partner for home services. We bring expertise and reliability to your doorstep.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/ac-repair" className="hover:text-white transition-colors">AC Repair & Service</Link></li>
              <li><Link href="/services/refrigerator-repair" className="hover:text-white transition-colors">Refrigerator Repair</Link></li>
              <li><Link href="/services/washing-machine" className="hover:text-white transition-colors">Washing Machine Fix</Link></li>
              <li><Link href="/sell-appliance" className="hover:text-white transition-colors">Sell Your Appliance</Link></li>
              <li><Link href="/interiors" className="hover:text-white transition-colors">Interior Design</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">+91 98765 43210</p>
                  <p className="text-gray-400 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@urbanrepair.com</p>
                  <p className="text-gray-400 text-sm">General Inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Hyderabad, Telangana</p>
                  <p className="text-gray-400 text-sm">Serving all areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Urban Repair. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}