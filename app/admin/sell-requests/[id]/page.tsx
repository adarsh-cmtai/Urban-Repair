'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminSellRequestById, updateSellRequestStatus } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, ArrowLeft, User, Phone, MapPin, Calendar, Clock, Edit } from 'lucide-react';

export default function AdminSellRequestDetailsPage() {
    const [request, setRequest] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const fetchRequest = () => {
        if (!id || !token) return;
        setIsLoading(true);
        getAdminSellRequestById(id, token)
            .then(res => setRequest(res.data))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchRequest();
    }, [id, token]);
    
    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        if (!newStatus || newStatus === request.status) return;

        setIsUpdating(true);
        try {
            await toast.promise(
                updateSellRequestStatus(id, newStatus, token!),
                {
                    loading: 'Updating status...',
                    success: 'Status updated successfully!',
                    error: 'Failed to update status.'
                }
            );
            fetchRequest();
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>;
    if (!request) return <p>Request not found.</p>;

    const productName = `${request.buybackBrandId?.name} ${request.buybackCategoryId?.name} (${request.buybackCapacityId?.name})`;
    const fullAddress = `${request.address.street}, ${request.address.city}, ${request.address.state} ${request.address.zipCode}`;
    const statusOptions = ['Pending', 'Contacted', 'Negotiating', 'Deal_Won', 'Deal_Lost', 'Completed', 'Cancelled'];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-slate-100"><ArrowLeft /></button>
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-slate-800">{productName}</h1>
                        <p className="text-sm text-slate-500 font-mono">ID: {request.requestId}</p>
                    </div>
                </div>
                <div className="relative">
                     <select 
                        value={request.status} 
                        onChange={handleStatusChange} 
                        disabled={isUpdating}
                        className="pl-3 pr-8 py-1.5 text-sm font-semibold rounded-full border-2 border-slate-300 appearance-none bg-white focus:ring-red-500 focus:border-red-500 disabled:bg-slate-100"
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status.replace('_', ' ')}</option>
                        ))}
                    </select>
                    <Edit size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4">Pricing Details</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <dt className="text-sm text-slate-500">Base Price</dt>
                            <dd className="text-xl font-bold text-slate-800">₹{request.buybackBrandId.basePrice?.toLocaleString('en-IN')}</dd>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <dt className="text-sm text-green-700">Customer Estimated Price</dt>
                            <dd className="text-2xl font-bold text-green-600">₹{request.estimatedPrice?.toLocaleString('en-IN')}</dd>
                        </div>
                    </dl>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4">Customer & Address Details</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                        <div><dt className="flex items-center gap-2 text-sm text-slate-500"><User size={14} />Customer</dt><dd className="font-semibold">{request.customerId.name}</dd></div>
                        <div><dt className="flex items-center gap-2 text-sm text-slate-500"><Phone size={14} />Contact</dt><dd className="font-semibold">{request.customerId.phone}</dd></div>
                        <div className="sm:col-span-2"><dt className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={14} />Address</dt><dd className="font-semibold">{fullAddress}</dd></div>
                        <div><dt className="flex items-center gap-2 text-sm text-slate-500"><Calendar size={14} />Requested Date</dt><dd className="font-semibold">{new Date(request.inspectionDate).toLocaleDateString('en-GB')}</dd></div>
                        <div><dt className="flex items-center gap-2 text-sm text-slate-500"><Clock size={14} />Time Slot</dt><dd className="font-semibold">{request.inspectionTimeSlot}</dd></div>
                    </dl>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4">Product Evaluation Details</h3>
                    <ul className="space-y-2 text-sm">
                        {request.evaluationData.map((item: any) => (
                            <li key={item.question} className="flex border-b pb-2 last:border-0">
                                <strong className="w-1/3 text-slate-600">{item.question}:</strong>
                                <span className="font-medium text-slate-800">{item.answer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-4">Uploaded Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {request.productImages.map((url: string) => (
                            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                                <img src={url} alt="Product" className="w-full aspect-square object-cover rounded-md border-2 border-slate-200 hover:border-red-500 transition" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}