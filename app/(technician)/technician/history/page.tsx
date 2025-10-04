'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getJobHistory } from '@/services/technicianService';
import { Loader2, History, X, Calendar, User, IndianRupee, Star } from 'lucide-react';
import Link from 'next/link';

interface Filters {
    dateFrom: string;
    dateTo: string;
}

// --- Re-designed HistoryJobCard Component ---
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

function HistoryJobCard({ job }: { job: any }) {
    const serviceName = job.items?.[0]?.serviceName || job.serviceType || 'Service';
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                    <h3 className="font-heading font-bold text-lg text-slate-800">{serviceName}</h3>
                    <p className="text-sm text-slate-500">{formatDate(job.updatedAt)}</p>
                </div>
                {job.review && (
                    <div className="flex items-center gap-1 text-sm font-semibold bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full">
                        <Star size={14}/> {job.review.rating}.0
                    </div>
                )}
            </div>
            <div className="flex-grow py-5 space-y-3">
                <div className="flex items-center gap-3 text-sm"><User className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="font-semibold text-slate-800">{job.customerId?.name}</span></div>
                <div className="flex items-center gap-3 text-sm"><IndianRupee className="w-5 h-5 text-red-500 flex-shrink-0" /><span className="text-slate-600">Earned: <span className="font-bold text-green-600">₹{job.finalAmount?.toLocaleString('en-IN')}</span></span></div>
            </div>
            <Link href={`/technician/jobs/${job._id}`} className="mt-auto w-full text-center bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                View Details
            </Link>
        </div>
    );
}

// --- Skeleton Loader Component ---
function HistoryCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 animate-pulse">
            <div className="pb-4 border-b border-slate-200">
                <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/3 bg-slate-200 rounded mt-2"></div>
            </div>
            <div className="py-5 space-y-4">
                <div className="h-5 w-1/2 bg-slate-200 rounded"></div>
                <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="h-9 w-full bg-slate-200 rounded-lg"></div>
            </div>
        </div>
    );
}

// --- Empty State Component ---
function EmptyState({ onClear }: { onClear: () => void }) {
    return (
        <div className="text-center py-20 px-6 col-span-full bg-white rounded-xl border-2 border-dashed border-slate-200">
            <History className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No History Found</h3>
            <p className="mt-1 text-sm text-slate-500">No completed jobs match your filter criteria.</p>
            <button onClick={onClear} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                <X className="w-4 h-4" /> Clear Filters
            </button>
        </div>
    );
}


export default function JobHistoryPage() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({ dateFrom: '', dateTo: '' });
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchHistory = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getJobHistory(filters, token);
            setJobs(response.data);
        } catch (error) {
            console.error("Failed to fetch job history");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [token, filters]);
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const clearFilters = () => {
        setFilters({ dateFrom: '', dateTo: '' });
    };

    const areFiltersActive = filters.dateFrom !== '' || filters.dateTo !== '';

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Job History</h1>
                <p className="mt-2 text-slate-500">Review your completed jobs and performance.</p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full sm:w-auto">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300"/>
                </div>
                <div className="relative flex-1 w-full sm:w-auto">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300"/>
                </div>
                {areFiltersActive && (
                    <button onClick={clearFilters} className="h-12 inline-flex items-center justify-center gap-2 px-4 rounded-lg border bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 transition-colors">
                        <X size={16}/>Clear
                    </button>
                )}
            </div>
      
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, i) => <HistoryCardSkeleton key={i} />)
                ) : jobs.length > 0 ? (
                    jobs.map((job: any) => <HistoryJobCard key={job._id} job={job}/>)
                ) : (
                    <EmptyState onClear={clearFilters} />
                )}
            </div>
        </div>
    );
}