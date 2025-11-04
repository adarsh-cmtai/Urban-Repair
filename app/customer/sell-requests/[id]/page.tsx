// src/app/(customer)/customer/sell-requests/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getSellRequestDetails, respondToSellRequestOffer } from '@/services/customerService';
import { Loader2, AlertTriangle, User, Calendar, Clock, Tag, HandCoins, ThumbsDown, ThumbsUp, CheckCircle, Info } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import { toast } from 'react-hot-toast';

const InfoRow = ({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="font-semibold text-slate-800">{value}</p>
        </div>
    </div>
);

export default function SellRequestDetailsPage() {
    const [request, setRequest] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const id = params.id as string;

    const fetchDetails = async () => {
        if (!id || !token) return;
        setIsLoading(true);
        try {
            const response = await getSellRequestDetails(id, token);
            setRequest(response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchDetails(); }, [id, token]);
    
    const handleResponse = async (response: 'Accepted' | 'Declined') => {
        setIsActionLoading(true);
        try {
            await toast.promise(
                respondToSellRequestOffer(id, response, token!),
                {
                    loading: 'Submitting your response...',
                    success: `Offer ${response.toLowerCase()}!`,
                    error: 'Failed to submit response.'
                }
            );
            fetchDetails();
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>;
    if (!request) return (
        <div className="text-center py-16">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-4 text-lg font-semibold text-red-700">Request Not Found</h3>
            <p className="mt-1 text-sm text-red-500">The requested sell request could not be found.</p>
        </div>
    );

    const productName = `${request.buybackBrandId?.name} ${request.buybackCategoryId?.name}`;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-extrabold text-slate-800">{productName}</h1>
                    <p className="mt-1 text-slate-500 font-mono text-sm">ID: #{request.requestId}</p>
                </div>
                <StatusBadge status={request.status} />
            </div>

            {request.status === 'Offer_Made' && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-500">
                    <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2 mb-2"><HandCoins size={20} className="text-red-500"/> We have an offer for you!</h3>
                    <p className="text-slate-600 mb-4">Our team has inspected the details and we're pleased to offer you:</p>
                    <p className="text-5xl font-extrabold text-green-600 text-center py-4">
                        ₹{request.offerPrice.toLocaleString('en-IN')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button onClick={() => handleResponse('Accepted')} disabled={isActionLoading} className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 disabled:bg-slate-400">
                            {isActionLoading ? <Loader2 className="animate-spin"/> : <><ThumbsUp size={18}/> Accept Offer</>}
                        </button>
                        <button onClick={() => handleResponse('Declined')} disabled={isActionLoading} className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 disabled:bg-slate-400">
                             {isActionLoading ? <Loader2 className="animate-spin"/> : <><ThumbsDown size={18}/> Decline Offer</>}
                        </button>
                    </div>
                </div>
            )}
            
            {request.status === 'Offer_Accepted' && (
                 <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-lg">
                    <h3 className="font-bold text-lg flex items-center gap-2"><CheckCircle />Offer Accepted!</h3>
                    <p className="mt-2 text-sm">Thank you for accepting our offer. Our team will contact you shortly to schedule the pickup.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                    <h3 className="font-heading font-bold text-xl text-slate-800">Request Summary</h3>
                    <InfoRow icon={Tag} label="Product" value={productName} />
                    <InfoRow icon={Calendar} label="Inspection Date" value={new Date(request.inspectionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} />
                    <InfoRow icon={Clock} label="Inspection Time Slot" value={request.inspectionTimeSlot} />
                    <InfoRow icon={Info} label="Your Estimated Price" value={`₹${request.estimatedPrice.toLocaleString('en-IN')}`} />
                </div>

                {request.technicianId ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                        <h3 className="font-heading font-bold text-xl text-slate-800">Assigned Technician</h3>
                        <InfoRow icon={User} label="Name" value={request.technicianId.name} />
                        <InfoRow icon={User} label="Contact" value={request.technicianId.phone} />
                    </div>
                ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center flex flex-col justify-center">
                        <User size={24} className="mx-auto text-slate-400 mb-2"/>
                        <h3 className="font-heading font-bold text-lg text-slate-700">Technician Not Assigned</h3>
                        <p className="text-sm text-slate-500 mt-1">A technician for inspection will be assigned shortly.</p>
                    </div>
                )}
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-heading font-bold text-xl text-slate-800 mb-4">Product Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {request.productImages.map((url: string, index: number) => (
                        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt={`Product Image ${index + 1}`} className="w-full aspect-square object-cover rounded-md border-2 border-slate-200 hover:border-red-500 transition"/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}