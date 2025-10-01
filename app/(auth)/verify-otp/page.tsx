'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { verifyUserOtp, resendUserOtp } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { KeyRound, Loader2, MailCheck } from 'lucide-react';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, registrationEmail } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!registrationEmail) {
      router.push('/register');
    }
  }, [registrationEmail, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    dispatch(verifyUserOtp({ email: registrationEmail!, otp }))
      .unwrap()
      .then((message) => {
        toast.success(message as string);
        router.push('/login');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleResend = () => {
    dispatch(resendUserOtp(registrationEmail!))
      .unwrap()
      .then((message) => toast.success(message as string))
      .catch((err) => toast.error(err));
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-lg">
          <div>
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-brand-red rounded-full mx-auto mb-6">
                <MailCheck className="w-8 h-8" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-montserrat font-extrabold text-neutral-800">
              Verify Your Email
            </h2>
            <p className="mt-2 text-center text-sm text-neutral-600">
              An OTP has been sent to <span className="font-medium">{registrationEmail}</span>.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-lg text-center tracking-[1em]"
                  placeholder="------"
                />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <KeyRound className="h-5 w-5 text-red-300 group-hover:text-red-200" />
                    </span>
                    Verify Account
                  </>
                )}
              </button>
            </div>
          </form>
           <div className="text-center text-sm">
                <button onClick={handleResend} disabled={isLoading} className="font-medium text-brand-red hover:text-red-700">
                    Didn't receive code? Resend
                </button>
            </div>
        </div>
      </div>
  );
}