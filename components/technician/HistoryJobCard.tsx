'use client';

import Link from 'next/link';
import { Calendar, User, IndianRupee } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';

interface Job {
    _id: string;
    serviceType: string;
    preferredDate: string;
    status: string;
    serviceCharge: number;
    customerId: {
        name: string;
    };
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

export function HistoryJobCard({ job }: { job: Job }) {
  return (
    <Link href={`/technician/jobs/${job._id}`} className="block hover:shadow-lg transition-shadow duration-300">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 h-full">
            <div className="flex justify-between items-start">
                <h3 className="font-montserrat font-bold text-neutral-800">{job.serviceType}</h3>
                <StatusBadge status={job.status} />
            </div>
            <div className="mt-4 space-y-3 text-sm text-neutral-600 border-t pt-3">
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(job.preferredDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{job.customerId.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-green-600">{formatCurrency(job.serviceCharge)}</span>
                </div>
            </div>
        </div>
    </Link>
  );
}