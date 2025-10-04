'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerBookings } from '@/services/customerService';
import { BookingCard } from '@/components/customer/BookingCard';
import { BookingCardSkeleton } from '@/components/customer/BookingCardSkeleton';
import { BookingEmptyState } from '@/components/customer/BookingEmptyState';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const tabs = [
    { name: 'Upcoming', status: 'upcoming', icon: Clock },
    { name: 'Completed', status: 'Completed', icon: CheckCircle },
    { name: 'Cancelled', status: 'Cancelled', icon: XCircle },
];

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function MyBookingsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token) return;
            setIsLoading(true);
            try {
                const response = await getCustomerBookings(activeTab, token);
                setBookings(response.data);
            } catch (error) {
                console.error("Failed to fetch bookings");
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [token, activeTab]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">My Bookings</h1>
                <p className="mt-2 text-slate-500">Track your upcoming, completed, and cancelled service requests.</p>
            </div>
            
            <div className="relative bg-slate-100 p-1.5 rounded-xl flex space-x-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.status)}
                        className={`relative flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-red-500 ${
                            activeTab === tab.status ? 'text-red-600' : 'text-slate-600 hover:text-slate-800'
                        }`}
                    >
                        {activeTab === tab.status && (
                            <motion.div
                                layoutId="active-tab-pill"
                                className="absolute inset-0 z-0 bg-white shadow-sm"
                                style={{ borderRadius: 8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <tab.icon className="w-4 h-4" />
                            {tab.name}
                        </span>
                    </button>
                ))}
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {isLoading ? (
                            <>
                                <BookingCardSkeleton />
                                <BookingCardSkeleton />
                                <BookingCardSkeleton />
                                <BookingCardSkeleton />
                            </>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking: any) => <BookingCard key={booking._id} booking={booking} />)
                        ) : (
                            <div className="lg:col-span-2">
                                <BookingEmptyState />
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}