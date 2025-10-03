'use client';

import { useState, FormEvent } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { submitBookingReview } from '@/services/customerService';

interface ReviewFormProps {
    bookingId: string;
    token: string;
    onSubmitSuccess: () => void;
}

export function ReviewForm({ bookingId, token, onSubmitSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast.error('Please select a star rating.');
            return;
        }
        setIsLoading(true);

        try {
            await toast.promise(
                submitBookingReview(bookingId, { rating, comment }, token),
                {
                    loading: 'Submitting your review...',
                    success: 'Thank you for your feedback!',
                    error: (err) => err.response?.data?.message || 'Failed to submit review.',
                }
            );
            onSubmitSuccess();
        } catch (error) {
            // Toast promise already handles the error toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="font-semibold text-neutral-700">Your Rating</label>
                <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-8 h-8 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill={rating >= star ? 'currentColor' : 'none'}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="comment" className="font-semibold text-neutral-700">Your Feedback (Optional)</label>
                <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading || rating === 0}
                className="w-full bg-brand-red text-white font-semibold py-2 px-4 rounded-lg flex justify-center items-center disabled:bg-red-300"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit Review'}
            </button>
        </form>
    );
}