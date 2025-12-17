import api from './api';

export const getFullCatalog = async (locationId?: string) => {
    const endpoint = locationId ? `/public/services-by-category?locationId=${locationId}` : '/public/services-by-category';
    const { data } = await api.get(endpoint);
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

export const getRateCardsBySubServiceId = async (subServiceId: string) => {
    const { data } = await api.get(`/public/catalog/rate-cards?subServiceId=${subServiceId}`);
    return data;
};

export const searchLocations = async (query: string) => {
    const { data } = await api.get(`/public/locations/search?query=${query}`);
    return data;
};

export const getLocationByCoords = async (lat: number, lon: number) => {
    const { data } = await api.get(`/public/locations/by-coords?lat=${lat}&lon=${lon}`);
    return data;
};

export const getPublicBuybackServices = async () => {
  const { data } = await api.get("/public/buyback-services")
  return data
}

export const getPublicBuybackCatalog = async (locationId?: string) => {
    const endpoint = locationId ? `/public/buyback-catalog-full?locationId=${locationId}` : '/public/buyback-catalog-full';
    const { data } = await api.get(endpoint);
    return data;
};