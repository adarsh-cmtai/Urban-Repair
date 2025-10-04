"use client"

import { useState, useEffect } from "react"
import { MapPin, CheckCircle, AlertTriangle, Search, Loader2 } from "lucide-react"
import api from "@/services/api";

export function ServiceAreaMap() {
  const [areas, setAreas] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{ status: 'idle' | 'success' | 'error' | 'loading'; message: string }>({ status: 'idle', message: '' });

  useEffect(() => {
    api.get('/public/locations/list-areas').then(res => setAreas(res.data.data));
  }, []);

  const handleCheckArea = async () => {
    if (!searchQuery) return;
    setSearchResult({ status: 'loading', message: '' });
    try {
        const res = await api.get(`/public/locations/search?query=${encodeURIComponent(searchQuery)}`);
        if (res.data.data.length > 0) {
            setSearchResult({ status: 'success', message: `Great! We serve in ${res.data.data[0].areaName}, ${res.data.data[0].city}.` });
        } else {
            setSearchResult({ status: 'error', message: 'Sorry, we are not yet available in your area.' });
        }
    } catch {
        setSearchResult({ status: 'error', message: 'An error occurred. Please try again.' });
    }
  };
  
  const animationStyles = `
    @keyframes fade-in-up { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6">
              We've Got Your City Covered
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Our technicians are positioned across the city for swift service. Here are some major areas we serve:
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-12">
              {areas.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-red-500" />
                  <span className="text-slate-700 font-medium">{area}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-heading font-bold text-2xl text-slate-800 mb-3">Check Your Location</h3>
              <p className="text-slate-500 mb-5">
                Enter your pincode, area, or city to instantly verify availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., Madhapur or 500081"
                      className="pl-12 w-full h-14 rounded-xl border border-slate-300"
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckArea()}
                    />
                </div>
                <button
                  onClick={handleCheckArea}
                  className="inline-flex items-center justify-center h-14 px-8 bg-red-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  {searchResult.status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin"/> : <><Search className="w-5 h-5 mr-2"/>Check</>}
                </button>
              </div>
              {searchResult.status !== 'idle' && searchResult.status !== 'loading' && (
                <div className={`mt-4 flex items-center gap-2 text-sm font-medium animate-fade-in-up ${searchResult.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {searchResult.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-h-5" />}
                  <span>{searchResult.message}</span>
                </div>
              )}
            </div>
          </div>
          <div className="relative p-4 bg-slate-900 rounded-3xl shadow-2xl">
              <img src="/hyderabad-city-map-with-service-areas-highlighted.jpg" alt="Map" className="w-full h-full object-cover rounded-xl"/>
          </div>
        </div>
      </div>
    </section>
  )
}