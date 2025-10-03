'use client';

import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, User, Mail, Phone, KeyRound, Briefcase, UserPlus, Users, Wrench } from 'lucide-react';
import { createCustomer, createTechnician } from '@/services/adminService';
import Link from 'next/link';

export default function ManageUsersPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', role: 'customer', specialization: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (role: 'customer' | 'technician') => {
        setFormData({ ...formData, role, specialization: role === 'customer' ? '' : formData.specialization });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        let promise;
        if (formData.role === 'customer') {
            promise = createCustomer(formData, token!);
        } else {
            promise = createTechnician(formData, token!);
        }

        toast.promise(promise, {
            loading: `Creating ${formData.role}...`,
            success: `User with role '${formData.role}' created successfully!`,
            error: (err) => err.response?.data?.message || `Failed to create ${formData.role}.`,
        })
        .then(() => {
             setFormData({ name: '', email: '', phone: '', password: '', role: 'customer', specialization: ''});
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Create & Manage Users</h1>
                <p className="mt-2 text-slate-500">Add new customers or technicians to the system.</p>
            </div>

            <div className="bg-gradient-to-b from-white to-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200/80 max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="font-heading text-2xl font-bold text-slate-800">Create a New User Profile</h2>
                    <p className="text-slate-500 mt-1">Start by selecting a role.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl max-w-sm mx-auto">
                            <button 
                                type="button" 
                                onClick={() => handleRoleChange('customer')}
                                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${formData.role === 'customer' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Users className="w-4 h-4" /> Customer
                            </button>
                            <button 
                                type="button" 
                                onClick={() => handleRoleChange('technician')}
                                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${formData.role === 'technician' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Wrench className="w-4 h-4" /> Technician
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"/>
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"/>
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"/>
                        </div>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create Password" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"/>
                        </div>
                    </div>

                    <div className={`transition-all duration-300 ease-in-out ${formData.role === 'technician' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="relative mt-6">
                             <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Technician's Specialization (e.g., AC Expert)" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"/>
                        </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center items-center rounded-xl bg-red-600 px-8 py-3 h-14 text-lg font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">
                             {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><UserPlus className="w-5 h-5 mr-2" /> Create User</>}
                        </button>
                    </div>
                </form>
            </div>
             <div className="flex justify-center gap-4 mt-8">
                <Link href="/admin/Customers" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-100 px-5 py-2.5 rounded-full hover:bg-blue-200 transition-colors">
                    <Users className="w-4 h-4"/> View All Customers
                </Link>
                 <Link href="/admin/technicians" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-100 px-5 py-2.5 rounded-full hover:bg-indigo-200 transition-colors">
                    <Wrench className="w-4 h-4" /> View All Technicians
                </Link>
            </div>
        </div>
    );
}