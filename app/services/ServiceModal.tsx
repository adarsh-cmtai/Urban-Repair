'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Check, X, ChevronDown } from 'lucide-react';
import { Service, SubService, CartItem } from './types';

const CheckIcon = () => (<Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />);
const CrossIcon = () => (<X className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />);
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

export function ServiceModal({ service, isOpen, onClose, onAddToCart }: { service: Service | null; isOpen: boolean; onClose: () => void; onAddToCart: (item: CartItem) => void; }) {
    const [selectedSubService, setSelectedSubService] = useState<SubService | undefined>(undefined);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && service) {
            setSelectedSubService(service.subServices?.[0] || undefined);
            setOpenAccordion(null);
        }
    }, [isOpen, service]);

    if (!isOpen || !service) return null;

    const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);

    const handleAddToCartClick = () => {
        if (selectedSubService) {
            onAddToCart({
                serviceId: service._id,
                serviceName: service.name,
                serviceImage: service.imageUrl,
                subService: selectedSubService,
                quantity: 1,
                price: selectedSubService.price
            });
            onClose();
        }
    };

    const priceToShow = selectedSubService?.price ?? service.price;

    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <header className="p-5 border-b sticky top-0 bg-white rounded-t-2xl z-10 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                                <p className="text-sm text-gray-500">Starts from ₹{service.price}</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X className="w-6 h-6 text-gray-600" /></button>
                        </header>
                        <main className="overflow-y-auto p-6 space-y-8">
                            {service.subServices && service.subServices.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3 text-lg text-gray-800">Select Service Type</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.subServices.map((option) => (
                                            <button key={option._id} onClick={() => setSelectedSubService(option)} className={`border rounded-lg text-left transition-all duration-200 overflow-hidden ${selectedSubService?._id === option._id ? "border-red-500 bg-red-50 ring-2 ring-red-300" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}>
                                                <img src={option.imageUrl || service.imageUrl} alt={option.name} className="w-full h-24 object-cover" />
                                                <div className="p-3">
                                                    <p className="font-bold text-gray-800 text-sm line-clamp-2">{option.name}</p>
                                                    <p className="font-semibold text-red-600 text-sm mt-1">₹{option.price}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg">
                                    <h3 className="font-semibold text-green-800 mb-3">What's Included?</h3>
                                    <ul className="space-y-2 text-sm text-gray-700">{service.inclusions.map((item, i) => <li key={i} className="flex"><CheckIcon />{item}</li>)}</ul>
                                </div>
                                <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg">
                                    <h3 className="font-semibold text-red-800 mb-3">What's Excluded?</h3>
                                    <ul className="space-y-2 text-sm text-gray-700">{service.exclusions.map((item, i) => <li key={i} className="flex"><CrossIcon />{item}</li>)}</ul>
                                </div>
                            </div>
                             {service.howItWorks && service.howItWorks.length > 0 && (<div><h3 className="font-semibold mb-4 text-lg text-gray-800">How It Works</h3><div className="space-y-4">{service.howItWorks.map((step, index) => (<div key={index} className="flex items-start"><span className="flex-shrink-0 mr-4 mt-1 h-8 w-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">{index + 1}</span><div><strong className="block text-gray-800">{step.title}</strong><p className="text-gray-600">{step.description}</p></div></div>))}</div></div>)}
                            {service.faqs && service.faqs.length > 0 && (<div className="rounded-lg border border-gray-200 bg-white"><button onClick={() => toggleAccordion('faqs')} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800">Frequently Asked Questions <ChevronDownIcon isOpen={openAccordion === 'faqs'} /></button>{openAccordion === 'faqs' && <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200"><div className="space-y-4">{service.faqs.map((faq, i) => (<div key={i}><p className="font-semibold text-gray-800">{faq.question}</p><p className="text-gray-600 whitespace-pre-line">{faq.answer}</p></div>))}</div></div>}</div>)}
                        </main>
                        <footer className="p-4 border-t bg-white sticky bottom-0 flex justify-between items-center rounded-b-2xl">
                            <div className="font-bold text-2xl text-gray-800">₹{priceToShow.toLocaleString('en-IN')}</div>
                            <button onClick={handleAddToCartClick} disabled={!selectedSubService && (service.subServices && service.subServices.length > 0)} className="bg-red-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg">Add to Cart</button>
                        </footer>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    );
};