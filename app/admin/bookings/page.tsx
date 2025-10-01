'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminBookings, getAllTechnicians, assignTechnician, updateBookingStatus } from '@/services/adminService';
import { BookingsTable } from '@/components/admin/bookings/BookingsTable';
import { AssignTechnicianModal } from '@/components/admin/bookings/AssignTechnicianModal';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Booking Management</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by customer name/phone..."
                        onChange={(e) => debouncedSearch(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-10"
                    />
                </div>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full rounded-md border-gray-300"
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                 <select
                    value={filters.technicianId}
                    onChange={(e) => setFilters(prev => ({ ...prev, technicianId: e.target.value }))}
                    className="w-full rounded-md border-gray-300"
                >
                    <option value="">All Technicians</option>
                    {technicians.map((tech: any) => <option key={tech._id} value={tech._id}>{tech.name}</option>)}
                </select>
            </div>

            {isLoading ? (
                 <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>
            ) : (
                <BookingsTable bookings={bookings} onAssignClick={handleAssignClick} onStatusUpdate={handleStatusUpdate} />
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