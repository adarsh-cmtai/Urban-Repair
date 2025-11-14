"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Refrigerator, Zap, Tv, Wind, Microwave, ArrowRight, Loader2, WashingMachine, Fan, Clock, MapPin } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getFullCatalog } from "@/services/publicService"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const icons = {
  Wind,
  Refrigerator,
  Zap,
  Tv,
  Wrench,
  Microwave,
  WashingMachine,
  Fan,
}

const getIconNameForCategory = (categoryTitle: string): keyof typeof icons => {
  const title = categoryTitle.toLowerCase();
  if (title.includes("air conditioner") || title.includes("ac")) return "Wind";
  if (title.includes("refrigerator") || title.includes("fridge")) return "Refrigerator";
  if (title.includes("washing machine")) return "WashingMachine";
  if (title.includes("television") || title.includes("tv")) return "Tv";
  if (title.includes("microwave")) return "Microwave";
  if (title.includes("fan")) return "Fan";
  if (title.includes("electrical") || title.includes("wiring")) return "Zap";
  return "Wrench";
};

interface SubServiceCardData {
  subServiceId: string;
  serviceId: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  parentServiceName: string;
}

interface CategoryData {
  icon: keyof typeof icons;
  title: string;
  subServices: SubServiceCardData[];
}

export function SellApplianceSection() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLocation } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLocation) {
        setIsLoading(false);
        setCategories([]);
        setActiveCategory(null);
        return;
      }
      setIsLoading(true);
      try {
        const response = await getFullCatalog(selectedLocation._id);
        const transformedData: CategoryData[] = response.data.map((category: any): CategoryData => {
          const allSubServices: SubServiceCardData[] = [];
          const repairServices = category.services.filter((service: any) => service.type !== 'Sell');
          repairServices.forEach((service: any) => {
            if (service.subServices && service.subServices.length > 0) {
              const subServiceCards = service.subServices.map((sub: any): SubServiceCardData => ({
                subServiceId: sub._id,
                serviceId: service._id,
                title: sub.name,
                image: sub.imageUrl || service.imageUrl,
                price: sub.price,
                duration: service.duration,
                parentServiceName: service.name,
              }));
              allSubServices.push(...subServiceCards);
            }
          });
          return {
            icon: getIconNameForCategory(category.name),
            title: category.name,
            subServices: allSubServices,
          };
        });
        const categoriesWithSubServices = transformedData.filter(cat => cat.subServices.length > 0);
        setCategories(categoriesWithSubServices);
        setActiveCategory(categoriesWithSubServices[0] || null);
      } catch (error) {
        console.error("Failed to fetch catalog data:", error);
        setCategories([]);
        setActiveCategory(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedLocation]);

  const customStyles = `.swiper-button-next, .swiper-button-prev { background-color: white; border-radius: 9999px; width: 44px; height: 44px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; transition: all 0.2s ease-in-out; } .swiper-button-next:hover, .swiper-button-prev:hover { background-color: #fef2f2; transform: scale(1.05); } .swiper-button-next:after, .swiper-button-prev:after { font-size: 18px; font-weight: 700; color: #dc2626; } .swiper-button-disabled { opacity: 0.4; cursor: not-allowed; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>
      );
    }
    
    if (!selectedLocation) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12 px-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-full grid place-items-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="font-semibold text-xl text-slate-800">Please Select Your Location</h3>
          <p className="text-slate-500 mt-2">
            Choose your area from the top of the page to see available services and pricing.
          </p>
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12 px-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="w-16 h-16 bg-slate-100 rounded-full grid place-items-center mx-auto mb-6">
            <Wrench className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-xl text-slate-800">
            No Services Found in {selectedLocation?.areaName || 'Your Area'}
          </h3>
          <p className="text-slate-500 mt-2">
            Unfortunately, we don't offer services in your selected location at the moment. Please try changing your location or check back soon.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar p-1.5">
            {categories.map((category) => {
              const Icon = icons[category.icon] || Wrench;
              const isActive = activeCategory?.title === category.title;
              return (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 group rounded-full transition-all duration-300 px-4 py-2 flex items-center space-x-2 text-sm font-semibold border-2 ${isActive ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white text-slate-700 border-white hover:border-red-100 hover:text-red-700"}`}
                >
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-red-600'}`} />
                  <span className="whitespace-nowrap">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeCategory && activeCategory.subServices.length > 0 ? (
          <Swiper
            key={activeCategory.title}
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1.3}
            breakpoints={{ 640: { slidesPerView: 2.3 }, 768: { slidesPerView: 3.2 }, 1280: { slidesPerView: 4 } }}
            className="!py-4"
          >
            {activeCategory.subServices.map((service) => (
              <SwiperSlide key={service.subServiceId} className="h-full">
                <Link href={`/services/${service.serviceId}`} className="group h-full flex">
                  <Card className="bg-white rounded-2xl border border-slate-200/60 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-red-400 overflow-hidden flex flex-col w-full">
                    <div className="h-40 w-full overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <p className="text-xs font-semibold text-red-600 mb-1">{service.parentServiceName}</p>
                      <h4 className="font-semibold text-base text-slate-900 leading-tight line-clamp-2 flex-grow">{service.title}</h4>
                      {service.duration && (
                        <div className="flex items-center text-xs text-slate-600 mt-3">
                          <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                      <div className="mt-4 pt-4 flex items-center justify-between border-t border-slate-100">
                        <span className="font-extrabold text-2xl text-slate-900">{service.price > 0 ? `₹${service.price.toLocaleString('en-IN')}` : 'Quote'}</span>
                        <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center transition-all duration-300 group-hover:bg-red-600">
                          <ArrowRight className="w-5 h-5 text-slate-500 transition-colors duration-300 group-hover:text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">No repair services found in this category.</p>
          </div>
        )}
      </>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <style>{customStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">Your Trusted Appliance Experts</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">Fast, reliable, and professional repairs for all your home appliances.</p>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}