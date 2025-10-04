'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAdminTechnicians, updateTechnician, deleteTechnician } from '@/services/adminService';
import { TechnicianFormModal } from '@/components/admin/technicians/TechnicianFormModal';
import { Loader2, Plus, Edit, Trash2, ShieldOff, ShieldCheck, Wrench, Mail, Phone, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Re-designed TechnicianCard component
function TechnicianCard({ technician, onEdit, onDelete }: { technician: any, onEdit: (t: any) => void, onDelete: (t: any) => void }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-2xl">
                        {technician.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-lg text-slate-800">{technician.name}</h3>
                        <p className="text-sm text-slate-500">{technician.specialization}</p>
                    </div>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${technician.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    <div className={`h-2 w-2 rounded-full ${technician.isActive ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                    {technician.isActive ? 'Active' : 'Inactive'}
                </div>
            </div>
            
            <div className="border-t border-slate-200 my-4"></div>

            <div className="space-y-3 text-sm flex-grow">
                <a href={`mailto:${technician.email}`} className="flex items-center gap-3 text-slate-600 hover:text-red-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{technician.email}</span>
                </a>
                <a href={`tel:${technician.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-red-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{technician.phone}</span>
                </a>
            </div>

            <div className="mt-6 flex gap-2">
                <button onClick={() => onEdit(technician)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors text-sm">
                    <Edit size={14} /> Edit
                </button>
                <button onClick={() => onDelete(technician)} className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-sm ${technician.isActive ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-green-600 bg-green-100 hover:bg-green-200'}`}>
                    {technician.isActive ? <><ShieldOff size={14} /> Deactivate</> : <><ShieldCheck size={14} /> Activate</>}
                </button>
            </div>
        </div>
    );
}

// Skeleton Loader for Technicians
function TechnicianCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-slate-200"></div>
                    <div>
                        <div className="h-6 w-32 bg-slate-200 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 rounded mt-1.5"></div>
                    </div>
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            </div>
            <div className="border-t border-slate-200 my-4"></div>
            <div className="space-y-3">
                <div className="h-4 w-4/5 bg-slate-200 rounded"></div>
                <div className="h-4 w-3/5 bg-slate-200 rounded"></div>
            </div>
            <div className="mt-6 flex gap-2">
                <div className="h-9 flex-1 bg-slate-300 rounded-md"></div>
                <div className="h-9 flex-1 bg-slate-300 rounded-md"></div>
            </div>
        </div>
    );
}

// Empty State Component
function EmptyState({ onAddNew }: { onAddNew: () => void }) {
    return (
        <div className="text-center py-20 px-6 col-span-full bg-white rounded-xl border-2 border-dashed border-slate-200">
            <Wrench className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No Technicians Found</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by adding your first technician to the team.</p>
            <button onClick={onAddNew} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                <Plus className="w-5 h-5" /> Add New Technician
            </button>
        </div>
    );
}

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

    useEffect(() => { fetchTechnicians(); }, [token]);
    
    const handleAddNew = () => { setEditingTechnician(null); setIsModalOpen(true); };
    const handleEdit = (technician: any) => { setEditingTechnician(technician); setIsModalOpen(true); };

    const handleDeleteToggle = async (technician: any) => {
        const action = technician.isActive ? 'deactivate' : 'activate';
        if (window.confirm(`Are you sure you want to ${action} ${technician.name}?`)) {
            const promise = technician.isActive
                ? deleteTechnician(technician._id, token!)
                : updateTechnician(technician._id, { isActive: true }, token!);
            
            toast.promise(promise, {
                loading: `${action.charAt(0).toUpperCase() + action.slice(1)}ing technician...`,
                success: `Technician ${action}d successfully!`,
                error: `Failed to ${action} technician.`
            }).then(() => fetchTechnicians());
        }
    };

    const handleSuccess = () => { setIsModalOpen(false); fetchTechnicians(); };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-extrabold text-slate-800">Manage Technicians</h1>
                    <p className="mt-2 text-slate-500">View, add, and manage your team of skilled technicians.</p>
                </div>
                <button onClick={handleAddNew} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors">
                    <Plus className="w-5 h-5" /> Add New Technician
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, i) => <TechnicianCardSkeleton key={i} />)
                ) : technicians.length > 0 ? (
                    technicians.map((tech: any) => (
                        <TechnicianCard key={tech._id} technician={tech} onEdit={handleEdit} onDelete={handleDeleteToggle} />
                    ))
                ) : (
                    <EmptyState onAddNew={handleAddNew} />
                )}
            </div>
            
            <TechnicianFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                initialData={editingTechnician}
            />
        </div>
    );
}