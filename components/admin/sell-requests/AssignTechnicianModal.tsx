// File: src/components/admin/sell-requests/AssignTechnicianModal.tsx
'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { assignTechnicianForInspection, assignTechnicianForPickup } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, X, UserCheck } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    request: { id: string; type: 'inspection' | 'pickup' } | null;
    technicians: any[];
}

export function AssignTechnicianModal({ isOpen, onClose, onSuccess, request, technicians }: Props) {
    const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async () => {
        if (!selectedTechnician || !request) {
            toast.error('Please select a technician.');
            return;
        }
        setIsSubmitting(true);

        const promise = request.type === 'inspection'
            ? assignTechnicianForInspection(request.id, selectedTechnician, token!)
            : assignTechnicianForPickup(request.id, selectedTechnician, token!);

        toast.promise(promise, {
            loading: 'Assigning technician...',
            success: `Technician assigned for ${request.type} successfully!`,
            error: (err) => err.response?.data?.message || 'Failed to assign technician.'
        }).then(() => {
            onSuccess();
            onClose();
        }).finally(() => {
            setIsSubmitting(false);
            setSelectedTechnician(null);
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
                                    <Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">
                                        Assign Technician for {request?.type === 'inspection' ? 'Inspection' : 'Pickup'}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="text-slate-500"/></button>
                                </div>
                                <div className="p-6">
                                    <RadioGroup value={selectedTechnician} onChange={setSelectedTechnician}>
                                        <RadioGroup.Label className="sr-only">Select a Technician</RadioGroup.Label>
                                        <div className="space-y-3 max-h-72 overflow-y-auto">
                                            {technicians.map((tech) => (
                                                <RadioGroup.Option key={tech._id} value={tech._id} className={({ active, checked }) => `relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${checked ? 'bg-red-50 border-red-500' : 'bg-white border-slate-300'}`}>
                                                    {({ checked }) => (
                                                        <div className="flex w-full items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label as="p" className="font-semibold text-slate-900">{tech.name}</RadioGroup.Label>
                                                                    <RadioGroup.Description as="span" className="text-slate-500">{tech.specialization}</RadioGroup.Description>
                                                                </div>
                                                            </div>
                                                            {checked && <div className="shrink-0 text-red-600"><UserCheck className="h-6 w-6" /></div>}
                                                        </div>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="p-6 flex justify-end gap-3 border-t bg-slate-50/50 rounded-b-2xl">
                                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white text-sm font-semibold text-slate-700">Cancel</button>
                                    <button type="button" onClick={handleSubmit} disabled={isSubmitting || !selectedTechnician} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white disabled:bg-slate-400">
                                        {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : 'Confirm Assignment'}
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