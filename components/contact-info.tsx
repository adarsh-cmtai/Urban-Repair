"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, LucideProps } from "lucide-react"
import React from "react"

interface ContactItem {
  label: string;
  value: string;
  href?: string;
  highlight?: boolean;
}

interface ContactDetail {
  icon: React.ComponentType<LucideProps>;
  title: string;
  items: ContactItem[];
}

const contactDetails: ContactDetail[] = [
  {
    icon: Phone,
    title: "Phone Support",
    items: [
      { label: "Main Line", value: "+91 98765 43210", href: "tel:+919876543210" },
      { label: "Emergency Repairs", value: "+91 98765 43211", href: "tel:+919876543211" },
      { label: "Interior Design", value: "+91 98765 43212", href: "tel:+919876543212" },
    ],
  },
  {
    icon: Mail,
    title: "Email Support",
    items: [
      { label: "General Inquiries", value: "info@urbanrepair.com", href: "mailto:info@urbanrepair.com" },
      { label: "Technical Support", value: "support@urbanrepair.com", href: "mailto:support@urbanrepair.com" },
      { label: "Interior Design", value: "interiors@urbanrepair.com", href: "mailto:interiors@urbanrepair.com" },
    ],
  },
  {
    icon: MapPin,
    title: "Office Location",
    items: [
      { 
        label: "Head Office", 
        value: "123 Business District\nHITEC City, Hyderabad\nTelangana - 500081",
        href: "https://www.google.com/maps/search/?api=1&query=HITEC+City+Hyderabad" 
      },
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    items: [
      { label: "Monday - Saturday", value: "9:00 AM - 7:00 PM" },
      { label: "Sunday", value: "10:00 AM - 5:00 PM" },
      { label: "Emergency Service", value: "24/7 Available", highlight: true },
    ],
  },
];

export function ContactInfo() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-2 bg-gradient-to-b from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-4">Contact Information</h2>
          <p className="text-lg text-slate-600">Multiple ways to reach us. Choose what works best for you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div 
                key={detail.title}
                className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">{detail.title}</h3>
                </div>
                <div className="space-y-4">
                  {detail.items.map((item) => {
                    const content = (
                      <div key={item.label} className={`flex justify-between items-start gap-4 ${item.href ? 'group' : ''}`}>
                        <span className="text-slate-600">{item.label}</span>
                        <span className={`font-semibold text-right whitespace-pre-line ${item.highlight ? 'text-red-600' : 'text-slate-800'} ${item.href ? 'group-hover:text-red-600 transition-colors' : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    );
                    return item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" key={item.label}>
                        {content}
                      </a>
                    ) : (
                      content
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className="animate-fade-in-up mt-8 bg-slate-900 text-white rounded-2xl p-8 text-center"
          style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}
        >
          <h3 className="font-heading text-2xl font-bold mb-4">Quick Response Channels</h3>
          <p className="text-slate-400 mb-6">For the fastest response, use WhatsApp or call our main line.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
            </a>
            {/* <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
              <Headphones className="h-5 w-5" />
              <span>Start Live Chat</span>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}