'use client';

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MapPin, Search, Loader2, X, Navigation } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setLocation } from '@/store/locationSlice';
import { searchLocations, getLocationByCoords } from '@/services/publicService';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-hot-toast';

export function LocationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (debouncedQuery) {
            setIsLoading(true);
            searchLocations(debouncedQuery)
                .then(res => setResults(res.data))
                .finally(() => setIsLoading(false));
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    const handleLocationSelect = (location: any) => {
        dispatch(setLocation(location));
        onClose();
    };

    const handleDetectLocation = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        setIsDetecting(true);
        setQuery('');
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000 
                });
            });

            const { latitude, longitude } = position.coords;
            const response = await getLocationByCoords(latitude, longitude);
            
            toast.success(`We found serviceable areas near you!`);
            setResults(response.data);

        } catch (error: any) {
            if (error.code === 1) {
                toast.error("Please allow location access to use this feature.");
            } else if (error.response?.status === 404) {
                 toast.error(error.response.data.message || "Your location is not serviceable.");
            } else {
                toast.error("Could not detect your current location.");
            }
        } finally {
            setIsDetecting(false);
        }
    };
    
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-lg transform rounded-2xl bg-white shadow-xl flex flex-col">
                           <div className="p-6">
                                <Dialog.Title as="h3" className="font-heading text-2xl font-bold text-slate-800 text-center">
                                    Select Your Location
                                </Dialog.Title>
                                <p className="text-center text-slate-500 mt-2">Find services available in your area</p>
                                <div className="relative mt-6">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search for area, pincode..."
                                        className="w-full h-14 pl-12 pr-4 text-lg bg-slate-100 rounded-full border-slate-300 focus:ring-red-500 focus:border-red-500"
                                    />
                                    {isLoading && <Loader2 className="animate-spin absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
                                </div>

                                <button 
                                    onClick={handleDetectLocation}
                                    disabled={isDetecting}
                                    className="w-full flex items-center justify-center gap-2 mt-4 h-12 rounded-full font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isDetecting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Navigation className="w-5 h-5" />
                                    )}
                                    <span>{isDetecting ? 'Detecting...' : 'Use my current location'}</span>
                                </button>

                                <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                                    {results.length > 0 ? (
                                        results.map((loc: any) => (
                                            <button 
                                                key={loc._id} 
                                                onClick={() => handleLocationSelect(loc)}
                                                className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-red-50 text-left"
                                            >
                                                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-slate-800">{loc.areaName}, {loc.city}</p>
                                                    <p className="text-sm text-slate-500">{loc.state} - {loc.pincode}</p>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        !isLoading && query && <p className="text-center text-slate-500 p-4">No serviceable locations found.</p>
                                    )}
                                </div>
                           </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}