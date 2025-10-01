import Link from 'next/link';
import { Calendar, Wrench } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-montserrat font-bold text-neutral-800 text-lg">{booking.serviceType} - {booking.applianceType}</h3>
          <p className="text-sm text-neutral-500">Booking ID: #{booking._id.slice(-6).toUpperCase()}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="flex items-center gap-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-red" />
          <span>{formatDate(booking.preferredDate)}</span>
        </div>
        {booking.technicianId && (
            <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brand-red" />
                <span>{booking.technicianId.name}</span>
            </div>
        )}
      </div>
      <Link href={`/customer/bookings/${booking._id}`}>
        <button className="w-full mt-2 bg-transparent border border-brand-red text-brand-red font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
            View Details
        </button>
      </Link>
    </div>
  );
}