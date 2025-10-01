'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { createNewBooking } from '@/services/customerService';
import { getCategories, getServicesByCategoryId, getSubServicesByServiceId } from '@/services/publicService';
import { getCustomerProfile } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface FormDataState {
    categoryId: string;
    serviceId: string;
    applianceType: string;
    problemDescription: string[];
    addressId: string;
    preferredDate: string;
    timeSlot: string;
}

export default function BookServicePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [subServices, setSubServices] = useState({ appliances: [], problems: [] });
    const [addresses, setAddresses] = useState([]);

    const [formData, setFormData] = useState<FormDataState>({
        categoryId: '',
        serviceId: '',
        applianceType: '',
        problemDescription: [],
        addressId: '',
        preferredDate: '',
        timeSlot: '',
    });

    useEffect(() => {
        const loadInitialData = async () => {
            if (!token) return;
            try {
                const [catRes, profileRes] = await Promise.all([
                    getCategories(),
                    getCustomerProfile(token)
                ]);
                setCategories(catRes.data);
                setAddresses(profileRes.data.addresses);
            } catch (error) {
                toast.error("Failed to load initial data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, [token]);

    useEffect(() => {
        if (!formData.categoryId) {
            setServices([]);
            setSubServices({ appliances: [], problems: [] });
            return;
        }
        getServicesByCategoryId(formData.categoryId).then(res => setServices(res.data));
    }, [formData.categoryId]);

    useEffect(() => {
        if (!formData.serviceId) {
            setSubServices({ appliances: [], problems: [] });
            return;
        }
        getSubServicesByServiceId(formData.serviceId).then(res => {
            setSubServices({
                appliances: res.data.filter((s: any) => s.type === 'Appliance'),
                problems: res.data.filter((s: any) => s.type === 'Problem')
            });
        });
    }, [formData.serviceId]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        toast.promise(
            createNewBooking(formData, token!),
            {
                loading: 'Booking your service...',
                success: 'Service booked successfully!',
                error: 'Failed to book service.',
            }
        ).then(() => router.push('/customer/bookings'))
         .finally(() => setIsSubmitting(false));
    };

    const handleProblemToggle = (problemName: string) => {
        setFormData(prev => {
            const problems = prev.problemDescription.includes(problemName)
                ? prev.problemDescription.filter(p => p !== problemName)
                : [...prev.problemDescription, problemName];
            return { ...prev, problemDescription: problems };
        });
    };
    
    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800 mb-8">Book a Service</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <select value={formData.categoryId} onChange={e => setFormData({...formData, serviceId: '', applianceType: '', problemDescription: [], categoryId: e.target.value})} className="w-full rounded-lg border-gray-300">
                        <option value="">Select Category</option>
                        {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>

                    {formData.categoryId && (
                        <select value={formData.serviceId} onChange={e => setFormData({...formData, applianceType: '', problemDescription: [], serviceId: e.target.value})} className="w-full rounded-lg border-gray-300">
                             <option value="">Select Service</option>
                            {services.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    )}

                    {formData.serviceId && (
                        <>
                             <select value={formData.applianceType} onChange={e => setFormData({...formData, applianceType: e.target.value})} required className="w-full rounded-lg border-gray-300">
                                <option value="">Select Appliance Type</option>
                                {subServices.appliances.map((a: any) => <option key={a._id} value={a.name}>{a.name}</option>)}
                            </select>
                            <div>
                                <label className="font-semibold">Select Problem(s)</label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {subServices.problems.map((p: any) => (
                                        <label key={p._id} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                                            <input type="checkbox" checked={formData.problemDescription.includes(p.name)} onChange={() => handleProblemToggle(p.name)} className="rounded text-brand-red"/>
                                            {p.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <select value={formData.addressId} onChange={e => setFormData({...formData, addressId: e.target.value})} required className="w-full rounded-lg border-gray-300">
                                <option value="">Select Service Address</option>
                                {addresses.map((addr: any) => <option key={addr._id} value={addr._id}>{`${addr.label}: ${addr.street}, ${addr.city}`}</option>)}
                            </select>
                            <input type="date" value={formData.preferredDate} onChange={e => setFormData({...formData, preferredDate: e.target.value})} required className="w-full rounded-lg border-gray-300"/>
                             <select value={formData.timeSlot} onChange={e => setFormData({...formData, timeSlot: e.target.value})} required className="w-full rounded-lg border-gray-300">
                                <option value="">Select Time Slot</option>
                                <option>09:00 AM - 11:00 AM</option>
                                <option>11:00 AM - 01:00 PM</option>
                                <option>02:00 PM - 04:00 PM</option>
                                <option>04:00 PM - 06:00 PM</option>
                            </select>
                        </>
                    )}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
}