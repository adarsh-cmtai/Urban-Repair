'use client';

import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { changeCustomerPassword } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2, KeyRound, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const PasswordInput = ({ show, onToggle, ...props }: { show: boolean, onToggle: () => void, [key: string]: any }) => (
    <div className="relative">
        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input 
            {...props} 
            type={show ? 'text' : 'password'}
            className="pl-12 pr-12 w-full h-14 text-base bg-slate-50 rounded-xl border-slate-300 focus:ring-red-500 focus:border-red-500" 
        />
        <button 
            type="button" 
            onClick={onToggle} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
    </div>
);

export function PasswordForm() {
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        if (formData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true);
        try {
            await changeCustomerPassword({ oldPassword: formData.oldPassword, newPassword: formData.newPassword }, token!);
            toast.success('Password changed successfully!');
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswords({ old: false, new: false, confirm: false });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to change password.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleShow = (field: 'old' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Change Your Password</h2>
                <p className="mt-1 text-slate-500">For security, please choose a strong password and do not share it with anyone.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
                <div className="border-t border-slate-200 pt-8 space-y-6">
                    <PasswordInput 
                        name="oldPassword" 
                        value={formData.oldPassword} 
                        onChange={handleChange} 
                        placeholder="Current Password" 
                        required 
                        show={showPasswords.old}
                        onToggle={() => toggleShow('old')}
                    />
                    <PasswordInput 
                        name="newPassword" 
                        value={formData.newPassword} 
                        onChange={handleChange} 
                        placeholder="New Password" 
                        required 
                        show={showPasswords.new}
                        onToggle={() => toggleShow('new')}
                    />
                    <PasswordInput 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        placeholder="Confirm New Password" 
                        required 
                        show={showPasswords.confirm}
                        onToggle={() => toggleShow('confirm')}
                    />
                </div>
                
                <div className="pt-6 border-t border-slate-200 flex justify-end">
                    <button type="submit" disabled={isLoading} className="inline-flex justify-center items-center gap-2 rounded-lg bg-red-600 px-6 py-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Update Password</>}
                    </button>
                </div>
            </form>
        </div>
    );
}