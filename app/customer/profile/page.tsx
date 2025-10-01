'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCustomerProfile } from '@/services/customerService';
import { Loader2, User, MapPin, Lock } from 'lucide-react';
import { ProfileForm } from '@/components/customer/profile/ProfileForm';
import { AddressManager } from '@/components/customer/profile/AddressManager';
import { PasswordForm } from '@/components/customer/profile/PasswordForm';

const tabs = [
    { name: 'My Profile', icon: User, key: 'profile' },
    { name: 'Manage Addresses', icon: MapPin, key: 'addresses' },
    { name: 'Security', icon: Lock, key: 'security' },
];

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
    
    useEffect(() => {
        fetchProfile();
    }, [token]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-brand-red" /></div>;
        }
        if (!profileData) return <p>Could not load profile.</p>;

        switch (activeTab) {
            case 'profile':
                return <ProfileForm user={profileData} />;
            case 'addresses':
                return <AddressManager addresses={profileData.addresses} onUpdate={fetchProfile} />;
            case 'security':
                return <PasswordForm />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Account Settings</h1>

            <div>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">Select a tab</label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-brand-red focus:ring-brand-red"
                        onChange={(e) => setActiveTab(e.target.value)}
                        value={activeTab}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.key} value={tab.key}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`
                                        ${activeTab === tab.key
                                            ? 'border-brand-red text-brand-red'
                                            : 'border-transparent text-neutral-500 hover:border-gray-300 hover:text-neutral-700'
                                        }
                                        group inline-flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                                    `}
                                >
                                    <tab.icon className="-ml-0.5 mr-2 h-5 w-5" />
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[300px]">
                {renderContent()}
            </div>
        </div>
    );
}