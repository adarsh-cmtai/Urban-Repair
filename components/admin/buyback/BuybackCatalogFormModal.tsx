'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, X, Plus, Trash2, UploadCloud, MapPin, IndianRupee } from 'lucide-react';
import { getUploadPresignedUrl, createBuybackCategory, updateBuybackCategory, createBuybackCapacity, updateBuybackCapacity, createBuybackBrand, updateBuybackBrand, getAdminLocations } from '@/services/adminService';

interface Condition {
    label: string;
    priceAdjustment: string | number;
}

interface FormDataState {
    name: string;
    imageUrl: string;
    evaluationQuestions: string[];
    basePrice: string | number;
    serviceableLocations: string[];
    conditionPricing: Condition[];
}

const emptyFormData: FormDataState = {
    name: '',
    imageUrl: '',
    evaluationQuestions: [],
    basePrice: '',
    serviceableLocations: [],
    conditionPricing: [],
};


export function BuybackCatalogFormModal({ isOpen, onClose, onSuccess, initialData, itemType, selectedCategory, selectedCapacity }: any) {
    const [formData, setFormData] = useState<FormDataState>(emptyFormData);
    const [allLocations, setAllLocations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            if (itemType === 'Brand' && token) {
                getAdminLocations(token).then(res => setAllLocations(res.data));
            }
            setFormData({
                name: initialData?.name || '',
                imageUrl: initialData?.imageUrl || '',
                evaluationQuestions: initialData?.evaluationQuestions || [],
                basePrice: initialData?.basePrice || '',
                serviceableLocations: initialData?.serviceableLocations?.map((loc: any) => typeof loc === 'string' ? loc : loc._id) || [],
                conditionPricing: initialData?.conditionPricing || [],
            });
        }
    }, [initialData, isOpen, itemType, token]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return; setIsUploading(true);
        try {
            const { uploadURL, imageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setFormData(prev => ({ ...prev, imageUrl }));
            toast.success('Image uploaded!');
        } catch { toast.error('Image upload failed.'); } finally { setIsUploading(false); }
    };

    const handleQuestionChange = (index: number, value: string) => setFormData(prev => {
        const newQ = [...prev.evaluationQuestions];
        newQ[index] = value;
        return { ...prev, evaluationQuestions: newQ };
    });

    const addQuestion = () => setFormData(prev => ({ ...prev, evaluationQuestions: [...prev.evaluationQuestions, ''] }));
    const removeQuestion = (index: number) => setFormData(prev => ({ ...prev, evaluationQuestions: prev.evaluationQuestions.filter((_, i: number) => i !== index) }));
    
    const handleConditionChange = (index: number, field: keyof Condition, value: string) => {
        const updatedConditions = [...formData.conditionPricing];
        updatedConditions[index] = { ...updatedConditions[index], [field]: value };
        setFormData(prev => ({ ...prev, conditionPricing: updatedConditions }));
    };

    const addCondition = () => setFormData(prev => ({ ...prev, conditionPricing: [...prev.conditionPricing, { label: '', priceAdjustment: '' }] }));
    const removeCondition = (index: number) => setFormData(prev => ({ ...prev, conditionPricing: prev.conditionPricing.filter((_, i: number) => i !== index) }));


    const handleLocationToggle = (locationId: string) => {
        setFormData(prev => ({
            ...prev,
            serviceableLocations: prev.serviceableLocations.includes(locationId)
                ? prev.serviceableLocations.filter((id: string) => id !== locationId)
                : [...prev.serviceableLocations, locationId]
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); setIsSubmitting(true);
        let promise; 
        
        let dataToSend: any = { 
            ...formData, 
            evaluationQuestions: formData.evaluationQuestions.filter(Boolean),
            conditionPricing: formData.conditionPricing
                .filter(c => c.label && c.priceAdjustment)
                .map(c => ({ ...c, priceAdjustment: Number(c.priceAdjustment) })),
        };

        try {
            if (itemType === 'Category') {
                promise = isEditMode ? updateBuybackCategory(initialData._id, dataToSend, token!) : createBuybackCategory(dataToSend, token!);
            } else if (itemType === 'Capacity') {
                dataToSend.categoryId = selectedCategory._id;
                promise = isEditMode ? updateBuybackCapacity(initialData._id, dataToSend, token!) : createBuybackCapacity(dataToSend, token!);
            } else { 
                dataToSend.categoryId = selectedCategory._id;
                dataToSend.capacityId = selectedCapacity._id;
                promise = isEditMode ? updateBuybackBrand(initialData._id, dataToSend, token!) : createBuybackBrand(dataToSend, token!);
            }
            await toast.promise(promise, { loading: 'Saving...', success: `${itemType} saved!`, error: 'Failed to save.' });
            onSuccess();
        } catch (err) { }
        finally { setIsSubmitting(false); }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-lg transform rounded-2xl bg-white shadow-xl flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="font-heading text-xl font-bold">{isEditMode ? `Edit ${itemType}` : `Add New ${itemType}`}</h3>
                                <button onClick={onClose}><X /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                                {(itemType === 'Category' || itemType === 'Brand') && (
                                    <label htmlFor="file-upload" className="cursor-pointer group relative flex justify-center items-center rounded-xl border-2 border-dashed border-slate-300 h-40">
                                        {isUploading ? <div className="text-center"><Loader2 className="animate-spin w-8 h-8 text-red-600 mx-auto" /><p>Uploading...</p></div>
                                            : formData.imageUrl ? <><img src={formData.imageUrl} alt="Uploaded" className="max-h-full max-w-full object-contain rounded-md" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl"><span className="text-white font-semibold">Change Image</span></div></>
                                                : <div className="text-center text-slate-500"><UploadCloud className="mx-auto w-10 h-10" /><p className="mt-2 font-semibold">Upload Image</p></div>}
                                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                    </label>
                                )}
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder={`${itemType} Name`} required className="w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 px-4" />

                                {itemType === 'Brand' && (
                                    <>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input type="number" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} placeholder="Base Market Price (New)" required className="w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 pl-10" />
                                        </div>
                                        <div className="space-y-3 pt-2">
                                            <label className="text-sm font-semibold text-slate-700">Evaluation Questions</label>
                                            {formData.evaluationQuestions.map((q, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input value={q} onChange={e => handleQuestionChange(i, e.target.value)} placeholder={`Question ${i + 1}`} className="flex-grow h-11 text-base bg-slate-100 rounded-lg border-slate-300 px-3" />
                                                    <button type="button" onClick={() => removeQuestion(i)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={addQuestion} className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"><Plus size={14} />Add Question</button>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <label className="text-sm font-semibold text-slate-700">Condition-Based Price Adjustments</label>
                                            <p className="text-xs text-slate-500 -mt-2">Use negative numbers for deductions (e.g., -2000).</p>
                                            {formData.conditionPricing.map((c, i) => (
                                                <div key={i} className="grid grid-cols-12 items-center gap-2">
                                                    <input value={c.label} onChange={e => handleConditionChange(i, 'label', e.target.value)} placeholder="Condition Label" className="col-span-7 h-11 text-base bg-slate-100 rounded-lg border-slate-300 px-3" />
                                                    <input type="number" value={c.priceAdjustment} onChange={e => handleConditionChange(i, 'priceAdjustment', e.target.value)} placeholder="e.g. -500" className="col-span-4 h-11 text-base bg-slate-100 rounded-lg border-slate-300 px-3" />
                                                    <button type="button" onClick={() => removeCondition(i)} className="col-span-1 p-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={addCondition} className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"><Plus size={14} />Add Condition</button>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><MapPin size={16}/>Serviceable Locations</label>
                                            <div className="max-h-40 overflow-y-auto space-y-2 p-3 border rounded-lg bg-slate-50 mt-2">
                                                {allLocations.map((loc: any) => (
                                                    <label key={loc._id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100">
                                                        <input type="checkbox" checked={formData.serviceableLocations.includes(loc._id)} onChange={() => handleLocationToggle(loc._id)} className="h-4 w-4 rounded text-red-600" />
                                                        <span>{loc.areaName}, {loc.pincode}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </form>
                            <div className="p-6 flex justify-end gap-3 border-t">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white text-sm font-semibold">Cancel</button>
                                <button type="button" onClick={handleSubmit} disabled={isSubmitting || isUploading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white disabled:bg-slate-400">
                                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Save'}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}