'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateTechnicianProfile } from '@/services/technicianService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function ProfileForm({ user, onUpdate }: { user: any, onUpdate: () => void }) {
    const [formData, setFormData] = useState({ name: '', phone: '', specialization: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, phone: user.phone, specialization: user.specialization || '' });
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const promise = updateTechnicianProfile(formData, token!);
        toast.promise(promise, {
            loading: 'Updating profile...',
            success: 'Profile updated successfully!',
            error: 'Failed to update profile.'
        }).then(() => onUpdate());
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full rounded-lg border-gray-300"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-700">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="mt-1 block w-full rounded-lg border-gray-300"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-neutral-700">Specialization</label>
                <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} placeholder="e.g., AC & Refrigeration Expert" className="mt-1 block w-full rounded-lg border-gray-300"/>
            </div>
            <div className="text-right pt-2">
                <button type="submit" disabled={isLoading} className="inline-flex justify-center items-center rounded-lg bg-brand-red px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}