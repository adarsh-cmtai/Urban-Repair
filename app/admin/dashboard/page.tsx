'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminDashboardStats } from '@/services/adminService';
import { Calendar, Wrench, Users, IndianRupee, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';

function StatCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded mt-2"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, link }: { title: string, value: string | number, icon: React.ElementType, color: string, link: string }) {
    return (
        <Link href={link}>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 hover:shadow-lg transition-shadow duration-300" style={{ borderColor: color }}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-3xl font-bold text-gray-800">{value}</p>
                    </div>
                    <div className="p-3 rounded-full" style={{ backgroundColor: `${color}1A`, color: color }}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                const response = await getAdminDashboardStats(token);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch admin dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const getServiceName = (booking: any) => {
        if (booking.items && booking.items.length > 0) {
            return booking.items.map((item: any) => item.serviceName).join(', ');
        }
        return booking.serviceType || 'Unknown Service';
    };

    const statCards = [
        { title: 'New Bookings Today', value: dashboardData?.stats.newBookingsToday ?? 0, icon: Calendar, color: '#3b82f6', link: '/admin/bookings' },
        { title: 'Pending Assignments', value: dashboardData?.stats.pendingAssignments ?? 0, icon: AlertCircle, color: '#f97316', link: '/admin/bookings?status=Pending' },
        { title: 'Jobs In-Progress', value: dashboardData?.stats.jobsInProgress ?? 0, icon: Clock, color: '#8b5cf6', link: '/admin/bookings?status=InProgress' },
        { title: 'Completed Today', value: dashboardData?.stats.completedToday ?? 0, icon: Wrench, color: '#22c55e', link: '/admin/bookings?status=Completed' },
        { title: 'Total Earnings Today', value: `₹${(dashboardData?.stats.totalEarningsToday || 0).toLocaleString()}`, icon: IndianRupee, color: '#10b981', link: '/admin/reports' },
    ];

    if (isLoading) {
        return (
             <div className="space-y-8">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Dashboard</h1>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {[...Array(5)].map((_, i) => <StatCardSkeleton key={i} />)}
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md h-64 animate-pulse"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-md h-64 animate-pulse"></div>
                 </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Dashboard</h1>
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {statCards.map(card => <StatCard key={card.title} {...card} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-montserrat text-lg font-bold text-neutral-800 mb-4">Latest Pending Bookings</h3>
                    {dashboardData?.latestPendingBookings.length > 0 ? (
                        <ul className="space-y-3">
                            {dashboardData.latestPendingBookings.map((booking: any) => (
                                <li key={booking._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100">
                                    <div>
                                        <p className="font-semibold text-gray-800">{booking.customerId?.name}</p>
                                        <p className="text-sm text-gray-500">{getServiceName(booking)}</p>
                                    </div>
                                    <Link href={`/admin/bookings/${booking._id}`}>
                                        <button className="text-sm font-semibold text-white bg-brand-red px-3 py-1 rounded-md hover:bg-red-700">Assign</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 mt-4 py-8">No pending bookings right now.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-montserrat text-lg font-bold text-neutral-800 mb-4">Ongoing Jobs</h3>
                    {dashboardData?.ongoingJobs.length > 0 ? (
                        <ul className="space-y-3">
                            {dashboardData.ongoingJobs.map((job: any) => (
                                <li key={job._id} className="p-3 bg-slate-50 rounded-lg">
                                    <p className="font-semibold text-gray-800">{getServiceName(job)} for {job.customerId?.name}</p>
                                    <p className="text-sm text-gray-500">Assigned to: <span className="font-medium text-indigo-600">{job.technicianId?.name}</span></p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 mt-4 py-8">No jobs are currently in progress.</p>
                    )}
                </div>
            </div>
        </div>
    );
}