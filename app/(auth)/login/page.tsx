'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loginUser, clearError } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { LogIn, Loader2, Home } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
            toast.success('Logged in successfully!');
        })
        .catch((err) => {
            const errorMessage = typeof err === 'string' ? err : 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
  };

  useEffect(() => {
    if (token && user) {
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'technician') {
        router.push('/technician');
      } else {
        router.push('/customer');
      }
    }
  }, [token, user, router]);

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">

      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:bg-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-montserrat font-extrabold text-neutral-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-neutral-600">
              Or{' '}
              <Link href="/register" className="font-medium text-brand-red hover:text-red-700">
                create an account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
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
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LogIn className="h-5 w-5 text-red-300 group-hover:text-red-200" />
                    </span>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Technician working"
        />
      </div>
    </div>
  );
}