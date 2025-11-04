'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SellRequestModal } from './SellRequestModal';
import { getPublicBuybackCatalog } from '@/services/publicService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const BuybackCard = ({ category, onSellClick }: { category: any, onSellClick: () => void }) => (
    <div 
        className="group bg-white rounded-2xl border border-slate-200/60 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-red-300 overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={onSellClick}
    >
        <div className="h-48 w-full overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
            <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{category.name}</h4>
            <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-4">
                Get the best value for your old {category.name.toLowerCase()}.
            </p>
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="font-semibold text-red-600 text-base">Get Best Price</span>
                <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center transition-all duration-300 group-hover:bg-red-600">
                    <ArrowRight className="w-5 h-5 text-slate-500 transition-colors duration-300 group-hover:text-white" />
                </div>
            </div>
        </div>
    </div>
);

export function BuybackSection() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { selectedLocation } = useSelector((state: RootState) => state.location);

    useEffect(() => {
        const fetchBuybackData = async () => {
            if (!selectedLocation) {
                setIsLoading(true); 
                return;
            };
            setIsLoading(true);
            try {
                const res = await getPublicBuybackCatalog(selectedLocation._id);
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to fetch buyback services:", error);
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBuybackData();
    }, [selectedLocation]);

    const handleSellClick = (category: any) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-10 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">
                        Sell Your Old Appliances
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
                        Get the best value with our easy and transparent process. Free inspection and pickup from your doorstep.
                    </p>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="w-10 h-10 animate-spin text-red-600"/>
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <BuybackCard key={category._id} category={category} onSellClick={() => handleSellClick(category)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 bg-white border-2 border-dashed border-slate-200 rounded-xl max-w-2xl mx-auto">
                        <h3 className="font-semibold text-lg text-slate-800">
                            Buyback Not Available Here
                        </h3>
                        <p className="text-slate-500 mt-2">
                            Currently, we do not offer buyback services for {selectedLocation?.areaName || 'this location'}. Please select another area or check back later.
                        </p>
                    </div>
                )}
            </div>
            {selectedCategory && (
                <SellRequestModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    category={selectedCategory} 
                />
            )}
        </section>
    );
}