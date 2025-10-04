export function BookingCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col animate-pulse">
            
            {/* Header Skeleton */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                    <div className="h-5 w-40 bg-slate-200 rounded"></div>
                    <div className="h-3 w-24 bg-slate-200 rounded mt-2"></div>
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            </div>

            {/* Details Skeleton */}
            <div className="flex-grow py-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex-shrink-0"></div>
                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex-shrink-0"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
                <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
            </div>
        </div>
    );
}