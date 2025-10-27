'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getUploadPresignedUrl, getAdminLocations } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, X, Plus, Trash2, Tag, IndianRupee, Clock, List, ListX, ShieldQuestion, MapPin } from 'lucide-react';

const FormInput = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input {...props} className="pl-10 w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500" />
    </div>
);
const FormSelect = ({ icon: Icon, children, ...props }: { icon: React.ElementType, children: React.ReactNode, [key: string]: any }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <select {...props} className="pl-10 pr-4 appearance-none w-full h-12 text-base bg-slate-100 rounded-lg border-slate-300 focus:ring-red-500 focus:border-red-500">
            {children}
        </select>
    </div>
);

export function CatalogFormModal({ isOpen, onClose, onSuccess, initialData, itemType, token }: any) {
    const [formData, setFormData] = useState({ name: '', imageUrl: '', price: '', duration: '', type: 'Appliance', inclusions: [] as string[], exclusions: [] as string[], serviceableLocations: [] as string[] });
    const [allLocations, setAllLocations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: initialData?.name || '',
                imageUrl: initialData?.imageUrl || '',
                price: initialData?.price || '',
                duration: initialData?.duration || '',
                type: initialData?.type || 'Appliance',
                inclusions: initialData?.inclusions || [],
                exclusions: initialData?.exclusions || [],
                serviceableLocations: initialData?.serviceableLocations?.map((loc: any) => loc._id) || []
            });

            if (itemType === 'Service' && token) {
                getAdminLocations(token).then(res => setAllLocations(res.data));
            }
        }
    }, [initialData, isOpen, itemType, token]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleLocationToggle = (locationId: string) => {
        setFormData(prev => {
            const serviceableLocations = prev.serviceableLocations.includes(locationId)
                ? prev.serviceableLocations.filter(id => id !== locationId)
                : [...prev.serviceableLocations, locationId];
            return { ...prev, serviceableLocations };
        });
    };

    const handleArrayChange = (setter: Function, index: number, value: string) => {
        setter((prev: string[]) => prev.map((item, i) => (i === index ? value : item)));
    };
    const addArrayItem = (setter: Function) => setter((prev: string[]) => [...prev, '']);
    const removeArrayItem = (setter: Function, index: number) => setter((prev: string[]) => prev.filter((_, i) => i !== index));
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const { uploadURL, imageUrl: finalImageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setFormData(prev => ({...prev, imageUrl: finalImageUrl}));
            toast.success('Image uploaded!');
        } catch (error) { toast.error('Image upload failed.'); } 
        finally { setIsUploading(false); }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { price, ...restOfData } = formData;
            let finalData: any = { ...restOfData, inclusions: formData.inclusions.filter(Boolean), exclusions: formData.exclusions.filter(Boolean) };
            
            if ((itemType === 'Service' || itemType === 'Sub-Service')) {
                if (!price || parseFloat(price) <= 0) {
                    toast.error('Please enter a valid price.');
                    setIsSubmitting(false);
                    return;
                }
                finalData.price = parseFloat(price);
            }
            await onSuccess(finalData);
        } catch (error) { console.error("Submission failed:", error); } 
        finally { setIsSubmitting(false); }
    };

    const renderArrayField = (label: string, items: string[], setter: Function) => (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">{label === 'Inclusions' ? <List className="w-4 h-4 mr-2"/> : <ListX className="w-4 h-4 mr-2"/>}{label}</label>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input value={item} onChange={(e) => handleArrayChange(setter, index, e.target.value)} className="flex-grow h-11 text-base bg-slate-100 rounded-lg border-slate-300" placeholder={`Enter ${label.slice(0, -1)}...`}/>
                    <button type="button" onClick={() => removeArrayItem(setter, index)} className="p-2 text-slate-400 hover:text-red-600 rounded-full"><Trash2 size={16}/></button>
                </div>
            ))}
            <button type="button" onClick={() => addArrayItem(setter)} className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"><Plus size={14}/>Add {label.slice(0, -1)}</button>
        </div>
    );

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black/50 backdrop-blur-sm" /></Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <Dialog.Panel className="relative w-full max-w-3xl transform rounded-2xl bg-white shadow-xl flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b"><Dialog.Title as="h3" className="font-heading text-xl font-bold text-slate-800">{isEditMode ? `Edit ${itemType}` : `Add New ${itemType}`}</Dialog.Title><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="text-slate-500"/></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                            <label htmlFor="file-upload" className="cursor-pointer group relative flex justify-center items-center rounded-xl border-2 border-dashed border-slate-300 h-48">
                                {isUploading ? <div className="text-center"><Loader2 className="animate-spin w-8 h-8 text-red-600 mx-auto" /><p className="mt-2 text-sm text-slate-500">Uploading...</p></div>
                                : formData.imageUrl ? <><img src={formData.imageUrl} alt="Uploaded" className="max-h-full max-w-full object-contain rounded-md"/><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl"><span className="text-white font-semibold text-sm">Change Image</span></div></>
                                : <div className="text-center text-slate-500"><UploadCloud className="mx-auto w-10 h-10" /><p className="mt-2 text-sm font-semibold">Click to upload image</p></div>}
                                <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isUploading}/>
                            </label>
                            <FormInput icon={Tag} name="name" value={formData.name} onChange={handleChange} placeholder={`${itemType} Name`} required />
                            {(itemType === 'Service' || itemType === 'Sub-Service') && <FormInput icon={IndianRupee} name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required min="1" step="0.01" />}
                            
                            {itemType === 'Service' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput icon={Clock} name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 60-90 Mins)" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderArrayField('Inclusions', formData.inclusions, (items: string[]) => setFormData(p => ({...p, inclusions: items})))}
                                        {renderArrayField('Exclusions', formData.exclusions, (items: string[]) => setFormData(p => ({...p, exclusions: items})))}
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 flex items-center mb-2"><MapPin className="w-4 h-4 mr-2"/>Serviceable Locations</label>
                                        <p className="text-xs text-slate-500 mb-3">Select locations where this service is available. Leave empty for nationwide availability.</p>
                                        <div className="max-h-48 overflow-y-auto space-y-2 p-3 border rounded-lg bg-slate-50">
                                            {allLocations.map((loc: any) => (
                                                <label key={loc._id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.serviceableLocations.includes(loc._id)}
                                                        onChange={() => handleLocationToggle(loc._id)}
                                                        className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">{loc.areaName}, {loc.pincode}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {itemType === 'Sub-Service' && (
                                <FormSelect icon={ShieldQuestion} name="type" value={formData.type} onChange={handleChange}>
                                    <option value="Appliance">Appliance Type</option>
                                    <option value="Problem">Problem Type</option>
                                </FormSelect>
                            )}
                        </form>
                        <div className="p-6 flex justify-end gap-3 border-t bg-slate-50/50 rounded-b-2xl">
                            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border bg-white text-sm font-semibold text-slate-700">Cancel</button>
                            <button type="button" onClick={handleSubmit} disabled={isSubmitting || isUploading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white disabled:bg-slate-400">
                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5"/> : (isEditMode ? 'Save Changes' : `Create ${itemType}`)}
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div></div>
            </Dialog>
        </Transition.Root>
    );
}