'use client';

import { useState, useEffect, Fragment, FormEvent, ChangeEvent, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, X, UploadCloud, ArrowLeft, CheckCircle, Trash2, Check } from 'lucide-react';
import { getCustomerProfile } from '@/services/customerService';
import api from '@/services/api';

interface Condition {
    label: string;
    priceAdjustment: number;
}

const emptyForm = {
    evaluationAnswers: {} as { [key: string]: string },
    selectedConditions: [] as Condition[],
    productImages: [] as string[],
    addressId: '',
    inspectionDate: '',
    inspectionTimeSlot: ''
};

const StepSidebar = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        { number: 1, title: 'Capacity', description: 'Select the size of your appliance.' },
        { number: 2, title: 'Brand', description: 'Choose the manufacturer.' },
        { number: 3, title: 'Details & Schedule', description: 'Provide condition and pickup info.' }
    ];

    return (
        <div className="w-full md:w-1/3 bg-slate-50 p-6 rounded-l-2xl border-r border-slate-200 hidden md:flex flex-col">
            <h3 className="font-heading text-xl font-bold text-slate-800 mb-2">Sell Your Appliance</h3>
            <p className="text-sm text-slate-500 mb-8">Follow these simple steps to get an instant quote.</p>
            <nav className="flex flex-col space-y-4">
                {steps.map((step) => {
                    const isCompleted = currentStep > step.number;
                    const isActive = currentStep === step.number;
                    return (
                        <div key={step.number} className="flex items-start">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                isCompleted ? 'bg-red-600 text-white' : isActive ? 'bg-red-100 text-red-700 border-2 border-red-200' : 'bg-slate-200 text-slate-500'
                            }`}>
                                {isCompleted ? <Check size={16} /> : step.number}
                            </div>
                            <div className="ml-4">
                                <h4 className={`font-semibold text-sm ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>{step.title}</h4>
                                <p className="text-xs text-slate-400">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

const PriceSummary = ({ basePrice, adjustments }: { basePrice: number, adjustments: Condition[] }) => {
    const totalAdjustment = useMemo(() => adjustments.reduce((acc, curr) => acc + curr.priceAdjustment, 0), [adjustments]);
    const estimatedPrice = useMemo(() => basePrice + totalAdjustment, [basePrice, totalAdjustment]);

    return (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 sticky top-0">
            <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-500">Base Price</span>
                <span className="font-semibold text-slate-700">₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
            {adjustments.map(adj => (
                 <div key={adj.label} className="flex justify-between items-baseline text-sm">
                    <span className="text-slate-500">{adj.label}</span>
                    <span className={`font-semibold ${adj.priceAdjustment >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {adj.priceAdjustment >= 0 ? '+' : '-'} ₹{Math.abs(adj.priceAdjustment).toLocaleString('en-IN')}
                    </span>
                </div>
            ))}
            <div className="pt-3 mt-2 border-t border-dashed flex justify-between items-center">
                <span className="text-base font-bold text-slate-800">Estimated Price</span>
                <span className="text-2xl font-bold text-emerald-600">₹{estimatedPrice.toLocaleString('en-IN')}</span>
            </div>
        </div>
    );
};

export function SellRequestModal({ isOpen, onClose, category }: { isOpen: boolean, onClose: () => void, category: any | null }) {
    const [step, setStep] = useState(1);
    const [selectedCapacity, setSelectedCapacity] = useState<any | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [customerAddresses, setCustomerAddresses] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isOpen && token && user?.role === 'customer') {
            getCustomerProfile(token).then(res => {
                setCustomerAddresses(res.data.addresses);
                const defaultAddress = res.data.addresses.find((a: any) => a.isDefault) || res.data.addresses[0];
                if (defaultAddress) setFormData(prev => ({ ...prev, addressId: defaultAddress._id }));
            }).catch(() => toast.error("Could not fetch addresses."));
        }
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setSelectedCapacity(null);
                setSelectedBrand(null);
                setFormData(emptyForm);
            }, 300);
        }
    }, [isOpen, token, user]);

    const estimatedPrice = useMemo(() => {
        if (!selectedBrand?.basePrice) return 0;
        const totalAdjustment = formData.selectedConditions.reduce((acc, curr) => acc + curr.priceAdjustment, 0);
        return selectedBrand.basePrice + totalAdjustment;
    }, [selectedBrand, formData.selectedConditions]);

    const handleConditionToggle = (condition: Condition) => {
        setFormData(prev => {
            const isSelected = prev.selectedConditions.some(c => c.label === condition.label);
            const newSelectedConditions = isSelected
                ? prev.selectedConditions.filter(c => c.label !== condition.label)
                : [...prev.selectedConditions, condition];
            return { ...prev, selectedConditions: newSelectedConditions };
        });
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).slice(0, 4 - formData.productImages.length);
        if (files.length === 0) return;
        
        setIsUploading(true);
        const uploadPromises = files.map(async file => {
            try {
                const res = await api.post('/customer/uploads/generate-url', { fileType: file.type }, { headers: { Authorization: `Bearer ${token}` } });
                const { uploadURL, imageUrl } = res.data;
                await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
                return imageUrl;
            } catch { return null; }
        });
        const urls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
        setFormData(prev => ({ ...prev, productImages: [...prev.productImages, ...urls] }));
        setIsUploading(false);
        if (urls.length > 0) toast.success(`${urls.length} image(s) uploaded!`);
        else toast.error('Image upload failed.');
    };

    const removeImage = (index: number) => setFormData(prev => ({ ...prev, productImages: prev.productImages.filter((_, i) => i !== index) }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token) { toast.error("Please log in to submit a request."); onClose(); return; }
        if (user?.role !== 'customer') { toast.error("Only customers can sell appliances."); return; }
        setIsSubmitting(true);

        const evaluationFromQuestions = Object.entries(formData.evaluationAnswers).map(([question, answer]) => ({ question, answer }));
        const evaluationFromConditions = formData.selectedConditions.map(c => ({ question: `Condition: ${c.label}`, answer: 'Yes' }));
        const submissionData = {
            buybackCategoryId: category._id, buybackCapacityId: selectedCapacity._id, buybackBrandId: selectedBrand._id,
            evaluationData: [...evaluationFromQuestions, ...evaluationFromConditions],
            estimatedPrice, productImages: formData.productImages, addressId: formData.addressId,
            inspectionDate: formData.inspectionDate, inspectionTimeSlot: formData.inspectionTimeSlot,
        };
        try {
            const res = await api.post('/customer/sell-requests/new', submissionData, { headers: { Authorization: `Bearer ${token}` } });
            toast.success(res.data.message); onClose();
        } catch (err: any) { toast.error(err.response?.data?.message || "Failed to submit request."); }
        finally { setIsSubmitting(false); }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (<div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Select {category?.name} Capacity</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {category?.capacities.map((cap: any) => (
                            <button type="button" key={cap._id} onClick={() => { setSelectedCapacity(cap); setStep(2); }} className="p-6 text-center border-2 rounded-xl text-lg font-semibold text-slate-700 hover:bg-red-50 hover:border-red-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                {cap.name}
                            </button>
                        ))}
                    </div>
                </div>);
            case 2:
                return (<div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Select Brand</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedCapacity?.brands.map((brand: any) => (
                            <button type="button" key={brand._id} onClick={() => { setSelectedBrand(brand); setStep(3); }} className="relative p-3 border-2 rounded-xl hover:bg-red-50 hover:border-red-500 flex flex-col items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                <img src={brand.imageUrl} alt={brand.name} className="h-16 object-contain" />
                                <span className="text-sm font-semibold text-slate-700 mt-2">{brand.name}</span>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                    Value up to ₹{brand.basePrice?.toLocaleString('en-IN')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>);
            case 3:
                return (<form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                             <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Select product condition</h4>
                                <div className="space-y-2">
                                    {selectedBrand?.conditionPricing?.map((c: Condition) => (
                                        <label key={c.label} className="flex items-center justify-between p-3 rounded-lg bg-white border has-[:checked]:border-red-500 has-[:checked]:bg-red-50 transition-all duration-200 cursor-pointer">
                                            <span className="text-sm font-medium text-slate-600">{c.label}</span>
                                            <input type="checkbox" onChange={() => handleConditionToggle(c)} className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500 shrink-0" />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {selectedBrand?.evaluationQuestions?.length > 0 && <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Answer a few questions</h4>
                                <div className="space-y-4">
                                    {selectedBrand?.evaluationQuestions?.map((q: string, i: number) => (<div key={i}><label className="text-sm font-medium text-slate-700">{q}</label><input onChange={e => setFormData(prev => ({ ...prev, evaluationAnswers: { ...prev.evaluationAnswers, [q]: e.target.value } }))} required className="mt-1 w-full h-11 px-3 rounded-lg border-slate-300 focus:border-red-500 focus:ring-red-500" /></div>))}
                                </div>
                            </div>}
                        </div>
                        <PriceSummary basePrice={selectedBrand?.basePrice || 0} adjustments={formData.selectedConditions} />
                    </div>

                    <div className="pt-6 border-t">
                        <h4 className="font-semibold text-slate-800 mb-2">Upload Photos (up to 4)</h4>
                        <div className="grid grid-cols-4 gap-3">
                            {formData.productImages.map((url, i) => (<div key={i} className="relative aspect-square group"><img src={url} alt="product" className="w-full h-full object-cover rounded-lg" /><button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button></div>))}
                            {formData.productImages.length < 4 && <label className="cursor-pointer aspect-square flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:border-red-500 text-slate-400 hover:text-red-500 transition-colors">{isUploading ? <Loader2 className="animate-spin" /> : <><UploadCloud size={32} /><span className="text-xs mt-1">Upload</span></>}<input type="file" multiple onChange={handleFileChange} className="sr-only" accept="image/*" /></label>}
                        </div>
                    </div>
                     <div className="pt-6 border-t">
                        <h4 className="font-semibold text-slate-800 mb-2">Schedule Inspection & Pickup</h4>
                        <div className="space-y-4">
                            <div><label className="text-sm font-medium text-slate-700">Address</label><select value={formData.addressId} onChange={e => setFormData({ ...formData, addressId: e.target.value })} required className="mt-1 w-full h-11 px-3 rounded-lg border-slate-300 focus:border-red-500 focus:ring-red-500">{customerAddresses.map((addr: any) => <option key={addr._id} value={addr._id}>{`${addr.label}: ${addr.street}, ${addr.city}`}</option>)}</select></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium text-slate-700">Date</label><input type="date" value={formData.inspectionDate} min={new Date().toISOString().split("T")[0]} onChange={e => setFormData({ ...formData, inspectionDate: e.target.value })} required className="mt-1 w-full h-11 px-3 rounded-lg border-slate-300 focus:border-red-500 focus:ring-red-500" /></div>
                                <div><label className="text-sm font-medium text-slate-700">Time Slot</label><select value={formData.inspectionTimeSlot} onChange={e => setFormData({ ...formData, inspectionTimeSlot: e.target.value })} required className="mt-1 w-full h-11 px-3 rounded-lg border-slate-300 focus:border-red-500 focus:ring-red-500"><option value="">Select Time</option><option>09:00 AM - 11:00 AM</option><option>11:00 AM - 01:00 PM</option><option>02:00 PM - 04:00 PM</option><option>04:00 PM - 06:00 PM</option></select></div>
                            </div>
                        </div>
                    </div>
                </form>);
            default: return null;
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-black/50 backdrop-blur-sm" /></Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="relative w-full max-w-4xl transform rounded-2xl bg-white shadow-xl flex flex-col md:flex-row">
                            <StepSidebar currentStep={step} />
                            <div className="flex flex-col flex-1">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <div className="flex items-center gap-3">
                                        {step > 1 && <button onClick={() => setStep(step - 1)} className="p-2 rounded-full hover:bg-slate-100"><ArrowLeft size={20} /></button>}
                                        <div className="md:hidden"><StepSidebar currentStep={step} /></div>
                                    </div>
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X size={20} /></button>
                                </div>
                                <div className="overflow-y-auto max-h-[75vh]">
                                    {renderStepContent()}
                                </div>
                                <div className="p-4 flex justify-between items-center border-t bg-slate-50/50 rounded-b-2xl md:rounded-bl-none">
                                    {step < 3 ? <div /> : <span className="text-lg font-bold text-slate-800">Final Quote: <span className="text-emerald-600">₹{estimatedPrice.toLocaleString('en-IN')}</span></span>}
                                    {step < 3 ? (
                                        <button type="button" onClick={() => setStep(step + 1)} disabled={ (step === 1 && !selectedCapacity) || (step === 2 && !selectedBrand) } className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 font-semibold text-white disabled:bg-slate-400">Next Step</button>
                                    ) : (
                                        <button type="submit" onClick={handleSubmit} disabled={isSubmitting || isUploading || !formData.addressId || !formData.inspectionDate || !formData.inspectionTimeSlot} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 font-semibold text-white disabled:bg-slate-400">
                                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Request'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}