'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getBookingDetails } from '@/services/customerService';
import { Loader2, User, Phone, MapPin, Wrench, IndianRupee, Star, Calendar, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { BookingStatusTracker } from '@/components/customer/BookingStatusTracker';
import { ReviewForm } from '@/components/customer/ReviewForm';
import { StatusBadge } from '@/components/customer/StatusBadge';

// Skeleton Loader for a premium loading experience
function BookingDetailsSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div>
                <div className="h-10 bg-slate-200 rounded w-3/4"></div>
                <div className="h-5 bg-slate-200 rounded w-1/4 mt-2"></div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border h-32"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-48"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-32"></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border h-32"></div>
            </div>
        </div>
    );
}

// Reusable component for displaying info rows
const InfoRow = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    </div>
);

export default function BookingDetailsPage() {
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const id = params.id as string;

    const fetchDetails = async () => {
        if (!id || !token) return;
        setIsLoading(true);
        try {
            const response = await getBookingDetails(id, token);
            setBooking(response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchDetails(); }, [id, token]);
    
    if (isLoading) return <BookingDetailsSkeleton />;
    if (!booking) return (
        <div className="text-center py-16">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-4 text-lg font-semibold text-red-700">Booking Not Found</h3>
            <p className="mt-1 text-sm text-red-500">The requested booking could not be found.</p>
        </div>
    );

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-extrabold text-slate-800">Booking Details</h1>
                    <p className="mt-1 text-slate-500 font-mono text-sm">ID: #{booking._id.slice(-6).toUpperCase()}</p>
                </div>
                <StatusBadge status={booking.status} />
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <BookingStatusTracker currentStatus={booking.status} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2 mb-6"><Wrench size={20} className="text-red-500"/> Service Information</h3>
                        <div className="space-y-4">
                            {booking.items?.map((item: any) => (
                                <div key={item._id} className="pb-4 border-b last:border-b-0">
                                    <InfoRow label="Service" value={item.serviceName} icon={Wrench}/>
                                    <div className="pl-9 mt-2">
                                        <p className="text-sm text-slate-500">Details</p>
                                        <p className="font-semibold text-slate-800">{item.subServiceName} (Qty: {item.quantity})</p>
                                    </div>
                                </div>
                            ))}
                             <InfoRow label="Address" value={`${booking.address.street}, ${booking.address.city}`} icon={MapPin} />
                             <InfoRow label="Scheduled Date" value={new Date(booking.preferredDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} icon={Calendar} />
                             <InfoRow label="Time Slot" value={booking.timeSlot} icon={Clock} />
                        </div>
                    </div>

                    {booking.technicianId ? (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2 mb-6"><User size={20} className="text-red-500"/> Assigned Technician</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-2xl">
                                    {booking.technicianId.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-2">
                                    <InfoRow label="Name" value={booking.technicianId.name} icon={User}/>
                                    <InfoRow label="Contact" value={booking.technicianId.phone} icon={Phone}/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                            <User size={24} className="mx-auto text-slate-400 mb-2"/>
                            <h3 className="font-heading font-bold text-lg text-slate-700">Technician Not Assigned</h3>
                            <p className="text-sm text-slate-500 mt-1">A technician will be assigned to you shortly.</p>
                        </div>
                    )}
                </div>
                
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2 mb-6"><IndianRupee size={20} className="text-red-500"/> Payment Summary</h3>
                        <div className="flex items-center justify-between text-lg">
                           <span className="font-semibold text-slate-600">Total Paid</span>
                           <span className="font-bold text-2xl text-green-600">₹{booking.finalAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {booking.status === 'Completed' && booking.review && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                            <h3 className="font-heading font-bold text-xl text-yellow-800 flex items-center gap-2 mb-4"><MessageSquare size={20}/> Your Review</h3>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < booking.review.rating ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor"/>)}
                            </div>
                            {booking.review.comment && <p className="text-yellow-700 italic text-sm">"{booking.review.comment}"</p>}
                        </div>
                    )}
                </div>
            </div>

            {booking.status === 'Completed' && !booking.review && (
                <div className="mt-8 pt-8 border-t border-slate-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
                    <h3 className="font-heading font-bold text-2xl text-slate-800 text-center">How was your service?</h3>
                    <p className="text-slate-500 text-center mb-6">Your feedback helps us improve.</p>
                    <ReviewForm bookingId={booking._id} token={token!} onSubmitSuccess={fetchDetails} />
                </div>
            )}
        </div>
    );
}