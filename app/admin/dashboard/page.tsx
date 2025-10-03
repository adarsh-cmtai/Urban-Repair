'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminDashboardStats } from '@/services/adminService';
import { Calendar, Wrench, Users, IndianRupee, AlertCircle, Clock, ArrowRight, User, Inbox, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Skeleton Components for loading state
function StatCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse border border-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-4 w-36 bg-slate-200 rounded"></div>
                    <div className="h-10 w-20 bg-slate-300 rounded mt-2"></div>
                </div>
                <div className="w-14 h-14 bg-slate-200 rounded-full"></div>
            </div>
        </div>
    );
}

function ListSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
                    <div>
                        <div className="h-5 w-40 bg-slate-200 rounded"></div>
                        <div className="h-4 w-48 bg-slate-200 rounded mt-1.5"></div>
                    </div>
                    <div className="h-8 w-20 bg-slate-300 rounded-md"></div>
                </div>
            ))}
        </div>
    );
}

// Re-designed StatCard
function StatCard({ title, value, icon: Icon, colorClass, link }: { title: string, value: string | number, icon: React.ElementType, colorClass: string, link: string }) {
    const colorVariants = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-white to-blue-50' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-white to-orange-50' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-white to-purple-50' },
        green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-white to-green-50' },
        teal: { bg: 'bg-teal-100', text: 'text-teal-600', gradient: 'from-white to-teal-50' },
    };
    const variant = colorVariants[colorClass as keyof typeof colorVariants] || colorVariants.blue;

    return (
        <Link href={link} className={`group block p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${variant.gradient}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-4xl font-extrabold text-slate-800 mt-1">{value}</p>
                </div>
                <div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 ${variant.bg}`}>
                    <Icon className={`w-7 h-7 ${variant.text}`} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-400 group-hover:text-red-600 transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
        </Link>
    );
}

// Empty State Component
function EmptyState({ icon: Icon, title, message }: { icon: React.ElementType, title: string, message: string }) {
    return (
        <div className="text-center py-12 px-6">
            <Icon className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{message}</p>
        </div>
    );
}

export default function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setIsLoading(true);
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

    const getServiceName = (booking: any) => booking.items?.map((item: any) => item.serviceName).join(', ') || booking.serviceType || 'Unknown Service';

    const statCards = [
        { title: 'New Bookings Today', value: dashboardData?.stats.newBookingsToday ?? 0, icon: Calendar, colorClass: 'blue', link: '/admin/bookings' },
        { title: 'Pending Assignments', value: dashboardData?.stats.pendingAssignments ?? 0, icon: AlertCircle, colorClass: 'orange', link: '/admin/bookings?status=Pending' },
        { title: 'Jobs In-Progress', value: dashboardData?.stats.jobsInProgress ?? 0, icon: Clock, colorClass: 'purple', link: '/admin/bookings?status=InProgress' },
        { title: 'Completed Today', value: dashboardData?.stats.completedToday ?? 0, icon: Wrench, colorClass: 'green', link: '/admin/bookings?status=Completed' },
        { title: 'Earnings Today', value: `₹${(dashboardData?.stats.totalEarningsToday || 0).toLocaleString()}`, icon: IndianRupee, colorClass: 'teal', link: '/admin/reports' },
    ];

    if (isLoading) {
        return (
             <div className="space-y-8">
                <div>
                    <h1 className="font-heading text-4xl font-extrabold text-slate-800">Dashboard</h1>
                    <p className="mt-2 text-slate-500">Loading latest stats and updates...</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {[...Array(5)].map((_, i) => <StatCardSkeleton key={i} />)}
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"><ListSkeleton /></div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"><ListSkeleton /></div>
                 </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Welcome back, {user?.name || 'Admin'}!</h1>
                <p className="mt-2 text-slate-500">Here's your business snapshot for {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {statCards.map(card => <StatCard key={card.title} {...card} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-heading text-xl font-bold text-slate-800 mb-4">Latest Pending Bookings</h3>
                    {dashboardData?.latestPendingBookings.length > 0 ? (
                        <ul className="space-y-3">
                            {dashboardData.latestPendingBookings.map((booking: any) => (
                                <li key={booking._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{booking.customerId?.name}</p>
                                            <p className="text-sm text-slate-500 truncate">{getServiceName(booking)}</p>
                                        </div>
                                    </div>
                                    <Link href={`/admin/bookings/${booking._id}`} className="ml-4 text-sm font-semibold text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                        Assign
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyState icon={CheckCircle} title="All Caught Up!" message="No pending bookings right now." />
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-heading text-xl font-bold text-slate-800 mb-4">Ongoing Jobs</h3>
                    {dashboardData?.ongoingJobs.length > 0 ? (
                        <ul className="space-y-3">
                            {dashboardData.ongoingJobs.map((job: any) => (
                                <li key={job._id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-start gap-3">
                                        <Wrench className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{getServiceName(job)} for {job.customerId?.name}</p>
                                            <p className="text-sm text-slate-500">Assigned to: <span className="font-medium text-indigo-600">{job.technicianId?.name}</span></p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyState icon={Inbox} title="No Ongoing Jobs" message="Assign a pending booking to get started." />
                    )}
                </div>
            </div>
        </div>
    );
}