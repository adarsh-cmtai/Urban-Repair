'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateTechnicianProfile } from '@/services/technicianService';
import { toast } from 'react-hot-toast';
import { Loader2, User, Phone, Wrench, Mail, Lock, Save } from 'lucide-react';

interface Props {
  user: any;
  onUpdate: () => void;
}

const FormInput = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input {...props} className="pl-12 w-full h-14 text-base bg-slate-50 rounded-xl border-slate-300 focus:ring-red-500 focus:border-red-500 disabled:bg-slate-100 disabled:cursor-not-allowed" />
    </div>
);

export function ProfileForm({ user, onUpdate }: Props) {
    const [formData, setFormData] = useState({ name: '', phone: '', specialization: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, phone: user.phone, specialization: user.specialization || '' });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const promise = updateTechnicianProfile(formData, token!);
        
        toast.promise(promise, {
            loading: 'Updating profile...',
            success: 'Profile updated successfully!',
            error: 'Failed to update profile.'
        }).then(() => {
            onUpdate();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Profile Details</h2>
                <p className="mt-1 text-slate-500">Update your personal and professional information.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-t border-slate-200 pt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            icon={User}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <FormInput
                            icon={Phone}
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <FormInput
                        icon={Wrench}
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g., AC & Refrigeration Expert"
                        required
                    />
                     <div className="relative">
                        <FormInput
                            icon={Mail}
                            type="email"
                            value={user?.email || ''}
                            disabled
                            placeholder="Email Address"
                        />
                         <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center items-center gap-2 rounded-lg bg-red-600 px-6 py-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
                    </button>
                </div>
            </form>
        </div>
    );
}