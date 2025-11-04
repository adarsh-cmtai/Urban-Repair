// File: src/components/sell-process-section.tsx
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Tag, CalendarCheck, IndianRupee, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: FileText,
        title: "Fill a Simple Form",
        description: "Tell us about your appliance—its brand, age, and condition. Upload a few pictures."
    },
    {
        icon: Tag,
        title: "Get a Price Quote",
        description: "Our experts will evaluate your appliance and send you the best possible price offer."
    },
    {
        icon: CalendarCheck,
        title: "Schedule Free Pickup",
        description: "Once you accept the offer, schedule a free pickup from your doorstep at your convenience."
    },
    {
        icon: IndianRupee,
        title: "Get Paid Instantly",
        description: "Our technician will pay you in cash at the time of pickup. No delays, no hassles."
    }
];

export function SellProcessSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    <div className="space-y-10">
                        <div>
                            <h2 className="font-heading font-extrabold text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-900 mb-4 text-balance">
                                Sell Your Old Appliances
                            </h2>
                            <p className="text-lg text-slate-600 max-w-lg text-pretty">
                                Get the best value for your used appliances with our easy and transparent process. Instant cash, free pickup.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="flex items-start gap-5">
                                        <div className="flex-shrink-0 w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-slate-900">{step.title}</h3>
                                            <p className="text-slate-600">{step.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="pt-4">
                            <Link href="/services">
                                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 text-lg font-semibold rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1">
                                    Start Selling Now
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[60vh] lg:h-auto lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 order-first lg:order-last">
                         <img
                            src="https://images.unsplash.com/photo-1615843232497-76b60b7b1bbf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Person checking an old appliance"
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}