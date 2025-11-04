// src/app/(customer)/customer/sell-requests/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerSellRequests } from '@/services/customerService';
import { Loader2, PackageOpen, PlusCircle, Tag, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/customer/StatusBadge';
import Link from 'next/link';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function SellRequestCard({ request }: { request: any }) {
    const productName = `${request.buybackBrandId?.name} ${request.buybackCategoryId?.name}`;
    return (
        <Link href={`/customer/sell-requests/${request._id}`} className="group block h-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                    <div>
                        <h3 className="font-heading font-bold text-lg text-slate-800">{productName}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">ID: #{request.requestId}</p>
                    </div>
                    <StatusBadge status={request.status} />
                </div>
                <div className="flex-grow py-5 space-y-3">
                    <p className="text-sm text-slate-500">
                        Requested on: <span className="font-semibold text-slate-700">{formatDate(request.createdAt)}</span>
                    </p>
                    <p className="text-sm text-slate-500">
                        Status: <span className="font-semibold text-slate-700">{request.status.replace('_', ' ')}</span>
                    </p>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-sm font-semibold text-red-600">View Details</p>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}

function CardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col animate-pulse">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                    <div className="h-5 w-40 bg-slate-200 rounded"></div>
                    <div className="h-3 w-24 bg-slate-200 rounded mt-2"></div>
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            </div>
            <div className="flex-grow py-5 space-y-4">
                <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-xl border-2 border-dashed border-slate-300 lg:col-span-2 min-h-[400px]">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <PackageOpen className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-800">No Sell Requests Found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                You haven't requested to sell any appliances yet.
            </p>
            <div className="mt-8">
                <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
                    <PlusCircle className="w-5 h-5"/>
                    Sell an Appliance
                </Link>
            </div>
        </div>
    );
}


export default function MySellRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) return;
            setIsLoading(true);
            try {
                const response = await getCustomerSellRequests(token);
                setRequests(response.data);
            } catch (error) {
                console.error("Failed to fetch sell requests");
                setRequests([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, [token]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">My Sell Requests</h1>
                <p className="mt-2 text-slate-500">Track the status of appliances you have listed for sale.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {isLoading ? (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                ) : requests.length > 0 ? (
                    requests.map((request: any) => <SellRequestCard key={request._id} request={request} />)
                ) : (
                    <div className="lg:col-span-2">
                        <EmptyState />
                    </div>
                )}
            </div>
        </div>
    );
}