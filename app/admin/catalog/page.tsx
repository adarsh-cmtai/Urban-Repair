'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    getAdminCategories, createCategory, updateCategory, deleteCategory,
    getAdminServices, createService, updateService, deleteService,
    getAdminSubServices, createSubService, updateSubService, deleteSubService,
} from '@/services/adminService';
import { CatalogFormModal } from '@/components/admin/catalog/CatalogFormModal';
import { Loader2, Plus, Edit, ChevronRight, Trash2, LayoutGrid, List, Settings, Inbox } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CatalogItem { _id: string; name: string; imageUrl: string; type?: string; isActive?: boolean; }
type ModalItemType = 'Category' | 'Service' | 'Sub-Service';
interface ModalState { isOpen: boolean; itemType: ModalItemType; initialData: CatalogItem | null; }

const ColumnSkeleton = () => <div className="space-y-2 animate-pulse">{[...Array(4)].map((_, i) => <div key={i} className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg"><div className="w-10 h-10 bg-slate-200 rounded-md"></div><div className="flex-1 h-5 bg-slate-200 rounded"></div></div>)}</div>;
const EmptyState = ({ message }: { message: string }) => <div className="text-center py-12 px-4"><Inbox className="mx-auto h-12 w-12 text-slate-300" /><p className="mt-2 text-sm text-slate-500">{message}</p></div>;

export default function ServiceCatalogPage() {
    const [categories, setCategories] = useState<CatalogItem[]>([]);
    const [services, setServices] = useState<CatalogItem[]>([]);
    const [subServices, setSubServices] = useState<CatalogItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CatalogItem | null>(null);
    const [selectedService, setSelectedService] = useState<CatalogItem | null>(null);
    const [isLoading, setIsLoading] = useState({ categories: true, services: false, subServices: false });
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, itemType: 'Category', initialData: null });
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchCategories = async () => { if (!token) return; setIsLoading(p => ({ ...p, categories: true })); try { const res = await getAdminCategories(token); setCategories(res.data); } finally { setIsLoading(p => ({ ...p, categories: false })); } };
    useEffect(() => { fetchCategories(); }, [token]);
    useEffect(() => { if (selectedCategory && token) { setIsLoading(p => ({ ...p, services: true, subServices: false })); getAdminServices(selectedCategory._id, token).then(res => setServices(res.data)).finally(() => setIsLoading(p => ({ ...p, services: false }))); } else { setServices([]); } setSelectedService(null); setSubServices([]); }, [selectedCategory, token]);
    useEffect(() => { if (selectedService && token) { setIsLoading(p => ({ ...p, subServices: true })); getAdminSubServices(selectedService._id, token).then(res => setSubServices(res.data)).finally(() => setIsLoading(p => ({ ...p, subServices: false }))); } else { setSubServices([]); } }, [selectedService, token]);

    const handleOpenModal = (itemType: ModalItemType, initialData: CatalogItem | null = null) => setModalState({ isOpen: true, itemType, initialData });

    const handleFormSuccess = async (data: any) => {
        const { itemType, initialData } = modalState;
        let promise;
        let finalData = { ...data };

        if (!initialData) { // Only for creation
            if (itemType === 'Service' && selectedCategory) { finalData.categoryId = selectedCategory._id; } 
            else if (itemType === 'Sub-Service' && selectedService) { finalData.serviceId = selectedService._id; }
        }

        if (initialData) {
            if (itemType === 'Category') promise = updateCategory(initialData._id, finalData, token!);
            else if (itemType === 'Service') promise = updateService(initialData._id, finalData, token!);
            else promise = updateSubService(initialData._id, finalData, token!);
        } else {
            if (itemType === 'Category') promise = createCategory(finalData, token!);
            else if (itemType === 'Service') promise = createService(finalData, token!);
            else promise = createSubService(finalData, token!);
        }
        
        toast.promise(promise, {
            loading: `${initialData ? 'Updating' : 'Creating'} ${itemType}...`,
            success: `${itemType} ${initialData ? 'updated' : 'created'}!`,
            error: (err) => err.response?.data?.message || `Failed to save ${itemType}.`
        }).then(() => {
            if (itemType === 'Category') fetchCategories();
            if (itemType === 'Service' && selectedCategory) getAdminServices(selectedCategory._id, token!).then(res => setServices(res.data));
            if (itemType === 'Sub-Service' && selectedService) getAdminSubServices(selectedService._id, token!).then(res => setSubServices(res.data));
        });

        setModalState({ isOpen: false, itemType: 'Category', initialData: null });
    };
    
    const handleDelete = async (itemType: ModalItemType, item: CatalogItem) => {
        if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
        let promise;
        if (itemType === 'Category') promise = deleteCategory(item._id, token!);
        else if (itemType === 'Service') promise = deleteService(item._id, token!);
        else promise = deleteSubService(item._id, token!);
        toast.promise(promise, { loading: `Deleting...`, success: `${itemType} deleted!`, error: `Failed to delete.` })
            .then(() => {
                if (itemType === 'Category') { fetchCategories(); setSelectedCategory(null); } 
                else if (itemType === 'Service' && selectedCategory) { getAdminServices(selectedCategory._id, token!).then(res => setServices(res.data)); setSelectedService(null); } 
                else if (itemType === 'Sub-Service' && selectedService) { getAdminSubServices(selectedService._id, token!).then(res => setSubServices(res.data)); }
            });
    };

    const renderColumn = (title: string, items: CatalogItem[], isLoading: boolean, onAdd: () => void, onSelect: (item: CatalogItem) => void, selectedItem: CatalogItem | null, itemType: ModalItemType, Icon: React.ElementType, addDisabled: boolean = false) => (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 min-w-[300px] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b"><h2 className="font-heading font-bold text-lg text-slate-800 flex items-center gap-2"><div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600"><Icon size={18}/></div>{title}</h2><button onClick={onAdd} className="p-1.5 bg-red-600 text-white rounded-full disabled:bg-slate-300" disabled={addDisabled}><Plus className="w-4 h-4" /></button></div>
            <div className="p-2 space-y-1 overflow-y-auto flex-grow">
                {isLoading ? <ColumnSkeleton /> : items.length > 0 ? (
                    items.map(item => <div key={item._id} onClick={() => onSelect(item)} className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedItem?._id === item._id ? 'bg-red-100' : 'hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-3 min-w-0"><img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0"/><div className="min-w-0"><p className="font-semibold text-sm text-slate-800 truncate">{item.name}</p></div></div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 flex-shrink-0"><button onClick={(e) => { e.stopPropagation(); handleDelete(itemType, item); }} className="p-1.5 text-slate-400 hover:text-red-600 rounded-full"><Trash2 className="w-4 h-4"/></button><button onClick={(e) => { e.stopPropagation(); handleOpenModal(itemType, item); }} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-full"><Edit className="w-4 h-4"/></button>{itemType !== 'Sub-Service' && <ChevronRight className={`w-5 h-5 ${selectedItem?._id === item._id ? 'text-red-600' : 'text-slate-300'}`}/>}</div>
                    </div>)
                ) : <EmptyState message={addDisabled ? "Select an item from the previous column." : "No items found."} /> }
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div><h1 className="font-heading text-4xl font-extrabold text-slate-800">Service Catalog</h1><p className="mt-2 text-slate-500">Manage your service hierarchy.</p></div>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {renderColumn('Categories', categories, isLoading.categories, () => handleOpenModal('Category'), setSelectedCategory, selectedCategory, 'Category', LayoutGrid)}
                {renderColumn('Services', services, isLoading.services, () => handleOpenModal('Service'), setSelectedService, selectedService, 'Service', List, !selectedCategory)}
                {renderColumn('Sub-Services', subServices, isLoading.subServices, () => handleOpenModal('Sub-Service'), () => {}, null, 'Sub-Service', Settings, !selectedService)}
            </div>
            <CatalogFormModal isOpen={modalState.isOpen} onClose={() => setModalState({ ...modalState, isOpen: false })} onSuccess={handleFormSuccess} initialData={modalState.initialData} itemType={modalState.itemType} token={token}/>
        </div>
    );
}