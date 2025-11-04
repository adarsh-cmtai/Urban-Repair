'use client';

import Link from 'next/link';
import { SellRequestStatusBadge } from './SellRequestStatusBadge';

interface Props {
    requests: any[];
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

export function SellRequestsTable({ requests }: Props) {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Requested Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {requests.map((req) => (
                        <tr key={req._id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="font-semibold text-slate-800">{req.customerId?.name}</p>
                                <p className="text-sm text-slate-500">{req.customerId?.phone}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                {`${req.buybackBrandId?.name} ${req.buybackCategoryId?.name}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(req.inspectionDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><SellRequestStatusBadge status={req.status} /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link href={`/admin/sell-requests/${req._id}`} className="font-semibold text-red-600 hover:text-red-800">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}