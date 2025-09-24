"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { CartItem, Address as GlobalAddress } from '@/app/services/[serviceId]/page';
import toast, { Toaster } from 'react-hot-toast';
import { X, ArrowLeft, Home, Briefcase, MapPin, CheckCircle, AlertTriangle, Plus, CreditCard, Wallet, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type NewAddressPayload = Omit<GlobalAddress, '_id' | 'userId'>;

interface CustomerBooking {
    _id: string;
    bookingId: string;
    bookingDate: string;
    slotTime: string;
}

const UrbanRepairLogo = () => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#A4001C] rounded-md flex items-center justify-center font-bold text-white text-xl">U</div>
        <span className="text-2xl font-bold text-gray-800">Urban Repair</span>
    </div>
);

const InputField = ({ label, value, onChange, placeholder = '' }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition" />
    </div>
);

const PaymentErrorModal = ({ isOpen, onClose, onRetry, message }: { isOpen: boolean; onClose: () => void; onRetry: () => void; message: string; }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
                <div className="flex flex-col items-center text-center p-8">
                    <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mb-4"><XCircle className="h-8 w-8 text-red-600" strokeWidth={2.5} /></div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Failed</h2>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="w-full flex flex-col sm:flex-row gap-3">
                        <button onClick={onClose} className="w-full sm:w-1/2 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors">Close</button>
                        <button onClick={onRetry} className="w-full sm:w-1/2 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingConfirmation = ({ booking, onBack }: { booking: CustomerBooking, onBack: () => void }) => (
    <div className="max-w-md mx-auto py-8">
        <div className="flex justify-start mb-8"><button onClick={onBack} className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-200"><ArrowLeft /></button></div>
        <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center mb-4"><CheckCircle className="h-8 w-8 text-white" strokeWidth={3} /></div>
            <h1 className="text-2xl font-bold">Booking Confirmed Successfully!</h1>
        </div>
        <div className="mt-8">
            <ul className="space-y-4">
                <li className="flex gap-4"><div className="flex flex-col items-center"><div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500"></div><div className="w-px h-16 bg-gray-300"></div></div><div><p className="font-semibold">Booking Confirmed</p><p className="text-sm text-gray-500">Booking Id: {booking.bookingId}</p></div></li>
                <li className="flex gap-4"><div className="flex flex-col items-center"><div className="w-5 h-5 bg-gray-300 rounded-full"></div><div className="w-px h-16 bg-gray-300"></div></div><div><p className="font-semibold">A Service Provider will be Appointed to you soon!</p></div></li>
                <li className="flex gap-4"><div className="flex flex-col items-center"><div className="w-5 h-5 bg-gray-300 rounded-full"></div><div className="w-px h-16 bg-gray-300"></div></div><div><p className="font-semibold">Service will start on</p><p className="text-sm text-gray-500">{format(new Date(booking.bookingDate), 'dd-MM-yyyy')} {booking.slotTime}</p></div></li>
                <li className="flex gap-4"><div className="flex flex-col items-center"><div className="w-5 h-5 bg-gray-300 rounded-full"></div></div><div><p className="font-semibold">Service will complete</p></div></li>
            </ul>
        </div>
        <div className="mt-8 space-y-4">
            <Link href="/customer/bookings" className="block w-full text-center bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">CHECK YOUR APPOINTMENT</Link>
        </div>
    </div>
);

