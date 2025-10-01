"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Refrigerator, Zap, Tv, Wind, Microwave, ArrowRight, Loader2 } from "lucide-react"
import { getFullCatalog } from "@/services/publicService"

const icons = {
  Wind,
  Refrigerator,
  Zap,
  Tv,
  Wrench,
  Microwave,
}

interface SubCategory {
  serviceId: string;
  subServiceId: string;
  title: string;
  description: string;
  image: string;
}

interface ApplianceCategory {
  icon: string;
  title: string;
  description: string;
  subCategories: SubCategory[];
}

export function SellApplianceSection() {
  const [applianceCategories, setApplianceCategories] = useState<ApplianceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<ApplianceCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFullCatalog();
        const transformedData = response.data.map((category: any) => ({
          icon: 'Wrench',
          title: category.name,
          description: `Expert solutions for your ${category.name.toLowerCase()}.`,
          subCategories: category.services.flatMap((service: any) =>
            service.subServices.map((subService: any) => ({
              serviceId: service._id,
              subServiceId: subService._id,
              title: subService.name,
              description: subService.description || `Reliable repair for ${subService.name.toLowerCase()}.`,
              image: subService.imageUrl,
            }))
          ),
        }));
        setApplianceCategories(transformedData);
        if (transformedData.length > 0) {
          setActiveCategory(transformedData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch catalog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <section className="bg-gray-50 text-gray-900 py-16">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        </div>
      </section>
    );
  }

  if (!activeCategory) {
    return (
      <section className="bg-gray-50 text-gray-900 py-16">
        <p className="text-center text-gray-500">No services available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 text-gray-900">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Our Expert Repair Services
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            From ACs to Washing Machines, we provide reliable and professional repair services. Select a category to see more.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 relative">
          
          <aside className="col-span-full lg:col-span-4 sticky top-16 lg:top-24 bg-gray-50/95 backdrop-blur-sm z-20 lg:self-start lg:h-fit lg:bg-transparent lg:backdrop-blur-none mb-6 lg:mb-0 shadow-sm lg:shadow-none">
            <div className="flex space-x-2 overflow-x-auto py-8 -mx-4 px-4 whitespace-nowrap no-scrollbar lg:space-x-0 lg:flex-col lg:space-y-3 lg:overflow-visible lg:p-0">
              {applianceCategories.map((category) => {
                const Icon = icons[category.icon as keyof typeof icons] || Wrench
                const isActive = activeCategory.title === category.title
                return (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-shrink-0 group rounded-full lg:rounded-xl transition-all duration-300 transform 
                      py-3 px-5 font-semibold text-sm border 
                      lg:w-full lg:flex lg:items-center lg:text-left lg:p-4 lg:font-normal lg:border-2
                      ${isActive
                        ? "bg-red-600 text-white border-red-600 shadow-md lg:bg-red-50 lg:text-red-700 lg:border-red-600 lg:scale-105"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 lg:bg-gray-100 lg:border-transparent lg:hover:bg-gray-200 lg:hover:shadow-md"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-2 transition-colors duration-300 lg:w-7 lg:h-7 lg:mr-4 flex-shrink-0 ${isActive ? 'text-white lg:text-red-600' : 'text-gray-600 group-hover:text-gray-800 lg:group-hover:text-red-600'}`} />
                    <div className="lg:w-full">
                      <h3 className="lg:font-semibold text-sm lg:text-lg lg:text-gray-800">{category.title}</h3>
                      <p className="text-xs text-gray-500 hidden lg:block">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <main
            key={activeCategory.title}
            className="col-span-full lg:col-span-8 animate-fade-in"
          >
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-6 text-center lg:text-left">
              Services for <span className="text-red-600">{activeCategory.title.replace(' Repair', '')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {activeCategory.subCategories.map((subCategory) => (
                <Link href={`/services/${subCategory.serviceId}?selected=${subCategory.subServiceId}`} passHref key={subCategory.title}>
                  <Card className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-red-400 overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                      <img
                        src={subCategory.image}
                        alt={subCategory.title}
                        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 p-4"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2">{subCategory.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-4">{subCategory.description}</p>
                      <div className="mt-auto pt-2">
                        <div className="inline-flex items-center justify-center font-semibold text-center rounded-lg text-red-600 bg-red-50 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 py-2.5 px-4 text-sm w-full">
                          View Service
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
  )
}