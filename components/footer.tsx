import Link from "next/link"
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">

        <div className="py-16 border-b border-slate-800">
          {/* <div className="bg-slate-900/50 rounded-2xl p-8 lg:p-12 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
                  Stay Updated
                </h2>
                <p className="text-slate-400">
                  Subscribe to our newsletter for the latest offers, tips, and news.
                </p>
              </div>
              <form className="flex w-full max-w-md ml-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow bg-slate-800 text-white px-5 py-3 rounded-l-xl border-2 border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-r-xl font-semibold transition-colors flex items-center gap-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </div> */}
        </div>

        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-red-800/50">
                <img
                  src="/Logo-2.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <span className="font-heading font-bold text-3xl text-white">
                Urban Repair Expert
              </span>
            </div>

            <p className="mb-8 leading-relaxed max-w-sm text-slate-400">
              Redefining luxury-class appliance care in Hyderabad. We don't just fix machines—we build relationships.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/14VfaWnjsyF/" target="_blank" className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/MohdImr2711594?t=5hKYTAvVxygvDpQAAkr1PA&s=09" target="_blank" className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/imrankhan788698?igsh=enE2c2V2NzI4em02" target="_blank" className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918109279412"
                target="_blank"
                className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all transform hover:scale-110"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>

            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">AC Repair & Service</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Refrigerator Repair</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Washing Machine Fix</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Sell Your Appliance</Link></li>
              {/* <li><Link href="/services" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Interior Design</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">About Us</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Blog</Link></li>
              {/* <li><Link href="/faq" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">FAQ</Link></li> */}
              {/* <li><Link href="/careers" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Careers</Link></li> */}
              <li><Link href="/contact" className="text-slate-400 hover:text-red-500 hover:translate-x-1 transition-all duration-300 block">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-6">Get In Touch</h3>
            <div className="space-y-5">
              <a href="tel:+918109279412" className="flex items-start space-x-3 group">
                <Phone className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium group-hover:text-red-500 transition-colors">+91 8109279412</p>
                  <p className="text-slate-500 text-sm">Direct WhatsApp/Call</p>
                </div>
              </a>
              <a href="mailto:support@urbanrepairexpert.com" className="flex items-start space-x-3 group">
                <Mail className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium group-hover:text-red-500 transition-colors break-all">support@urbanrepairexpert.com</p>
                  <p className="text-slate-500 text-sm">Founder Monitored</p>
                </div>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Hitech City, Hyderabad</p>
                  <p className="text-slate-500 text-sm">Serving all areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-slate-500 mb-4 md:mb-0">© {new Date().getFullYear()} Urban Repair Expert. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-500 hover:text-red-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-slate-500 hover:text-red-500 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}