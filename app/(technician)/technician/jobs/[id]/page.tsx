'use client';

import { useEffect, useState, Fragment } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getJobDetails, startJob, updateJobDetails, completeJob } from '@/services/technicianService';
import { Loader2, User, Phone, MapPin, Wrench, Calendar, Clock, IndianRupee, MessageSquare, KeyRound, PlayCircle, Navigation, CheckCircle, AlertTriangle } from 'lucide-react';
import { ImageUploader } from '@/components/technician/jobs/ImageUploader';
import { StatusBadge } from '@/components/customer/StatusBadge';
import { toast } from 'react-hot-toast';

// Skeleton Loader for a premium loading experience
function JobDetailsSkeleton() {
    return (
        <div className="space-y-8 animate-pulse max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <div className="h-10 bg-slate-200 rounded w-64"></div>
                    <div className="h-5 bg-slate-200 rounded w-32 mt-2"></div>
                </div>
                <div className="h-8 w-24 bg-slate-200 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-48"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-64"></div>
                </div>
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-56"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border h-48"></div>
                </div>
            </div>
        </div>
    );
}

// Reusable component for displaying info rows in cards
const InfoRow = ({ label, value, icon: Icon, href }: { label: string, value: React.ReactNode, icon: React.ElementType, href?: string }) => {
    const content = (
        <div className="flex items-start gap-4 group">
            <Icon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className={`font-semibold text-slate-800 ${href ? 'group-hover:text-red-600 transition-colors' : ''}`}>{value}</p>
            </div>
        </div>
    );
    return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
};

