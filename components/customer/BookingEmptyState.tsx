import { PackageOpen, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function BookingEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-xl border-2 border-dashed border-slate-300 lg:col-span-2 min-h-[400px]">
            
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <PackageOpen className="h-10 w-10 text-slate-400" />
            </div>

            <h3 className="font-heading text-xl font-bold text-slate-800">No Bookings Found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                It looks like you don't have any bookings in this category yet. Ready to schedule your first service?
            </p>

            <div className="mt-8">
                <Link 
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all"
                >
                    <PlusCircle className="w-5 h-5"/>
                    Book a New Service
                    </Link>
            </div>
        </div>
    );
}