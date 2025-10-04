'use client';

import { Star, MessageSquare, Wrench } from 'lucide-react';

const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 1) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
};

// Empty State Component for when there are no reviews
function EmptyState() {
    return (
        <div className="text-center py-20 px-6 border-2 border-dashed border-slate-300 rounded-xl">
            <MessageSquare className="mx-auto h-16 w-16 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-800">No Reviews Yet</h3>
            <p className="mt-1 text-sm text-slate-500">Your customer reviews will appear here once you complete jobs and receive feedback.</p>
        </div>
    );
}

export function ReviewList({ reviews }: { reviews: any[] }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Customer Reviews</h2>
                <p className="mt-1 text-slate-500 mb-6">Feedback from customers on your completed services.</p>
                <div className="border-t border-slate-200 pt-6">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Customer Reviews</h2>
                <p className="mt-1 text-slate-500">Feedback from customers on your completed services.</p>
            </div>
            <div className="border-t border-slate-200 pt-6 space-y-6">
                {reviews.map(reviewItem => {
                    const serviceName = reviewItem.items?.[0]?.serviceName || reviewItem.serviceType || 'A service';
                    const customerName = reviewItem.customerId?.name || 'A customer';

                    return (
                        <div key={reviewItem._id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                                        {customerName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{customerName}</p>
                                        <p className="text-xs text-slate-500">{formatRelativeDate(reviewItem.updatedAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < reviewItem.review.rating ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor"/>
                                    ))}
                                </div>
                            </div>

                            {reviewItem.review.comment && (
                                <blockquote className="mt-4 p-4 bg-slate-50 border-l-4 border-red-200 text-slate-600 italic rounded-r-lg">
                                    "{reviewItem.review.comment}"
                                </blockquote>
                            )}
                            
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <Wrench className="w-4 h-4 text-slate-400"/>
                                    Reviewed for: <span className="font-medium text-slate-700">{serviceName}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}