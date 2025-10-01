'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addCustomerAddress, updateCustomerAddress, deleteCustomerAddress } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2, MapPin, Plus, Trash, Edit } from 'lucide-react';

const emptyAddress = { _id: null, label: 'Home', street: '', city: '', state: '', zipCode: '' };

export function AddressManager({ addresses, onUpdate }: { addresses: any[], onUpdate: () => void }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(emptyAddress);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleEdit = (address: any) => {
        setEditingAddress(address);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingAddress(emptyAddress);
        setIsFormOpen(true);
    };

    const handleDelete = async (addressId: string) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await deleteCustomerAddress(addressId, token!);
                toast.success('Address deleted!');
                onUpdate();
            } catch {
                toast.error('Failed to delete address.');
            }
        }
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingAddress._id) {
                await updateCustomerAddress(editingAddress._id, editingAddress, token!);
                toast.success('Address updated!');
            } else {
                await addCustomerAddress(editingAddress, token!);
                toast.success('Address added!');
            }
            setIsFormOpen(false);
            onUpdate();
        } catch {
            toast.error('An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-800">Your Saved Addresses</h3>
                <button onClick={handleAddNew} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            {isFormOpen && (
                 <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-slate-50">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={editingAddress.street} onChange={e => setEditingAddress({...editingAddress, street: e.target.value})} placeholder="Street Address" className="w-full rounded-lg border-gray-300" />
                        <input value={editingAddress.city} onChange={e => setEditingAddress({...editingAddress, city: e.target.value})} placeholder="City" className="w-full rounded-lg border-gray-300" />
                        <input value={editingAddress.state} onChange={e => setEditingAddress({...editingAddress, state: e.target.value})} placeholder="State" className="w-full rounded-lg border-gray-300" />
                        <input value={editingAddress.zipCode} onChange={e => setEditingAddress({...editingAddress, zipCode: e.target.value})} placeholder="Zip Code" className="w-full rounded-lg border-gray-300" />
                        <select value={editingAddress.label} onChange={e => setEditingAddress({...editingAddress, label: e.target.value})} className="w-full rounded-lg border-gray-300">
                            <option>Home</option>
                            <option>Office</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={isLoading} className="inline-flex items-center rounded-lg border border-transparent bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Save Address'}
                        </button>
                    </div>
                 </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div key={addr._id} className="p-4 border rounded-lg relative">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-brand-red mt-1" />
                            <div>
                                <p className="font-semibold text-neutral-800">{addr.label}</p>
                                <p className="text-sm text-neutral-600">{addr.street}</p>
                                <p className="text-sm text-neutral-600">{`${addr.city}, ${addr.state} ${addr.zipCode}`}</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                             <button onClick={() => handleEdit(addr)} className="p-1.5 text-neutral-500 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                             <button onClick={() => handleDelete(addr._id)} className="p-1.5 text-neutral-500 hover:text-brand-red"><Trash className="w-4 h-4"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}