'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminSellRequests } from '@/services/adminService';
import { SellRequestsTable } from '@/components/admin/sell-requests/SellRequestsTable';
import { Search, Filter, Inbox } from 'lucide-react';

function TableSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="animate-pulse">
                <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-slate-50 rounded-t-lg">
                    <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="space-y-2 mt-2 p-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 items-center h-12">
                            <div className="h-5 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-5 bg-slate-200 rounded"></div>
                            <div className="h-5 bg-slate-200 rounded"></div>
                            <div className="h-5 bg-slate-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-20 px-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <Inbox className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No Sell Requests Found</h3>
            <p className="mt-1 text-sm text-slate-500">No requests match your current filters.</p>
        </div>
    );
}

export default function AdminSellRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [filters, setFilters] = useState({ status: '', search: '' });
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    const debouncedSearch = useMemo(() => {
        let timer: NodeJS.Timeout;
        return (searchTerm: string) => {
            clearTimeout(timer);
            timer = setTimeout(() => { setFilters(prev => ({ ...prev, search: searchTerm })); }, 500);
        };
    }, []);

    const fetchRequests = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getAdminSellRequests(filters, token);
            setRequests(response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [token, filters]);

    const statusOptions = ['Pending', 'Inspection_Assigned', 'Inspected', 'Offer_Made', 'Offer_Accepted', 'Offer_Declined', 'Pickup_Assigned', 'Completed', 'Cancelled'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Sell Requests</h1>
                <p className="mt-2 text-slate-500">Manage all requests from customers looking to sell their old appliances.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="relative">
                    <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search by customer name/phone..." onChange={(e) => debouncedSearch(e.target.value)} className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div className="relative">
                    <Filter className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select value={filters.status} onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))} className="pl-10 pr-4 appearance-none w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500">
                        <option value="">All Statuses</option>
                        {statusOptions.map(status => (<option key={status} value={status}>{status.replace('_', ' ')}</option>))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <TableSkeleton />
            ) : requests.length > 0 ? (
                <SellRequestsTable requests={requests} />
            ) : (
                <EmptyState />
            )}
        </div>
    );
}