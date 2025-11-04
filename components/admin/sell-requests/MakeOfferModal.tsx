// File: src/components/admin/sell-requests/MakeOfferModal.tsx
'use client';

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { makeFinalOffer } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, X, IndianRupee } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    request: any | null;
}

export function MakeOfferModal({ isOpen, onClose, onSuccess, request }: Props) {
    const [offerPrice, setOfferPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (request) {
            setOfferPrice(request.inspectionReport?.suggestedPrice || '');
        }
    }, [request]);

    const handleSubmit = async () => {
        if (!offerPrice || parseFloat(offerPrice) <= 0) {
            toast.error('Please enter a valid offer price.');
            return;
        }
        setIsSubmitting(true);

        const promise = makeFinalOffer(request._id, parseFloat(offerPrice), token!);
        
        toast.promise(promise, {
            loading: 'Sending offer to customer...',
            success: 'Offer sent successfully!',
            error: (err) => err.response?.data?.message || 'Failed to send offer.'
        }).then(() => {
            onSuccess();
            onClose();
        }).finally(() => {
            setIsSubmitting(false);
            setOfferPrice('');
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
                            <Dialog.Panel className="relative w-full max-w-md transform rounded-2xl bg-white shadow-xl flex flex-col">
                                <div className="flex items-center justify-between p-6 border-b">
                                    <Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">Make Final Offer</Dialog.Title>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="text-slate-500"/></button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Technician Suggested Price:</p>
                                        <p className="font-bold text-lg text-indigo-600">₹{request?.inspectionReport?.suggestedPrice?.toLocaleString('en-IN') || 'N/A'}</p>
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="offerPrice" className="block text-sm font-semibold text-slate-700 mb-1">Final Offer Price</label>
                                        <IndianRupee className="absolute left-3 top-10 w-5 h-5 text-slate-400" />
                                        <input
                                            id="offerPrice"
                                            type="number"
                                            value={offerPrice}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                            placeholder="Enter final price"
                                            className="pl-10 w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="p-6 flex justify-end gap-3 border-t bg-slate-50/50 rounded-b-2xl">
                                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white text-sm font-semibold text-slate-700">Cancel</button>
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white disabled:bg-slate-400">
                                        {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : 'Send Offer to Customer'}
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