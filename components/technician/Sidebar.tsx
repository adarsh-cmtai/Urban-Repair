'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { LayoutDashboard, History, User, LogOut, Wrench, Home } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';

const navigation = [
  {name:'Back to Home Page', href:'/', icon:Home},
  { name: 'Today\'s Jobs', href: '/technician', icon: LayoutDashboard },
  { name: 'Job History', href: '/technician/history', icon: History },
  { name: 'My Profile', href: '/technician/profile', icon: User },
];

const sidebarVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

function NavItem({ item, isActive }: { item: typeof navigation[0], isActive: boolean }) {
  const Icon = item.icon;
  return (
    <motion.li variants={itemVariants}>
      <Link
        href={item.href}
        className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="active-technician-indicator"
            className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-full"
            transition={{ duration: 0.4, type: 'spring' }}
          />
        )}
        <Icon
          className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
            isActive ? 'text-red-500' : 'text-slate-500 group-hover:text-slate-300'
          }`}
        />
        <span>{item.name}</span>
      </Link>
    </motion.li>
  );
}

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
    <div className="flex grow flex-col overflow-y-auto bg-slate-900 border-r border-slate-800">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-800">
        <Link href="/technician" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/50">
                <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-white">
                Technician Panel
            </span>
        </Link>
      </div>

      <div className="p-4 border-b border-slate-800">
        <Link href="/technician/profile" className="group flex items-center gap-x-3 rounded-md p-2 hover:bg-slate-800/50">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-red-500 font-bold text-xl group-hover:bg-red-100 transition-colors">
                {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className='flex-1 min-w-0'>
                <p className="text-sm font-semibold text-slate-200 truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.specialization || 'Technician'}</p>
            </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col p-4">
        <motion.ul
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          role="list"
          className="space-y-1"
        >
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} isActive={pathname === item.href} />
          ))}
        </motion.ul>
      </nav>

      <div className="mt-auto border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold w-full text-slate-400 hover:text-white hover:bg-slate-800/50"
        >
          <LogOut className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  );
}