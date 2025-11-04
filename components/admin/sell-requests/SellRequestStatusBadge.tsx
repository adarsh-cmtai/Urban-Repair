// File: src/components/admin/sell-requests/SellRequestStatusBadge.tsx

import { Clock, UserCheck, Wrench, Tag, CheckCircle, XCircle, Truck, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const statusConfig: { [key: string]: { icon: React.ElementType; className: string; label: string } } = {
  Pending: { icon: Clock, className: 'bg-orange-100 text-orange-700', label: 'Pending' },
  Inspection_Assigned: { icon: UserCheck, className: 'bg-blue-100 text-blue-700', label: 'Inspection Assigned' },
  Inspected: { icon: Wrench, className: 'bg-indigo-100 text-indigo-700', label: 'Inspected' },
  Offer_Made: { icon: Tag, className: 'bg-yellow-100 text-yellow-700', label: 'Offer Made' },
  Offer_Accepted: { icon: CheckCircle, className: 'bg-teal-100 text-teal-700', label: 'Offer Accepted' },
  Offer_Declined: { icon: XCircle, className: 'bg-slate-100 text-slate-600', label: 'Offer Declined' },
  Pickup_Assigned: { icon: Truck, className: 'bg-cyan-100 text-cyan-700', label: 'Pickup Assigned' },
  Completed: { icon: CheckCircle, className: 'bg-green-100 text-green-700', label: 'Completed' },
  Cancelled: { icon: XCircle, className: 'bg-red-100 text-red-700', label: 'Cancelled' },
  default: { icon: HelpCircle, className: 'bg-slate-100 text-slate-600', label: 'Unknown' },
};

export function SellRequestStatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.default;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}