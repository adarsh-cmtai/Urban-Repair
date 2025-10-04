'use client';

import { Star, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const StatItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number, label: string }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-100 rounded-lg">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
            <Icon className="w-6 h-6 text-slate-500" />
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm font-medium text-slate-500">{label}</p>
        </div>
    </div>
);

export function PerformanceStats({ rating, totalReviews }: { rating: number, totalReviews: number }) {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const progress = useSpring(0, { stiffness: 40, damping: 20 });
    const progressValue = useTransform(progress, [0, 1], [circumference, 0]);
    const displayRating = useTransform(progress, (v) => (v * rating).toFixed(1));

    useEffect(() => {
        progress.set(rating / 5);
    }, [rating, progress]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Performance Overview</h2>
                <p className="mt-1 text-slate-500">Your key metrics based on customer feedback and completed jobs.</p>
            </div>
            <div className="border-t border-slate-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg border border-white">
                    {/* Radial Progress for Rating */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full" viewBox="0 0 120 120">
                                <defs>
                                    <linearGradient id="ratingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#fca5a5" />
                                    </linearGradient>
                                </defs>
                                <circle cx="60" cy="60" r="54" fill="none" strokeWidth="12" className="stroke-slate-200" />
                                <motion.circle
                                    cx="60" cy="60" r="54" fill="none" strokeWidth="12"
                                    className="stroke-[url(#ratingGradient)]"
                                    strokeLinecap="round"
                                    transform="rotate(-90 60 60)"
                                    style={{
                                        strokeDasharray: circumference,
                                        strokeDashoffset: progressValue
                                    }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span className="text-4xl font-extrabold text-slate-800">
                                    {displayRating}
                                </motion.span>
                                <Star className="w-5 h-5 text-yellow-400 absolute top-1/2 -translate-y-2.5 right-[38px]" fill="currentColor" />
                            </div>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-600">Overall Customer Rating</p>
                    </div>

                    {/* Supporting Stats */}
                    <div className="md:col-span-2 space-y-4">
                        <StatItem icon={Users} value={totalReviews} label="Total Reviews Received" />
                        <StatItem icon={CheckCircle} value="98%" label="Job Completion Rate" />
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-slate-500">
                    <p>Your high rating reflects the excellent quality of your service. Keep up the great work!</p>
                </div>
            </div>
        </div>
    );
}