'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getDashboardSummary } from '@/services/customerService';
import { UpcomingServiceCard } from '@/components/customer/UpcomingServiceCard';
import { RecentActivityCard } from '@/components/customer/RecentActivityCard';
import { Loader2, ArrowRight } from 'lucide-react';
import { Booking } from '@/app/services/types';
import Link from 'next/link';

interface DashboardData {
  welcomeMessage: string;
  upcomingService: Booking | null;
  recentActivity: Booking | null;
}

export default function CustomerDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      try {
        setIsLoading(true);
        const response = await getDashboardSummary(token);
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-red animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold text-neutral-800">
          {dashboardData?.welcomeMessage}
        </h1>
        <p className="mt-1 text-neutral-500">
          Here's a quick overview of your service activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingServiceCard service={dashboardData?.upcomingService || null} />
        <RecentActivityCard activity={dashboardData?.recentActivity || null} />
      </div>

       <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
                <h3 className="font-montserrat text-lg font-bold text-neutral-800">Need a new service?</h3>
                <p className="mt-1 text-neutral-500">Get expert help for any of your home appliances.</p>
            </div>
            <Link href="/services">
              <button className="flex items-center gap-2 bg-brand-red text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto justify-center">
                Book a Service
                <ArrowRight className="w-5 h-5"/>
              </button>
            </Link>
        </div>
    </div>
  );
}