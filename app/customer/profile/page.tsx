'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerProfile } from '@/services/customerService';
import { Loader2, User, MapPin, Lock, AlertTriangle } from 'lucide-react';
import { ProfileForm } from '@/components/customer/profile/ProfileForm';
import { AddressManager } from '@/components/customer/profile/AddressManager';
import { PasswordForm } from '@/components/customer/profile/PasswordForm';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const tabs = [
    { name: 'My Profile', icon: User, key: 'profile' },
    { name: 'Manage Addresses', icon: MapPin, key: 'addresses' },
    { name: 'Security', icon: Lock, key: 'security' },
];

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

function ProfilePageSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-3/4"></div>
            <div className="h-5 bg-slate-200 rounded w-1/2 mt-2"></div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-2">
                    <div className="h-12 bg-slate-200 rounded-lg"></div>
                    <div className="h-12 bg-slate-100 rounded-lg"></div>
                    <div className="h-12 bg-slate-100 rounded-lg"></div>
                </div>
                <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border h-64"></div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchProfile = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getCustomerProfile(token);
            setProfileData(response.data);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => { fetchProfile(); }, [token]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-red-600" /></div>;
        }
        if (!profileData) return (
            <div className="text-center py-16">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
                <h3 className="mt-4 text-lg font-semibold text-red-700">Could not load profile</h3>
                <p className="mt-1 text-sm text-red-500">Please try again later.</p>
            </div>
        );

        switch (activeTab) {
            case 'profile': return <ProfileForm user={profileData} onUpdate={fetchProfile} />;
            case 'addresses': return <AddressManager addresses={profileData.addresses} onUpdate={fetchProfile} />;
            case 'security': return <PasswordForm />;
            default: return null;
        }
    };
    
    if (isLoading && !profileData) {
        return <ProfilePageSkeleton />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Account Settings</h1>
                <p className="mt-2 text-slate-500">Manage your profile, addresses, and security settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1">
                    <nav className="relative flex flex-col space-y-1 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition-colors w-full ${
                                    activeTab === tab.key ? 'text-red-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                            >
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="active-profile-pill"
                                        className="absolute inset-0 z-0 bg-red-50"
                                        style={{ borderRadius: 6 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <span className="relative z-10"><tab.icon className="w-5 h-5" /></span>
                                <span className="relative z-10">{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="lg:hidden">
                    <div className="relative bg-slate-100 p-1.5 rounded-xl flex space-x-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-red-500 ${
                                    activeTab === tab.key ? 'text-red-600' : 'text-slate-600 hover:text-slate-800'
                                }`}
                            >
                                {activeTab === tab.key && (
                                    <motion.div
                                        layoutId="active-mobile-profile-pill"
                                        className="absolute inset-0 z-0 bg-white shadow-sm"
                                        style={{ borderRadius: 8 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2"><tab.icon className="w-4 h-4" />{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]"
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}