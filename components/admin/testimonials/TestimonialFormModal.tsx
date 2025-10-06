'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, Star, X, User, Wrench, MessageSquare, Save } from 'lucide-react';
import { getUploadPresignedUrl } from '@/services/adminService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => Promise<any>;
    initialData: any | null;
    token: string | null;
}

const emptyForm = { name: '', service: '', rating: 5, text: '', imageUrl: '' };

const FormInput = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input {...props} className="pl-12 w-full h-14 text-base bg-slate-100 rounded-xl border-slate-300 focus:ring-red-500 focus:border-red-500" />
    </div>
);

export function TestimonialFormModal({ isOpen, onClose, onSuccess, initialData, token }: Props) {
    const [formData, setFormData] = useState(emptyForm);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData ? { ...emptyForm, ...initialData } : emptyForm);
        }
    }, [initialData, isOpen]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleRatingChange = (rating: number) => {
        setFormData(prev => ({ ...prev, rating }));
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
        } catch (error) { toast.error('Image upload failed.'); } 
        finally { setIsUploading(false); }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) { toast.error('Please upload an image.'); return; }
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
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="relative w-full max-w-2xl transform rounded-2xl bg-white shadow-xl flex flex-col">
                                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                    <Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">
                                        {isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="text-slate-500"/></button>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                                    <div className="flex items-center gap-6">
                                        <label htmlFor="file-upload" className="cursor-pointer group relative flex-shrink-0 w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-red-500 transition-colors">
                                            {isUploading ? <Loader2 className="animate-spin text-red-600" />
                                            : formData.imageUrl ? <img src={formData.imageUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                            : <User className="w-10 h-10 text-slate-400 group-hover:text-red-500 transition-colors" />}
                                            <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
                                        </label>
                                        <div className="w-full space-y-4">
                                            <FormInput icon={User} name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" required />
                                            <FormInput icon={Wrench} name="service" value={formData.service} onChange={handleChange} placeholder="Service Provided (e.g., AC Repair)" required />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700">Rating</label>
                                        <div className="flex items-center gap-1 mt-2" onMouseLeave={() => setHoverRating(0)}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button type="button" key={star} onClick={() => handleRatingChange(star)} onMouseEnter={() => setHoverRating(star)}>
                                                    <Star className={`w-8 h-8 transition-colors ${ (hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-slate-300' }`} fill="currentColor"/>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-slate-400 pointer-events-none" />
                                        <textarea name="text" value={formData.text} onChange={handleChange} placeholder="Write the testimonial here..." rows={4} required className="pl-12 pt-4 w-full text-base bg-slate-100 rounded-xl border-slate-300 focus:ring-red-500 focus:border-red-500" />
                                    </div>

                                </form>
                                <div className="p-6 flex justify-end gap-3 border-t border-slate-200 bg-slate-50/50 rounded-b-2xl">
                                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors">Cancel</button>
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting || isUploading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition-all disabled:bg-slate-400">
                                        {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : <><Save size={16}/> {isEditMode ? 'Save Changes' : 'Add Testimonial'}</>}
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