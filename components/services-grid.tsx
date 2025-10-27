"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Refrigerator, Zap, Tv, Wind, Microwave, ArrowRight, Loader2, WashingMachine, Fan } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getFullCatalog } from "@/services/publicService"

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

interface ServiceCardData {
  serviceId: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ApplianceCategory {
  icon: keyof typeof icons;
  title: string;
  description: string;
  services: ServiceCardData[];
}

export function SellApplianceSection() {
  const [applianceCategories, setApplianceCategories] = useState<ApplianceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<ApplianceCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLocation } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLocation) {
        setIsLoading(true);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getFullCatalog(selectedLocation._id);
        
        const transformedData: ApplianceCategory[] = response.data.map((category: any): ApplianceCategory => ({
          icon: getIconNameForCategory(category.name),
          title: category.name,
          description: `Expert solutions for your ${category.name.toLowerCase()}.`,
          services: category.services.map((service: any) => ({
            serviceId: service._id,
            title: service.name,
            description: service.inclusions?.[0] || `Reliable repair for ${service.name.toLowerCase()}.`,
            image: service.imageUrl,
            price: service.price,
          }))
        }));

        const categoriesWithServices = transformedData.filter((cat: ApplianceCategory) => cat.services.length > 0);
        
        setApplianceCategories(categoriesWithServices);

        if (categoriesWithServices.length > 0) {
          setActiveCategory(categoriesWithServices[0]);
        } else {
          setActiveCategory(null);
        }
      } catch (error) {
        console.error("Failed to fetch catalog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const animationStyles = `
    @keyframes fade-in { 
      from { opacity: 0; transform: translateY(10px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    .animate-fade-in { 
      animation: fade-in 0.5s ease-out forwards; 
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  if (isLoading) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        </div>
      </section>
    );
  }
  
  if (applianceCategories.length === 0 || !activeCategory) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="text-center">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">
                Our Expert Repair Services
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto text-pretty">
                Sorry, no services are currently available for {selectedLocation?.areaName || 'your selected location'}. Please check back later or select a different location.
            </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">
            Our Expert Repair Services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            From ACs to Washing Machines, we provide reliable and professional repair services. Select a category to see more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 relative">
          
          <aside className="col-span-full lg:col-span-3 sticky top-16 lg:top-24 bg-gray-50/95 backdrop-blur-sm z-20 lg:self-start lg:h-fit lg:bg-transparent lg:backdrop-blur-none mb-6 lg:mb-0 shadow-sm lg:shadow-none">
            <div className="flex space-x-2 overflow-x-auto pb-4 -mx-4 px-4 whitespace-nowrap py-6 no-scrollbar lg:space-x-0 lg:flex-col lg:space-y-3 lg:overflow-visible lg:p-0">
              {applianceCategories.map((category) => {
                const Icon = icons[category.icon] || Wrench;
                const isActive = activeCategory.title === category.title;
                return (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-shrink-0 group rounded-full lg:rounded-xl transition-all cursor-pointer duration-300 transform 
                      py-3 px-5 font-semibold text-sm border 
                      lg:w-full lg:flex lg:items-center lg:text-left lg:p-4 lg:font-normal lg:border-2
                      ${isActive
                        ? "bg-red-600 text-white border-red-600 shadow-md lg:bg-red-50 lg:text-red-700 lg:border-red-600 lg:scale-105"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 lg:border-transparent lg:hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-2 transition-colors duration-300 lg:w-7 lg:h-7 lg:mr-4 flex-shrink-0 ${isActive ? 'text-white lg:text-red-600' : 'text-slate-500 group-hover:text-red-600'}`} />
                    <div className="flex-1 lg:min-w-0">
                      <h3 className="text-sm lg:font-semibold lg:text-lg lg:text-slate-800">{category.title}</h3>
                      <p className="text-xs text-slate-500 hidden lg:block truncate">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <main
            key={activeCategory.title}
            className="col-span-full lg:col-span-9 animate-fade-in"
          >
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 mb-8 text-center lg:text-left">
              Services for <span className="text-red-600">{activeCategory.title.replace(/ (Repair|Services)$/i, '')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeCategory.services.map((service) => (
                <Link href={`/services/${service.serviceId}`} passHref key={service.serviceId}>
                  <Card className="group bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-300/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-red-400 overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden bg-white p-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow bg-slate-50/50">
                      <h4 className="font-bold text-lg text-slate-800 mb-2">{service.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-4">{service.description}</p>
                      <div className="mt-auto pt-2">
                        <div className="inline-flex items-center justify-center font-semibold text-center rounded-lg text-red-600 bg-red-100/80 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 py-2.5 px-4 text-sm w-full">
                          Book Service
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}