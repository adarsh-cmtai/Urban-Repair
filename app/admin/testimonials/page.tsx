'use client';

import { useEffect, useState, FormEvent, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Edit, Trash2, Star, UploadCloud, XCircle } from 'lucide-react';
import { getUploadPresignedUrl, getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services/adminService';
import { Dialog, Transition } from '@headlessui/react';
import { TestimonialFormModal } from '@/components/admin/testimonials/TestimonialFormModal';

interface Testimonial {
    _id: string;
    name: string;
    service: string;
    rating: number;
    text: string;
    imageUrl: string;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchTestimonials = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await getAdminTestimonials(token);
            setTestimonials(res.data);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchTestimonials(); }, [token]);
    
    const handleOpenModal = (testimonial: Testimonial | null) => {
        setEditingTestimonial(testimonial);
        setIsModalOpen(true);
    };
    
    const handleSubmitSuccess = async (data: any) => {
        const promise = editingTestimonial
            ? updateTestimonial(editingTestimonial._id, data, token!)
            : createTestimonial(data, token!);
        
        await toast.promise(promise, {
            loading: 'Saving testimonial...',
            success: 'Testimonial saved!',
            error: 'Failed to save.'
        });
        
        setIsModalOpen(false);
        fetchTestimonials();
        return Promise.resolve();
    };
    
    const handleDelete = (testimonial: Testimonial) => {
        if(window.confirm(`Delete testimonial from ${testimonial.name}?`)) {
            toast.promise(deleteTestimonial(testimonial._id, token!), {
                loading: 'Deleting...',
                success: 'Deleted successfully!',
                error: 'Failed to delete.'
            }).then(() => fetchTestimonials());
        }
    }

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="font-montserrat text-3xl font-bold">Manage Testimonials</h1>
                <button onClick={() => handleOpenModal(null)} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white">
                    <Plus /> Add New
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <div key={t._id} className="bg-white p-6 rounded-lg shadow-sm border relative">
                        <div className="flex items-start gap-4">
                            <img src={t.imageUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover"/>
                            <div>
                                <h4 className="font-bold">{t.name}</h4>
                                <p className="text-sm text-gray-500">{t.service}</p>
                            </div>
                        </div>
                        <div className="flex my-2">{[...Array(t.rating)].map((_,i) => <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor"/>)}</div>
                        <p className="text-sm text-gray-600 italic">"{t.text}"</p>
                        <div className="absolute top-2 right-2 flex">
                            <button onClick={() => handleOpenModal(t)} className="p-1 text-gray-400 hover:text-blue-600"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(t)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>

            <TestimonialFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSubmitSuccess}
                initialData={editingTestimonial}
                token={token}
            />
        </div>
    );
}