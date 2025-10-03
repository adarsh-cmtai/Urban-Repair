'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAllTechnicians, assignTechnician } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string | null;
    onAssignSuccess: () => void;
}

export function AssignTechnicianModal({ isOpen, onClose, bookingId, onAssignSuccess }: Props) {
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnician, setSelectedTechnician] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isOpen && token) {
            getAllTechnicians(token).then(res => setTechnicians(res.data));
        }
    }, [isOpen, token]);

    const handleAssign = async () => {
        if (!selectedTechnician || !bookingId) {
            toast.error('Please select a technician.');
            return;
        }
        setIsLoading(true);
        try {
            await assignTechnician(bookingId, selectedTechnician, token!);
            toast.success('Technician assigned successfully!');
            onAssignSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to assign technician.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Assign Technician</Dialog.Title>
                                    <div className="mt-4">
                                        <select
                                            value={selectedTechnician}
                                            onChange={(e) => setSelectedTechnician(e.target.value)}
                                            className="w-full rounded-md border-gray-300"
                                        >
                                            <option value="">Select an Active Technician</option>
                                            {technicians.map((tech: any) => (
                                                <option key={tech._id} value={tech._id}>{tech.name} - {tech.specialization}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-brand-red px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleAssign}
                                    >
                                        {isLoading ? <Loader2 className="animate-spin"/> : 'Confirm Assignment'}
                                    </button>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm" onClick={onClose}>
                                        Cancel
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