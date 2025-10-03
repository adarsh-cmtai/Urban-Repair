"use client"

import { Phone, Mail, MapPin, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    line1: "+91 98765 43210",
    line2: "24/7 Phone Support",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email Us",
    line1: "info@urbanrepair.com",
    line2: "For General Inquiries",
    href: "mailto:info@urbanrepair.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    line1: "123 Business District",
    line2: "Hyderabad, Telangana",
    href: "https://www.google.com/maps/search/?api=1&query=Hyderabad",
    target: "_blank",
  },
  {
    icon: Clock,
    title: "Working Hours",
    line1: "Mon-Sat: 9AM - 7PM",
    line2: "Sun: 10AM - 5PM",
    href: null,
  },
]

export function ContactHero() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
            Get in Touch With Us
          </h1>
          <p className="text-xl text-slate-600 text-pretty max-w-3xl mx-auto">
            Ready to transform your home? Have questions about our services? We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const CardContent = (
              <div className="w-full h-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/10 group-hover:-translate-y-2 text-center flex flex-col items-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.line1}</p>
                <p className="text-slate-500 text-sm">{item.line2}</p>
              </div>
            );

            return (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                {item.href ? (
                  <a href={item.href} target={item.target || '_self'} rel={item.target ? "noopener noreferrer" : ''} className="group h-full block">
                    {CardContent}
                  </a>
                ) : (
                  <div className="group h-full">
                    {CardContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}