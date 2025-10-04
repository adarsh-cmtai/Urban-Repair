'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Edit, Trash2, MapPin, Building, Globe, Hash, Save, X, Inbox } from 'lucide-react';
import api from '@/services/api';

interface Location {
    _id: string;
    areaName: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
}

const emptyForm = { areaName: '', city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', pincode: '' };

// Reusable Input Component with Icon
const FormInput = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input {...props} className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500" />
    </div>
);

// Skeleton for loading state
const LocationRowSkeleton = ({ count = 3 }: { count?: number }) => (
    <>
        {[...Array(count)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex-1 space-y-1.5">
                    <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-20 bg-slate-300 rounded-md"></div>
                    <div className="h-8 w-20 bg-slate-300 rounded-md"></div>
                </div>
            </div>
        ))}
    </>
);

// Empty state component
const EmptyState = () => (
    <div className="text-center py-16 px-6">
        <Inbox className="mx-auto h-16 w-16 text-slate-300" />
        <h3 className="mt-4 text-lg font-semibold text-slate-700">No Locations Found</h3>
        <p className="mt-1 text-sm text-slate-500">Start by adding a new service area using the form.</p>
    </div>
);


export default function AdminLocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchLocations = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await api.get('/admin/locations', { headers: { Authorization: `Bearer ${token}` } });
            setLocations(res.data.data);
        } catch {
            toast.error('Failed to fetch locations.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchLocations(); }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    
    const handleEditClick = (location: Location) => {
        setEditingId(location._id);
        setFormData({
            areaName: location.areaName,
            city: location.city,
            district: location.district,
            state: location.state,
            pincode: location.pincode
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(emptyForm);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const promise = editingId
            ? api.put(`/admin/locations/${editingId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('/admin/locations', formData, { headers: { Authorization: `Bearer ${token}` } });
        
        toast.promise(promise, {
            loading: 'Saving location...',
            success: `Location ${editingId ? 'updated' : 'added'} successfully!`,
            error: (err) => err.response?.data?.message || 'Failed to save location.'
        }).then(() => {
            fetchLocations();
            handleCancelEdit();
        }).finally(() => setIsSubmitting(false));
    };

    const handleDelete = async (location: Location) => {
        if (window.confirm(`Are you sure you want to delete "${location.areaName}, ${location.pincode}"?`)) {
            toast.promise(api.delete(`/admin/locations/${location._id}`, { headers: { Authorization: `Bearer ${token}` } }), {
                loading: 'Deleting...',
                success: 'Location deleted!',
                error: 'Failed to delete.'
            }).then(() => fetchLocations());
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl font-extrabold text-slate-800">Manage Service Areas</h1>
                <p className="mt-2 text-slate-500">Add, edit, or remove serviceable pincodes and locations.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 sticky top-24">
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${editingId ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                {editingId ? <Edit size={20}/> : <Plus size={20}/>}
                            </div>
                            <h2 className="font-heading text-xl font-bold text-slate-800">{editingId ? 'Edit Location' : 'Add New Location'}</h2>
                        </div>
                        <FormInput icon={MapPin} name="areaName" value={formData.areaName} onChange={handleChange} placeholder="Area Name (e.g., Madhapur)" required />
                        <FormInput icon={Building} name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                        <FormInput icon={Globe} name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                        <FormInput icon={Hash} name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required maxLength={6} />
                        
                        <div className="flex justify-end gap-3 pt-2">
                            {editingId && <button type="button" onClick={handleCancelEdit} className="h-11 inline-flex items-center justify-center gap-2 px-4 rounded-lg border bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 transition-colors"><X size={16}/>Cancel</button>}
                            <button type="submit" disabled={isSubmitting} className={`h-11 inline-flex items-center justify-center gap-2 px-6 rounded-lg text-white font-semibold transition-all ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : (editingId ? <><Save size={16}/>Update</> : <><Plus size={16}/>Add Location</>)}
                            </button>
                        </div>
                    </form>
                </div>
            
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-4 border-b border-slate-200">
                        <h3 className="font-heading text-xl font-bold text-slate-800">Available Locations ({locations.length})</h3>
                    </div>
                    <div>
                        {isLoading ? (
                            <LocationRowSkeleton />
                        ) : locations.length > 0 ? (
                            locations.map((loc) => (
                                <div key={loc._id} className="flex items-center justify-between p-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/50">
                                    <div>
                                        <p className="font-semibold text-slate-800">{loc.areaName}</p>
                                        <p className="text-sm text-slate-500">{loc.city}, {loc.state} - {loc.pincode}</p>
                                    </div>
                                    <div className="flex-shrink-0 flex gap-2">
                                        <button onClick={() => handleEditClick(loc)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"><Edit size={14}/>Edit</button>
                                        <button onClick={() => handleDelete(loc)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition-colors"><Trash2 size={14}/>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                           <EmptyState />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}