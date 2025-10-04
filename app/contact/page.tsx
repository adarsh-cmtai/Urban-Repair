"use client"

import React, { useState } from "react"
import { Phone, Mail, MapPin, Clock, UserCheck, MessageCircle, PhoneCall, CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Component 1: ContactHero (Updated)
function ContactHero() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
            Contact Us – Urban Repair Expert, Hyderabad
          </h1>
          <p className="text-xl text-slate-600 text-pretty max-w-3xl mx-auto">
            We believe appliance care is not just technical—it’s a relationship. That’s why we prioritize direct, personal contact with our clients—without any automated confusion.
          </p>
        </div>
      </div>
    </section>
  )
}

// Component 2: ContactInfo (Completely Rebuilt)
const contactDetails = [
  {
    icon: Phone,
    title: "Mobile / WhatsApp",
    value: "+91 8109279412",
    href: "tel:+918109279412",
    description: "Available on WhatsApp Business — book a service, share appliance details, or connect directly with the Founder.",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@urbanrepairexpert.com",
    href: "mailto:support@urbanrepairexpert.com",
    description: "Every email is personally monitored by the Founder. Your message is not just read — it’s truly understood.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Hitech City, Hyderabad, Telangana",
    href: "https://www.google.com/maps/search/?api=1&query=HITEC+City+Hyderabad",
    description: "We deliver luxury appliance care to every corner of Hyderabad.",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sunday to Saturday: 8:00 AM – 7:00 PM",
    description: "We don’t just keep time — we uphold trust.",
    isQuote: true,
  },
];

function ContactInfo() {
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="pb-24 bg-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            const content = (
              <div className="w-full h-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">{detail.title}</h3>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-xl text-red-600 mb-2">{detail.value}</p>
                  {detail.isQuote ? (
                    <blockquote className="text-slate-600 italic">“{detail.description}”</blockquote>
                  ) : (
                    <p className="text-slate-600">{detail.description}</p>
                  )}
                </div>
              </div>
            );
            return (
              <div 
                key={detail.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                {detail.href ? (
                  <a href={detail.href} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
        
        <div 
          className="animate-fade-in-up mt-8 bg-slate-900 text-white rounded-2xl p-8"
          style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}
        >
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">Direct Founder Access</h3>
              <p className="text-slate-400 mb-4">No chatbots, no delays — you can connect directly with the Founder.</p>
              <blockquote className="text-slate-300 italic">“Every customer is a story. And every story deserves to reach the Founder.”</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Component 3: ContactForm (Standard, no content change needed)
interface FormDataState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const services = ["Appliance Repair", "Sell Old Appliances", "Interior Design", "General Inquiry"];

  // 'e' parameter ko sahi type diya gaya hai
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // 'value' parameter ko sahi type diya gaya hai
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };
  
  // 'e' parameter ko form submission ke liye sahi type diya gaya hai
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMessage("");

    const dataToSend = {
      ...formData,
      access_key: "5acc18f5-9498-4dfb-87bb-c8c85793258f", 
      subject: `New Contact Form Submission from ${formData.name}`,
      from_name: "Urban Repair Expert"
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        setResultMessage("✅ Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        console.error("Submission Error:", result);
        setResultMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setResultMessage("❌ An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-2 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-300/50 border border-slate-200/80">
          <div className="text-center mb-10">
            <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-4">Send a Direct Message</h2>
            <p className="text-lg text-slate-600">Your message will be personally reviewed by our team.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold text-slate-700">Full Name *</Label>
                <Input required id="name" placeholder="Your full name" value={formData.name} onChange={handleInputChange} className="h-12 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold text-slate-700">Phone / WhatsApp *</Label>
                <Input required id="phone" placeholder="+91 8109279412" value={formData.phone} onChange={handleInputChange} className="h-12 text-base" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-slate-700">Email Address *</Label>
                <Input required id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} className="h-12 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service" className="text-base font-semibold text-slate-700">Service Needed *</Label>
                <Select required value={formData.service} onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>{services.map((s) => <SelectItem key={s} value={s} className="text-base">{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-semibold text-slate-700">Message *</Label>
              <Textarea required id="message" placeholder="Please describe your requirements..." rows={5} value={formData.message} onChange={handleInputChange} className="text-base" />
            </div>
            <div className="pt-6">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-lg font-semibold h-14 rounded-xl disabled:bg-red-400 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-3 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
            {resultMessage && (
              <p className={`text-center mt-4 text-lg ${resultMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {resultMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

// Component 4: LocationMap (Updated)
const serviceAreas = ["Banjara Hills", "Jubilee Hills", "Gachibowli", "HITEC City", "Kondapur", "Madhapur", "Kukatpally", "Secunderabad", "Begumpet", "Ameerpet", "Miyapur", "Uppal"];

function LocationMap() {
  return (
    <section className="py-2 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4">We Serve All of Hyderabad</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our main office is in HITEC City, but our service reaches every corner of the city.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/80">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121823.5947752178!2d78.3281246949354!3d17.44754521484555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a276decedf%3A0x2ad1b553c55490a2!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1678273942351!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80">
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6">Major Service Areas</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">{serviceAreas.map((area) => (<div key={area} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="text-slate-600">{area}</span></div>))}</div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
              <h4 className="font-bold text-xl mb-2">Connect Instantly</h4>
              <p className="text-slate-400 mb-4">Click to call or chat on WhatsApp.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+918109279412" className="inline-flex items-center justify-center gap-3 text-lg font-bold text-red-500 hover:text-red-400 transition-colors"><PhoneCall className="w-5 h-5" /><span>Call Now</span></a>
                <a href="https://wa.me/918109279412" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 text-lg font-bold text-green-500 hover:text-green-400 transition-colors"><MessageCircle className="w-5 h-5" /><span>WhatsApp</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function ContactPage() {
  return (
   <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
}