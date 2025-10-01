'use client';

import { Calendar, Clock, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Booking } from '@/app/services/types';

interface UpcomingServiceCardProps {
  service: Booking | null;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function UpcomingServiceCard({ service }: UpcomingServiceCardProps) {
  if (!service) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="font-montserrat text-lg font-bold text-neutral-800">Upcoming Service</h3>
        <p className="mt-2 text-neutral-500">You have no upcoming services scheduled.</p>
        <Link href="/services">
          <button className="mt-4 w-full bg-brand-red text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Book a New Service
          </button>
        </Link>
      </div>
    );
  }

  const serviceName = service.items?.[0]?.serviceName || service.serviceType || 'Service';

  return (
    <Link href={`/customer/bookings/${service._id}`} className="block hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-full">
        <h3 className="font-montserrat text-lg font-bold text-neutral-800">Upcoming Service</h3>
        <div className="mt-4 space-y-3 text-neutral-600">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-brand-red" />
            <span className="font-semibold">{serviceName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-brand-red" />
            <span>{formatDate(service.preferredDate)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-red" />
            <span>{service.timeSlot}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium">Status: <span className="text-brand-red font-semibold">{service.status}</span></p>
        </div>
      </div>
    </Link>
  );
}