'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminCustomers, deleteCustomer } from '@/services/adminService';
import { CustomerListItem } from '@/components/admin/customers/CustomerListItem';
import { CustomerFormModal } from '@/components/admin/customers/CustomerFormModal';
import { Loader2, Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchCustomers = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getAdminCustomers(token);
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [token]);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = customers.filter(
            (c: any) =>
                c.name.toLowerCase().includes(searchTerm) ||
                c.email.toLowerCase().includes(searchTerm) ||
                c.phone.includes(searchTerm)
        );
        setFilteredCustomers(filtered);
    };
    
    const handleAddNew = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (customer: any) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = async (customer: any) => {
        if (window.confirm(`Are you sure you want to deactivate ${customer.name}?`)) {
            const promise = deleteCustomer(customer._id, token!);
            toast.promise(promise, {
                loading: 'Deactivating customer...',
                success: 'Customer deactivated successfully!',
                error: 'Failed to deactivate customer.'
            }).then(() => fetchCustomers());
        }
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchCustomers();
    };

    return (
        <div className="space-y-8">
            <div className="sm:flex sm:justify-between sm:items-center">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Manage Customers</h1>
                <div className="mt-4 sm:mt-0 flex gap-4">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search customers..."
                            onChange={handleSearch}
                            className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                        />
                    </div>
                    <button onClick={handleAddNew} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                        <Plus className="w-5 h-5" /> Add New
                    </button>
                </div>
            </div>
            
            {isLoading ? (
                 <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>
            ) : (
                <ul role="list" className="space-y-4">
                    {filteredCustomers.map((customer: any) => (
                        <CustomerListItem key={customer._id} customer={customer} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </ul>
            )}
            
            <CustomerFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                initialData={editingCustomer}
            />
        </div>
    );
}