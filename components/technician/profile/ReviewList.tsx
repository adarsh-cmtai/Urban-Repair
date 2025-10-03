'use client';

import { Star, MessageSquare } from 'lucide-react';

const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 1) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
};

export function ReviewList({ reviews }: { reviews: any[] }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No Reviews Yet</h3>
                <p className="mt-1 text-sm text-gray-500">Your customer reviews will appear here once you complete jobs.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map(reviewItem => (
                <div key={reviewItem._id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-neutral-800">
                                {reviewItem.items?.[0]?.serviceName || reviewItem.serviceType}
                            </p>
                            <p className="text-sm text-neutral-500">
                                from {reviewItem.customerId?.name}
                            </p>
                        </div>
                        <p className="text-xs text-neutral-500">{formatRelativeDate(reviewItem.updatedAt)}</p>
                    </div>
                    <div className="flex items-center my-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < reviewItem.review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor"/>
                        ))}
                    </div>
                    {reviewItem.review.comment && (
                         <p className="text-neutral-600 italic">"{reviewItem.review.comment}"</p>
                    )}
                </div>
            ))}
        </div>
    );
}