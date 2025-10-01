"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Service, CartItem } from './types';
import { ServiceModal } from './ServiceModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import api from '@/services/api';

const CheckIcon = () => (<Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />);

export default function UrbanRepairServicesPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);

    const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/public/services-by-category');
                const data = res.data;
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                toast.error('Failed to load services.');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();

        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    const updateCartInStorage = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleAddToCart = (itemToAdd: CartItem) => {
        let newCart;
        const existingItem = cart.find(item => item.subService._id === itemToAdd.subService._id);
        if (existingItem) {
            newCart = cart.map(item =>
                item.subService._id === itemToAdd.subService._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...cart, itemToAdd];
        }
        updateCartInStorage(newCart);
        toast.success(`${itemToAdd.serviceName} added to cart!`);
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

    const handleCategoryClick = (categoryId: string) => {
        categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleOpenModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleProceedToCheckout = () => {
        if (user) {
            router.push('/checkout');
        } else {
            router.push('/login');
        }
    };

    return (
        <>
            <Header />
            <Toaster position="top-center" />
            <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
            
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-8">
                    <aside className="lg:col-span-3 lg:sticky top-24 h-fit space-y-6 order-2 lg:order-1">
                        <div className="border rounded-2xl p-6 bg-white shadow-sm">
                            <h3 className="font-bold mb-4 text-lg">Categories</h3>
                            <nav className="space-y-1">
                                {categories.map(cat => (
                                    <a key={cat._id} onClick={() => handleCategoryClick(cat._id)} className="block p-3 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 font-medium">
                                        {cat.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <main className="lg:col-span-6 space-y-12 order-1 lg:order-2">
                        {loading && <div className="flex justify-center items-center h-96"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>}
                        {categories.map(category => (
                            category.services && category.services.length > 0 && (
                                <section key={category._id} ref={el => { if (el) categoryRefs.current[category._id] = el; }}>
                                    <h2 className="text-3xl font-bold mb-6">{category.name}</h2>
                                    <div className="space-y-6">
                                        {category.services.map((service: Service) => (
                                            <div key={service._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-5 flex flex-col sm:flex-row items-center gap-6">
                                                <img src={service.imageUrl} alt={service.name} className="w-full sm:w-40 h-32 object-contain rounded-xl flex-shrink-0" />
                                                <div className="flex-grow w-full">
                                                    <h4 className="text-xl font-bold text-gray-900">{service.name}</h4>
                                                    <ul className="list-none p-0 my-3 space-y-1.5">
                                                        {service.inclusions.slice(0, 2).map((task, i) => <li key={i} className="flex items-center text-sm text-gray-600"><CheckIcon />{task}</li>)}
                                                    </ul>
                                                    <div className="flex justify-between items-center mt-4">
                                                        <p className="font-extrabold text-lg text-gray-900">₹{service.price}</p>
                                                        <div className="flex items-center gap-2">
                                                            <Link href={`/services/${service._id}`} className="text-gray-700 bg-white border border-gray-300 rounded-lg py-2 px-4 font-bold transition-colors duration-200 hover:bg-gray-100">
                                                                Details
                                                            </Link>
                                                            <button className="bg-red-50 text-red-600 border border-red-200 rounded-lg py-2 px-8 font-bold transition-all duration-200 hover:bg-red-600 hover:text-white" onClick={() => handleOpenModal(service)}>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )
                        ))}
                    </main>

                     <aside className="lg:col-span-3 lg:sticky top-24 h-fit order-3">
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
                                            <button onClick={() => handleQuantityChange(item.subService._id, -1)} className="px-2.5 py-1 text-red-600">-</button>
                                            <span className="px-3 font-bold">{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.subService._id, 1)} className="px-2.5 py-1 text-green-600">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             {cart.length > 0 && 
                            <div className="bg-gray-50 rounded-b-2xl p-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-2xl">₹{cartTotal.toLocaleString('en-IN')}</span>
                                    {user ? (
                                        <button onClick={handleProceedToCheckout} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700">View Cart</button>
                                    ) : (
                                        <button onClick={handleProceedToCheckout} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600">Login to Continue</button>
                                    )}
                                </div>
                            </div>
                             }
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}