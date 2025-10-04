'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { registerUser } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { UserPlus, Loader2, Home } from 'lucide-react';

type Role = 'customer' | 'admin' | 'technician';

interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({ 
      name: '', 
      email: '', 
      phone: '', 
      password: '',
      role: 'customer'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        toast.success('Registration successful! Please check your email for the OTP.');
        router.push('/verify-otp');
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : 'Registration failed. Please try again.';
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
       <div className="hidden lg:block">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Clean modern home interior"
        />
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Link 
        href="/" 
        className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:bg-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-montserrat font-extrabold text-neutral-800">
              Create an Account
            </h2>
            <p className="mt-2 text-center text-sm text-neutral-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-brand-red hover:text-red-700">
                Sign in
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
               <input name="name" type="text" value={formData.name} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Full Name" />
               <input name="email" type="email" value={formData.email} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Email address" />
               <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Phone Number" />
               <input name="password" type="password" value={formData.password} onChange={handleChange} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Password" />
               <div>
                  <label htmlFor="role" className="sr-only">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm"
                  >
                    <option value="customer">Register as a Customer</option>
                    <option value="technician">Register as a Technician</option>
                    {/* <option value="admin">Register as an Admin</option> */}
                  </select>
               </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="absolute left-32 inset-y-0 flex items-center pl-3">
                      <UserPlus className="h-5 w-5 text-red-300 group-hover:text-red-200" />
                    </span>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}