import { Check } from 'lucide-react';

const statuses = ['Confirmed', 'Assigned', 'InProgress', 'Completed'];

export function BookingStatusTracker({ currentStatus }: { currentStatus: string }) {
    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {statuses.map((status, statusIdx) => (
                    <li key={status} className={`relative ${statusIdx !== statuses.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                        {statusIdx <= currentIndex ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-brand-red" />
                                </div>
                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-red hover:bg-red-700">
                                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                                </div>
                            </>
                        )}
                         <span className="absolute top-10 -ml-4 w-20 text-center text-xs text-neutral-600">{status}</span>
                    </li>
                ))}
            </ol>
        </nav>
    );
}