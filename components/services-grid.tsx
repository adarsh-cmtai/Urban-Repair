"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
              description: `Reliable repair for ${subService.name.toLowerCase()}.`,
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
  `;
  
  if (isLoading) {
    return (
      <section className="bg-white text-gray-900 py-16">
        <div className="flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-red" />
        </div>
      </section>
    );
  }

  if (!activeCategory) {
    return (
        <section className="bg-white text-gray-900 py-16">
            <p className="text-center text-gray-500">No services available at the moment.</p>
        </section>
    );
  }

  return (
    <section className="bg-white text-gray-900">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Our Expert Repair Services
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            From ACs to Washing Machines, we provide reliable and professional repair services. Select a category to see more.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8 relative">
          <div className="col-span-12 lg:col-span-4 self-start lg:sticky top-24 h-fit">
            <div className="space-y-3">
              {applianceCategories.map((category) => {
                const Icon = icons[category.icon as keyof typeof icons] || Wrench
                const isActive = activeCategory.title === category.title
                return (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full group flex items-center text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-300 transform ${
                      isActive
                        ? "bg-red-50 border-red-600 shadow-lg scale-105"
                        : "bg-gray-50 border-transparent hover:bg-gray-100 hover:shadow-md"
                    }`}
                  >
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4 flex-shrink-0 transition-colors duration-300 ${isActive ? "text-red-600" : "text-gray-500 group-hover:text-red-600"}`} />
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg text-gray-800">{category.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            key={activeCategory.title}
            className="col-span-12 lg:col-span-8 animate-fade-in"
          >
            <h3 className="font-heading font-bold text-xl md:text-3xl text-gray-900 mb-6 text-center lg:text-left sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">
                Services for <span className="text-red-600">{activeCategory.title.replace(' Repair', '')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCategory.subCategories.map((subCategory) => (
                    <Card
                        key={subCategory.title}
                        className="group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-red-500 overflow-hidden flex flex-col h-full"
                    >
                        <div className="aspect-video w-full overflow-hidden bg-gray-50">
                            <img 
                                src={subCategory.image} 
                                alt={subCategory.title} 
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                            <h4 className="font-semibold text-base md:text-xl text-gray-900 mb-2">{subCategory.title}</h4>
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow mb-4">{subCategory.description}</p>
                            <Link href={`/services/${subCategory.serviceId}?selected=${subCategory.subServiceId}`} passHref>
                                <Button
                                variant="ghost"
                                className="p-0 h-auto font-semibold self-start text-red-600 hover:text-red-700 hover:bg-transparent text-sm md:text-base"
                                >
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}