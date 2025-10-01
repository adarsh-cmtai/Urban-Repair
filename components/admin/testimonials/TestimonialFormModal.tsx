'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, Star, XCircle } from 'lucide-react';
import { getUploadPresignedUrl } from '@/services/adminService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => Promise<any>;
    initialData: any | null;
    token: string | null;
}

const emptyForm = { name: '', service: '', rating: 5, text: '', imageUrl: '' };

export function TestimonialFormModal({ isOpen, onClose, onSuccess, initialData, token }: Props) {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || emptyForm);
        }
    }, [initialData, isOpen]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const { uploadURL, imageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setFormData(prev => ({ ...prev, imageUrl }));
            toast.success('Image uploaded!');
        } catch (error) {
            toast.error('Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            toast.error('Please upload an image.');
            return;
        }
        setIsSubmitting(true);
        try {
            await onSuccess(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-2xl transform rounded-lg bg-white shadow-xl">
                            <div className="flex justify-between items-center p-4 border-b">
                                <Dialog.Title as="h3" className="text-xl font-montserrat font-bold text-neutral-800">
                                    {isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </Dialog.Title>
                                <button onClick={onClose}><XCircle className="w-6 h-6 text-gray-400"/></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <label htmlFor="file-upload" className="cursor-pointer flex justify-center rounded-lg border border-dashed p-6">
                                    <div className="text-center">{isUploading ? <Loader2 className="animate-spin" /> : formData.imageUrl ? <img src={formData.imageUrl} className="h-20 w-20 rounded-full object-cover mx-auto"/> : <UploadCloud />}</div>
                                    <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" required className="w-full rounded-md" />
                                    <input name="service" value={formData.service} onChange={handleChange} placeholder="Service Provided" required className="w-full rounded-md" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Rating</label>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button type="button" key={star} onClick={() => setFormData({...formData, rating: star})}>
                                                <Star className={`w-6 h-6 ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor"/>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea name="text" value={formData.text} onChange={handleChange} placeholder="Testimonial text..." rows={4} required className="w-full rounded-md" />
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={onClose} className="rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                                    <button type="submit" disabled={isSubmitting || isUploading} className="inline-flex items-center rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Testimonial'}
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