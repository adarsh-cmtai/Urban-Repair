'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Loader2, MapPin } from 'lucide-react';
import { SellRequestModal } from './SellRequestModal';
import { getPublicBuybackCatalog } from '@/services/publicService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
      <h4 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 h-14">{category.name}</h4>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
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
        setIsLoading(false);
        setCategories([]);
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

  const customStyles = `.swiper-button-next, .swiper-button-prev { background-color: white; border-radius: 9999px; width: 44px; height: 44px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; transition: all 0.2s ease-in-out; } .swiper-button-next:hover, .swiper-button-prev:hover { background-color: #fef2f2; transform: scale(1.05); } .swiper-button-next:after, .swiper-button-prev:after { font-size: 18px; font-weight: 700; color: #dc2626; } .swiper-button-disabled { opacity: 0.4; cursor: not-allowed; }`;

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 overflow-hidden">
      <style>{customStyles}</style>
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
            <Loader2 className="w-10 h-10 animate-spin text-red-600" />
          </div>
        ) : !selectedLocation ? (
          <div className="max-w-2xl mx-auto text-center py-12 px-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-16 h-16 bg-red-50 rounded-full grid place-items-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-semibold text-xl text-slate-800">Please Select Your Location</h3>
            <p className="text-slate-500 mt-2">
              Choose your area to see which appliances we are currently buying back.
            </p>
          </div>
        ) : categories.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1.3}
            breakpoints={{ 640: { slidesPerView: 2.3 }, 768: { slidesPerView: 3.2 }, 1280: { slidesPerView: 4 }, }}
            className="!py-4"
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id} className="h-auto">
                <BuybackCard category={category} onSellClick={() => handleSellClick(category)} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12 px-6 bg-white border-2 border-dashed border-slate-200 rounded-xl max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg text-slate-800">Buyback Not Available Here</h3>
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