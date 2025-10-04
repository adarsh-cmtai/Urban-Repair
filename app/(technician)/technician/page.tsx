'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTodaysJobs } from '@/services/technicianService';
import { Loader2, CalendarCheck2, ArrowRight, User, Wrench, Clock, MapPin } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import Link from 'next/link';

// --- Re-designed JobCard Component ---
function JobCard({ job }: { job: any }) {
    const serviceName = job.items?.[0]?.serviceName || job.serviceType || 'Service';
    return (
        <Link href={`/technician/jobs/${job._id}`} className="group block h-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                    <div>
                        <h3 className="font-heading font-bold text-lg text-slate-800">{serviceName}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">ID: #{job._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <StatusBadge status={job.status} />
                </div>
                <div className="flex-grow py-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm"><User className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="font-semibold text-slate-800">{job.customerId?.name}</span></div>
                    <div className="flex items-center gap-3 text-sm"><Clock className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="text-slate-600">{job.timeSlot}</span></div>
                    <div className="flex items-center gap-3 text-sm"><MapPin className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="text-slate-600">{job.address.street}, {job.address.city}</span></div>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-sm font-semibold text-red-600">View Job Details</p>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}

// --- Premium "Next Up" Card ---
function NextJobCard({ job }: { job: any }) {
    const serviceName = job.items?.[0]?.serviceName || job.serviceType || 'Service';
    return (
        <Link href={`/technician/jobs/${job._id}`} className="group block">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl shadow-lg text-white">
                <h2 className="font-heading font-bold text-xl mb-6">Your Next Job</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="flex items-center gap-3"><User size={20} className="text-red-400"/><div className="min-w-0"><p className="text-xs text-slate-400">Customer</p><p className="font-semibold truncate">{job.customerId?.name}</p></div></div>
                    <div className="flex items-center gap-3"><Wrench size={20} className="text-red-400"/><div className="min-w-0"><p className="text-xs text-slate-400">Service</p><p className="font-semibold truncate">{serviceName}</p></div></div>
                    <div className="flex items-center gap-3"><Clock size={20} className="text-red-400"/><div className="min-w-0"><p className="text-xs text-slate-400">Time</p><p className="font-semibold">{job.timeSlot}</p></div></div>
                    <div className="flex items-center gap-3"><MapPin size={20} className="text-red-400"/><div className="min-w-0"><p className="text-xs text-slate-400">Location</p><p className="font-semibold truncate">{job.address.city}</p></div></div>
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                    Start Job <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"/>
                </button>
            </div>
        </Link>
    );
}

// --- Empty State Component ---
function EmptyState() {
    return (
        <div className="text-center py-20 px-6 col-span-full bg-white rounded-xl border-2 border-dashed border-slate-200">
            <CalendarCheck2 className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">All Clear for Today!</h3>
            <p className="mt-1 text-sm text-slate-500">You have no pending jobs on your schedule. Enjoy your day!</p>
        </div>
    );
}

// --- Skeleton Loader Component ---
function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div>
                <div className="h-10 bg-slate-200 rounded w-3/4"></div>
                <div className="h-5 bg-slate-200 rounded w-1/2 mt-2"></div>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl h-48"></div>
            <div>
                <div className="h-8 w-1/3 bg-slate-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border h-48"></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border h-48"></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border h-48"></div>
                </div>
            </div>
        </div>
    );
}

export default function TechnicianDashboardPage() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                const response = await getTodaysJobs(token);
                setDashboardData(response.data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    const { summary, jobQueue } = dashboardData;
    const remainingJobs = jobQueue.filter((job: any) => job._id !== summary.nextJob?._id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Welcome, {user?.name.split(' ')[0]}!</h1>
                <p className="mt-2 text-slate-500">You have <span className="font-bold text-red-600">{summary.totalJobsToday}</span> job(s) scheduled for today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.</p>
            </div>

            {summary.nextJob && <NextJobCard job={summary.nextJob} />}
            
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800 mb-4">Today's Job Queue</h2>
                {remainingJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {remainingJobs.map((job: any) => <JobCard key={job._id} job={job}/>)}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}