'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminCustomers, deleteCustomer } from '@/services/adminService';
import { CustomerListItem } from '@/components/admin/customers/CustomerListItem';
import { CustomerFormModal } from '@/components/admin/customers/CustomerFormModal';
import { Loader2, Plus, Search, Users, Inbox } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Skeleton Loader for a better UX
function CustomerListSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                        <div className="space-y-1.5">
                            <div className="h-5 w-32 bg-slate-200 rounded"></div>
                            <div className="h-4 w-48 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-8 w-20 bg-slate-300 rounded-md"></div>
                        <div className="h-8 w-20 bg-slate-300 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Empty State Component
function EmptyState() {
    return (
        <div className="text-center py-16 px-6">
            <Users className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No Customers Found</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or add a new customer.</p>
        </div>
    );
}

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
        if (window.confirm(`Are you sure you want to delete customer "${customer.name}"?`)) {
            const promise = deleteCustomer(customer._id, token!);
            toast.promise(promise, {
                loading: 'Deleting customer...',
                success: 'Customer deleted successfully!',
                error: 'Failed to delete customer.'
            }).then(() => fetchCustomers());
        }
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchCustomers();
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Manage Customers</h1>
                <p className="mt-2 text-slate-500">View, search, and manage all registered customers.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        onChange={handleSearch}
                        className="pl-10 w-full h-12 text-base bg-white rounded-lg border border-slate-300 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <button 
                    onClick={handleAddNew} 
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
                >
                    <Plus className="w-5 h-5" /> Add New Customer
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-heading text-xl font-bold text-slate-800">
                        All Customers ({filteredCustomers.length})
                    </h3>
                </div>
                {isLoading ? (
                    <div className="p-4">
                        <CustomerListSkeleton />
                    </div>
                ) : filteredCustomers.length > 0 ? (
                    <ul role="list" className="divide-y divide-slate-200">
                        {filteredCustomers.map((customer: any) => (
                            <CustomerListItem key={customer._id} customer={customer} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </ul>
                ) : (
                    <EmptyState />
                )}
            </div>
            
            <CustomerFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                initialData={editingCustomer}
            />
        </div>
    );
}