'use client';

import { CheckCircle, History, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Booking } from '@/app/services/types';

const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
};

export function RecentActivityCard({ activity }: { activity: Booking | null }) {
  if (!activity) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <History className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="font-heading font-bold text-lg text-slate-800">No Recent Activity</h3>
        <p className="mt-1 text-slate-500 text-sm max-w-xs">Your completed services and history will appear here.</p>
      </div>
    );
  }

  const serviceName = activity.items?.[0]?.serviceName || activity.serviceType || 'Service';

  return (
    <Link href={`/customer/bookings/${activity._id}`} className="group block h-full">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <h3 className="font-heading font-bold text-xl text-slate-800">Recent Activity</h3>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-green-100 text-green-700">
                Completed
            </span>
        </div>
        
        <div className="flex-grow flex items-center gap-5 my-4">
            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="min-w-0">
                <h4 className="font-semibold text-lg text-slate-900 truncate" title={serviceName}>{serviceName}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <History className="w-4 h-4" />
                    <span>{formatRelativeDate(activity.updatedAt)}</span>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-sm font-semibold text-red-600">View Receipt & Details</p>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}