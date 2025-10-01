'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateBookingStatus } from '@/services/adminService';
import { toast } from 'react-hot-toast';

interface Props {
    bookings: any[];
    onAssignClick: (bookingId: string) => void;
    onStatusUpdate: () => void;
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');
const allowedStatuses = ['Pending', 'Confirmed', 'Assigned', 'InProgress', 'Completed', 'Cancelled', 'Rescheduled'];

export function BookingsTable({ bookings, onAssignClick, onStatusUpdate }: Props) {
    const { token } = useSelector((state: RootState) => state.auth);

    const handleStatusChange = async (bookingId: string, newStatus: string) => {
        const promise = updateBookingStatus(bookingId, newStatus, token!);
        toast.promise(promise, {
            loading: 'Updating status...',
            success: 'Status updated!',
            error: 'Failed to update status.',
        });
        await promise;
        onStatusUpdate();
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{booking.customerId?.name}</div>
                                <div className="text-sm text-gray-500">{booking.customerId?.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{booking.serviceType || booking.items?.map((i:any) => i.serviceName).join(', ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(booking.preferredDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.technicianId?.name || <span className="text-red-500">Not Assigned</span>}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    className="rounded-md border-gray-300 text-sm"
                                >
                                    {allowedStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <Link href={`/admin/bookings/${booking._id}`} className="text-indigo-600 hover:text-indigo-900">View</Link>
                                {booking.status === 'Pending' && (
                                    <button onClick={() => onAssignClick(booking._id)} className="text-green-600 hover:text-green-900">Assign</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}