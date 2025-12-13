'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SellRequestModal } from '@/components/SellRequestModal';
import { getPublicBuybackCatalog, getFullCatalog } from '@/services/publicService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const BuybackCard = ({ category, onSellClick }: { category: any, onSellClick: () => void }) => (
    <div 
        className="group bg-white rounded-2xl border border-slate-200/60 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-red-300 overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={onSellClick}
    >
        <div className="w-full aspect-[4/3] bg-slate-50 relative">
            <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 h-14">{category.name}</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 h-10">
                Get the best value for your old {category.name.toLowerCase()}.
            </p>
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="font-semibold text-red-600 text-base">Get Instant Quote</span>
                <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center transition-all duration-300 group-hover:bg-red-600">
                    <ArrowRight className="w-5 h-5 text-slate-500 transition-colors duration-300 group-hover:text-white" />
                </div>
            </div>
        </div>
    </div>
);

const RepairCarouselSection = () => {
    const [allSubServices, setAllSubServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { selectedLocation } = useSelector((state: RootState) => state.location);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const fetchRepairServices = async () => {
            if (!selectedLocation) return;
            setIsLoading(true);
            try {
                const res = await getFullCatalog(selectedLocation._id);
                if (res.success) {
                    const subServices: any[] = [];
                    res.data.forEach((category: any) => {
                        const repairServices = category.services.filter((service: any) => service.type !== 'Sell');
                        repairServices.forEach((service: any) => {
                            if (service.subServices && service.subServices.length > 0) {
                                subServices.push(...service.subServices.map((sub: any) => ({
                                    ...sub,
                                    serviceId: service._id,
                                    parentServiceName: service.name,
                                    duration: service.duration,
                                })));
                            }
                        });
                    });
                    setAllSubServices(subServices);
                }
            } catch (error) {
                console.error("Failed to fetch repair services for carousel:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepairServices();
    }, [selectedLocation]);

    const customStyles = `
        .repair-carousel .swiper-button-next, .repair-carousel .swiper-button-prev {
            background-color: white;
            border-radius: 9999px;
            width: 44px;
            height: 44px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease-in-out;
        }
        .repair-carousel .swiper-button-next:hover, .repair-carousel .swiper-button-prev:hover {
            background-color: #fef2f2;
            transform: scale(1.05);
        }
        .repair-carousel .swiper-button-next:after, .repair-carousel .swiper-button-prev:after {
            font-size: 18px;
            font-weight: 700;
            color: #dc2626;
        }
        .repair-carousel .swiper-button-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        .repair-carousel .swiper-wrapper {
            align-items: stretch;
        }
    `;

    if (isLoading) {
        return <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-red-600"/></div>;
    }

    if (allSubServices.length === 0) {
        return null;
    }

    return (
        <section className="py-24">
            <style>{customStyles}</style>
            <div className="text-center mb-12">
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-4">
                    Also, Check Our Repair Services
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    From minor fixes to major repairs, our expert technicians are here to help.
                </p>
            </div>
            <div 
                className="repair-carousel"
                onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
            >
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    navigation
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={24}
                    slidesPerView={1.5}
                    breakpoints={{
                        640: { slidesPerView: 2.5 },
                        768: { slidesPerView: 3.5 },
                        1280: { slidesPerView: 5 },
                    }}
                    className="!py-4"
                >
                    {allSubServices.map((sub) => (
                        <SwiperSlide key={sub._id} className="h-auto">
                            <Link href={`/services/${sub.serviceId}`} className="group h-full flex">
                                <div className="bg-white rounded-xl border border-slate-200/80 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden flex flex-col w-full h-full">
                                    <div className="w-full aspect-[4/3] bg-slate-50 relative">
                                        <img 
                                            src={sub.imageUrl} 
                                            alt={sub.name} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <p className="text-xs font-semibold text-red-600 mb-1">{sub.parentServiceName}</p>
                                        <h4 className="font-semibold text-sm text-slate-800 leading-tight line-clamp-2 h-10 mb-2">{sub.name}</h4>
                                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                                            <span className="font-bold text-lg text-slate-900">₹{sub.price.toLocaleString('en-IN')}</span>
                                            <div className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center transition-all duration-300 group-hover:bg-red-600">
                                                <ArrowRight className="w-4 h-4 text-slate-500 transition-colors duration-300 group-hover:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default function SellPage() {
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
        <>
            <Header />
            <main className="bg-gradient-to-b from-white to-slate-50 py-10 sm:py-10 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">
                            Sell Your Old Appliances
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
                            Get the best value with our easy and transparent process. Free inspection and pickup from your doorstep.
                        </p>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-10 h-10 animate-spin text-red-600"/>
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
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

                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RepairCarouselSection />
                </div>

                {selectedCategory && (
                    <SellRequestModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        category={selectedCategory} 
                    />
                )}
            </main>
            <Footer />
        </>
    );
}