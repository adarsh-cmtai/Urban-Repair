'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerBookings } from '@/services/customerService';
import { BookingCard } from '@/components/customer/BookingCard';
import { BookingCardSkeleton } from '@/components/customer/BookingCardSkeleton';
import { BookingEmptyState } from '@/components/customer/BookingEmptyState';

const tabs = [
    { name: 'Upcoming', status: 'upcoming' },
    { name: 'Completed', status: 'Completed' },
    { name: 'Cancelled', status: 'Cancelled' },
];

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
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">My Bookings</h1>
            <div>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.status)}
                                className={`${
                                    activeTab === tab.status
                                    ? 'border-brand-red text-brand-red'
                                    : 'border-transparent text-neutral-500 hover:border-gray-300 hover:text-neutral-700'
                                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isLoading ? (
                    <>
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                    </>
                ) : (
                    <>
                        {bookings.length > 0 ? (
                            bookings.map((booking: any) => <BookingCard key={booking._id} booking={booking} />)
                        ) : (
                            <BookingEmptyState />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}