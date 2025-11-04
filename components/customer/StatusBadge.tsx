// src/components/customer/StatusBadge.tsx

import { Clock, UserCheck, Wrench, CheckCircle, XCircle, CalendarClock, HelpCircle, Search, Tag, HandCoins, Truck, PackageCheck, Ban } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const statusConfig: { [key: string]: { icon: React.ElementType; className: string; text: string; } } = {
  Pending: { icon: Clock, className: 'bg-orange-100 text-orange-700', text: 'Pending' },
  Assigned: { icon: UserCheck, className: 'bg-blue-100 text-blue-700', text: 'Assigned' },
  InProgress: { icon: Wrench, className: 'bg-purple-100 text-purple-700', text: 'In Progress' },
  Completed: { icon: CheckCircle, className: 'bg-green-100 text-green-700', text: 'Completed' },
  Cancelled: { icon: XCircle, className: 'bg-red-100 text-red-700', text: 'Cancelled' },
  Rescheduled: { icon: CalendarClock, className: 'bg-yellow-100 text-yellow-700', text: 'Rescheduled' },
  
  Inspection_Assigned: { icon: Search, className: 'bg-cyan-100 text-cyan-700', text: 'Inspection Assigned' },
  Inspected: { icon: PackageCheck, className: 'bg-indigo-100 text-indigo-700', text: 'Inspected' },
  Offer_Made: { icon: Tag, className: 'bg-lime-100 text-lime-700', text: 'Offer Made' },
  Offer_Accepted: { icon: HandCoins, className: 'bg-emerald-100 text-emerald-700', text: 'Offer Accepted' },
  Offer_Declined: { icon: Ban, className: 'bg-rose-100 text-rose-700', text: 'Offer Declined' },
  Pickup_Assigned: { icon: Truck, className: 'bg-fuchsia-100 text-fuchsia-700', text: 'Pickup Assigned' },
  
  default: { icon: HelpCircle, className: 'bg-slate-100 text-slate-600', text: 'Unknown' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { ...statusConfig.default, text: status };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {status === 'InProgress' ? (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
        </span>
      ) : (
        <Icon className="w-3.5 h-3.5" />
      )}
      {config.text}
    </span>
  );
}