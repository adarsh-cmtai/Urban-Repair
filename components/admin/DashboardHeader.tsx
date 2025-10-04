'use client';

import { useState, Fragment } from 'react';
import { Menu, Search, Bell, ChevronRight, UserCircle, Settings, LogOut, Wrench } from 'lucide-react';
import { Transition, Menu as HeadlessMenu } from '@headlessui/react';
import Link from 'next/link';

interface Props {
  onMenuClick: () => void;
}

// Dummy user data - replace with actual data from your auth state
const user = {
  name: 'Admin User',
  email: 'admin@urbanrepair.com',
};

// Dummy breadcrumbs - you would generate this based on the current page
const breadcrumbs = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Bookings', href: '/admin/bookings' },
];

export function DashboardHeader({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Hamburger menu for mobile */}
      <button type-="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-900/10 lg:hidden" />

      <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        {/* Breadcrumbs for desktop */}
        <div className="hidden lg:flex items-center text-sm font-semibold">
          <Link href="/admin/dashboard" className="text-slate-500 hover:text-red-600">Dashboard</Link>
          {/* {breadcrumbs.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1.5 text-slate-400" />
              <Link href={crumb.href} className={index === breadcrumbs.length - 1 ? "text-slate-800" : "text-slate-500 hover:text-red-600"}>
                {crumb.name}
              </Link>
            </div>
          ))} */}
        </div>
        
        {/* Spacer for mobile, pushes icons to the right */}
        <div className="lg:hidden"></div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Search Bar */}
          <div className="relative">
            {/* <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xs h-10 rounded-full border border-slate-300 bg-white pl-10 pr-4 text-sm focus:border-red-500 focus:ring-red-500"
            /> */}
          </div>

          {/* Notifications */}
          {/* <button type-="button" className="relative -m-2.5 p-2.5 text-slate-500 hover:text-slate-700">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button> */}
          
          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-900/10" />

          {/* Profile Dropdown */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button className="-m-1.5 flex items-center p-1.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:flex lg:items-center ml-3">
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
              </span>
            </HeadlessMenu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <HeadlessMenu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none">
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link href="/admin/bookings" className={`flex items-center gap-3 px-3 py-2 text-sm ${active ? 'bg-slate-100' : ''}`}>
                      <UserCircle className="h-5 w-5 text-slate-500" /> Bookings
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link href="/admin/catalog" className={`flex items-center gap-3 px-3 py-2 text-sm ${active ? 'bg-slate-100' : ''}`}>
                      <Settings className="h-5 w-5 text-slate-500" /> Service Catalog
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <div className="my-2 h-px bg-slate-200" />
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm ${active ? 'bg-slate-100' : ''}`}>
                      <LogOut className="h-5 w-5 text-slate-500" /> Log out
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>
        </div>
      </div>
    </header>
  );
}