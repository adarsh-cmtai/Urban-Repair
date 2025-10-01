import api from './api';

export const getCategories = async () => {
    const { data } = await api.get('/admin/catalog/categories'); // Assuming public access for now
    return data;
};

export const getServicesByCategoryId = async (categoryId: string) => {
    const { data } = await api.get(`/admin/catalog/services?categoryId=${categoryId}`);
    return data;
};

export const getSubServicesByServiceId = async (serviceId: string) => {
    const { data } = await api.get(`/admin/catalog/sub-services?serviceId=${serviceId}`);
    return data;
};

export const getFullCatalog = async () => {
    const { data } = await api.get('/public/services-by-category');
    return data;
};