export interface SubService {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
}

export interface Step {
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Service {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    duration: string;
    inclusions: string[];
    exclusions: string[];
    subServices?: SubService[];
    howItWorks?: Step[];
    faqs?: FAQ[];
}

export interface Booking {
    _id: string;
    name?: string; // This will now be part of the object
    items?: any[];
    serviceType?: string;
    status: string;
    preferredDate: string;
    timeSlot: string;
    updatedAt: string;
}

export interface CartItem {
    serviceId: string;
    serviceName: string;
    serviceImage: string;
    subService: SubService;
    quantity: number;
    price: number;
}