'use client';

import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addCustomerAddress, updateCustomerAddress, deleteCustomerAddress } from '@/services/customerService';
import { toast } from 'react-hot-toast';
import { Loader2, MapPin, Plus, Trash2, Edit, Home, Briefcase, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyAddress = { _id: null, label: 'Home', street: '', city: 'Hyderabad', state: 'Telangana', zipCode: '' };

const FormInput = ({ ...props }) => (
    <input {...props} className="w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500" />
);

const FormSelect = ({ children, ...props }: { children: React.ReactNode, [key:string]: any }) => (
    <select {...props} className="w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500">
        {children}
    </select>
);

export function AddressManager({ addresses, onUpdate }: { addresses: any[], onUpdate: () => void }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    
    const isEditMode = Boolean(editingAddress?._id);

    const handleEdit = (address: any) => {
        setEditingAddress(address);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingAddress(emptyAddress);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingAddress(null);
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
            const promise = isEditMode
                ? updateCustomerAddress(editingAddress._id, editingAddress, token!)
                : addCustomerAddress(editingAddress, token!);

            await toast.promise(promise, {
                loading: 'Saving address...',
                success: `Address ${isEditMode ? 'updated' : 'added'}!`,
                error: 'Failed to save address.'
            });
            handleCloseForm();
            onUpdate();
        } catch {
            // Toast is handled by promise
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-slate-800">Manage Addresses</h2>
                    <p className="mt-1 text-slate-500">Add, edit, or remove your saved delivery addresses.</p>
                </div>
                <button onClick={handleAddNew} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 h-11 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors">
                    <Plus className="w-5 h-5" /> Add New Address
                </button>
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white p-6 rounded-xl border border-slate-200"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="font-heading font-bold text-lg text-slate-800">{isEditMode ? 'Edit Address' : 'Add New Address'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput value={editingAddress.street} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingAddress({...editingAddress, street: e.target.value})} placeholder="Street Address, House No." required />
                                <FormInput value={editingAddress.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingAddress({...editingAddress, city: e.target.value})} placeholder="City" required />
                                <FormInput value={editingAddress.state} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingAddress({...editingAddress, state: e.target.value})} placeholder="State" required />
                                <FormInput value={editingAddress.zipCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingAddress({...editingAddress, zipCode: e.target.value})} placeholder="Zip Code" required maxLength={6} />
                                <FormSelect value={editingAddress.label} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditingAddress({...editingAddress, label: e.target.value})}>
                                    <option>Home</option>
                                    <option>Office</option>
                                    <option>Other</option>
                                </FormSelect>
                            </div>
                            <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
                                <button type="button" onClick={handleCloseForm} className="h-11 inline-flex items-center justify-center gap-2 px-4 rounded-lg border bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors"><X size={16}/>Cancel</button>
                                <button type="submit" disabled={isLoading} className="h-11 inline-flex items-center justify-center gap-2 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition-all disabled:bg-slate-400">
                                    {isLoading ? <Loader2 className="animate-spin w-5 h-5"/> : <><Save size={16}/>Save Address</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                        <div key={addr._id} className="group relative bg-white p-6 rounded-xl border border-slate-200 hover:border-red-300 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-500">
                                    {addr.label === 'Home' ? <Home size={20}/> : addr.label === 'Office' ? <Briefcase size={20}/> : <MapPin size={20}/>}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{addr.label}</p>
                                    <p className="text-sm text-slate-600">{addr.street}</p>
                                    <p className="text-sm text-slate-500">{`${addr.city}, ${addr.state} - ${addr.zipCode}`}</p>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(addr)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={16}/></button>
                                <button onClick={() => handleDelete(addr._id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={16}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !isFormOpen && (
                    <div className="text-center py-16 px-6 border-2 border-dashed border-slate-300 rounded-xl">
                        <MapPin className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-lg font-semibold text-slate-800">No Saved Addresses</h3>
                        <p className="mt-1 text-sm text-slate-500">You haven't added any addresses yet.</p>
                        <button onClick={handleAddNew} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                            <Plus className="w-4 h-4" /> Add Your First Address
                        </button>
                    </div>
                )
            )}
        </div>
    );
}