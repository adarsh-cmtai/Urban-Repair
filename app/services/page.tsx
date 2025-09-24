"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, X, ChevronDown } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface SubService {
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

interface Service {
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

interface CategoryWithServices {
    _id: string;
    name: string;
    services: Service[];
}

interface CartItem {
    serviceId: string;
    serviceName: string;
    serviceImage: string;
    subService: SubService;
    quantity: number;
    price: number;
}

const categoriesData: CategoryWithServices[] = [
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
    {
        _id: 'cat2',
        name: 'Sell Old Appliances',
        services: [
            {
                _id: 'service201',
                name: 'Sell Your Old AC',
                imageUrl: 'https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg',
                price: 1500,
                duration: '30 Mins Pickup',
                inclusions: ['Free doorstep pickup', 'Instant cash payment', 'Fair market price evaluation'],
                exclusions: ['Dismantling charges (if complex)', 'Units older than 15 years'],
                subServices: [
                    { _id: 'sub3_1', name: 'Sell Window AC', price: 1500, imageUrl: '/images/subservices/sell-ac-window.jpg' },
                    { _id: 'sub3_2', name: 'Sell Split AC', price: 2500, imageUrl: '/images/subservices/sell-ac-split.jpg' },
                ],
            },
        ],
    },
    {
        _id: 'cat3',
        name: 'Home Improvement',
        services: [
            {
                _id: 'service301',
                name: 'Interior Design Consultation',
                imageUrl: 'https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg',
                price: 2999,
                duration: '60 Mins Session',
                inclusions: ['Consultation with expert designer', 'Mood board creation', 'Basic layout plan'],
                exclusions: ['3D rendering', 'Full project execution', 'Material purchase'],
                subServices: [
                    { _id: 'sub4_1', name: 'Single Room Design', price: 2999, imageUrl: '/images/subservices/interior-room.jpg' },
                    { _id: 'sub4_2', name: 'Full Home Consultation', price: 9999, imageUrl: '/images/subservices/interior-home.jpg' },
                ],
            },
        ],
    },
];

const CheckIcon = () => (<Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />);
const CrossIcon = () => (<X className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />);
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

const ServiceModal = ({ service, isOpen, onClose, onAddToCart }: { service: Service | null; isOpen: boolean; onClose: () => void; onAddToCart: (item: CartItem) => void; }) => {
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

    const priceToShow = selectedSubService?.price ?? service?.price ?? 0;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
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
                                    <button
                                        key={option._id}
                                        onClick={() => setSelectedSubService(option)}
                                        className={`border rounded-lg text-left transition-all duration-200 overflow-hidden ${selectedSubService?._id === option._id
                                            ? "border-red-500 bg-red-50 ring-2 ring-red-300"
                                            : "border-gray-300 hover:border-red-400 hover:bg-gray-50"
                                            }`}
                                    >
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
                    {service.howItWorks && service.howItWorks.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-4 text-lg text-gray-800">How It Works</h3>
                            <div className="space-y-4">{service.howItWorks.map((step, index) => (<div key={index} className="flex items-start"><span className="flex-shrink-0 mr-4 mt-1 h-8 w-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">{index + 1}</span><div><strong className="block text-gray-800">{step.title}</strong><p className="text-gray-600">{step.description}</p></div></div>))}</div>
                        </div>
                    )}
                    {service.faqs && service.faqs.length > 0 && (
                        <div className="rounded-lg border border-gray-200 bg-white">
                            <button onClick={() => toggleAccordion('faqs')} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800">Frequently Asked Questions <ChevronDownIcon isOpen={openAccordion === 'faqs'} /></button>
                            {openAccordion === 'faqs' && <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200"><div className="space-y-4">{service.faqs.map((faq, i) => (<div key={i}><p className="font-semibold text-gray-800">{faq.question}</p><p className="text-gray-600 whitespace-pre-line">{faq.answer}</p></div>))}</div></div>}
                        </div>
                    )}
                </main>
                <footer className="p-4 border-t bg-white sticky bottom-0 flex justify-between items-center rounded-b-2xl">
                    <div className="font-bold text-2xl text-gray-800">₹{priceToShow.toLocaleString('en-IN')}</div>
                    <button onClick={handleAddToCartClick} disabled={!selectedSubService && (service.subServices && service.subServices.length > 0)} className="bg-red-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg">Add to Cart</button>
                </footer>
            </div>
        </div>
    );
};

