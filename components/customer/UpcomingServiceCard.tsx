'use client';

import { Calendar, Clock, Wrench, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Booking } from '@/app/services/types';

interface UpcomingServiceCardProps {
  service: Booking | null;
}

const getMonth = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
const getDay = (dateString: string) => new Date(dateString).getDate();

const statusStyles: { [key: string]: string } = {
  Pending: 'bg-orange-100 text-orange-700',
  Assigned: 'bg-blue-100 text-blue-700',
  InProgress: 'bg-purple-100 text-purple-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-slate-100 text-slate-600',
};

export function UpcomingServiceCard({ service }: UpcomingServiceCardProps) {
  if (!service) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="font-heading font-bold text-lg text-slate-800">No Upcoming Services</h3>
        <p className="mt-1 text-slate-500 text-sm max-w-xs">Ready to schedule your next appointment with us?</p>
        <Link href="/services" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors">
            <PlusCircle className="w-5 h-5" /> Book a New Service
        </Link>
      </div>
    );
  }

  const serviceName = service.items?.[0]?.serviceName || service.serviceType || 'Service';
  const statusClass = statusStyles[service.status] || 'bg-slate-100 text-slate-600';

  return (
    <Link href={`/customer/bookings/${service._id}`} className="group block h-full">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-heading font-bold text-xl text-slate-800">Upcoming Service</h3>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}>
            {service.status}
          </span>
        </div>
        
        <div className="flex-grow flex items-center gap-5 my-4">
            <div className="flex-shrink-0 text-center bg-red-50 rounded-lg p-3 w-20">
                <p className="text-red-600 font-bold text-sm">{getMonth(service.preferredDate)}</p>
                <p className="font-extrabold text-3xl text-slate-800 tracking-tight">{getDay(service.preferredDate)}</p>
            </div>
            <div className="min-w-0">
                <h4 className="font-semibold text-lg text-slate-900 truncate" title={serviceName}>{serviceName}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.timeSlot}</span>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-sm font-semibold text-red-600">View Details</p>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}