'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTechnicianJobQueue, acceptJob } from '@/services/technicianService';
import { Loader2, Calendar, MapPin, Clock, ArrowRight, User, Check, X, Inbox } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

// --- Re-designed JobCard Component ---
const JobCard = ({ job, onAccept, onDecline, isAccepting }: { job: any, onAccept: (id: string) => void, onDecline: (id: string) => void, isAccepting: boolean }) => {
    const serviceName = job.items?.[0]?.serviceName || job.serviceType || 'Service';
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-slate-300">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                    <h3 className="font-heading font-bold text-lg text-slate-800">{serviceName}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">ID: #{job._id.slice(-6).toUpperCase()}</p>
                </div>
                <StatusBadge status={job.status} />
            </div>
            <div className="flex-grow py-5 space-y-3">
                <div className="flex items-center gap-3 text-sm"><User className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="font-semibold text-slate-800">{job.customerId?.name}</span></div>
                <div className="flex items-center gap-3 text-sm"><Calendar className="w-5 h-5 text-red-500 flex-shrink-0" /><div><span className="font-semibold text-slate-800">{formatDate(job.preferredDate)}</span> at <span className="font-semibold text-slate-800">{job.timeSlot}</span></div></div>
                <div className="flex items-center gap-3 text-sm"><MapPin className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="text-slate-600">{job.address.street}, {job.address.city}</span></div>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-200">
                {job.status === 'Offered' ? (
                    <div className="flex gap-2">
                        <button onClick={() => onDecline(job._id)} disabled={isAccepting} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm"><X size={14} /> Decline</button>
                        <button onClick={() => onAccept(job._id)} disabled={isAccepting} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 text-sm">{isAccepting ? <Loader2 className="animate-spin w-4 h-4"/> : <><Check size={14} /> Accept</>}</button>
                    </div>
                ) : (
                    <Link href={`/technician/jobs/${job._id}`} className="group w-full flex justify-between items-center text-sm font-semibold text-red-600">
                        <span>View Details</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </div>
    );
};

// --- Skeleton Loader & Empty State ---
const CardSkeleton = () => <div className="bg-white p-6 rounded-xl shadow-sm border h-60 animate-pulse"></div>;
const EmptyState = ({ title, message }: { title: string, message: string }) => (
    <div className="text-center py-16 px-6 col-span-full bg-white rounded-xl border-2 border-dashed border-slate-200">
        <Inbox className="mx-auto h-16 w-16 text-slate-300" />
        <h3 className="mt-4 text-lg font-semibold text-slate-700">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
);

export default function TechnicianDashboardPage() {
    const [jobQueue, setJobQueue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAccepting, setIsAccepting] = useState(false);
    const { token, user } = useSelector((state: RootState) => state.auth);

    const fetchData = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getTechnicianJobQueue(token);
            setJobQueue(response.data.jobQueue);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [token]);

    const handleAcceptJob = async (bookingId: string) => {
        setIsAccepting(true);
        try {
            await toast.promise(acceptJob(bookingId, token!), {
                loading: 'Accepting job...',
                success: 'Job accepted! It is now in your queue.',
                error: (err) => err.response?.data?.message || 'Failed to accept job.'
            });
            fetchData();
        } finally {
            setIsAccepting(false);
        }
    };

    const handleDeclineJob = (bookingId: string) => {
        console.log("Declining job:", bookingId);
        toast.error("Decline functionality not implemented yet.");
    };

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div><div className="h-10 w-3/4 bg-slate-200 rounded"></div><div className="h-5 w-1/2 bg-slate-200 rounded mt-2"></div></div>
                <div className="bg-amber-50 p-6 rounded-xl"><div className="h-8 w-1/3 bg-slate-200 rounded"></div></div>
                <div><div className="h-8 w-1/3 bg-slate-200 rounded mb-4"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div></div>
            </div>
        );
    }
    
    const offeredJobs = jobQueue.filter((j: any) => j.status === 'Offered');
    const acceptedJobs = jobQueue.filter((j: any) => j.status !== 'Offered');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Welcome, {user?.name.split(' ')[0]}!</h1>
                <p className="mt-2 text-slate-500">
                    You have <span className="font-bold text-red-600">{offeredJobs.length} new offers</span> and <span className="font-bold text-slate-700">{acceptedJobs.length} accepted jobs</span> in your queue.
                </p>
            </div>
            
            <AnimatePresence>
                {offeredJobs.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                        <h2 className="font-heading text-xl font-bold text-amber-900 mb-4">New Job Offers ({offeredJobs.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offeredJobs.map((job: any) => <JobCard key={job._id} job={job} onAccept={handleAcceptJob} onDecline={handleDeclineJob} isAccepting={isAccepting} />)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800 mb-4">Your Accepted Queue</h2>
                {acceptedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {acceptedJobs.map((job: any) => <JobCard key={job._id} job={job} onAccept={handleAcceptJob} onDecline={handleDeclineJob} isAccepting={isAccepting} />)}
                    </div>
                ) : (
                    <EmptyState title="Queue is Clear!" message={offeredJobs.length > 0 ? "You have no accepted jobs yet. Review your new offers above." : "You have no accepted jobs and no new offers."} />
                )}
            </div>
        </div>
    );
}