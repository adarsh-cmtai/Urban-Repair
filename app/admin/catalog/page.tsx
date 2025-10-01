'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    getAdminCategories, createCategory, updateCategory,
    getAdminServices, createService, updateService,
    getAdminSubServices, createSubService, updateSubService
} from '@/services/adminService';
import { CatalogFormModal } from '@/components/admin/catalog/CatalogFormModal';
import { Loader2, Plus, Edit, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CatalogItem {
    _id: string;
    name: string;
    imageUrl: string;
    type?: string;
}

type ModalItemType = 'Category' | 'Service' | 'Sub-Service';

interface ModalState {
    isOpen: boolean;
    itemType: ModalItemType;
    initialData: CatalogItem | null;
    additionalData: any | null;
}

export default function ServiceCatalogPage() {
    const [categories, setCategories] = useState<CatalogItem[]>([]);
    const [services, setServices] = useState<CatalogItem[]>([]);
    const [subServices, setSubServices] = useState<CatalogItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CatalogItem | null>(null);
    const [selectedService, setSelectedService] = useState<CatalogItem | null>(null);

    const [isLoading, setIsLoading] = useState({ categories: true, services: false, subServices: false });
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, itemType: 'Category', initialData: null, additionalData: null });
    
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchCategories = async () => {
        if (!token) return;
        setIsLoading(prev => ({ ...prev, categories: true }));
        try {
            const res = await getAdminCategories(token);
            setCategories(res.data);
        } finally {
            setIsLoading(prev => ({ ...prev, categories: false }));
        }
    };
    
    useEffect(() => { fetchCategories(); }, [token]);

    useEffect(() => {
        if (selectedCategory && token) {
            setIsLoading(prev => ({ ...prev, services: true }));
            getAdminServices(selectedCategory._id, token).then(res => {
                setServices(res.data);
            }).finally(() => setIsLoading(prev => ({ ...prev, services: false })));
        } else {
            setServices([]);
        }
        setSelectedService(null);
    }, [selectedCategory, token]);

    useEffect(() => {
        if (selectedService && token) {
            setIsLoading(prev => ({ ...prev, subServices: true }));
            getAdminSubServices(selectedService._id, token).then(res => {
                setSubServices(res.data);
            }).finally(() => setIsLoading(prev => ({ ...prev, subServices: false })));
        } else {
            setSubServices([]);
        }
    }, [selectedService, token]);

    const handleOpenModal = (itemType: ModalItemType, initialData: CatalogItem | null = null, additionalData: any = null) => {
        setModalState({ isOpen: true, itemType, initialData, additionalData });
    };

    const handleFormSuccess = async (data: any) => {
        const { itemType, initialData } = modalState;
        let promise;

        if (initialData) {
            if (itemType === 'Category') promise = updateCategory(initialData._id, data, token!);
            else if (itemType === 'Service') promise = updateService(initialData._id, data, token!);
            else promise = updateSubService(initialData._id, data, token!);
        } else {
            if (itemType === 'Category') promise = createCategory(data, token!);
            else if (itemType === 'Service') promise = createService(data, token!);
            else promise = createSubService(data, token!);
        }
        
        toast.promise(promise, {
            loading: `${initialData ? 'Updating' : 'Creating'} ${itemType}...`,
            success: `${itemType} ${initialData ? 'updated' : 'created'} successfully!`,
            error: (err) => err.response?.data?.message || `Failed to ${initialData ? 'update' : 'create'} ${itemType}.`
        }).then(() => {
            if (itemType === 'Category') fetchCategories();
            if (itemType === 'Service' && selectedCategory) getAdminServices(selectedCategory._id, token!).then(res => setServices(res.data));
            if (itemType === 'Sub-Service' && selectedService) getAdminSubServices(selectedService._id, token!).then(res => setSubServices(res.data));
        });

        setModalState({ isOpen: false, itemType: 'Category', initialData: null, additionalData: null });
    };

    const renderColumn = (title: string, items: CatalogItem[], isLoading: boolean, onAdd: () => void, onSelect: (item: CatalogItem) => void, selectedItem: CatalogItem | null, itemType: ModalItemType, addDisabled: boolean = false) => (
        <div className="bg-white rounded-lg shadow-md p-4 flex-1 min-w-[300px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-montserrat font-bold text-lg">{title}</h2>
                <button onClick={onAdd} className="p-1.5 bg-brand-red text-white rounded-full hover:bg-red-700 disabled:bg-gray-300" disabled={addDisabled}><Plus className="w-4 h-4" /></button>
            </div>
            {isLoading ? <div className="flex justify-center p-4"><Loader2 className="animate-spin text-brand-red"/></div> : (
                <ul className="space-y-2">
                    {items.map(item => (
                        <li key={item._id} onClick={() => onSelect(item)} className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${selectedItem?._id === item._id ? 'bg-red-100' : 'hover:bg-slate-50'}`}>
                            <div className="flex items-center gap-3">
                                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-md"/>
                                <div>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    {item.type && <p className="text-xs text-gray-500">{item.type}</p>}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button onClick={(e) => { e.stopPropagation(); handleOpenModal(itemType, item, { categoryId: selectedCategory?._id, serviceId: selectedService?._id }); }} className="p-1 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                                {itemType !== 'Sub-Service' && <ChevronRight className={`w-5 h-5 ${selectedItem?._id === item._id ? 'text-brand-red' : 'text-gray-300'}`}/>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Service Catalog Management</h1>
            <div className="flex flex-col lg:flex-row gap-6">
                {renderColumn('Categories', categories, isLoading.categories, () => handleOpenModal('Category'), setSelectedCategory, selectedCategory, 'Category')}
                {renderColumn(`Services ${selectedCategory ? `in ${selectedCategory.name}`: ''}`, services, isLoading.services, () => handleOpenModal('Service', null, { categoryId: selectedCategory?._id }), setSelectedService, selectedService, 'Service', !selectedCategory)}
                {renderColumn(`Sub-Services ${selectedService ? `for ${selectedService.name}`: ''}`, subServices, isLoading.subServices, () => handleOpenModal('Sub-Service', null, { serviceId: selectedService?._id }), () => {}, null, 'Sub-Service', !selectedService)}
            </div>

            <CatalogFormModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onSuccess={handleFormSuccess}
                initialData={modalState.initialData}
                itemType={modalState.itemType}
                additionalData={modalState.additionalData}
                token={token}
            />
        </div>
    );
}