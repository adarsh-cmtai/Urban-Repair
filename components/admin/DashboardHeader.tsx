// components/admin/DashboardHeader.tsx
'use client';
import { Menu } from 'lucide-react';

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </button>
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Header content like search bar or profile dropdown can go here */}
      </div>
    </div>
  );
}