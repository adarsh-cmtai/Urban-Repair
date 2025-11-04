// File: src/components/admin/buyback/BuybackServiceFormModal.tsx
'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, X, Plus, Trash2, Tag, UploadCloud, HelpCircle } from 'lucide-react';
import { getUploadPresignedUrl, getAdminCategories, createBuybackService, updateBuybackService } from '@/services/adminService';

const emptyForm = { name: '', imageUrl: '', categoryId: '', evaluationQuestions: [] as string[] };

export function BuybackServiceFormModal({ isOpen, onClose, onSuccess, initialData }: any) {
    const [formData, setFormData] = useState(emptyForm);
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            getAdminCategories(token!).then(res => setCategories(res.data));
            if (initialData) {
                setFormData({
                    name: initialData.name || '',
                    imageUrl: initialData.imageUrl || '',
                    categoryId: initialData.categoryId?._id || initialData.categoryId || '',
                    evaluationQuestions: initialData.evaluationQuestions || []
                });
            } else {
                setFormData(emptyForm);
            }
        }
    }, [initialData, isOpen, token]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const { uploadURL, imageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setFormData(prev => ({ ...prev, imageUrl }));
            toast.success('Image uploaded!');
        } catch { toast.error('Image upload failed.'); } 
        finally { setIsUploading(false); }
    };

    const handleQuestionChange = (index: number, value: string) => {
        setFormData(prev => {
            const newQuestions = [...prev.evaluationQuestions];
            newQuestions[index] = value;
            return { ...prev, evaluationQuestions: newQuestions };
        });
    };

    const addQuestion = () => setFormData(prev => ({ ...prev, evaluationQuestions: [...prev.evaluationQuestions, ''] }));
    const removeQuestion = (index: number) => setFormData(prev => ({ ...prev, evaluationQuestions: prev.evaluationQuestions.filter((_, i) => i !== index) }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const dataToSend = {
            ...formData,
            price: 0, 
            duration: 'Inspection',
            inclusions: [],
            exclusions: []
        };
        
        const promise = isEditMode
            ? updateBuybackService(initialData._id, dataToSend, token!)
            : createBuybackService(dataToSend, token!);

        toast.promise(promise, {
            loading: isEditMode ? 'Updating service...' : 'Creating service...',
            success: `Service ${isEditMode ? 'updated' : 'created'}!`,
            error: 'Failed to save service.'
        }).then(() => onSuccess()).finally(() => setIsSubmitting(false));
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-2xl transform rounded-2xl bg-white shadow-xl flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="font-heading text-xl font-bold text-slate-800">{isEditMode ? 'Edit Buyback Service' : 'Add New Buyback Service'}</h3>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="text-slate-500"/></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                                <label htmlFor="file-upload" className="cursor-pointer group ..."><UploadCloud /></label> {/* Simplified for brevity */}
                                <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                <input name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Service Name (e.g., Sell Your Old AC)" required className="w-full h-12 ..." />
                                <select name="categoryId" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} required className="w-full h-12 ...">
                                    <option value="">Select a Category</option>
                                    {categories.map((cat: any) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                </select>
                                
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><HelpCircle size={16}/>Evaluation Questions</label>
                                    {formData.evaluationQuestions.map((q, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input value={q} onChange={e => handleQuestionChange(index, e.target.value)} placeholder={`Question ${index + 1}`} className="flex-grow h-11 ..."/>
                                            <button type="button" onClick={() => removeQuestion(index)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addQuestion} className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"><Plus size={14}/>Add Question</button>
                                </div>
                            </form>
                             <div className="p-6 flex justify-end gap-3 border-t bg-slate-50/50 rounded-b-2xl">
                                <button type="button" onClick={onClose}>Cancel</button>
                                <button type="button" onClick={handleSubmit} disabled={isSubmitting || isUploading}>{isSubmitting ? <Loader2 className="animate-spin"/> : (isEditMode ? 'Save Changes' : 'Create Service')}</button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}