'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminTechnicians, deleteTechnician, updateTechnician } from '@/services/adminService';
import { TechnicianCard } from '@/components/admin/technicians/TechnicianCard';
import { TechnicianFormModal } from '@/components/admin/technicians/TechnicianFormModal';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminTechniciansPage() {
    const [technicians, setTechnicians] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTechnician, setEditingTechnician] = useState<any | null>(null);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchTechnicians = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getAdminTechnicians(token);
            setTechnicians(response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnicians();
    }, [token]);
    
    const handleAddNew = () => {
        setEditingTechnician(null);
        setIsModalOpen(true);
    };

    const handleEdit = (technician: any) => {
        setEditingTechnician(technician);
        setIsModalOpen(true);
    };

    const handleDeleteToggle = async (technician: any) => {
        const action = technician.isActive ? 'deactivate' : 'activate';
        if (window.confirm(`Are you sure you want to ${action} ${technician.name}?`)) {
            const promise = updateTechnician(technician._id, { ...technician, isActive: !technician.isActive }, token!);
            toast.promise(promise, {
                loading: `${action.charAt(0).toUpperCase() + action.slice(1)}ing technician...`,
                success: `Technician ${action}d successfully!`,
                error: `Failed to ${action} technician.`
            }).then(() => fetchTechnicians());
        }
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchTechnicians();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Manage Technicians</h1>
                <button onClick={handleAddNew} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                    <Plus className="w-5 h-5" /> Add New Technician
                </button>
            </div>
            
            {isLoading ? (
                 <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technicians.map((tech: any) => (
                        <TechnicianCard key={tech._id} technician={tech} onEdit={handleEdit} onDelete={handleDeleteToggle} />
                    ))}
                </div>
            )}
            
            <TechnicianFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                initialData={editingTechnician}
            />
        </div>
    );
}