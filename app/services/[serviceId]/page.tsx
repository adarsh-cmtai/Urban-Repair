import { notFound } from 'next/navigation';
import { ServiceDetailContent } from './ServiceDetailContent';
import { Service } from '../types';
import api from '@/services/api';

async function getService(serviceId: string): Promise<Service | null> {
    try {
        const res = await api.get(`/public/services/${serviceId}`);
        const data = res.data;
        return data.success ? data.data : null;
    } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        return null;
    }
}

export default async function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
    const service = await getService(params.serviceId);

    if (!service) {
        notFound();
    }

    return <ServiceDetailContent service={service} />;
}