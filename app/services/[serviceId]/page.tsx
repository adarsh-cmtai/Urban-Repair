"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Check, X, ChevronDown } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export interface SubService {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
}

interface Step {
    title: string;
    description: string;
}

interface FAQ {
    question: string;
    answer: string;
}

export interface Service {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    duration: string;
    inclusions: string[];
    exclusions: string[];
    subServices?: SubService[];
    howItWorks?: Step[];
    faqs?: FAQ[];
}

export interface CartItem {
    serviceId: string;
    serviceName: string;
    serviceImage: string;
    subService: SubService;
    quantity: number;
    price: number;
}

const categoriesData = [
    {
        _id: 'cat1',
        name: 'Appliance Repair',
        services: [
            {
                _id: 'service101',
                name: 'AC Repair & Service',
                imageUrl: 'https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg',
                price: 499,
                duration: '60-90 Mins',
                inclusions: ['Filter & coil cleaning', 'Cooling check', 'Performance diagnosis', 'Noise check'],
                exclusions: ['Spare parts cost', 'Gas refilling', 'Major repairs (e.g., compressor)'],
                subServices: [
                    { _id: 'sub1_1', name: 'Basic Service', price: 499, imageUrl: '/images/subservices/ac-basic.jpg' },
                    { _id: 'sub1_2', name: 'Deep Clean (Jet Wash)', price: 899, imageUrl: '/images/subservices/ac-jet.jpg' },
                    { _id: 'sub1_3', name: 'Gas Refill (Up to 1.5 Ton)', price: 2499, imageUrl: '/images/subservices/ac-gas.jpg' },
                ],
                howItWorks: [
                    { title: 'Book Your Service', description: 'Choose your required AC service and schedule a time slot.' },
                    { title: 'Technician Visit', description: 'Our expert technician will visit your location at the scheduled time.' },
                    { title: 'Diagnosis & Repair', description: 'The technician will diagnose the issue and complete the service efficiently.' },
                ],
                faqs: [
                    { question: 'How often should I get my AC serviced?', answer: 'We recommend getting your AC serviced at least once a year, preferably before the summer season begins, to ensure optimal performance.' },
                    { question: 'Is there a warranty on repairs?', answer: 'Yes, we provide a 30-day warranty on all our repair services for your peace of mind.' },
                ],
            },
            {
                _id: 'service102',
                name: 'Refrigerator Repair',
                imageUrl: 'https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg',
                price: 399,
                duration: '45-60 Mins',
                inclusions: ['Diagnosis of issue', 'Minor wiring repair', 'Cleaning of filters'],
                exclusions: ['Compressor replacement', 'Gas refilling', 'Spare parts'],
                subServices: [
                    { _id: 'sub2_1', name: 'Not Cooling Issue', price: 599, imageUrl: '/images/subservices/fridge-not-cooling.jpg' },
                    { _id: 'sub2_2', name: 'Gas Leak & Refill', price: 2199, imageUrl: '/images/subservices/fridge-gas.jpg' },
                ],
            },
        ],
    },
];

const CheckIcon = () => (<Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />);
const CrossIcon = () => (<X className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />);
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