const AddressSelectionModal = ({ isOpen, onClose, onSaveAndProceed, serviceablePincodes }: { isOpen: boolean; onClose: () => void; onSaveAndProceed: (addressData: NewAddressPayload) => void; serviceablePincodes: string[]; }) => {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [addressType, setAddressType] = useState<'Home' | 'Office' | 'Other'>('Home');
    const [pincodeError, setPincodeError] = useState('');
    if (!isOpen) return null;
    const handleSave = () => {
        setPincodeError('');
        if (!line1 || !line2 || !city || !pincode) {
            toast.error('Please fill in all required address fields.');
            return;
        }
        if (!serviceablePincodes.includes(pincode)) {
            setPincodeError('Sorry, services are not available in this pincode yet.');
            return;
        }
        onSaveAndProceed({ line1, line2, city, pincode, type: addressType });
    };
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
                <div className="flex justify-between items-center p-4 border-b"><h2 className="text-xl font-bold text-gray-800">Add New Address</h2><button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button></div>
                <div className="p-6 space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Address Type</h4>
                        <div className="flex gap-2">
                            <button onClick={() => setAddressType('Home')} className={`px-4 py-2 border rounded-full flex items-center gap-2 text-sm transition-all ${addressType === 'Home' ? 'bg-red-600 text-white border-red-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}><Home size={16} /> Home</button>
                            <button onClick={() => setAddressType('Office')} className={`px-4 py-2 border rounded-full flex items-center gap-2 text-sm transition-all ${addressType === 'Office' ? 'bg-red-600 text-white border-red-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}><Briefcase size={16} /> Office</button>
                            <button onClick={() => setAddressType('Other')} className={`px-4 py-2 border rounded-full flex items-center gap-2 text-sm transition-all ${addressType === 'Other' ? 'bg-red-600 text-white border-red-600 font-semibold' : 'border-gray-300 hover:bg-gray-100'}`}><Plus size={16} /> Other</button>
                        </div>
                    </div>
                    <InputField label="Flat, House no., Building" value={line1} onChange={e => setLine1(e.target.value)} />
                    <InputField label="Area, Street, Sector, Village" value={line2} onChange={e => setLine2(e.target.value)} />
                    <div className="flex gap-4">
                        <div className="w-1/2"><InputField label="Town/City" value={city} onChange={e => setCity(e.target.value)} /></div>
                        <div className="w-1/2"><InputField label="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} /></div>
                    </div>
                    {pincodeError && <p className="text-red-500 text-sm flex items-center gap-1"><AlertTriangle size={14} />{pincodeError}</p>}
                    <button onClick={handleSave} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors text-lg mt-2">Save Address</button>
                </div>
            </div>
        </div>
    );
};

const CartSummary = ({ cart, onQuantityChange, onProceed, isFirstTimeUser }: { cart: CartItem[], onQuantityChange: (id: string, delta: number) => void, onProceed: () => void, isFirstTimeUser: boolean }) => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = isFirstTimeUser ? 100 : 0;
    const finalTotal = subtotal - discount > 0 ? subtotal - discount : 0;
    return (
        <div className="bg-white rounded-xl shadow-sm border">
            <h3 className="p-4 text-xl font-bold border-b">Order Summary</h3>
            <div className="p-4 space-y-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                    <div key={item.subService._id} className="flex justify-between items-start">
                        <div className="flex-grow pr-2">
                            <p className="font-semibold text-sm">{item.serviceName}</p>
                            <p className="text-xs text-gray-500">{item.subService.name}</p>
                            <p className="font-bold text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => onQuantityChange(item.subService._id, -1)} className="px-2 py-1 text-red-600 font-bold hover:bg-red-50">-</button>
                            <span className="px-2 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => onQuantityChange(item.subService._id, 1)} className="px-2 py-1 text-green-600 font-bold hover:bg-green-50">+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 space-y-2 border-t bg-gray-50/50">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span></div>
                {isFirstTimeUser && <div className="flex justify-between text-sm text-green-600"><span className="text-green-600">First User Discount</span><span className="font-semibold">- ₹{discount.toLocaleString('en-IN')}</span></div>}
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span >To Pay</span><span>₹{finalTotal.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="p-4">
                <button onClick={onProceed} className="w-full bg-[#A4001C] text-white font-bold py-3 rounded-lg hover:bg-red-800 transition-colors text-lg">Place Order</button>
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<{ name: string, email: string, mobileNumber: string } | null>(null);
    const [addresses, setAddresses] = useState<GlobalAddress[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<GlobalAddress | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [lastSuccessfulBooking, setLastSuccessfulBooking] = useState<CustomerBooking | null>(null);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [serviceablePincodes, setServiceablePincodes] = useState<string[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<'Online' | 'COD'>('Online');
    const [onlinePayOption, setOnlinePayOption] = useState<'full' | 'partial'>('full');
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
    const [isPaymentErrorModalOpen, setPaymentErrorModalOpen] = useState(false);
    const [paymentErrorMessage, setPaymentErrorMessage] = useState('');
    
    const fetchCheckoutData = useCallback(async () => {
        if (!user) return;
        try {
            const addressRes: { data: GlobalAddress[] } = { data: [] };
            const pincodeRes = { data: ['110001', '110002', '110005'] };
            const firstBookingRes = { data: { isFirstBooking: true } };
            setAddresses(addressRes.data);
            setServiceablePincodes(pincodeRes.data);
            setIsFirstTimeUser(firstBookingRes.data.isFirstBooking);
            const firstValidAddr = addressRes.data.find(addr => pincodeRes.data.includes(addr.pincode));
            if (firstValidAddr) {
                setSelectedAddress(firstValidAddr);
            } else if (addressRes.data.length === 0) {
                setAddressModalOpen(true);
            }
        } catch (error) {
            toast.error("Could not fetch your data. Please try again.");
            router.back();
        }
    }, [user, router]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedUser = localStorage.getItem('user');

        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (parsedCart.length === 0) {
                toast.error("Your cart is empty.");
                router.push('/');
            } else {
                setCart(parsedCart);
            }
        } else {
            toast.error("Your cart is empty.");
            router.push('/');
        }
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

    useEffect(() => {
        if (user) {
            fetchCheckoutData();
        }
    }, [user, fetchCheckoutData]);

    const handleSaveAddressAndProceed = async (newAddressData: NewAddressPayload) => {
        try {
            const savedAddress: GlobalAddress = { _id: `addr_${Date.now()}`, userId: 'user1', ...newAddressData };
            setAddresses(currentAddresses => [...currentAddresses, savedAddress]);
            setSelectedAddress(savedAddress);
            setAddressModalOpen(false);
            toast.success("Address saved successfully!");
        } catch (error) {
            toast.error("Could not save your address.");
        }
    };
    
    const handleQuantityChange = (subServiceId: string, delta: number) => {
        const newCart = cart.map(item =>
            item.subService._id === subServiceId
                ? { ...item, quantity: item.quantity + delta }
                : item
        ).filter(item => item.quantity > 0);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const handleSuccessfulBooking = (bookingData: CustomerBooking) => {
        setLastSuccessfulBooking(bookingData);
        setBookingStatus('success');
        localStorage.removeItem('cart');
    };

    const handleCreateBooking = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address.");
            return;
        }
        setBookingStatus('loading');
        setTimeout(() => {
            const booking: CustomerBooking = {
                _id: `booking_${Date.now()}`,
                bookingId: `UR${Date.now()}`,
                bookingDate: new Date().toISOString(),
                slotTime: 'Booked Now'
            };
            handleSuccessfulBooking(booking);
        }, 1500);
    };

    if (bookingStatus === 'success' && lastSuccessfulBooking) {
        return <BookingConfirmation booking={lastSuccessfulBooking} onBack={() => router.push('/')} />;
    }

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = isFirstTimeUser ? 100 : 0;
    const finalTotal = subtotal - discount > 0 ? subtotal - discount : 0;
    const partialAmount = finalTotal * 0.20;

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <AddressSelectionModal isOpen={isAddressModalOpen} onClose={() => setAddressModalOpen(false)} onSaveAndProceed={handleSaveAddressAndProceed} serviceablePincodes={serviceablePincodes} />
            <PaymentErrorModal isOpen={isPaymentErrorModalOpen} onClose={() => setPaymentErrorModalOpen(false)} onRetry={() => {}} message={paymentErrorMessage} />

            <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <header className="mb-8 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.back()} className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-200"><ArrowLeft /></button>
                            <UrbanRepairLogo />
                        </div>
                    </header>
                    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border">
                                <h3 className="text-xl font-bold mb-4">1. Select Delivery Address</h3>
                                <div className="space-y-4">
                                    {addresses.map(addr => (
                                        <label key={addr._id} className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedAddress?._id === addr._id ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                                            <input type="radio" name="address" checked={selectedAddress?._id === addr._id} onChange={() => setSelectedAddress(addr)} className="mt-1 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                            <div className="ml-4"><div className="flex items-center gap-2 font-semibold">{addr.type === 'Home' ? <Home size={16} /> : addr.type === 'Office' ? <Briefcase size={16} /> : <MapPin size={16} />} {addr.type}</div><p className="text-gray-600 text-sm">{`${addr.line1}, ${addr.line2}, ${addr.city} - ${addr.pincode}`}</p></div>
                                        </label>
                                    ))}
                                </div>
                                <button onClick={() => setAddressModalOpen(true)} className="mt-4 text-red-600 font-semibold text-sm hover:underline">+ Add New Address</button>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border">
                                <h3 className="text-xl font-bold mb-4">2. Choose Payment Method</h3>
                                <div className="space-y-4">
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'Online' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="paymentMethod" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="mt-1 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                        <div className="ml-4 w-full">
                                            <div className="flex items-center gap-2 font-semibold"><CreditCard size={16} /> Pay Online</div>
                                            {paymentMethod === 'Online' && (
                                                <div className="mt-4 space-y-3 pl-2 border-l-2 border-red-200">
                                                    <label className="flex items-center text-sm"><input type="radio" name="onlineOption" value="full" checked={onlinePayOption === 'full'} onChange={() => setOnlinePayOption('full')} className="h-4 w-4 text-red-600" /><span className="ml-2">Pay full amount: <strong>₹{finalTotal.toLocaleString('en-IN')}</strong></span></label>
                                                    <label className="flex items-center text-sm"><input type="radio" name="onlineOption" value="partial" checked={onlinePayOption === 'partial'} onChange={() => setOnlinePayOption('partial')} className="h-4 w-4 text-red-600" /><span className="ml-2">Pay 20% advance: <strong>₹{partialAmount.toLocaleString('en-IN')}</strong></span></label>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                        <div className="ml-4"><div className="flex items-center gap-2 font-semibold"><Wallet size={16} /> Cash on Delivery</div></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 lg:sticky top-8 h-fit">
                            <CartSummary cart={cart} onQuantityChange={handleQuantityChange} onProceed={handleCreateBooking} isFirstTimeUser={isFirstTimeUser} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}