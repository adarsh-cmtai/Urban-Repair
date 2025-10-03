'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  Users,
  Settings,
  LogOut,
  Users2,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { toast } from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Technicians', href: '/admin/technicians', icon: Wrench },
  { name: 'Customers', href: '/admin/Customers', icon: Users },
  { name: 'Create User', href: '/admin/users', icon: Users2 },
  { name: 'Service Catalog', href: '/admin/catalog', icon: Settings },
  { name: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
];

const sidebarVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have been logged out.');
    router.push('/login');
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-20 shrink-0 items-center border-b border-zinc-800 px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-wide text-zinc-100">
            UrbanRepair<span className="text-red-500">.</span>Admin
          </h1>
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <motion.nav
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="p-4"
        >
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <motion.li variants={itemVariants} key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      group relative flex items-center gap-3 rounded-lg px-3 py-2.5
                      text-sm font-medium transition-colors duration-200
                      ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 z-0 rounded-lg bg-zinc-800"
                        transition={{ duration: 0.5, type: 'spring' }}
                      />
                    )}
                    <span className="relative z-10">
                      <item.icon
                        className={`
                          h-5 w-5 shrink-0 transition-colors duration-200
                          ${isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-300'}
                        `}
                      />
                    </span>
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>

        <div className="mt-auto border-t border-zinc-800 p-4">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            <LogOut className="h-5 w-5 shrink-0 text-zinc-500 transition-colors duration-200 group-hover:text-red-500" />
            Logout
          </motion.button>
        </div>
      </div>
    </aside>
  );
}