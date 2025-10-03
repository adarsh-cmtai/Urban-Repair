"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, ChevronDown, CheckCircle, Clock } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Service, CartItem, SubService } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const IncludedIcon = () => (<Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />);
const ExcludedIcon = () => (<X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />);
const AccordionChevron = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

const CartSidebar = ({ cart, onQuantityChange, onProceedToCheckout, user }: { cart: CartItem[], onQuantityChange: (id: string, delta: number) => void, onProceedToCheckout: () => void, user: any }) => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 bg-white">
            <div className="p-6 border-b border-slate-200">
                <h3 className="font-heading font-bold text-xl text-slate-900">My Cart</h3>
            </div>
            <div className="p-6 space-y-4 max-h-72 overflow-y-auto">
                {cart.length === 0 ? (
                    <p className="text-sm text-center text-slate-500 py-4">Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.subService._id} className="flex justify-between items-start gap-3">
                            <div className="flex-grow">
                                <p className="font-bold text-slate-800">{item.serviceName}</p>
                                <p className="text-sm text-slate-600">{item.subService.name}</p>
                            </div>
                            <div className="flex items-center border border-slate-300 rounded-full">
                                <button onClick={() => onQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600 text-lg">-</button>
                                <span className="px-3 font-bold text-slate-800">{item.quantity}</span>
                                <button onClick={() => onQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600 text-lg">+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="bg-slate-50 rounded-b-2xl p-6">
                    <div className="flex justify-between items-center">
                        <span className="font-extrabold text-3xl text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                        {user ? (
                            <button onClick={onProceedToCheckout} className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700 cursor-pointer transition-colors">View Cart</button>
                        ) : (
                            <button onClick={onProceedToCheckout} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors">Login to Continue</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export function ServiceDetailContent({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedSubService, setSelectedSubService] = useState<SubService | undefined>(undefined);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (service && service.subServices && service.subServices.length > 0) {
            setSelectedSubService(service.subServices[0]);
        }
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
    }, [service]);

    const updateCartInStorage = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleAddToCartClick = () => {
        if (service.subServices && service.subServices.length > 0 && !selectedSubService) {
            toast.error("Please select a service type.");
            return;
        }

        const subServiceToAdd = selectedSubService || (service.subServices && service.subServices[0]);
        
        if (service && subServiceToAdd) {
            const itemToAdd: CartItem = {
                serviceId: service._id,
                serviceName: service.name,
                serviceImage: service.imageUrl,
                subService: subServiceToAdd,
                quantity: 1,
                price: subServiceToAdd.price
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
            toast.success(`${itemToAdd.subService.name} added to cart!`);
        }
    };

    const handleQuantityChange = (subServiceId: string, delta: number) => {
        const itemToUpdate = cart.find(item => item.subService._id === subServiceId);
        if (!itemToUpdate) return;
        const newQuantity = itemToUpdate.quantity + delta;
        let newCart;
        if (newQuantity <= 0) {
            newCart = cart.filter(item => item.subService._id !== subServiceId);
        } else {
            newCart = cart.map(item =>
                item.subService._id === subServiceId ? { ...item, quantity: newQuantity } : item
            );
        }
        updateCartInStorage(newCart);
    };

    const handleProceedToCheckout = () => {
        if (user) {
            router.push('/checkout');
        } else {
            router.push('/login?redirect=/checkout');
        }
    };
    
    const priceToShow = selectedSubService?.price ?? (service.subServices?.[0]?.price || service.price);
    const canAddToCart = (service.subServices && service.subServices.length > 0) ? !!selectedSubService : true;

    return (
        <>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="font-sans bg-gradient-to-b from-white to-slate-50 min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <div className="bg-white p-4 rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-200/80">
                                    <img src={service.imageUrl} alt={service.name} className="w-full h-auto max-h-[400px] object-contain rounded-xl" />
                                </div>
                                <h1 className="font-heading text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mt-8">{service.name}</h1>
                                <p className="flex items-center gap-2 text-slate-500 mt-4 text-lg">
                                    <Clock className="w-5 h-5" />
                                    <span>{service.duration}</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-white rounded-2xl border-2 border-green-200"><h3 className="font-semibold text-green-800 mb-4 text-lg">What's Included?</h3><ul className="space-y-3 text-slate-700">{service.inclusions.map((item, i) => <li key={i} className="flex items-start"><IncludedIcon />{item}</li>)}</ul></div>
                                <div className="p-6 bg-white rounded-2xl border-2 border-red-200"><h3 className="font-semibold text-red-800 mb-4 text-lg">What's Excluded?</h3><ul className="space-y-3 text-slate-700">{service.exclusions.map((item, i) => <li key={i} className="flex items-start"><ExcludedIcon />{item}</li>)}</ul></div>
                            </div>
                            {service.howItWorks && service.howItWorks.length > 0 && (<div><h2 className="font-bold mb-6 text-3xl text-slate-900 font-heading">How It Works</h2><div className="space-y-6">{service.howItWorks.map((step, index) => (<div key={index} className="flex items-start"><span className="flex-shrink-0 mr-5 mt-1 h-10 w-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg">{index + 1}</span><div><strong className="block text-slate-800 text-lg">{step.title}</strong><p className="text-slate-600">{step.description}</p></div></div>))}</div></div>)}
                            {service.faqs && service.faqs.length > 0 && (<div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-300/30"><button onClick={() => setOpenAccordion(openAccordion === 'faqs' ? null : 'faqs')} className="w-full flex justify-between items-center p-6 text-left font-semibold text-slate-900 text-xl">Frequently Asked Questions <AccordionChevron isOpen={openAccordion === 'faqs'} /></button>{openAccordion === 'faqs' && <div className="px-6 pb-6 bg-white text-slate-700 border-t border-slate-200"><div className="space-y-6 pt-6">{service.faqs.map((faq, i) => (<div key={i}><p className="font-semibold text-slate-800 text-lg">{faq.question}</p><p className="text-slate-600 whitespace-pre-line pt-1">{faq.answer}</p></div>))}</div></div>}</div>)}
                        </div>
                        <aside className="lg:sticky top-24 h-fit space-y-8">
                            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 p-8 border border-slate-200/80 space-y-6">
                                <h3 className="font-bold text-2xl text-slate-900 font-heading">Select Service Type</h3>
                                {service.subServices && service.subServices.length > 0 ? (<div className="space-y-3">{service.subServices.map((option) => (<button key={option._id} onClick={() => setSelectedSubService(option)} className={`w-full border-2 rounded-xl text-left cursor-pointer transition-all duration-200 flex items-center p-4 gap-4 ${selectedSubService?._id === option._id ? "border-red-500 bg-red-50 ring-2 ring-red-200" : "border-slate-300 hover:border-red-400 hover:bg-slate-50"}`}><div className="flex-grow"><p className="font-bold text-slate-800">{option.name}</p><p className="font-semibold text-red-600 mt-1">₹{option.price}</p></div>{selectedSubService?._id === option._id && <CheckCircle className="w-6 h-6 text-red-600" />}</button>))}</div>) : (<p className="text-slate-600">This service does not have additional options.</p>)}
                                <div className="border-t border-slate-200 pt-6">
                                    <div className="flex justify-between items-center mb-4"><p className="text-slate-600 text-lg">Price</p><div className="font-extrabold text-4xl text-slate-900">₹{priceToShow.toLocaleString('en-IN')}</div></div>
                                    <button onClick={handleAddToCartClick} disabled={!canAddToCart} className="w-full bg-red-600 text-white font-bold h-14 px-10 rounded-xl hover:bg-red-700 transition-colors cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed text-lg">Add to Cart</button>
                                </div>
                            </div>
                            <CartSidebar cart={cart} onQuantityChange={handleQuantityChange} onProceedToCheckout={handleProceedToCheckout} user={user} />
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}