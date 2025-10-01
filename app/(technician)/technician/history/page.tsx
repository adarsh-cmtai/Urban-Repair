'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getJobHistory } from '@/services/technicianService';
import { HistoryJobCard } from '@/components/technician/HistoryJobCard';
import { Loader2, History, X } from 'lucide-react';

interface Filters {
    dateFrom: string;
    dateTo: string;
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

  return (
    <div className="space-y-8">
      <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Job History</h1>

      <div className="p-4 bg-white rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full sm:w-auto">
            <label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">From</label>
            <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300"
            />
        </div>
        <div className="flex-1 w-full sm:w-auto">
            <label htmlFor="dateTo" className="text-sm font-medium text-gray-700">To</label>
            <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300"
            />
        </div>
        <div className="self-end">
            <button onClick={clearFilters} className="p-2 text-gray-500 hover:text-red-600">
                <X className="w-5 h-5"/>
            </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-red" /></div>
      ) : (
        <>
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job: any) => <HistoryJobCard key={job._id} job={job}/>)}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <History className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No History Found</h3>
                    <p className="mt-1 text-sm text-gray-500">No completed jobs match your filter criteria.</p>
                </div>
            )}
        </>
      )}
    </div>
  );
}