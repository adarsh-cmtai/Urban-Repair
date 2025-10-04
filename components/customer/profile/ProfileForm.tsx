'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCustomerProfile } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2, User, Phone, Mail, Lock, Save } from 'lucide-react';

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
            onUpdate();
        } catch (error) {
            toast.error('Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Personal Information</h2>
                <p className="mt-1 text-slate-500">Update your name and phone number.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-t border-slate-200 pt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            icon={User}
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            placeholder="Full Name"
                        />
                        <FormInput
                            icon={Phone}
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className="relative">
                        <FormInput
                            icon={Mail}
                            type="email"
                            id="email"
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