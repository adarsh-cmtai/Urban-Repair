import api from './api';

export const getFullCatalog = async () => {
    const { data } = await api.get('/public/services-by-category');
    return data;
};

export const getCategories = async () => {
    const { data } = await api.get('/public/catalog/categories');
    return data;
};

export const getServicesByCategoryId = async (categoryId: string) => {
    const { data } = await api.get(`/public/catalog/services?categoryId=${categoryId}`);
    return data;
};

export const getSubServicesByServiceId = async (serviceId: string) => {
    const { data } = await api.get(`/public/catalog/sub-services?serviceId=${serviceId}`);
    return data;
};