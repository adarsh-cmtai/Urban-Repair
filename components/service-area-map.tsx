"use client"

import { useState, useEffect } from "react"
import { MapPin, CheckCircle, AlertTriangle, Search, Loader2 } from "lucide-react"
import api from "@/services/api";

export function ServiceAreaMap() {
  const [areas, setAreas] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{ status: 'idle' | 'success' | 'error' | 'loading'; message: string }>({ status: 'idle', message: '' });

  useEffect(() => {
    api.get('/public/locations/list-areas')
      .then(res => setAreas(res.data.data.slice(0, 8)))
      .catch(err => console.error("Failed to fetch areas", err));
  }, []);

  const handleCheckArea = async () => {
    if (!searchQuery.trim()) return;
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
    .map-ping {
      position: absolute;
      border-radius: 9999px;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes ping {
      75%, 100% { transform: scale(2); opacity: 0; }
    }
  `;

  return (
    <section className="py-8 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up order-2 lg:order-1">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
              We've Got Your Area Covered
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Check if we provide services in your location and explore some of the major areas we cover.
            </p>

            <div className="mb-10">
              <div className="relative flex items-center">
                  <MapPin className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter pincode or area name"
                    className="pl-12 pr-32 w-full h-14 rounded-full border-2 border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckArea()}
                  />
                  <button
                    onClick={handleCheckArea}
                    disabled={searchResult.status === 'loading'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex cursor-pointer items-center justify-center h-10 px-6 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors disabled:bg-slate-400"
                  >
                    {searchResult.status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Check'}
                  </button>
              </div>
              {searchResult.status !== 'idle' && searchResult.status !== 'loading' && (
                <div className={`mt-4 flex items-center gap-2 text-sm font-semibold p-3 rounded-lg animate-fade-in-up ${
                  searchResult.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {searchResult.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  <span>{searchResult.message}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4">Major Service Areas</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {areas.length > 0 ? areas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{area}</span>
                    </div>
                  )) : Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="flex items-center gap-2 animate-pulse">
                        <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          <div className="relative w-full aspect-square animate-fade-in-up order-1 lg:order-2">
              <img src="/AC-2.jpeg" alt="Service Map" className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-slate-300/60"/>
              <div className="absolute inset-0">
                  {/* Service Points */}
                  <span className="absolute top-[20%] left-[30%] w-3 h-3 bg-red-500 rounded-full">
                      <span className="map-ping bg-red-400" style={{ animationDelay: '0s' }}></span>
                  </span>
                   <span className="absolute top-[40%] left-[60%] w-3 h-3 bg-red-500 rounded-full">
                      <span className="map-ping bg-red-400" style={{ animationDelay: '0.5s' }}></span>
                  </span>
                   <span className="absolute top-[65%] left-[40%] w-3 h-3 bg-red-500 rounded-full">
                      <span className="map-ping bg-red-400" style={{ animationDelay: '1s' }}></span>
                  </span>
                   <span className="absolute top-[75%] left-[70%] w-3 h-3 bg-red-500 rounded-full">
                      <span className="map-ping bg-red-400" style={{ animationDelay: '0.2s' }}></span>
                  </span>
                   <span className="absolute top-[25%] left-[75%] w-3 h-3 bg-red-500 rounded-full">
                      <span className="map-ping bg-red-400" style={{ animationDelay: '0.7s' }}></span>
                  </span>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}