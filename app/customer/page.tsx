'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getDashboardSummary } from '@/services/customerService';
import { UpcomingServiceCard } from '@/components/customer/UpcomingServiceCard';
import { RecentActivityCard } from '@/components/customer/RecentActivityCard';
import { Loader2, ArrowRight, PlusCircle, AlertTriangle } from 'lucide-react';
import { Booking } from '@/app/services/types';
import Link from 'next/link';

interface DashboardData {
  welcomeMessage: string;
  upcomingService: Booking | null;
  recentActivity: Booking | null;
}

// Skeleton Loader for a better UX
function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div>
                <div className="h-10 bg-slate-200 rounded w-3/4"></div>
                <div className="h-5 bg-slate-200 rounded w-1/2 mt-2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-64"></div>
            </div>
        </div>
    );
}

// Error State Component
function ErrorState({ message, onRetry }: { message: string, onRetry: () => void }) {
    return (
        <div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-red-200">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-4 text-lg font-semibold text-red-700">Oops! Something went wrong</h3>
            <p className="mt-1 text-sm text-red-500">{message}</p>
            <button
                onClick={onRetry}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
            >
                Try Again
            </button>
        </div>
    );
}

export default function CustomerDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDashboardSummary(token);
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchDashboardData} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="font-heading text-4xl font-extrabold text-slate-800">
            Welcome back, {user?.name.split(' ')[0] || 'Customer'}!
          </h1>
          <p className="mt-2 text-slate-500">
            Here's your activity overview for {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.
          </p>
        </div>
        <Link 
            href="/services" 
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
        >
            <PlusCircle className="w-5 h-5" /> Book a New Service
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UpcomingServiceCard service={dashboardData?.upcomingService || null} />
        <RecentActivityCard activity={dashboardData?.recentActivity || null} />
      </div>

       <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
                <h3 className="font-heading text-xl font-bold text-white">Looking for something else?</h3>
                <p className="mt-1 text-slate-400">Explore our full range of expert home appliance services.</p>
            </div>
            <Link href="/services">
              <button className="flex items-center gap-2 bg-white text-slate-800 font-semibold py-3 px-6 rounded-full hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center shadow-md">
                View All Services
                <ArrowRight className="w-5 h-5"/>
              </button>
            </Link>
        </div>
    </div>
  );
}