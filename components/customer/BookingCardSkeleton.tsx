export function BookingCardSkeleton() {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4 animate-pulse">
            <div className="flex justify-between items-start">
                <div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-2 h-10 w-full bg-gray-200 rounded-lg"></div>
        </div>
    );
}