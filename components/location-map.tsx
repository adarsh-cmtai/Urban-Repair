import { CheckCircle, PhoneCall } from "lucide-react"

const serviceAreas = [
  "Banjara Hills", "Jubilee Hills", "Gachibowli",
  "HITEC City", "Kondapur", "Madhapur",
  "Kukatpally", "Secunderabad", "Begumpet",
  "Ameerpet", "Miyapur", "Uppal",
]

export function LocationMap() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4">
            Find Us
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Visit our office or we can come to you. We serve all major areas across Hyderabad.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121823.5947752178!2d78.3281246949354!3d17.44754521484555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a276decedf%3A0x2ad1b553c55490a2!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1678273942351!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80">
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6">Our Service Areas</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {serviceAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-slate-600">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
              <h4 className="font-bold text-xl mb-2">Need Immediate Help?</h4>
              <p className="text-slate-400 mb-4">Call our emergency hotline for urgent repairs.</p>
              <a 
                href="tel:+919876543211" 
                className="inline-flex items-center justify-center gap-3 text-2xl font-bold text-red-500 hover:text-red-400 transition-colors"
              >
                <PhoneCall className="w-6 h-6" />
                <span>+91 98765 43211</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}