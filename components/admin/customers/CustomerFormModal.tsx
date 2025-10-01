'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { createCustomer, updateCustomer } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData: any | null;
}

export function CustomerFormModal({ isOpen, onClose, onSuccess, initialData }: Props) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData, password: '' });
        } else {
            setFormData({ name: '', email: '', phone: '', password: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const promise = isEditMode
            ? updateCustomer(initialData._id, formData, token!)
            : createCustomer(formData, token!);

        toast.promise(promise, {
            loading: isEditMode ? 'Updating customer...' : 'Creating customer...',
            success: `Customer ${isEditMode ? 'updated' : 'created'} successfully!`,
            error: (err) => err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} customer.`,
        }).then(() => {
            onSuccess();
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                 <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-lg transform rounded-lg bg-white p-6 shadow-xl">
                            <Dialog.Title as="h3" className="text-xl font-montserrat font-bold text-neutral-800">
                                {isEditMode ? 'Edit Customer' : 'Add New Customer'}
                            </Dialog.Title>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full rounded-md border-gray-300" />
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full rounded-md border-gray-300" />
                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full rounded-md border-gray-300" />
                                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder={isEditMode ? 'New Password (optional)' : 'Password'} required={!isEditMode} className="w-full rounded-md border-gray-300" />
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={onClose} className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditMode ? 'Save Changes' : 'Create Customer')}
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}