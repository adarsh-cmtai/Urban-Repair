'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, User, LogOut, PlusCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', href: '/customer', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/customer/bookings', icon: Package },
  // { name: 'Book a Service', href: '/customer/book-service', icon: PlusCircle },
  { name: 'My Profile', href: '/customer/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have been logged out.');
    router.push('/login');
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <h1 className="text-2xl font-montserrat font-bold text-brand-red">UrbanRepair</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      ${pathname === item.href
                        ? 'bg-red-100 text-brand-red'
                        : 'text-neutral-600 hover:text-brand-red hover:bg-red-100'}
                      group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                    `}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
             <div className="border-t border-gray-200 pt-4">
               <div className="flex items-center gap-x-3">
                 <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-brand-red font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                 </div>
                 <div className='flex-1'>
                    <p className="text-sm font-semibold text-neutral-800">{user?.name}</p>
                    <p className="text-xs text-neutral-500">{user?.email}</p>
                 </div>
               </div>
               <button
                  onClick={handleLogout}
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full text-neutral-600 hover:text-brand-red hover:bg-red-100 mt-4"
                >
                  <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
                  Logout
                </button>
             </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}