export default function JobDetailsPage() {
    const [job, setJob] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [charge, setCharge] = useState('');
    const [otp, setOtp] = useState('');
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const id = params.id as string;

    const fetchJob = async () => {
        if (!id || !token) return;
        setIsLoading(true);
        try {
            const response = await getJobDetails(id, token);
            setJob(response.data);
            setNotes(response.data.technicianNotes || '');
            setCharge(response.data.serviceCharge || '');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchJob(); }, [id, token]);

    const handleStartJob = async () => {
        setIsActionLoading(true);
        toast.promise(startJob(id, token!), {
            loading: 'Starting job...',
            success: (res) => { setJob(res.data); return 'Job Started!'; },
            error: 'Failed to start job.',
        }).finally(() => setIsActionLoading(false));
    };

    const handleImageUpload = async (field: 'beforeServiceImage' | 'afterServiceImage', imageUrl: string) => {
        try {
            const res = await updateJobDetails(id, { [field]: imageUrl }, token!);
            setJob(res.data);
        } catch { toast.error('Failed to save image.'); }
    };
    
    const handleUpdateDetails = async () => {
        setIsActionLoading(true);
        toast.promise(updateJobDetails(id, { technicianNotes: notes, serviceCharge: charge }, token!), {
            loading: 'Saving details...',
            success: (res) => { setJob(res.data); return 'Details Saved!'; },
            error: 'Failed to save details.',
        }).finally(() => setIsActionLoading(false));
    };

    const handleCompleteJob = async () => {
        if (otp.length !== 6) { toast.error('Please enter the 6-digit OTP.'); return; }
        setIsActionLoading(true);
        toast.promise(completeJob(id, otp, token!), {
            loading: 'Completing job...',
            success: (res) => { setJob(res.data); return 'Job Completed Successfully!'; },
            error: (err) => err.response?.data?.message || 'Failed to complete job.',
        }).finally(() => setIsActionLoading(false));
    };

    if (isLoading) return <JobDetailsSkeleton />;
    if (!job) return (
        <div className="text-center py-16">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-4 text-lg font-semibold text-red-700">Job Not Found</h3>
            <p className="mt-1 text-sm text-red-500">The requested job could not be found.</p>
        </div>
    );

    const fullAddress = `${job.address.street}, ${job.address.city}, ${job.address.state} ${job.address.zipCode}`;
    const serviceName = job.items?.[0]?.serviceName || job.serviceType || 'Service';

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-extrabold text-slate-800">Job Details</h1>
                    <p className="mt-1 text-slate-500 font-mono text-sm">ID: #{job._id.slice(-6).toUpperCase()}</p>
                </div>
                <StatusBadge status={job.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                    {job.status === 'Accepted' && (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                            <PlayCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
                            <h2 className="font-heading font-bold text-2xl text-slate-800">Ready to Begin?</h2>
                            <p className="text-slate-500 mt-2 mb-6">Start the job to notify the customer and begin tracking your work.</p>
                             <button onClick={handleStartJob} disabled={isActionLoading} className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-700">
                                {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Start Job'}
                            </button>
                        </div>
                    )}
                    
                    {(job.status === 'InProgress' || job.status === 'Completed') && (
                        <>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-heading font-bold text-xl text-slate-800 mb-1">Step 1: Service Photos</h3>
                                <p className="text-sm text-slate-500 mb-4">Upload before and after images of the service.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ImageUploader label="Before Service" imageUrl={job.beforeServiceImage} onUploadSuccess={(url) => handleImageUpload('beforeServiceImage', url)} disabled={job.status === 'Completed'} />
                                    <ImageUploader label="After Service" imageUrl={job.afterServiceImage} onUploadSuccess={(url) => handleImageUpload('afterServiceImage', url)} disabled={job.status === 'Completed'} />
                                </div>
                            </div>
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-heading font-bold text-xl text-slate-800 mb-1">Step 2: Job Report</h3>
                                <p className="text-sm text-slate-500 mb-4">Add notes about the service and the final charge.</p>
                                <div className="space-y-4">
                                    <div><textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter notes, parts used, recommendations..." className="w-full text-base bg-slate-50 rounded-lg border-slate-300" disabled={job.status === 'Completed'}/></div>
                                    <div className="relative"><IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/><input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} placeholder="Final Service Charge" className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300" disabled={job.status === 'Completed'}/></div>
                                    {job.status !== 'Completed' && <button onClick={handleUpdateDetails} disabled={isActionLoading} className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700">Save Details</button>}
                                </div>
                            </div>
                        </>
                    )}
                    {job.status === 'InProgress' && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-heading font-bold text-xl text-slate-800 mb-1">Step 3: Complete Job</h3>
                            <p className="text-sm text-slate-500 mb-4">Enter the 6-digit OTP from the customer to finalize the job.</p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full"><KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} className="pl-10 w-full h-12 text-base bg-slate-50 rounded-lg border-slate-300"/></div>
                                <button onClick={handleCompleteJob} disabled={isActionLoading} className="w-full sm:w-auto h-12 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 font-semibold text-white hover:bg-green-700">
                                    {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <><CheckCircle size={18}/>Complete Job</>}
                                </button>
                            </div>
                        </div>
                    )}
                    {job.status === 'Completed' && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-lg">
                            <h3 className="font-bold text-lg flex items-center gap-2"><CheckCircle />Job Completed!</h3>
                            <p className="mt-2 text-sm">This job has been successfully completed and closed.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6 lg:sticky top-24">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-heading font-bold text-xl text-slate-800 mb-6">Customer Details</h3>
                        <div className="space-y-4">
                            <InfoRow icon={User} label="Name" value={job.customerId.name} />
                            <InfoRow icon={Phone} label="Contact" value={job.customerId.phone} href={`tel:${job.customerId.phone}`} />
                            <InfoRow icon={MapPin} label="Address" value={fullAddress} href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`} />
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-heading font-bold text-xl text-slate-800 mb-6">Service Request</h3>
                        <div className="space-y-4">
                            <InfoRow icon={Wrench} label="Service" value={serviceName} />
                            <InfoRow icon={Calendar} label="Scheduled Date" value={new Date(job.preferredDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} />
                            <InfoRow icon={Clock} label="Time Slot" value={job.timeSlot} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}