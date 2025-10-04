'use client';

import Link from 'next/link';
import { Calendar, Wrench, ArrowRight, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export function BookingCard({ booking }: { booking: any }) {
  const serviceName = booking.items?.[0]?.serviceName || booking.serviceType || 'Service';

  return (
    <Link href={`/customer/bookings/${booking._id}`} className="group block h-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-800">{serviceName}</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">ID: #{booking._id.slice(-6).toUpperCase()}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Details */}
        <div className="flex-grow py-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="text-slate-600">
                    <span className="font-semibold text-slate-800">{formatDate(booking.preferredDate)}</span> at <span className="font-semibold text-slate-800">{booking.timeSlot}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
                {booking.technicianId ? (
                    <>
                        <Wrench className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <div className="text-slate-600">
                            Assigned to <span className="font-semibold text-slate-800">{booking.technicianId.name}</span>
                        </div>
                    </>
                ) : (
                    <>
                         <User className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        <div className="text-slate-500 italic">
                            Awaiting technician assignment
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-sm font-semibold text-red-600">View Details & Track Status</p>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}