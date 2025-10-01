'use client';

import { Star, CheckCircle } from 'lucide-react';

export function PerformanceStats({ rating, totalReviews }: { rating: number, totalReviews: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
            <div className="bg-slate-50 p-6 rounded-lg border border-gray-200 text-center">
                <Star className="mx-auto h-10 w-10 text-yellow-400" fill="currentColor"/>
                <p className="mt-3 text-3xl font-bold text-neutral-800">{rating.toFixed(1)}</p>
                <p className="text-sm font-medium text-neutral-500">Average Rating</p>
            </div>
             <div className="bg-slate-50 p-6 rounded-lg border border-gray-200 text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-green-500"/>
                <p className="mt-3 text-3xl font-bold text-neutral-800">{totalReviews}</p>
                <p className="text-sm font-medium text-neutral-500">Total Jobs Rated</p>
            </div>
        </div>
    );
}