'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { createCustomer, updateCustomer } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, User, Mail, Phone, KeyRound, Plus, Save, X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData: any | null;
}

const FormInput = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input {...props} className="pl-10 w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500" />
    </div>
);

export function CustomerFormModal({ isOpen, onClose, onSuccess, initialData }: Props) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({ name: initialData.name || '', email: initialData.email || '', phone: initialData.phone || '', password: '' });
            } else {
                setFormData({ name: '', email: '', phone: '', password: '' });
            }
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataToSend = { ...formData };
        if (isEditMode && !formData.password) {
            // Do not send empty password field on update
            const { password, ...rest } = dataToSend;
            Object.assign(dataToSend, rest);
        }

        const promise = isEditMode
            ? updateCustomer(initialData._id, dataToSend, token!)
            : createCustomer(dataToSend, token!);

        toast.promise(promise, {
            loading: isEditMode ? 'Updating customer...' : 'Creating customer...',
            success: `Customer ${isEditMode ? 'updated' : 'created'} successfully!`,
            error: (err) => err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} customer.`,
        }).then(() => {
            onSuccess();
            onClose(); 
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="relative w-full max-w-lg transform rounded-2xl bg-white shadow-xl flex flex-col">
                                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                    <Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">
                                        {isEditMode ? 'Edit Customer Details' : 'Add New Customer'}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                                        <X className="text-slate-500"/>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    <FormInput icon={User} name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                                    <FormInput icon={Mail} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                                    <FormInput icon={Phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                                    <FormInput 
                                        icon={KeyRound}
                                        name="password" 
                                        type="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        placeholder={isEditMode ? 'New Password (leave blank to keep unchanged)' : 'Password'} 
                                        required={!isEditMode} 
                                    />
                                </form>
                                <div className="p-6 flex justify-end gap-3 border-t border-slate-200 bg-slate-50/50 rounded-b-2xl">
                                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition-all disabled:bg-slate-400">
                                        {isSubmitting 
                                            ? <Loader2 className="animate-spin w-5 h-5"/> 
                                            : isEditMode 
                                                ? <><Save size={16} /> Save Changes</>
                                                : <><Plus size={16} /> Create Customer</>
                                        }
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}