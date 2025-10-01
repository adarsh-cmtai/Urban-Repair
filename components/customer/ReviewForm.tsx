import { useState, FormEvent } from 'react';
import { Star, Loader2 } from 'lucide-react';

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
        // Here you would call your submitBookingReview service function
        // For brevity, we'll assume it works and just call the success handler
        setIsLoading(true);
        setTimeout(() => {
            console.log({ bookingId, rating, comment, token });
            setIsLoading(false);
            onSubmitSuccess();
        }, 1000);
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
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading || rating === 0}
                className="w-full bg-brand-red text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-300 transition-colors flex justify-center items-center"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit Review'}
            </button>
        </form>
    );
}