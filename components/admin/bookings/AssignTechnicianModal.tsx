'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAllTechnicians, offerJobToTechnicians } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export function AssignTechnicianModal({ isOpen, onClose, bookingId, onAssignSuccess }: any) {
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isOpen && token) {
            getAllTechnicians(token).then(res => setTechnicians(res.data));
        } else {
            setSelectedTechnicians([]);
        }
    }, [isOpen, token]);

    const handleToggleTechnician = (techId: string) => {
        setSelectedTechnicians(prev => 
            prev.includes(techId) ? prev.filter(id => id !== techId) : [...prev, techId]
        );
    };

    const handleOffer = async () => {
        if (selectedTechnicians.length === 0 || !bookingId) {
            toast.error('Please select at least one technician.');
            return;
        }
        setIsLoading(true);
        try {
            await offerJobToTechnicians(bookingId, selectedTechnicians, token!);
            toast.success('Job offer sent successfully!');
            onAssignSuccess();
        } catch (error) {
            toast.error('Failed to send job offer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-lg rounded-lg bg-white shadow-xl">
                            <div className="p-6">
                                <Dialog.Title as="h3" className="text-lg font-medium">Offer Job to Technicians</Dialog.Title>
                                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                                    {technicians.map((tech: any) => (
                                        <label key={tech._id} className="flex items-center gap-3 p-3 rounded-lg border has-[:checked]:bg-red-50 has-[:checked]:border-red-500">
                                            <input type="checkbox" checked={selectedTechnicians.includes(tech._id)} onChange={() => handleToggleTechnician(tech._id)} className="h-4 w-4 rounded" />
                                            <div>
                                                <p className="font-semibold">{tech.name}</p>
                                                <p className="text-sm text-gray-500">{tech.specialization}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
                                <button type="button" onClick={onClose}>Cancel</button>
                                <button type="button" disabled={isLoading} onClick={handleOffer}>
                                    {isLoading ? <Loader2 className="animate-spin"/> : 'Send Offer'}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}