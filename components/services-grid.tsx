"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Refrigerator, Zap, Tv, Wind, Microwave, ArrowRight } from "lucide-react"

const applianceCategories = [
  {
    icon: Wind,
    title: "Sell Your AC",
    description: "Get instant cash for any type.",
    subCategories: [
      { title: "Window AC", description: "We buy all brands and sizes of window air conditioners.", image: "https://www.myg.in/images/blog/9/Benefits_of_AC.jpg" },
      { title: "Split AC", description: "Get the best market price for your split AC units, any tonnage.", image: "https://amstradworld.com/wp-content/uploads/2024/02/Amstrad-Perfecto-AC-AMSi1332.png" },
      { title: "Inverter & Non-Inverter", description: "We offer competitive quotes for all AC technologies.", image: "https://akm-img-a-in.tosshub.com/aajtak/images/story/201504/ac-collage_650_040515120303.jpg?size=948:533" },
      { title: "Bulk Buyouts", description: "Selling multiple units? We handle bulk deals with ease.", image: "https://akm-img-a-in.tosshub.com/aajtak/images/story/201504/ac-collage_650_040515120303.jpg?size=948:533" },
    ],
  },
  {
    icon: Refrigerator,
    title: "Sell Your Refrigerator",
    description: "Free up space and earn money.",
    subCategories: [
      { title: "Single Door Fridge", description: "Fair price guaranteed for your direct cool single door refrigerators.", image: "https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg" },
      { title: "Double Door Fridge", description: "Get a great offer for your double door and frost-free models.", image: "https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg" },
      { title: "Side-by-Side Models", description: "We buy premium, large-capacity side-by-side refrigerators.", image: "https://tiimg.tistatic.com/fp/1/008/932/domestic-refrigerator-489.jpg" },
      { title: "Deep Freezers", description: "Have a commercial or home deep freezer? We'll buy it from you.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAaWk2XvNxLTCMAsLm60VOidU_qarYNByjOg&s" },
    ],
  },
  {
    icon: Zap,
    title: "Sell Your Washing Machine",
    description: "Upgrade easily, sell the old one.",
    subCategories: [
      { title: "Top Load Machines", description: "We accept both semi-automatic and fully automatic top loaders.", image: "https://whirlpoolindia.vtexassets.com/arquivos/ids/164350-800-auto?v=638731268849000000&width=800&height=auto&aspect=true" },
      { title: "Front Load Machines", description: "Get a premium quote for your high-efficiency front load models.", image: "https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/308169_nhjiel.png" },
      { title: "Washer & Dryer Combo", description: "Have a washer with a dryer unit? We offer competitive prices.", image: "https://img.freepik.com/free-psd/modern-white-topload-washing-machine_191095-79985.jpg?semt=ais_hybrid&w=740&q=80" },
      { title: "Any Condition", description: "Even if it's not working, we'll give you its best scrap value.", image: "https://www.myg.in/images/thumbnails/300/300/detailed/112/312974_0_shisop-removebg-preview.png.png" },
    ],
  },
  {
    icon: Tv,
    title: "Sell Your TV",
    description: "Get cash for your old television.",
    subCategories: [
      { title: "LED & LCD TVs", description: "Get a quote for your flat-screen LED or LCD television of any size.", image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Television/Images/316061_0_t3uY8vidN.png?updatedAt=1754312889542" },
      { title: "Smart TVs", description: "We offer excellent prices for Android, WebOS, and other smart TVs.", image: "https://5.imimg.com/data5/SELLER/Default/2024/7/435629290/LC/JQ/GB/79020855/smart-led-tv-500x500.jpg" },
      { title: "4K UHD TVs", description: "Have a 4K TV? Get a premium offer based on its condition and brand.", image: "https://img.freepik.com/free-psd/stunning-mountain-landscape-displayed-modern-smart-tv_191095-80909.jpg?semt=ais_hybrid&w=740&q=80" },
      { title: "All Major Brands", description: "We buy TVs from Sony, Samsung, LG, Mi, and other popular brands.", image: "https://media.istockphoto.com/id/1395191574/photo/black-led-tv-television-screen-blank-isolated.jpg?s=612x612&w=0&k=20&c=ps14JZJh0ebkINcbQyHFsR1J5EC7ozkj_WO7Fh_9IOI=" },
    ],
  },
];

export function SellApplianceSection() {
  const [activeCategory, setActiveCategory] = useState(applianceCategories[0])

  const animationStyles = `
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 text-balance">
            Sell Your Old Appliances, Instantly
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            Get a fair price, free doorstep pickup, and instant cash for your used appliances. Select a category to begin.
          </p>
          <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 sticky top-24">
            <div className="space-y-3">
              {applianceCategories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory.title === category.title
                return (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full group flex items-center text-left p-4 rounded-xl border-2 transition-all duration-300 transform ${
                      isActive
                        ? "bg-red-50 border-red-600 shadow-md"
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mr-4 flex-shrink-0 transition-colors ${isActive ? "text-red-600" : "text-gray-500 group-hover:text-red-600"}`} />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div key={activeCategory.title} className="lg:col-span-8 animate-fade-in">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-6">
              What We Buy in <span className="text-red-600">{activeCategory.title.replace('Sell Your ', '')}s</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCategory.subCategories.map((subCategory, index) => (
                <Card
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-red-500 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.title} 
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{subCategory.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">{subCategory.description}</p>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-semibold self-start text-red-600 hover:text-red-600"
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
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
