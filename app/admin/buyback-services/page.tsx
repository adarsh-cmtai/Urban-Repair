'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Edit, ChevronRight, Trash2, Tag, SlidersHorizontal, Building, Inbox } from 'lucide-react';
import { getBuybackCategories, getBuybackCapacities, getBuybackBrands, deleteBuybackCategory, deleteBuybackCapacity, deleteBuybackBrand } from '@/services/adminService';
import { BuybackCatalogFormModal } from '@/components/admin/buyback/BuybackCatalogFormModal';

interface CatalogItem { _id: string; name: string; imageUrl?: string; }
type ModalItemType = 'Category' | 'Capacity' | 'Brand';
interface ModalState { isOpen: boolean; itemType: ModalItemType; initialData: CatalogItem | null; }

const ColumnSkeleton = () => <div className="space-y-2 animate-pulse">{[...Array(4)].map((_, i) => <div key={i} className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg"><div className="w-10 h-10 bg-slate-200 rounded-md"></div><div className="flex-1 h-5 bg-slate-200 rounded"></div></div>)}</div>;
const EmptyState = ({ message }: { message: string }) => <div className="text-center py-12 px-4"><Inbox className="mx-auto h-12 w-12 text-slate-300" /><p className="mt-2 text-sm text-slate-500">{message}</p></div>;

export default function BuybackCatalogPage() {
    const [categories, setCategories] = useState<CatalogItem[]>([]);
    const [capacities, setCapacities] = useState<CatalogItem[]>([]);
    const [brands, setBrands] = useState<CatalogItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CatalogItem | null>(null);
    const [selectedCapacity, setSelectedCapacity] = useState<CatalogItem | null>(null);
    const [isLoading, setIsLoading] = useState({ categories: true, capacities: false, brands: false });
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, itemType: 'Category', initialData: null });
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchCategories = async () => { if (!token) return; setIsLoading(p => ({ ...p, categories: true })); try { const res = await getBuybackCategories(token); setCategories(res.data.data); } finally { setIsLoading(p => ({ ...p, categories: false })); } };
    useEffect(() => { fetchCategories(); }, [token]);
    useEffect(() => { if (selectedCategory) { setIsLoading(p => ({...p, capacities: true, brands: false})); getBuybackCapacities(selectedCategory._id, token!).then(res => setCapacities(res.data.data)).finally(() => setIsLoading(p => ({...p, capacities: false}))); } else { setCapacities([]); } setSelectedCapacity(null); setBrands([]); }, [selectedCategory, token]);
    useEffect(() => { if (selectedCapacity) { setIsLoading(p => ({...p, brands: true})); getBuybackBrands(selectedCapacity._id, token!).then(res => setBrands(res.data.data)).finally(() => setIsLoading(p => ({...p, brands: false}))); } else { setBrands([]); } }, [selectedCapacity, token]);
    
    const handleOpenModal = (itemType: ModalItemType, initialData: CatalogItem | null = null) => setModalState({ isOpen: true, itemType, initialData });
    const handleSuccess = () => {
        setModalState({ isOpen: false, itemType: 'Category', initialData: null });
        if (modalState.itemType === 'Category') fetchCategories();
        if (modalState.itemType === 'Capacity' && selectedCategory) getBuybackCapacities(selectedCategory._id, token!).then(res => setCapacities(res.data.data));
        if (modalState.itemType === 'Brand' && selectedCapacity) getBuybackBrands(selectedCapacity._id, token!).then(res => setBrands(res.data.data));
    };
    const handleDelete = async (itemType: ModalItemType, item: CatalogItem) => {
        if (!window.confirm(`Delete "${item.name}"? This might delete child items as well.`)) return;
        let promise;
        if (itemType === 'Category') promise = deleteBuybackCategory(item._id, token!);
        else if (itemType === 'Capacity') promise = deleteBuybackCapacity(item._id, token!);
        else promise = deleteBuybackBrand(item._id, token!);
        toast.promise(promise, { loading: `Deleting...`, success: `${itemType} deleted!`, error: `Failed to delete.` })
            .then(() => {
                if (itemType === 'Category') { fetchCategories(); setSelectedCategory(null); }
                if (itemType === 'Capacity' && selectedCategory) { getBuybackCapacities(selectedCategory._id, token!).then(res => setCapacities(res.data.data)); setSelectedCapacity(null); }
                if (itemType === 'Brand' && selectedCapacity) { getBuybackBrands(selectedCapacity._id, token!).then(res => setBrands(res.data.data)); }
            });
    };
    
    const renderColumn = (title: string, items: CatalogItem[], isLoading: boolean, onAdd: () => void, onSelect: (item: CatalogItem) => void, selectedItem: CatalogItem | null, itemType: ModalItemType, Icon: React.ElementType, addDisabled: boolean = false) => (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 min-w-[300px] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b"><h2 className="font-heading font-bold text-lg text-slate-800 flex items-center gap-2"><div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600"><Icon size={18}/></div>{title}</h2><button onClick={onAdd} className="p-1.5 bg-red-600 text-white rounded-full disabled:bg-slate-300" disabled={addDisabled}><Plus className="w-4 h-4" /></button></div>
            <div className="p-2 space-y-1 overflow-y-auto flex-grow">
                {isLoading ? <ColumnSkeleton /> : items.length > 0 ? (
                    items.map(item => <div key={item._id} onClick={() => onSelect(item)} className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedItem?._id === item._id ? 'bg-red-100' : 'hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-3 min-w-0">{item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain rounded-md flex-shrink-0"/>}<p className="font-semibold text-sm text-slate-800 truncate">{item.name}</p></div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 flex-shrink-0"><button onClick={(e)=>{e.stopPropagation();handleDelete(itemType,item)}} className="p-1.5 text-slate-400 hover:text-red-600 rounded-full"><Trash2 size={14}/></button><button onClick={(e)=>{e.stopPropagation();handleOpenModal(itemType,item)}} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-full"><Edit size={14}/></button>{itemType !== 'Brand' && <ChevronRight className={`w-5 h-5 ${selectedItem?._id === item._id ? 'text-red-600' : 'text-slate-300'}`}/>}</div>
                    </div>)
                ) : <EmptyState message={addDisabled ? "Select an item from the previous column." : "No items found."} /> }
            </div>
        </div>
    );
    
    return (
        <div className="space-y-8">
            <div><h1 className="font-heading text-4xl font-extrabold text-slate-800">Buyback Catalog</h1><p className="mt-2 text-slate-500">Manage the hierarchy of products you want to buy from customers.</p></div>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {renderColumn('Product Categories', categories, isLoading.categories, () => handleOpenModal('Category'), setSelectedCategory, selectedCategory, 'Category', Tag)}
                {renderColumn('Capacities or type', capacities, isLoading.capacities, () => handleOpenModal('Capacity'), setSelectedCapacity, selectedCapacity, 'Capacity', SlidersHorizontal, !selectedCategory)}
                {renderColumn('Brands', brands, isLoading.brands, () => handleOpenModal('Brand'), () => {}, null, 'Brand', Building, !selectedCapacity)}
            </div>
            <BuybackCatalogFormModal 
                isOpen={modalState.isOpen} 
                onClose={() => setModalState({ ...modalState, isOpen: false })} 
                onSuccess={handleSuccess} 
                initialData={modalState.initialData} 
                itemType={modalState.itemType}
                selectedCategory={selectedCategory}
                selectedCapacity={selectedCapacity}
            />
        </div>
    );
}