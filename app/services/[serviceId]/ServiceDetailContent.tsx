"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Plus, Minus, CheckCircle, Clock, ShoppingCart, Trash2, ChevronRight, ArrowRight, FileText, Info, AlertCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Service, CartItem, SubService } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { getRateCardsBySubServiceId } from '@/services/publicService';

interface RateCard {
    _id: string;
    name: string;
    description: string;
    price: number;
}

const IncludedIcon = () => (<CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />);
const ExcludedIcon = () => (<X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 p-0.5 border-2 border-red-500 rounded-full" />);

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
    <div className="border-b border-slate-200 last:border-0">
        <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left font-semibold text-slate-800 text-lg hover:bg-slate-50/50 px-3 rounded-lg transition-colors">
            <span>{title}</span>
            <div className={`w-8 h-8 flex items-center justify-center text-slate-500 bg-slate-100 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-red-100 text-red-600' : ''}`}>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
            </div>
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden text-slate-600 px-3 leading-relaxed">{children}</div>
        </div>
    </div>
);

const CartSidebar = ({ cart, onQuantityChange, onProceedToCheckout, user, onClearCart }: { cart: CartItem[], onQuantityChange: (id: string, delta: number) => void, onProceedToCheckout: () => void, user: any, onClearCart: () => void }) => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 bg-white overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <h3 className="font-heading font-bold text-lg text-slate-900">Your Cart</h3>
                    {cartItemCount > 0 && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm shadow-red-200">{cartItemCount}</span>}
                </div>
                 {cart.length > 0 && <button onClick={onClearCart} className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"><Trash2 size={14}/> Clear</button>}
            </div>
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {cart.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                            <ShoppingCart className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">Your cart is currently empty.</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.subService._id} className="group flex justify-between items-start gap-3 pb-3 border-b border-dashed border-slate-100 last:border-0 last:pb-0">
                            <div className="flex-grow min-w-0">
                                <p className="font-bold text-slate-800 text-sm truncate">{item.serviceName}</p>
                                <p className="text-xs text-slate-500 truncate mt-0.5">{item.subService.name}</p>
                                <p className="text-xs font-semibold text-red-600 mt-1">₹{item.price * item.quantity}</p>
                            </div>
                            <div className="flex items-center border border-slate-200 rounded-lg bg-white shadow-sm h-8">
                                <button onClick={() => onQuantityChange(item.subService._id, -1)} className="w-8 h-full flex items-center justify-center text-red-600 hover:bg-red-50 rounded-l-lg transition-colors">-</button>
                                <span className="w-8 h-full flex items-center justify-center font-bold text-slate-800 text-xs border-x border-slate-100">{item.quantity}</span>
                                <button onClick={() => onQuantityChange(item.subService._id, 1)} className="w-8 h-full flex items-center justify-center text-green-600 hover:bg-green-50 rounded-r-lg transition-colors">+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="bg-slate-50 p-5 border-t border-slate-200">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-sm font-semibold text-slate-500">Subtotal</span>
                        <span className="font-extrabold text-2xl text-slate-900 leading-none">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button onClick={onProceedToCheckout} className={`w-full text-white font-bold h-12 rounded-xl shadow-lg shadow-red-200 transition-all hover:scale-[1.02] active:scale-[0.98] text-base flex items-center justify-center gap-2 ${user ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black'}`}>
                        {user ? 'Proceed to Checkout' : 'Login to Checkout'} <ArrowRight size={18}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export function ServiceDetailContent({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedSubService, setSelectedSubService] = useState<SubService | undefined>(undefined);
    const [rateCards, setRateCards] = useState<RateCard[]>([]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (service?.subServices && service.subServices.length > 0) {
            setSelectedSubService(service.subServices[0]);
        }
        try { 
            const storedCart = localStorage.getItem('cart'); 
            if (storedCart) setCart(JSON.parse(storedCart)); 
        } catch (error) { 
            console.error("Could not parse cart from localStorage", error); 
        }
    }, [service]);

    useEffect(() => {
        const fetchRateCards = async () => {
            if (selectedSubService) {
                try {
                    const res = await getRateCardsBySubServiceId(selectedSubService._id);
                    if (res.success) {
                        setRateCards(res.data);
                    } else {
                        setRateCards([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch rate cards", error);
                    setRateCards([]);
                }
            } else {
                setRateCards([]);
            }
        };

        fetchRateCards();
    }, [selectedSubService]);

    const updateCartInStorage = (newCart: CartItem[]) => { 
        setCart(newCart); 
        localStorage.setItem('cart', JSON.stringify(newCart)); 
    };

    const handleAddToCartClick = () => {
        if (service?.subServices && service.subServices.length > 0 && !selectedSubService) { 
            toast.error("Please select a service type."); 
            return; 
        }
        const subServiceToAdd = selectedSubService || service.subServices?.[0];
        if (service && subServiceToAdd) {
            const itemToAdd: CartItem = { serviceId: service._id, serviceName: service.name, serviceImage: service.imageUrl, subService: subServiceToAdd, quantity: 1, price: subServiceToAdd.price };
            const existingItem = cart.find(item => item.subService._id === itemToAdd.subService._id);
            const newCart = existingItem 
                ? cart.map(item => item.subService._id === itemToAdd.subService._id ? { ...item, quantity: item.quantity + 1 } : item) 
                : [...cart, itemToAdd];
            updateCartInStorage(newCart);
            toast.success(`${itemToAdd.subService.name} added to cart!`);
        }
    };

    const handleQuantityChange = (subServiceId: string, delta: number) => {
        const itemToUpdate = cart.find(item => item.subService._id === subServiceId);
        if (!itemToUpdate) return;
        const newQuantity = itemToUpdate.quantity + delta;
        const newCart = newQuantity <= 0 
            ? cart.filter(item => item.subService._id !== subServiceId) 
            : cart.map(item => item.subService._id === subServiceId ? { ...item, quantity: newQuantity } : item);
        updateCartInStorage(newCart);
    };
    
    const handleClearCart = () => { if (window.confirm("Are you sure you want to clear your cart?")) updateCartInStorage([]); };
    const handleProceedToCheckout = () => router.push(user ? '/checkout' : '/login?redirect=/checkout');
    
    const priceToShow = selectedSubService?.price ?? service.subServices?.[0]?.price ?? service.price;
    const imageToShow = selectedSubService?.imageUrl || service.imageUrl;
    const canAddToCart = (service?.subServices && service.subServices.length > 0) ? !!selectedSubService : true;

    return (
        <>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <main className="font-sans bg-[#F8F9FA] min-h-screen pb-20">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    
                    <nav className="flex items-center text-sm text-slate-500 font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
                        <Link href="/" className="hover:text-red-600 transition-colors">Home</Link> 
                        <ChevronRight size={14} className="mx-2 text-slate-400"/>
                        <Link href="/services" className="hover:text-red-600 transition-colors">Services</Link> 
                        <ChevronRight size={14} className="mx-2 text-slate-400"/>
                        <span className="text-slate-800 font-semibold">{service.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        
                        <div className="lg:col-span-8 space-y-10">
                            
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative group">
                                        <img src={imageToShow} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                    <div className="space-y-5">
                                        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">{service.name}</h1>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="inline-flex items-center gap-2 text-slate-700 bg-slate-100 rounded-full px-4 py-2 text-sm font-semibold border border-slate-200">
                                                <Clock className="w-4 h-4 text-slate-500" /> <span>{service.duration}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 rounded-full px-4 py-2 text-sm font-semibold border border-green-100">
                                                <CheckCircle className="w-4 h-4" /> <span>Verified Professionals</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-lg leading-relaxed">
                                            Expert technicians for your {service.name.toLowerCase()} needs. Quick, reliable, and affordable service at your doorstep.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {rateCards.length > 0 && (
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="bg-slate-50/80 p-6 border-b border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-bold text-xl text-slate-900">Standard Rate Card</h3>
                                                <p className="text-sm text-slate-500">Transparent pricing for {selectedSubService?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            {rateCards.map((rateCard) => (
                                                <div key={rateCard._id} className="flex justify-between items-start pb-4 border-b border-dashed border-slate-200 last:border-0 last:pb-0 md:last:border-b md:nth-last-child-2:border-0">
                                                    <div className="pr-4">
                                                        <p className="font-bold text-slate-800 text-base">{rateCard.name}</p>
                                                        {rateCard.description && <p className="text-sm text-slate-500 mt-1 leading-snug">{rateCard.description}</p>}
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <span className="block font-bold text-lg text-slate-900">₹{rateCard.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-800 font-medium">
                                                <strong>Note:</strong> The final price may vary based on the actual condition of the appliance during inspection and any additional spare parts required.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                                        <CheckCircle size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-slate-900 mb-6 text-xl">What's Included?</h3>
                                    <ul className="space-y-4 text-slate-700 flex-grow">
                                        {service.inclusions?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1"><IncludedIcon /></div>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                                        <X size={28} />
                                    </div>
                                    <h3 className="font-heading font-bold text-slate-900 mb-6 text-xl">What's Excluded?</h3>
                                    <ul className="space-y-4 text-slate-700 flex-grow">
                                        {service.exclusions?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1"><ExcludedIcon /></div>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {service.howItWorks && service.howItWorks.length > 0 && (
                                <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                                    <h2 className="font-heading font-bold mb-10 text-2xl md:text-3xl text-slate-900 text-center">How It Works</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                                        <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>
                                        {service.howItWorks.map((step, index) => (
                                            <div key={index} className="flex flex-col items-center text-center relative">
                                                <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-red-200 mb-6 z-10 border-4 border-white">
                                                    {index + 1}
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.faqs && service.faqs.length > 0 && (
                                <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900">Frequently Asked Questions</h2>
                                    </div>
                                    <div className="space-y-2">
                                        {service.faqs.map((faq, i) => (
                                            <AccordionItem key={i} title={faq.question} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                                <p className="whitespace-pre-line text-base">{faq.answer}</p>
                                            </AccordionItem>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="lg:col-span-4 lg:sticky top-24 space-y-8">
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200/60 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
                                <h3 className="font-bold text-xl text-slate-900 font-heading mb-6">Select Option</h3>
                                
                                {service.subServices && service.subServices.length > 0 ? (
                                    <div className="space-y-3">
                                        {service.subServices.map((option) => (
                                            <button 
                                                key={option._id} 
                                                onClick={() => setSelectedSubService(option)} 
                                                className={`w-full border rounded-2xl text-left cursor-pointer transition-all duration-300 flex items-center p-4 gap-4 group relative overflow-hidden ${selectedSubService?._id === option._id ? "border-red-500 bg-red-50/50 shadow-md shadow-red-100" : "border-slate-200 hover:border-red-300 hover:bg-slate-50"}`}
                                            >
                                                <div className="flex-grow z-10">
                                                    <p className={`font-bold text-sm transition-colors ${selectedSubService?._id === option._id ? 'text-red-800' : 'text-slate-700'}`}>{option.name}</p>
                                                    <p className="font-extrabold text-slate-900 text-lg mt-0.5">₹{option.price.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 z-10 ${selectedSubService?._id === option._id ? 'border-red-500 bg-red-500 scale-110' : 'border-slate-300 group-hover:border-red-400'}`}>
                                                    {selectedSubService?._id === option._id && <Check className="w-3.5 h-3.5 text-white stroke-[3]"/>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : <p className="text-slate-500 italic bg-slate-50 p-4 rounded-xl text-sm border border-slate-200">Standard pricing applies to this service.</p>}
                                
                                <div className="border-t border-dashed border-slate-200 pt-6 mt-6">
                                    <div className="flex justify-between items-end mb-6">
                                        <div className="text-sm font-semibold text-slate-500">Visiting Charges</div>
                                        <div className="font-extrabold text-3xl text-slate-900 leading-none">₹{priceToShow.toLocaleString('en-IN')}</div>
                                    </div>
                                    <button 
                                        onClick={handleAddToCartClick} 
                                        disabled={!canAddToCart} 
                                        className="w-full bg-slate-900 text-white font-bold h-14 rounded-2xl hover:bg-black transition-all transform active:scale-[0.98] shadow-lg shadow-slate-300 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none text-lg flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={20} className="mb-0.5"/> Add to Cart
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-3 font-medium flex items-center justify-center gap-1">
                                        <ShieldCheckIcon className="w-3 h-3"/> 100% Safe & Secure Checkout
                                    </p>
                                </div>
                            </div>

                            <CartSidebar cart={cart} onQuantityChange={handleQuantityChange} onProceedToCheckout={handleProceedToCheckout} user={user} onClearCart={handleClearCart} />
                        </aside>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

const ShieldCheckIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);