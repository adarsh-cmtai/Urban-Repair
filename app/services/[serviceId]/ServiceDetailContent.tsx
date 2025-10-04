"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Plus, Minus, CheckCircle, Clock, ShoppingCart, Trash2, Home, ChevronRight, ArrowRight } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Service, CartItem, SubService } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';

const IncludedIcon = () => (<CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />);
const ExcludedIcon = () => (<X className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 p-0.5 border-2 border-red-500 rounded-full" />);

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
    <div className="border-b border-slate-200">
        <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left font-semibold text-slate-800 text-lg hover:bg-slate-50/50 px-1">
            <span>{title}</span>
            <div className="w-6 h-6 flex items-center justify-center text-slate-500 bg-slate-100 rounded-full">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </div>
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden text-slate-600 px-1">{children}</div>
        </div>
    </div>
);

const CartSidebar = ({ cart, onQuantityChange, onProceedToCheckout, user, onClearCart }: { cart: CartItem[], onQuantityChange: (id: string, delta: number) => void, onProceedToCheckout: () => void, user: any, onClearCart: () => void }) => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 bg-white">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h3 className="font-heading font-bold text-xl text-slate-900">My Cart</h3>
                    {cartItemCount > 0 && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{cartItemCount}</span>}
                </div>
                 {cart.length > 0 && <button onClick={onClearCart} className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1"><Trash2 size={12}/> Clear</button>}
            </div>
            <div className="p-6 space-y-4 max-h-72 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                        <p className="text-sm text-center text-slate-500 mt-2">Your cart is empty.</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.subService._id} className="flex justify-between items-start gap-3">
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold text-slate-800 truncate">{item.serviceName}</p>
                                <p className="text-sm text-slate-600 truncate">{item.subService.name}</p>
                            </div>
                            <div className="flex items-center border border-slate-300 rounded-full flex-shrink-0">
                                <button onClick={() => onQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600 text-lg hover:bg-red-50 rounded-l-full">-</button>
                                <span className="px-3 font-semibold text-slate-800 text-sm">{item.quantity}</span>
                                <button onClick={() => onQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600 text-lg hover:bg-green-50 rounded-r-full">+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="bg-slate-50 rounded-b-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-slate-600">Total</span>
                        <span className="font-extrabold text-2xl text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button onClick={onProceedToCheckout} className={`w-full text-white font-bold h-12 rounded-xl transition-colors text-base flex items-center justify-center gap-2 ${user ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-500 hover:bg-orange-600'}`}>
                        {user ? 'Proceed to Checkout' : 'Login to Continue'} <ArrowRight size={18}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export function ServiceDetailContent({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedSubService, setSelectedSubService] = useState<SubService | undefined>(undefined);
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
    const canAddToCart = (service?.subServices && service.subServices.length > 0) ? !!selectedSubService : true;

    return (
        <>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <main className="font-sans bg-gradient-to-b from-white to-slate-50 min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        <div className="lg:col-span-2 space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="bg-white p-4 rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-200/80 aspect-square">
                                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-contain rounded-xl" />
                                </div>
                                <div className="space-y-4">
                                     <div className="flex items-center text-sm text-slate-500 font-medium">
                                        <Link href="/" className="hover:text-red-600">Home</Link> <ChevronRight size={16} className="mx-1.5"/>
                                        <Link href="/services" className="hover:text-red-600">Services</Link> <ChevronRight size={16} className="mx-1.5"/>
                                        <span className="text-slate-700 font-semibold">{service.name}</span>
                                    </div>
                                    <h1 className="font-heading text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 text-balance">{service.name}</h1>
                                    <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 rounded-full px-4 py-2 font-semibold">
                                        <Clock className="w-5 h-5" /> <span>{service.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-300/30"><h3 className="font-heading font-bold text-slate-800 mb-4 text-xl flex items-center gap-2"><IncludedIcon />What's Included?</h3><ul className="space-y-3 text-slate-600 pl-9">{service.inclusions?.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-300/30"><h3 className="font-heading font-bold text-slate-800 mb-4 text-xl flex items-center gap-2"><ExcludedIcon />What's Excluded?</h3><ul className="space-y-3 text-slate-600 pl-9">{service.exclusions?.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                            </div>
                            
                            {service.howItWorks && service.howItWorks.length > 0 && (
                                <div>
                                    <h2 className="font-heading font-bold mb-8 text-3xl text-slate-900 text-center">How It Works</h2>
                                    <div className="relative space-y-10 pl-14">
                                         <div className="absolute left-7 top-5 bottom-5 w-0.5 bg-red-200"></div>
                                        {service.howItWorks.map((step, index) => (
                                            <div key={index} className="relative flex items-start">
                                                <span className="absolute left-0 -translate-x-1/2 flex-shrink-0 h-14 w-14 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl ring-8 ring-white">{index + 1}</span>
                                                <div><strong className="block text-slate-800 text-xl font-semibold">{step.title}</strong><p className="text-slate-600 mt-1">{step.description}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {service.faqs && service.faqs.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="font-heading font-bold mb-4 text-3xl text-slate-900 text-center">Frequently Asked Questions</h2>
                                    {service.faqs.map((faq, i) => (
                                        <AccordionItem key={i} title={faq.question} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                            <p className="whitespace-pre-line">{faq.answer}</p>
                                        </AccordionItem>
                                    ))}
                                </div>
                            )}
                        </div>

                        <aside className="lg:sticky top-24 h-fit space-y-8">
                            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 p-6 border border-slate-200/80 space-y-6">
                                <h3 className="font-bold text-2xl text-slate-900 font-heading">Select Service Type</h3>
                                {service.subServices && service.subServices.length > 0 ? (
                                    <div className="space-y-3">{service.subServices.map((option) => (
                                        <button key={option._id} onClick={() => setSelectedSubService(option)} className={`w-full border-2 rounded-xl text-left cursor-pointer transition-all duration-200 flex items-center p-4 gap-4 ${selectedSubService?._id === option._id ? "border-red-500 bg-red-50 ring-2 ring-red-200" : "border-slate-300 hover:border-red-400 hover:bg-slate-50"}`}>
                                            <div className="flex-grow"><p className="font-semibold text-slate-800">{option.name}</p><p className="font-bold text-red-600 text-lg mt-1">₹{option.price.toLocaleString('en-IN')}</p></div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedSubService?._id === option._id ? 'border-red-500 bg-red-500' : 'border-slate-400'}`}>
                                                {selectedSubService?._id === option._id && <Check className="w-4 h-4 text-white"/>}
                                            </div>
                                        </button>
                                    ))}</div>
                                ) : <p className="text-slate-600">This service does not have additional options.</p>}
                                
                                <div className="border-t border-slate-200 pt-6">
                                    <div className="flex justify-between items-center mb-4"><p className="text-slate-600 text-lg">Price</p><div className="font-extrabold text-4xl text-slate-900">₹{priceToShow.toLocaleString('en-IN')}</div></div>
                                    <button onClick={handleAddToCartClick} disabled={!canAddToCart} className="w-full bg-red-600 text-white font-bold h-14 px-10 rounded-xl hover:bg-red-700 transition-colors cursor-pointer text-lg flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed">
                                        <ShoppingCart size={20}/> Add to Cart
                                    </button>
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