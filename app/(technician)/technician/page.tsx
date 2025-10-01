'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTodaysJobs } from '@/services/technicianService';
import { Loader2, Calendar, MapPin, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import Link from 'next/link';

function JobCard({ job }: { job: any }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
                <h3 className="font-montserrat font-bold text-neutral-800">{job.serviceType}</h3>
                <StatusBadge status={job.status} />
            </div>
            <p className="text-sm text-neutral-500 mt-1">for {job.customerId?.name}</p>
            <div className="mt-4 space-y-2 text-sm text-neutral-600 border-t pt-3">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> {job.timeSlot}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {job.address.city}</div>
            </div>
            <Link href={`/technician/jobs/${job._id}`}>
                <button className="w-full mt-4 bg-brand-red text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    View Details
                </button>
            </Link>
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
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-red" /></div>;
  }

  const { summary, jobQueue } = dashboardData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Welcome, {user?.name}!</h1>
        <p className="mt-1 text-neutral-500">You have <span className="font-bold text-brand-red">{summary.totalJobsToday}</span> job(s) scheduled for today.</p>
      </div>

      {summary.nextJob && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-200">
            <h2 className="font-montserrat font-bold text-lg text-neutral-800">Next Up</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-semibold text-gray-800">{summary.nextJob.serviceType}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-800">{summary.nextJob.timeSlot}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">{summary.nextJob.address.city}</p>
                </div>
            </div>
             <Link href={`/technician/jobs/${summary.nextJob._id}`}>
                <button className="w-full sm:w-auto mt-4 bg-brand-red text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
                    Start Next Job
                </button>
            </Link>
          </div>
      )}
      
      <div>
        <h2 className="font-montserrat text-xl font-bold text-neutral-800 mb-4">Today's Job Queue</h2>
        {jobQueue.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobQueue.map((job: any) => <JobCard key={job._id} job={job}/>)}
            </div>
        ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs for today</h3>
                <p className="mt-1 text-sm text-gray-500">Your schedule is clear. Enjoy your day!</p>
            </div>
        )}
      </div>
    </div>
  );
}