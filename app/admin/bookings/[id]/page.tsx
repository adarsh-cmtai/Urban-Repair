'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminBookingById } from '@/services/adminService';
import { 
    Loader2, User, Phone, MapPin, Wrench, Calendar, Clock, 
    IndianRupee, MessageSquare, ArrowLeft, CreditCard, Camera, FileText, Star 
} from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import Link from 'next/link';

const InfoBlock = ({ icon: Icon, label, value }: { icon: any, label: string, value: any }) => (
    <div>
        <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Icon className="w-4 h-4 text-gray-400" /> {label}
        </dt>
        <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
    </div>
);

const ImagePlaceholder = ({ label }: { label: string }) => (
    <div className="aspect-video w-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <Camera className="h-10 w-10 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-500">{label}</span>
    </div>
);

export default function AdminBookingDetailsPage() {
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    useEffect(() => {
        if (!id || !token) return;
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const response = await getAdminBookingById(id, token);
                setBooking(response.data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [id, token]);
    
    if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 className="w-12 h-12 animate-spin text-brand-red" /></div>;
    if (!booking) return <p>Booking not found.</p>;

    const fullAddress = `${booking.address.street}, ${booking.address.city}, ${booking.address.state} ${booking.address.zipCode}`;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                 <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Booking #{booking.bookingId || booking._id.slice(-6).toUpperCase()}</h1>
                <StatusBadge status={booking.status} />
            </div>
            
            {booking.review && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Customer Feedback</h3>
                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-5 h-5 ${i < booking.review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor"/>
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-600">({booking.review.rating} out of 5)</span>
                    </div>
                    {booking.review.comment && <p className="text-neutral-600 italic bg-gray-50 p-3 rounded-md">"{booking.review.comment}"</p>}
                </div>
            )}

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Service Details</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                            <InfoBlock icon={Wrench} label="Service(s)" value={
                                booking.items ? booking.items.map((i:any) => i.subServiceName).join(', ') : `${booking.serviceType} - ${booking.applianceType}`
                            } />
                            <InfoBlock icon={Calendar} label="Scheduled Date" value={new Date(booking.preferredDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
                            <InfoBlock icon={Clock} label="Time Slot" value={booking.timeSlot} />
                            { booking.problemDescription && <InfoBlock icon={MessageSquare} label="Problem" value={booking.problemDescription.join(', ')} /> }
                        </dl>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Technician's Report</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Before Service Photo</h4>
                                {booking.beforeServiceImage ? (
                                    <Link href={booking.beforeServiceImage} target="_blank"><img src={booking.beforeServiceImage} alt="Before service" className="aspect-video w-full object-cover rounded-lg"/></Link>
                                ) : (
                                    <ImagePlaceholder label="Not Uploaded"/>
                                )}
                            </div>
                             <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">After Service Photo</h4>
                                {booking.afterServiceImage ? (
                                     <Link href={booking.afterServiceImage} target="_blank"><img src={booking.afterServiceImage} alt="After service" className="aspect-video w-full object-cover rounded-lg"/></Link>
                                ) : (
                                    <ImagePlaceholder label="Not Uploaded"/>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 border-t pt-4">
                             <InfoBlock icon={FileText} label="Technician Notes" value={
                                 booking.technicianNotes ? <p className="whitespace-pre-wrap">{booking.technicianNotes}</p> : <span className="text-gray-400 font-normal">No notes provided.</span>
                             } />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Financial Summary</h3>
                         <dl className="space-y-4">
                             <InfoBlock icon={IndianRupee} label="Service Charge" value={booking.serviceCharge > 0 ? `₹${booking.serviceCharge.toLocaleString('en-IN')}` : <span className="text-gray-400 font-normal">Not Updated</span>} />
                             <InfoBlock icon={IndianRupee} label="Final Amount Paid" value={`₹${booking.finalAmount.toLocaleString('en-IN')}`} />
                             <InfoBlock icon={CreditCard} label="Payment Method" value={booking.paymentMethod} />
                             <InfoBlock icon={Wrench} label="Payment Status" value={booking.paymentStatus} />
                         </dl>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Customer Details</h3>
                        <dl className="space-y-4">
                            <InfoBlock icon={User} label="Name" value={booking.customerId.name} />
                            <InfoBlock icon={Phone} label="Contact" value={booking.customerId.phone} />
                            <InfoBlock icon={MapPin} label="Address" value={fullAddress} />
                        </dl>
                    </div>

                     <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-montserrat font-bold text-lg text-neutral-800 mb-4">Assigned Technician</h3>
                        {booking.technicianId ? (
                            <dl className="space-y-4">
                                <InfoBlock icon={User} label="Name" value={booking.technicianId.name} />
                                <InfoBlock icon={Phone} label="Contact" value={booking.technicianId.phone} />
                                <InfoBlock icon={Wrench} label="Specialization" value={booking.technicianId.specialization || 'N/A'} />
                            </dl>
                        ) : (
                            <p className="text-sm text-neutral-500">No technician assigned yet.</p>
                        )}
                    </div>
                </div>
             </div>
        </div>
    );
}