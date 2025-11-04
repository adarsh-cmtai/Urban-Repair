'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Wrench, Users, UserPlus,
  BookOpen, MessageSquare, Map, Settings2, LogOut,
  Home,
  Tag,
  ShoppingBag,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { toast } from 'react-hot-toast';

const navGroups = [
  {
    title: 'Management',
    links: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
      { name: 'Sell Requests', href: '/admin/sell-requests', icon: Tag }, 
      { name: 'Technicians', href: '/admin/technicians', icon: Wrench },
      { name: 'Customers', href: '/admin/Customers', icon: Users },
      { name: 'Create User', href: '/admin/users', icon: UserPlus },
    ],
  },
  {
    title: 'Content',
    links: [
      { name: 'Service Areas', href: '/admin/locations', icon: Map },
      { name: 'Repair Catalog', href: '/admin/catalog', icon: Settings2 },
      { name: 'Buyback Services', href: '/admin/buyback-services', icon: ShoppingBag },
      { name: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
      { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    ],
  },
  {
    title:"Back to Home",
    links:[
      {
        name:'Home', href:'/', icon:Home,
      }
    ]
  },
];

const sidebarVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

function NavItem({ item, isActive }: { item: typeof navGroups[0]['links'][0], isActive: boolean }) {
  const Icon = item.icon;
  return (
    <motion.li variants={itemVariants}>
      <Link
        href={item.href}
        className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="active-indicator"
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

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have been logged out.');
    router.push('/login');
  };

  return (
    <aside className="relative flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white_5%,transparent_80%)] opacity-5"></div>
      
      <div className="relative flex h-20 shrink-0 items-center border-b border-slate-800 px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/50">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-white">
            Urban Repair<span className="text-red-500"> Expert</span>
          </span>
        </Link>
      </div>

      <motion.nav
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="relative flex-1 overflow-y-auto px-4 py-6"
      >
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? 'mt-6' : ''}>
            <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.links.map((item) => (
                <NavItem key={item.name} item={item} isActive={pathname.startsWith(item.href)} />
              ))}
            </ul>
          </div>
        ))}
      </motion.nav>

      <div className="relative mt-auto flex-shrink-0 border-t border-slate-800 p-4">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-slate-800/50 hover:text-white"
        >
          <LogOut className="h-5 w-5 shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-red-500" />
          Logout
        </motion.button>
      </div>
    </aside>
  );
}