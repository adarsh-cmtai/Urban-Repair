'use client';

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MapPin, Search, Loader2, X, Navigation, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setLocation } from '@/store/locationSlice';
import { searchLocations, getLocationByCoords } from '@/services/publicService';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-hot-toast';

export function LocationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (debouncedQuery.trim()) {
            setIsLoading(true);
            searchLocations(debouncedQuery)
                .then(res => setResults(res.data))
                .catch(() => toast.error("Failed to search for locations."))
                .finally(() => setIsLoading(false));
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    const handleLocationSelect = (location: any) => {
        dispatch(setLocation(location));
        toast.success(`Location set to ${location.areaName}`);
        onClose();
    };

    const handleDetectLocation = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        setIsDetecting(true);
        setQuery('');
        setResults([]);
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });

            const { latitude, longitude } = position.coords;
            const response = await getLocationByCoords(latitude, longitude);
            
            if (response.data && response.data.length > 0) {
                toast.success(`We found serviceable areas near you!`);
                setResults(response.data);
            } else {
                toast.error("Sorry, your current location is not serviceable.");
            }

        } catch (error: any) {
            if (error.code === 1) { // PERMISSION_DENIED
                toast.error("Please allow location access to use this feature.");
            } else if (error.response?.status === 404) {
                 toast.error(error.response.data.message || "Your location is not serviceable.");
            } else {
                toast.error("Could not detect your current location. Please try searching manually.");
            }
        } finally {
            setIsDetecting(false);
        }
    };
    
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-xl transform rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-full grid place-items-center">
                                        <MapPin className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">
                                            Select Your Location
                                        </Dialog.Title>
                                        <p className="text-slate-500 text-sm">Find services available in your area</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>
                           
                           <div className="p-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search for area, city, or pincode..."
                                        className="w-full h-14 pl-12 pr-4 text-base bg-white rounded-full border-2 border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>

                                <button 
                                    onClick={handleDetectLocation}
                                    disabled={isDetecting}
                                    className="w-full flex items-center justify-center gap-2.5 mt-4 h-12 rounded-full font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isDetecting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Navigation className="w-5 h-5" />
                                    )}
                                    <span>{isDetecting ? 'Detecting Location...' : 'Use My Current Location'}</span>
                                </button>
                           </div>

                            <div className="px-6 pb-6 min-h-[18rem] max-h-[18rem] overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                        <p>Searching...</p>
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="space-y-2">
                                        {results.map((loc: any) => (
                                            <button 
                                                key={loc._id} 
                                                onClick={() => handleLocationSelect(loc)}
                                                className="group w-full flex items-center justify-between gap-3 p-4 rounded-xl hover:bg-red-50 text-left transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{loc.areaName}, {loc.city}</p>
                                                        <p className="text-sm text-slate-500">{loc.state} - {loc.pincode}</p>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                ) : debouncedQuery ? (
                                     <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <p className="font-semibold">No Serviceable Locations Found</p>
                                        <p className="text-sm">Try a different area or pincode.</p>
                                    </div>
                                ) : (
                                     <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                        <p>Start typing to find your area.</p>
                                    </div>
                                )}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}