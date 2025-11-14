'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { LayoutDashboard, Package, User, LogOut, PlusCircle, Wrench, Home, Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';

const navigation = [
  { name: 'Back to Home Page', href: '/', icon: Home },
  { name: 'Dashboard', href: '/customer', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/customer/bookings', icon: Package },
  { name: 'My Sell Requests', href: '/customer/sell-requests', icon: Tag },
  { name: 'My Profile', href: '/customer/profile', icon: User },
];

const sidebarVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

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
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 border-r border-slate-800 px-4 pb-4">
      <div className="flex h-20 shrink-0 items-center px-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-red-900/50">
            <img
              src="/Logo-2.jpg"
              alt="Urban Repair Expert Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <span className="font-heading text-xl font-bold text-white">
            Urban Repair<span className="text-red-500"> Expert</span>
          </span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <motion.ul
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              role="list"
              className="space-y-1"
            >
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <motion.li variants={itemVariants} key={item.name}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-customer-indicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-full"
                          transition={{ duration: 0.4, type: 'spring' }}
                        />
                      )}
                      <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </li>

          <li className="px-2 mt-4">
            <motion.div variants={itemVariants}>
              <Link href="/services" className="group w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/30 hover:bg-red-700 transition-colors">
                <PlusCircle className="w-5 h-5" />
                Book a New Service
              </Link>
            </motion.div>
          </li>

          <li className="mt-auto">
            <div className="border-t border-slate-800 pt-4 space-y-4">
              <Link href="/customer/profile" className="group flex items-center gap-x-3 rounded-md p-2 hover:bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-red-500 font-bold group-hover:bg-red-100 transition-colors">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-sm font-semibold text-slate-200 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                <LogOut className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-red-500 transition-colors" />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}