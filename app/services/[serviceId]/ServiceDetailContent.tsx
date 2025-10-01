"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, ChevronDown } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Service, CartItem, SubService } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CheckIcon = () => (<Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />);
const CrossIcon = () => (<X className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />);
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

const CartSidebar = ({ cart, onQuantityChange, onProceedToCheckout, user }: { cart: CartItem[], onQuantityChange: (id: string, delta: number) => void, onProceedToCheckout: () => void, user: any }) => {
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="rounded-2xl shadow-lg border bg-white">
            <div className="p-4 border-b"><h3 className="font-bold text-xl">My Cart</h3></div>
            <div className="p-4 space-y-4 max-h-72 overflow-y-auto">
                {cart.length === 0 ? <p className="text-sm text-center text-gray-500 py-4">Your cart is empty.</p> : cart.map(item => (
                    <div key={item.subService._id} className="flex justify-between items-start gap-3">
                        <div className="flex-grow">
                            <p className="font-bold">{item.serviceName}</p>
                            <p className="text-sm text-gray-600">{item.subService.name}</p>
                        </div>
                        <div className="flex items-center border rounded-lg">
                            <button onClick={() => onQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600">-</button>
                            <span className="px-3 font-bold">{item.quantity}</span>
                            <button onClick={() => onQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600">+</button>
                        </div>
                    </div>
                ))}
            </div>
             {cart.length > 0 && 
            <div className="bg-gray-50 rounded-b-2xl p-4">
                <div className="flex justify-between items-center">
                    <span className="font-extrabold text-2xl">₹{cartTotal.toLocaleString('en-IN')}</span>
                    {user ? (
                        <button onClick={onProceedToCheckout} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700">View Cart</button>
                    ) : (
                        <button onClick={onProceedToCheckout} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600">Login to Continue</button>
                    )}
                </div>
            </div>
             }
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
        if (service) {
            setSelectedSubService(service.subServices?.[0]);
        }
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
    }, [service]);

    const updateCartInStorage = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

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
            router.push('/login');
        }
    };

    const priceToShow = selectedSubService?.price ?? service.price;

    return (
        <>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
             <div className="font-sans bg-gray-50 min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <img src={service.imageUrl} alt={service.name} className="w-full h-auto max-h-96 object-contain rounded-2xl shadow-lg bg-white p-2" />
                                <h1 className="text-4xl font-extrabold text-gray-900 mt-6">{service.name}</h1>
                                <p className="text-lg text-gray-600 mt-2">🕒 {service.duration}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 bg-green-50/50 border border-green-200 rounded-lg"><h3 className="font-semibold text-green-800 mb-3 text-lg">What's Included?</h3><ul className="space-y-2 text-gray-700">{service.inclusions.map((item, i) => <li key={i} className="flex"><CheckIcon />{item}</li>)}</ul></div>
                                <div className="p-5 bg-red-50/50 border border-red-200 rounded-lg"><h3 className="font-semibold text-red-800 mb-3 text-lg">What's Excluded?</h3><ul className="space-y-2 text-gray-700">{service.exclusions.map((item, i) => <li key={i} className="flex"><CrossIcon />{item}</li>)}</ul></div>
                            </div>
                            {service.howItWorks && service.howItWorks.length > 0 && (<div><h2 className="font-bold mb-4 text-2xl text-gray-800">How It Works</h2><div className="space-y-4">{service.howItWorks.map((step, index) => (<div key={index} className="flex items-start"><span className="flex-shrink-0 mr-4 mt-1 h-8 w-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">{index + 1}</span><div><strong className="block text-gray-800">{step.title}</strong><p className="text-gray-600">{step.description}</p></div></div>))}</div></div>)}
                            {service.faqs && service.faqs.length > 0 && (<div className="rounded-lg border border-gray-200 bg-white"><button onClick={() => setOpenAccordion(openAccordion === 'faqs' ? null : 'faqs')} className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 text-lg">Frequently Asked Questions <ChevronDownIcon isOpen={openAccordion === 'faqs'} /></button>{openAccordion === 'faqs' && <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200"><div className="space-y-4">{service.faqs.map((faq, i) => (<div key={i}><p className="font-semibold text-gray-800">{faq.question}</p><p className="text-gray-600 whitespace-pre-line">{faq.answer}</p></div>))}</div></div>}</div>)}
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
                            <CartSidebar cart={cart} onQuantityChange={handleQuantityChange} onProceedToCheckout={handleProceedToCheckout} user={user} />
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}