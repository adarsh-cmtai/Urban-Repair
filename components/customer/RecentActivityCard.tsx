'use client';

import { CheckCircle, History } from 'lucide-react';
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
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col justify-center items-center text-center">
        <History className="w-12 h-12 text-gray-300" />
        <h3 className="font-montserrat text-lg font-bold text-neutral-800 mt-4">No Recent Activity</h3>
        <p className="mt-1 text-neutral-500">Your completed services will appear here.</p>
      </div>
    );
  }

  const serviceName = activity.items?.[0]?.serviceName || activity.serviceType || 'Service';

  return (
    <Link href={`/customer/bookings/${activity._id}`} className="block hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
        <h3 className="font-montserrat text-lg font-bold text-neutral-800">Recent Activity</h3>
        <div className="mt-4 space-y-3 text-neutral-600">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold">{serviceName} - {activity.status}</span>
          </div>
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-brand-red" />
            <span>{formatRelativeDate(activity.updatedAt)}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t w-full text-center text-brand-red font-semibold">
            View Details
        </div>
      </div>
    </Link>
  );
}