'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminBookings, getAllTechnicians } from '@/services/adminService';
import { BookingsTable } from '@/components/admin/bookings/BookingsTable';
import { AssignTechnicianModal } from '@/components/admin/bookings/AssignTechnicianModal';
import { Loader2, Search, Filter, Wrench, Inbox } from 'lucide-react';

// Skeleton Component for a better loading experience
function TableSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="animate-pulse">
                <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-slate-50 rounded-t-lg">
                    <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="space-y-2 mt-2 p-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-6 gap-4 items-center">
                            <div className="h-5 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-5 bg-slate-200 rounded"></div>
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

// Empty State Component
function EmptyState() {
    return (
        <div className="bg-white text-center py-20 px-6 rounded-xl shadow-sm border border-slate-200">
            <Inbox className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No Bookings Found</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or check back later.</p>
        </div>
    );
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [filters, setFilters] = useState({ status: '', technicianId: '', search: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const { token } = useSelector((state: RootState) => state.auth);

    const debouncedSearch = useMemo(() => {
        let timer: NodeJS.Timeout;
        return (searchTerm: string) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setFilters(prev => ({ ...prev, search: searchTerm }));
            }, 500);
        };
    }, []);
    
    const fetchBookings = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getAdminBookings(filters, token);
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAllTechnicians(token).then(res => setTechnicians(res.data));
        }
    }, [token]);

    useEffect(() => {
        fetchBookings();
    }, [token, filters]);
    
    const handleAssignClick = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsModalOpen(true);
    };

    const handleAssignSuccess = () => {
        fetchBookings();
        setIsModalOpen(false);
    };

    const handleStatusUpdate = () => {
        fetchBookings();
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Booking Management</h1>
                <p className="mt-2 text-slate-500">View, filter, and manage all customer service requests.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="relative">
                    <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search customer name/phone..."
                        onChange={(e) => debouncedSearch(e.target.value)}
                        className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div className="relative">
                    <Filter className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="pl-10 pr-4 appearance-none w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="relative">
                    <Wrench className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                        value={filters.technicianId}
                        onChange={(e) => setFilters(prev => ({ ...prev, technicianId: e.target.value }))}
                        className="pl-10 pr-4 appearance-none w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="">All Technicians</option>
                        {technicians.map((tech: any) => <option key={tech._id} value={tech._id}>{tech.name}</option>)}
                    </select>
                </div>
            </div>

            {isLoading ? (
                 <TableSkeleton />
            ) : bookings.length > 0 ? (
                <BookingsTable bookings={bookings} onAssignClick={handleAssignClick} onStatusUpdate={handleStatusUpdate} />
            ) : (
                <EmptyState />
            )}
            
            <AssignTechnicianModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bookingId={selectedBookingId}
                onAssignSuccess={handleAssignSuccess}
            />
        </div>
    );
}