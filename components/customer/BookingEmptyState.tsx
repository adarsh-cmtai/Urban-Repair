import { PackageOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BookingEmptyState() {
    return (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border lg:col-span-2">
            <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Bookings Found</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't made any bookings in this category yet.</p>
            <div className="mt-6">
                <Link href="/services">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                    >
                        Book a New Service
                        <ArrowRight className="w-4 h-4"/>
                    </button>
                </Link>
            </div>
        </div>
    );
}