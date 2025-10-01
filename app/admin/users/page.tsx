'use client';

import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { createCustomer, createTechnician } from '@/services/adminService';
import Link from 'next/link';

export default function ManageUsersPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', role: 'customer', specialization: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Create & Manage Users</h1>
                 <div className="flex gap-2">
                    <Link href="/admin/Customers">
                       <button className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">View Customers</button>
                    </Link>
                     <Link href="/admin/technicians">
                       <button className="text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700">View Technicians</button>
                    </Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border max-w-3xl mx-auto">
                <h2 className="font-montserrat text-xl font-bold text-neutral-800 mb-6">Create a New User</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full rounded-lg border-gray-300"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-neutral-700">Assign Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300">
                                <option value="customer">Customer</option>
                                <option value="technician">Technician</option>
                            </select>
                        </div>
                        {formData.role === 'technician' && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700">Specialization</label>
                                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-300"/>
                            </div>
                        )}
                    </div>
                    <div className="pt-4 text-right">
                        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center items-center rounded-lg bg-brand-red px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700">
                             {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}