export default function UrbanRepairServicesPage() {
    const [categories, setCategories] = useState<CategoryWithServices[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const [user, setUser] = useState<{ name: string } | null>(null); 
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        const fetchServices = () => {
            setLoading(true);
            setTimeout(() => {
                setCategories(categoriesData);
                setLoading(false);
            }, 1000); 
        };
        fetchServices();
    }, []);

    const handleAddToCart = (itemToAdd: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.subService._id === itemToAdd.subService._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.subService._id === itemToAdd.subService._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, itemToAdd];
        });
        toast.success(`${itemToAdd.serviceName} added to cart!`);
    };

    const handleQuantityChange = (subServiceId: string, delta: number) => {
        setCart(prevCart => {
            const itemToUpdate = prevCart.find(item => item.subService._id === subServiceId);
            if (!itemToUpdate) return prevCart;

            const newQuantity = itemToUpdate.quantity + delta;
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.subService._id !== subServiceId);
            }
            return prevCart.map(item =>
                item.subService._id === subServiceId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };
    
    const handleCategoryClick = (categoryId: string) => {
        categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleOpenModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleEditItem = (serviceId: string) => {
        const serviceToEdit = categories.flatMap(c => c.services).find(s => s._id === serviceId);
        if (serviceToEdit) handleOpenModal(serviceToEdit);
    };
    
    const handleProceedToCheckout = () => {
        if (!user) {
            setIsLoginModalOpen(true);
            toast.error('Please log in to proceed.');
            return;
        }
        setShowCheckout(true);
    };

    if (showCheckout) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
                    <p>This is where the checkout process would begin.</p>
                    <p className="font-bold my-4 text-2xl">Total: ₹{cartTotal.toLocaleString('en-IN')}</p>
                    <button onClick={() => setShowCheckout(false)} className="mt-4 bg-gray-800 text-white font-bold py-2 px-6 rounded-lg">Back to Services</button>
                </div>
            </div>
        );
    }

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
                            <div className="flex-grow">
                                <p className="font-bold text-gray-800">{item.serviceName}</p>
                                <p className="text-sm text-gray-600 my-1">{item.subService.name}</p>
                                <button onClick={() => handleEditItem(item.serviceId)} className="text-sm text-blue-600 hover:underline font-medium">Edit</button>
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button onClick={() => handleQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600 text-lg font-bold hover:bg-red-50 rounded-l-md">-</button>
                                <span className="px-3 font-bold text-gray-800">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600 text-lg font-bold hover:bg-green-50 rounded-r-md">+</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-50 rounded-b-2xl p-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <span className="font-extrabold text-2xl text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button onClick={handleProceedToCheckout} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">View Cart</button>
                </div>
            </div>
        );
    };

    return (
        <>
        <Header/>
            <Toaster position="top-center" reverseOrder={false} />
            <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsLoginModalOpen(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                        <p>Please log in to continue with your booking.</p>
                        <button onClick={() => {setUser({name: 'Demo User'}); setIsLoginModalOpen(false);}} className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg">Login as Demo</button>
                    </div>
                </div>
            )}
            <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="py-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Urban Repair Services</h1>
                        <p className="mt-2 text-lg text-gray-600">Your One-Stop Solution for Home Appliance Needs</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <aside className="lg:col-span-3 lg:sticky top-8 h-fit space-y-6 order-1 lg:order-3">
                            {renderCart()}
                        </aside>

                        <aside className="lg:col-span-3 lg:sticky top-8 h-fit space-y-6 order-2 lg:order-1">
                            <div className="border border-gray-200/80 rounded-2xl p-6 bg-white shadow-sm">
                                <h3 className="font-bold mb-4 text-gray-900 text-lg">Categories</h3>
                                <nav className="space-y-1">
                                    {categories.map(cat => (
                                        <a key={cat._id} onClick={() => handleCategoryClick(cat._id)} className="block w-full text-left p-3 rounded-lg text-base cursor-pointer transition-colors duration-200 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium">
                                            {cat.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <main className="lg:col-span-6 space-y-12 order-3 lg:order-2">
                            {loading && <div className="text-center p-20 font-semibold text-gray-500">Loading Services...</div>}
                            {error && <div className="text-center p-20 text-red-600 bg-red-50 rounded-lg">{error}</div>}
                            {!loading && !error && categories.map(category => (
                                category.services && category.services.length > 0 && (
                                    <section key={category._id} ref={el => { if (el) categoryRefs.current[category._id] = el; }}>
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800">{category.name}</h2>
                                        <div className="space-y-6">
                                            {category.services.map(service => (
                                                <div key={service._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200/80 p-5 flex flex-col sm:flex-row items-center gap-6">
                                                    <img src={service.imageUrl} alt={service.name} className="w-full sm:w-40 h-32 object-cover rounded-xl flex-shrink-0" />
                                                    <div className="flex-grow w-full">
                                                        <h4 className="text-xl font-bold text-gray-900">{service.name}</h4>
                                                        <p className="text-sm text-gray-500 my-1">🕒 {service.duration}</p>
                                                        <ul className="list-none p-0 my-3 space-y-1.5">
                                                            {service.inclusions.slice(0, 2).map((task, i) => <li key={i} className="flex items-center text-sm text-gray-600"><CheckIcon />{task}</li>)}
                                                        </ul>
                                                        <div className="flex justify-between items-center mt-4">
                                                            <p className="font-extrabold text-lg text-gray-900">₹{service.price}</p>
                                                            <button className="bg-red-50 text-red-600 border border-red-200 rounded-lg py-2 px-8 font-bold transition-all duration-200 hover:bg-red-600 hover:text-white" onClick={() => handleOpenModal(service)}>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )
                            ))}
                        </main>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}