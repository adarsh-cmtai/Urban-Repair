'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getJobDetails, startJob, updateJobDetails, completeJob } from '@/services/technicianService';
import { Loader2, User, Phone, MapPin, Wrench, Calendar, Clock, IndianRupee, MessageSquare, KeyRound } from 'lucide-react';
import { InfoBlock } from '@/components/technician/jobs/InfoBlock';
import { ImageUploader } from '@/components/technician/jobs/ImageUploader';
import { StatusBadge } from '@/components/customer/StatusBadge';
import { toast } from 'react-hot-toast';

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
        try {
            const res = await startJob(id, token!);
            setJob(res.data);
            toast.success('Job Started!');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleImageUpload = async (field: 'beforeServiceImage' | 'afterServiceImage', imageUrl: string) => {
        try {
            const res = await updateJobDetails(id, { [field]: imageUrl }, token!);
            setJob(res.data);
        } catch {
            toast.error('Failed to save image URL.');
        }
    };
    
    const handleUpdateDetails = async () => {
        setIsActionLoading(true);
        try {
            const res = await updateJobDetails(id, { technicianNotes: notes, serviceCharge: charge }, token!);
            setJob(res.data);
            toast.success('Details Saved!');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleCompleteJob = async () => {
        if (otp.length !== 6) {
            toast.error('Please enter the 6-digit OTP.');
            return;
        }
        setIsActionLoading(true);
        try {
            const res = await completeJob(id, otp, token!);
            setJob(res.data);
            toast.success('Job Completed Successfully!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to complete job.');
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 className="w-12 h-12 animate-spin text-brand-red" /></div>;
    if (!job) return <p>Job not found.</p>;

    const fullAddress = `${job.address.street}, ${job.address.city}, ${job.address.state} ${job.address.zipCode}`;

    const renderServiceDetails = () => {
        if (job.items && job.items.length > 0) {
            return (
                <InfoBlock 
                    icon={Wrench} 
                    label="Services" 
                    value={job.items.map((item: any) => `${item.serviceName} (${item.subServiceName})`).join(', ')} 
                />
            );
        }
        return (
            <>
                <InfoBlock icon={Wrench} label="Service" value={`${job.serviceType} - ${job.applianceType}`} />
                <InfoBlock icon={MessageSquare} label="Problem" value={job.problemDescription?.join(', ') || 'N/A'} />
            </>
        );
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="flex items-center justify-between">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Job Details</h1>
                <StatusBadge status={job.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {job.status === 'Assigned' && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg border text-center">
                             <button onClick={handleStartJob} disabled={isActionLoading} className="inline-flex items-center justify-center rounded-lg bg-brand-red px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                                {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Start Job'}
                            </button>
                        </div>
                    )}
                    
                    {(job.status === 'InProgress' || job.status === 'Completed') && (
                        <div className="bg-white p-6 rounded-2xl shadow-lg border space-y-6">
                            <h3 className="font-montserrat font-bold text-lg text-neutral-800">Job Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ImageUploader label="Before Photo" imageUrl={job.beforeServiceImage} onUploadSuccess={(url) => handleImageUpload('beforeServiceImage', url)} />
                                <ImageUploader label="After Photo" imageUrl={job.afterServiceImage} onUploadSuccess={(url) => handleImageUpload('afterServiceImage', url)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Technician Notes / Parts Used</label>
                                <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Final Service Charge (₹)</label>
                                <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300"/>
                            </div>
                            <button onClick={handleUpdateDetails} disabled={isActionLoading || job.status === 'Completed'} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                                Save Details
                            </button>

                            {job.status === 'InProgress' && (
                                <div className="border-t pt-6 space-y-4">
                                    <h3 className="font-montserrat font-bold text-lg">Complete Job</h3>
                                    <div className="flex items-center gap-4">
                                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} className="flex-1 block w-full rounded-md"/>
                                        <button onClick={handleCompleteJob} disabled={isActionLoading} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700">
                                            {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <><KeyRound className="w-4 h-4"/>Complete</>}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {job.status === 'Completed' && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg">
                            <h3 className="font-bold">Job Completed!</h3>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border">
                        <h3 className="font-montserrat font-bold text-lg mb-4">Customer Details</h3>
                        <dl className="space-y-4">
                            <InfoBlock icon={User} label="Name" value={job.customerId.name} />
                            <InfoBlock icon={Phone} label="Contact" value={<a href={`tel:${job.customerId.phone}`} className="text-brand-red hover:underline">{job.customerId.phone}</a>} />
                            <InfoBlock icon={MapPin} label="Address" value={<a href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">{fullAddress}</a>} />
                        </dl>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-lg border">
                        <h3 className="font-montserrat font-bold text-lg mb-4">Service Request</h3>
                        <dl className="space-y-4">
                            {renderServiceDetails()}
                            <InfoBlock icon={Calendar} label="Scheduled Date" value={new Date(job.preferredDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
                            <InfoBlock icon={Clock} label="Time Slot" value={job.timeSlot} />
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}