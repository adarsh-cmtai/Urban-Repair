'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { forgotPassword } from '@/services/authService';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await forgotPassword(email);
            toast.success(res.message);
            setIsSubmitted(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-lg">
                {isSubmitted ? (
                    <div className="text-center">
                        <Mail className="mx-auto h-12 w-12 text-green-500" />
                        <h2 className="mt-6 text-2xl font-bold text-neutral-800">Check Your Email</h2>
                        <p className="mt-2 text-neutral-600">If an account with that email exists, we have sent a link to reset your password.</p>
                        <Link href="/login" className="mt-6 inline-block text-brand-red font-medium">Back to Login</Link>
                    </div>
                ) : (
                    <>
                    <div>
                        <h2 className="text-3xl font-montserrat font-extrabold text-neutral-800">Forgot Password?</h2>
                        <p className="mt-2 text-neutral-600">No worries, we'll send you reset instructions.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded-md" placeholder="Enter your email" />
                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-brand-red disabled:bg-red-300">
                             {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                        </button>
                    </form>
                    </>
                )}
            </div>
        </div>
    );
}