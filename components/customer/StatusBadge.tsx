import { Clock, UserCheck, Wrench, CheckCircle, XCircle, CalendarClock, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const statusConfig: { [key: string]: { icon: React.ElementType; className: string; } } = {
  Pending: { icon: Clock, className: 'bg-orange-100 text-orange-700' },
  Assigned: { icon: UserCheck, className: 'bg-blue-100 text-blue-700' },
  InProgress: { icon: Wrench, className: 'bg-purple-100 text-purple-700' },
  Completed: { icon: CheckCircle, className: 'bg-green-100 text-green-700' },
  Cancelled: { icon: XCircle, className: 'bg-red-100 text-red-700' },
  Rescheduled: { icon: CalendarClock, className: 'bg-yellow-100 text-yellow-700' },
  default: { icon: HelpCircle, className: 'bg-slate-100 text-slate-600' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.default;
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
      {status}
    </span>
  );
}