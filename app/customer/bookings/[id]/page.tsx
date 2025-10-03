'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getBookingDetails } from '@/services/customerService';
import { Loader2, User, Phone, MapPin, Wrench, IndianRupee, Star, Calendar, Clock, MessageSquare } from 'lucide-react';
import { BookingStatusTracker } from '@/components/customer/BookingStatusTracker';
import { ReviewForm } from '@/components/customer/ReviewForm';
import { StatusBadge } from '@/components/customer/StatusBadge';

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

    useEffect(() => {
        fetchDetails();
    }, [id, token]);
    
    if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>;
    if (!booking) return <p>Booking not found.</p>;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="flex items-center justify-between">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Booking Details</h1>
                <StatusBadge status={booking.status} />
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="mb-12">
                    <BookingStatusTracker currentStatus={booking.status} />
                </div>

                {booking.status === 'Completed' && booking.review && (
                    <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-bold text-lg text-neutral-800 mb-2">Your Review</h3>
                        <div className="flex items-center mb-2">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < booking.review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor"/>
                             ))}
                        </div>
                        {booking.review.comment && <p className="text-neutral-600 italic">"{booking.review.comment}"</p>}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800">Service Information</h3>
                        
                        {booking.items && booking.items.length > 0 ? (
                            <div>
                                {booking.items.map((item: any) => (
                                    <div key={item._id} className="mb-3 pb-3 border-b last:border-b-0">
                                        <p><strong className="text-neutral-600">Service:</strong> {item.serviceName}</p>
                                        <p><strong className="text-neutral-600">Details:</strong> {item.subServiceName} (Qty: {item.quantity})</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <p><strong className="text-neutral-600">Service:</strong> {booking.serviceType} - {booking.applianceType}</p>
                                <p><strong className="text-neutral-600">Problem:</strong> {booking.problemDescription?.join(', ') || 'N/A'}</p>
                            </>
                        )}
                        
                        <p><strong className="text-neutral-600">Address:</strong> {`${booking.address.street}, ${booking.address.city}`}</p>
                    </div>
                     {booking.technicianId ? (
                         <div className="space-y-4">
                            <h3 className="font-montserrat font-bold text-lg text-neutral-800">Assigned Technician</h3>
                            <p className="flex items-center gap-2"><User className="w-4 h-4 text-brand-red"/> {booking.technicianId.name}</p>
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-red"/> {booking.technicianId.phone}</p>
                         </div>
                     ) : (
                        <div>
                             <h3 className="font-montserrat font-bold text-lg text-neutral-800">Technician Not Assigned</h3>
                             <p className="text-sm text-neutral-500">A technician will be assigned to you shortly.</p>
                        </div>
                     )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                     <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Payment Details</h3>
                     <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold text-neutral-600">Total Amount Paid</span>
                        <span className="font-bold text-green-600 flex items-center gap-1"><IndianRupee size={18}/> {booking.finalAmount.toLocaleString('en-IN')}</span>
                     </div>
                </div>

                 {booking.status === 'Completed' && !booking.review && (
                     <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800">Rate Your Service</h3>
                         <ReviewForm bookingId={booking._id} token={token!} onSubmitSuccess={fetchDetails} />
                     </div>
                 )}
            </div>
        </div>
    );
}