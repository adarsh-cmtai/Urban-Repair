'use client';

import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { changeCustomerPassword } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function PasswordForm() {
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        setIsLoading(true);
        try {
            await changeCustomerPassword({ oldPassword: formData.oldPassword, newPassword: formData.newPassword }, token!);
            toast.success('Password changed successfully!');
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to change password.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-neutral-700">Current Password</label>
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300" />
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-700">New Password</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300" />
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-700">Confirm New Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300" />
            </div>
            <div className="text-right">
                <button type="submit" disabled={isLoading} className="inline-flex justify-center items-center rounded-lg bg-brand-red px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
                </button>
            </div>
        </form>
    );
}