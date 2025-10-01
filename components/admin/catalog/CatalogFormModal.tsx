'use client';

import { useState, useEffect, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getUploadPresignedUrl } from '@/services/adminService';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, X } from 'lucide-react';

export function CatalogFormModal({ isOpen, onClose, onSuccess, initialData, itemType, additionalData, token }: any) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [inclusions, setInclusions] = useState<string[]>([]);
    const [exclusions, setExclusions] = useState<string[]>([]);
    const [type, setType] = useState('Appliance');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name || '');
                setImageUrl(initialData.imageUrl || '');
                setPrice(initialData.price || '');
                setDuration(initialData.duration || '');
                setInclusions(initialData.inclusions || []);
                setExclusions(initialData.exclusions || []);
                if (initialData.type) setType(initialData.type);
            } else {
                setName('');
                setImageUrl('');
                setPrice('');
                setDuration('');
                setInclusions([]);
                setExclusions([]);
                setType('Appliance');
            }
        }
    }, [initialData, isOpen]);

    const handleArrayChange = (field: 'inclusions' | 'exclusions', index: number, value: string) => {
        const setter = field === 'inclusions' ? setInclusions : setExclusions;
        setter(prev => {
            const newArr = [...prev];
            newArr[index] = value;
            return newArr;
        });
    };
    
    const addArrayItem = (field: 'inclusions' | 'exclusions') => {
        const setter = field === 'inclusions' ? setInclusions : setExclusions;
        setter(prev => [...prev, '']);
    };

    const removeArrayItem = (field: 'inclusions' | 'exclusions', index: number) => {
        const setter = field === 'inclusions' ? setInclusions : setExclusions;
        setter(prev => prev.filter((_, i) => i !== index));
    };
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const { uploadURL, imageUrl: finalImageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setImageUrl(finalImageUrl);
            toast.success('Image uploaded!');
        } catch (error) {
            toast.error('Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let finalData: any = { name, imageUrl, ...additionalData };

        if (itemType === 'Service' || itemType === 'Sub-Service') {
            if (!price || parseFloat(price) <= 0) {
                toast.error('Please enter a valid price.');
                return;
            }
            finalData.price = parseFloat(price);
        }

        if (itemType === 'Service') {
            finalData.duration = duration;
            finalData.inclusions = inclusions;
            finalData.exclusions = exclusions;
        }

        if (itemType === 'Sub-Service') {
            finalData.type = type;
        }
        
        onSuccess(finalData);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-3xl transform rounded-lg bg-white p-6 shadow-xl">
                            <Dialog.Title as="h3" className="text-xl font-montserrat font-bold text-neutral-800">
                                {isEditMode ? `Edit ${itemType}` : `Add New ${itemType}`}
                            </Dialog.Title>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                                <label htmlFor="file-upload" className="cursor-pointer flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">{isUploading ? <Loader2 className="animate-spin" /> : imageUrl ? <img src={imageUrl} alt="Uploaded" className="h-24 mx-auto"/> : <UploadCloud />}</div>
                                    <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="w-full rounded-md" />
                                
                                { (itemType === 'Service' || itemType === 'Sub-Service') &&
                                    <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required min="1" step="0.01" className="w-full rounded-md" />
                                }
                                
                                { itemType === 'Service' && (
                                    <>
                                        <input name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (e.g., 60-90 Mins)" className="w-full rounded-md" />
                                        <div>
                                            <label className="font-semibold">Inclusions</label>
                                            {inclusions.map((item, index) => (
                                                <div key={index} className="flex items-center gap-2 mt-1">
                                                    <input value={item} onChange={(e) => handleArrayChange('inclusions', index, e.target.value)} className="flex-grow rounded-md" />
                                                    <button type="button" onClick={() => removeArrayItem('inclusions', index)} className="p-1 text-red-500"><X/></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addArrayItem('inclusions')} className="text-sm text-blue-600 mt-2">Add Inclusion</button>
                                        </div>
                                        <div>
                                            <label className="font-semibold">Exclusions</label>
                                            {exclusions.map((item, index) => (
                                                <div key={index} className="flex items-center gap-2 mt-1">
                                                    <input value={item} onChange={(e) => handleArrayChange('exclusions', index, e.target.value)} className="flex-grow rounded-md" />
                                                    <button type="button" onClick={() => removeArrayItem('exclusions', index)} className="p-1 text-red-500"><X/></button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addArrayItem('exclusions')} className="text-sm text-blue-600 mt-2">Add Exclusion</button>
                                        </div>
                                    </>
                                )}

                                 {itemType === 'Sub-Service' && (
                                     <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md border-gray-300">
                                        <option value="Appliance">Appliance Type</option>
                                        <option value="Problem">Problem Type</option>
                                    </select>
                                )}

                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={onClose} className="rounded-md border bg-white px-4 py-2 text-sm">Cancel</button>
                                    <button type="submit" disabled={isSubmitting || isUploading} className="inline-flex items-center rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditMode ? 'Save Changes' : `Create ${itemType}`)}
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}