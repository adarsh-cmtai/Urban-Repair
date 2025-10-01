"use client"

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { CartItem } from '@/app/services/types';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Home, Briefcase, MapPin, CheckCircle, Plus, CreditCard, Wallet, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerProfile, addCustomerAddress, getCheckoutConfig, checkIsFirstBooking, placeOrder, createRazorpayOrder } from '@/services/customerService';

const UrbanRepairLogo = () => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#A4001C] rounded-md flex items-center justify-center font-bold text-white text-xl">U</div>
        <span className="text-2xl font-bold text-gray-800">Urban Repair</span>
    </div>
);

const AddressSelectionModal = ({ isOpen, onClose, onSave }: any) => {
    const [addressData, setAddressData] = useState({ street: '', city: '', state: '', zipCode: '', label: 'Home' });
    const [isLoading, setIsLoading] = useState(false);
    
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddressData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!addressData.street || !addressData.city || !addressData.state || !addressData.zipCode) {
            toast.error('Please fill all address fields.');
            return;
        }
        setIsLoading(true);
        await onSave(addressData);
        setIsLoading(false);
    };

    const InputField = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: any }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} required className="w-full p-3 border border-gray-300 rounded-lg"/>
        </div>
    );
    
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in-0 zoom-in-95">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Add New Service Address</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XCircle className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Address Type</h4>
                        <div className="flex gap-2">
                            {(['Home', 'Office', 'Other'] as const).map(type => (
                                <button key={type} type="button" onClick={() => setAddressData({...addressData, label: type})} className={`px-4 py-2 border rounded-full flex items-center gap-2 text-sm ${addressData.label === type ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}>
                                    {type === 'Home' && <Home size={16} />} {type === 'Office' && <Briefcase size={16} />} {type === 'Other' && <Plus size={16} />} {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <InputField label="Street Address, Colony" name="street" value={addressData.street} onChange={handleChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <InputField label="Town/City" name="city" value={addressData.city} onChange={handleChange} />
                        <InputField label="State" name="state" value={addressData.state} onChange={handleChange} />
                        <InputField label="Pincode" name="zipCode" value={addressData.zipCode} onChange={handleChange} />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg flex justify-center items-center text-lg mt-2">
                        {isLoading ? <Loader2 className="animate-spin"/> : 'Save & Use This Address' }
                    </button>
                </form>
            </div>
        </div>
    );
};

const CartSummary = ({ cart, onQuantityChange, onProceed, isLoading }: any) => {
    const subtotal = cart.reduce((total: number, item: CartItem) => total + (item.price || 0) * (item.quantity || 1), 0);
    const finalTotal = subtotal;
    
    return (
        <div className="bg-white rounded-xl shadow-sm border">
            <h3 className="p-4 text-xl font-bold border-b">Order Summary</h3>
            <div className="p-4 space-y-4 max-h-60 overflow-y-auto">
                {cart.map((item: CartItem) => (
                    <div key={item.subService?._id} className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-sm">{item.serviceName}</p>
                            <p className="text-xs text-gray-500">{item.subService?.name}</p>
                            <p className="font-bold text-sm mt-1">₹{(item.price || 0).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center border rounded-md">
                            <button onClick={() => onQuantityChange(item.subService?._id, -1)} className="px-2 py-1">-</button>
                            <span className="px-2 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => onQuantityChange(item.subService?._id, 1)} className="px-2 py-1">+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 space-y-2 border-t bg-gray-50/50">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>To Pay</span><span>₹{finalTotal.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="p-4">
                <button onClick={onProceed} disabled={isLoading} className="w-full bg-[#A4001C] text-white font-bold py-3 rounded-lg flex justify-center items-center">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

const BookingConfirmation = ({ booking, onBack }: { booking: any, onBack: () => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-start mb-8"><button onClick={onBack} className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100"><ArrowLeft /></button></div>
            <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4"><CheckCircle className="h-8 w-8 text-green-600" strokeWidth={2.5} /></div>
                <h1 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h1>
                <p className="text-gray-600 mt-2">Your service has been successfully scheduled.</p>
            </div>
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="text-lg font-mono font-bold text-brand-red tracking-wider">{booking.bookingId}</p>
            </div>
            <div className="mt-8 space-y-4">
                <Link href="/customer/bookings" className="block w-full text-center bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">Track Your Appointment</Link>
                <Link href="/services" className="block w-full text-center bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors">Book Another Service</Link>
            </div>
        </div>
    </div>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { token, user } = useSelector((state: RootState) => state.auth);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [lastSuccessfulBooking, setLastSuccessfulBooking] = useState<any | null>(null);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'Online' | 'COD'>('Online');
    const [isLoading, setIsLoading] = useState(true);

    const fetchCheckoutData = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const profileRes = await getCustomerProfile(token);
            setAddresses(profileRes.data.addresses);
            
            if (profileRes.data.addresses.length > 0) {
                setSelectedAddress(profileRes.data.addresses[0]);
            } else {
                setAddressModalOpen(true);
            }
        } catch (error) {
            toast.error("Could not fetch your data.");
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (parsedCart.length === 0) router.push('/services');
            else setCart(parsedCart);
        } else {
            router.push('/services');
        }
        if (token) fetchCheckoutData();
    }, [token, router]);
    
    const handleSaveAddressAndProceed = async (newAddressData: any) => {
        try {
            const res = await addCustomerAddress(newAddressData, token!);
            const updatedUser = res.data;
            const newAddress = updatedUser.addresses[updatedUser.addresses.length - 1];
            
            setAddresses(updatedUser.addresses);
            setSelectedAddress(newAddress);
            setAddressModalOpen(false);
            toast.success("Address saved successfully!");
        } catch (error) {
            toast.error("Could not save your address.");
        }
    };
    
    const handleQuantityChange = (subServiceId: string, delta: number) => {
        const newCart = cart.map(item =>
            item.subService._id === subServiceId ? { ...item, quantity: item.quantity + delta } : item
        ).filter(item => item.quantity > 0);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address.");
            return;
        }
        setBookingStatus('loading');

        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const finalTotal = subtotal;

        const orderData = {
            items: cart,
            addressId: selectedAddress._id,
            preferredDate: new Date(),
            timeSlot: "ASAP",
            paymentMethod,
            totalAmount: subtotal,
            finalAmount: finalTotal,
        };
        
        if (paymentMethod === 'COD') {
            try {
                const res = await placeOrder(orderData, token!);
                setLastSuccessfulBooking(res.data);
                setBookingStatus('success');
                localStorage.removeItem('cart');
            } catch (error) {
                toast.error('Booking failed. Please try again.');
                setBookingStatus('error');
            }
        } else { // Online Payment
            try {
                const razorpayOrderRes = await createRazorpayOrder(finalTotal, token!);
                const { order } = razorpayOrderRes;

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: "INR",
                    name: "Urban Repair",
                    order_id: order.id,
                    handler: async function (response: any) {
                        const paymentDetails = {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                        };
                        const finalOrderData = { ...orderData, paymentDetails };

                        try {
                            const bookingRes = await placeOrder(finalOrderData, token!);
                            setLastSuccessfulBooking(bookingRes.data);
                            setBookingStatus('success');
                            localStorage.removeItem('cart');
                        } catch (bookingError) {
                            toast.error('Payment successful, but booking failed. Contact support.');
                            setBookingStatus('error');
                        }
                    },
                    prefill: { name: user?.name, email: user?.email },
                    modal: {
                        ondismiss: function() {
                            setBookingStatus('idle');
                        }
                    }
                };

                const paymentObject = new (window as any).Razorpay(options);
                paymentObject.open();
            } catch (error) {
                 toast.error('Could not initiate payment. Please try again.');
                 setBookingStatus('error');
            }
        }
    };

    if (bookingStatus === 'success' && lastSuccessfulBooking) {
        return <BookingConfirmation booking={lastSuccessfulBooking} onBack={() => router.push('/services')} />;
    }

    return (
        <>
            <Toaster position="top-center" />
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <AddressSelectionModal isOpen={isAddressModalOpen} onClose={() => setAddressModalOpen(false)} onSave={handleSaveAddressAndProceed} />
            
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <header className="mb-8"><UrbanRepairLogo /></header>
                    {isLoading ? <div className="flex justify-center items-center h-64"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div> : (
                    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border">
                                <h3 className="text-xl font-bold mb-4">1. Select Delivery Address</h3>
                                {addresses.map(addr => (
                                    <label key={addr._id} className={`flex items-start p-4 border-2 rounded-lg cursor-pointer mb-4 ${selectedAddress?._id === addr._id ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="address" checked={selectedAddress?._id === addr._id} onChange={() => setSelectedAddress(addr)} className="mt-1 h-4 w-4 text-red-600" />
                                        <div className="ml-4">
                                            <div className="font-semibold">{addr.label}</div>
                                            <p className="text-gray-600 text-sm">{`${addr.street}, ${addr.city}, ${addr.state} - ${addr.zipCode}`}</p>
                                        </div>
                                    </label>
                                ))}
                                <button onClick={() => setAddressModalOpen(true)} className="mt-2 text-red-600 font-semibold text-sm hover:underline">+ Add New Address</button>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border">
                                <h3 className="text-xl font-bold mb-4">2. Choose Payment Method</h3>
                                 <select value={paymentMethod} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value as any)} className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option value="Online">Pay Online</option>
                                    <option value="COD">Cash on Delivery</option>
                                </select>
                            </div>
                        </div>
                        <div className="lg:col-span-1 lg:sticky top-8 h-fit">
                            <CartSummary cart={cart} onQuantityChange={handleQuantityChange} onProceed={handlePlaceOrder} isLoading={bookingStatus === 'loading'}/>
                        </div>
                    </main>
                    )}
                </div>
            </div>
        </>
    );
}