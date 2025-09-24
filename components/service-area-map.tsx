"use client"

import { useState } from "react"
import { MapPin, CheckCircle, AlertTriangle } from "lucide-react"

const areas = [
  "Madhapur",
  "Gachibowli",
  "Kondapur",
  "Kukatpally",
  "Ameerpet",
  "Begumpet",
  "Secunderabad",
  "Jubilee Hills",
];

const serviceablePincodes = ["500081", "500032", "500084", "500072", "500016", "500003", "500033"];

export function ServiceAreaMap() {
  const [pincode, setPincode] = useState("");
  const [checkResult, setCheckResult] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  const handleCheckPincode = () => {
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      setCheckResult({ status: 'error', message: 'Please enter a valid 6-digit pincode.' });
      return;
    }

    setTimeout(() => {
      if (serviceablePincodes.includes(pincode)) {
        setCheckResult({ status: 'success', message: 'Great! We serve in your area. You can book a service now.' });
      } else {
        setCheckResult({ status: 'error', message: 'Sorry, we are not yet available in your area, but we are expanding soon!' });
      }
    }, 500);
  };
  
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    @keyframes ping-large {
      75%, 100% { transform: scale(2.5); opacity: 0; }
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
    .animate-ping-large { animation: ping-large 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
  `;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4 text-balance">
              Serving All Across Hyderabad
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our strategically located service centers ensure quick response times wherever you are in the city.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {areas.map((area) => (
                <div key={area} className="flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{area}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Not sure if we serve your area?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Enter your pincode below to check for service availability instantly.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setCheckResult({ status: 'idle', message: '' });
                  }}
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/30 focus:border-red-500 outline-none transition-shadow"
                />
                <button
                  onClick={handleCheckPincode}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold transform hover:scale-105"
                >
                  Check
                </button>
              </div>
              {checkResult.status !== 'idle' && (
                <div className={`mt-4 flex items-center space-x-2 text-sm font-medium animate-fade-in-up ${checkResult.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {checkResult.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  <span>{checkResult.message}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative aspect-square animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
            <img
              src="/hyderabad-city-map-with-service-areas-highlighted.jpg"
              alt="Hyderabad service area map"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
            
            {[
              { top: '25%', left: '50%' },
              { top: '50%', left: '30%', delay: '0.5s' },
              { top: '65%', left: '60%', delay: '1s' },
              { top: '40%', left: '75%', delay: '0.2s' },
            ].map((pos, index) => (
              <div key={index} className="absolute" style={{ top: pos.top, left: pos.left }}>
                <div className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-0 bg-red-600 rounded-full"></div>
                  <div 
                    className="absolute inset-0 bg-red-500 rounded-full animate-ping-large"
                    style={{ animationDelay: pos.delay }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}