function ServiceDetailContent({ params }: { params: { serviceId: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [service, setService] = useState<Service | null>(null);
    const [selectedSubService, setSelectedSubService] = useState<SubService | undefined>(undefined);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const allServices = categoriesData.flatMap(cat => cat.services);
        const currentService = allServices.find(s => s._id === params.serviceId);
        
        if (currentService) {
            setService(currentService);
            const selectedId = searchParams.get('selected');
            const preselectedSubService = currentService.subServices?.find(ss => ss._id === selectedId);
            setSelectedSubService(preselectedSubService || currentService.subServices?.[0]);
        } else {
            notFound();
        }

        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, [params.serviceId, searchParams]);

    const updateCartInStorage = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const handleAddToCartClick = () => {
        if (service && selectedSubService) {
            const itemToAdd: CartItem = {
                serviceId: service._id,
                serviceName: service.name,
                serviceImage: service.imageUrl,
                subService: selectedSubService,
                quantity: 1,
                price: selectedSubService.price
            };
            const existingItem = cart.find(item => item.subService._id === itemToAdd.subService._id);
            let newCart;
            if (existingItem) {
                newCart = cart.map(item =>
                    item.subService._id === itemToAdd.subService._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...cart, itemToAdd];
            }
            updateCartInStorage(newCart);
            toast.success(`${itemToAdd.serviceName} added to cart!`);
        }
    };

    const handleQuantityChange = (subServiceId: string, delta: number) => {
        const newCart = cart.map(item =>
            item.subService._id === subServiceId ? { ...item, quantity: item.quantity + delta } : item
        ).filter(item => item.quantity > 0);
        updateCartInStorage(newCart);
    };

    const handleProceedToCheckout = () => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }
        router.push('/checkout');
    };

    const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const renderCart = () => {
        if (cart.length === 0) {
            return (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white flex flex-col items-center justify-center min-h-[200px] text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.849l1.855-6.992a.75.75 0 00-.7-1.018H5.614M16.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                    <p className="font-semibold">Your Cart is Empty</p>
                    <p className="text-sm">Add services to get started</p>
                </div>
            );
        }
        return (
            <div className="rounded-2xl shadow-lg border border-gray-200/80 bg-white">
                <div className="p-4 border-b border-gray-200"><h3 className="font-bold text-xl text-gray-800">My Cart</h3></div>
                <div className="p-4 space-y-4 max-h-72 overflow-y-auto">
                    {cart.map(item => (
                        <div key={item.subService._id} className="flex justify-between items-start gap-3">
                            <div className="flex-grow"><p className="font-bold text-gray-800">{item.serviceName}</p><p className="text-sm text-gray-600 my-1">{item.subService.name}</p></div>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button onClick={() => handleQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600 text-lg font-bold hover:bg-red-50 rounded-l-md">-</button>
                                <span className="px-3 font-bold text-gray-800">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600 text-lg font-bold hover:bg-green-50 rounded-r-md">+</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-b-2xl p-4 flex justify-between items-center">
                    <div><p className="text-sm text-gray-500">Total Price</p><span className="font-extrabold text-2xl text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span></div>
                    <button onClick={handleProceedToCheckout} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">View Cart</button>
                </div>
            </div>
        );
    };

    if (!service) {
        return <div className="min-h-screen flex items-center justify-center">Loading service details...</div>;
    }

    const priceToShow = selectedSubService?.price ?? service?.price ?? 0;

    return (
        <>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsLoginModalOpen(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                        <p>Please log in to continue with your booking.</p>
                        <button onClick={() => { const demoUser = { name: 'Demo User' }; setUser(demoUser); localStorage.setItem('user', JSON.stringify(demoUser)); setIsLoginModalOpen(false); router.push('/checkout'); }} className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg">Login as Demo</button>
                    </div>
                </div>
            )}
            <div className="font-sans bg-gray-50 min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <img src={service.imageUrl} alt={service.name} className="w-full h-80 object-contain rounded-2xl shadow-lg" />
                                <h1 className="text-4xl font-extrabold text-gray-900 mt-6">{service.name}</h1>
                                <p className="text-lg text-gray-600 mt-2">🕒 {service.duration}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 bg-green-50/50 border border-green-200 rounded-lg"><h3 className="font-semibold text-green-800 mb-3 text-lg">What's Included?</h3><ul className="space-y-2 text-gray-700">{service.inclusions.map((item, i) => <li key={i} className="flex"><CheckIcon />{item}</li>)}</ul></div>
                                <div className="p-5 bg-red-50/50 border border-red-200 rounded-lg"><h3 className="font-semibold text-red-800 mb-3 text-lg">What's Excluded?</h3><ul className="space-y-2 text-gray-700">{service.exclusions.map((item, i) => <li key={i} className="flex"><CrossIcon />{item}</li>)}</ul></div>
                            </div>
                            {service.howItWorks && service.howItWorks.length > 0 && (<div><h2 className="font-bold mb-4 text-2xl text-gray-800">How It Works</h2><div className="space-y-4">{service.howItWorks.map((step, index) => (<div key={index} className="flex items-start"><span className="flex-shrink-0 mr-4 mt-1 h-8 w-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">{index + 1}</span><div><strong className="block text-gray-800">{step.title}</strong><p className="text-gray-600">{step.description}</p></div></div>))}</div></div>)}
                            {service.faqs && service.faqs.length > 0 && (<div className="rounded-lg border border-gray-200 bg-white"><button onClick={() => toggleAccordion('faqs')} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 text-lg">Frequently Asked Questions <ChevronDownIcon isOpen={openAccordion === 'faqs'} /></button>{openAccordion === 'faqs' && <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200"><div className="space-y-4">{service.faqs.map((faq, i) => (<div key={i}><p className="font-semibold text-gray-800">{faq.question}</p><p className="text-gray-600 whitespace-pre-line">{faq.answer}</p></div>))}</div></div>}</div>)}
                        </div>
                        <aside className="lg:sticky top-8 h-fit space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-6">
                                <h3 className="font-bold text-xl text-gray-800">Select Service Type</h3>
                                {service.subServices && service.subServices.length > 0 ? (<div className="space-y-3">{service.subServices.map((option) => (<button key={option._id} onClick={() => setSelectedSubService(option)} className={`w-full border rounded-lg text-left transition-all duration-200 flex items-center p-3 gap-4 ${selectedSubService?._id === option._id ? "border-red-500 bg-red-50 ring-2 ring-red-300" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}><div className="flex-grow"><p className="font-bold text-gray-800 text-sm">{option.name}</p><p className="font-semibold text-red-600 text-sm mt-1">₹{option.price}</p></div></button>))}</div>) : (<p className="text-gray-600">This service does not have additional options.</p>)}
                                <div className="border-t pt-6">
                                    <div className="flex justify-between items-center mb-4"><p className="text-gray-600">Price</p><div className="font-extrabold text-3xl text-gray-900">₹{priceToShow.toLocaleString('en-IN')}</div></div>
                                    <button onClick={handleAddToCartClick} disabled={!selectedSubService} className="w-full bg-red-600 text-white font-bold py-3.5 px-10 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg">Add to Cart</button>
                                </div>
                            </div>
                            {renderCart()}
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailContent params={params} />
        </Suspense>
    );
}