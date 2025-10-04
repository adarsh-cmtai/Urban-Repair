'use client';

import { useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, KeyRound } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { resetPassword } from '@/services/authService';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await resetPassword(token, password);
            toast.success(res.message);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-3xl font-montserrat font-extrabold text-neutral-800">Set New Password</h2>
                    <p className="mt-2 text-neutral-600">Create a new, strong password for your account.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded-md" placeholder="New Password" />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-3 border rounded-md" placeholder="Confirm New Password" />
                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-brand-red disabled:bg-red-300">
                         {isSubmitting ? <Loader2 className="animate-spin" /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}