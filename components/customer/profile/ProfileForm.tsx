'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCustomerProfile } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function ProfileForm({ user }: { user: any }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhone(user.phone);
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateCustomerProfile({ name, phone }, token!);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Full Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email Address (Cannot be changed)</label>
                <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                />
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center items-center rounded-lg border border-transparent bg-brand-red px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 disabled:bg-red-300"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}