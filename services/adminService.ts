import api from './api';

// --- Dashboard ---
export const getAdminDashboardStats = async (token: string) => {
  const { data } = await api.get('/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// --- Booking Management ---
interface BookingFilters {
    status?: string;
    technicianId?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
}
export const getAdminBookings = async (filters: BookingFilters, token: string) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.technicianId) params.append('technicianId', filters.technicianId);
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
    if (filters.search) params.append('search', filters.search);
    const { data } = await api.get(`/admin/bookings?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
export const assignTechnician = async (bookingId: string, technicianId: string, token: string) => {
    const { data } = await api.patch(`/admin/bookings/${bookingId}/assign`, { technicianId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
export const updateBookingStatus = async (bookingId: string, status: string, token: string) => {
    const { data } = await api.patch(`/admin/bookings/${bookingId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// --- Technician Management ---
export const createTechnician = async (technicianData: any, token: string) => {
    const { data } = await api.post('/admin/technicians', technicianData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminTechnicians = async (token: string) => {
    const { data } = await api.get('/admin/technicians', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateTechnician = async (id: string, technicianData: any, token: string) => {
    const { data } = await api.put(`/admin/technicians/${id}`, technicianData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};

// --- Customer Management ---
export const createCustomer = async (customerData: any, token: string) => {
    const { data } = await api.post('/admin/customers', customerData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminCustomers = async (token: string) => {
    const { data } = await api.get('/admin/customers', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getCustomerDetails = async (id: string, token: string) => {
    const { data } = await api.get(`/admin/customers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateCustomer = async (id: string, customerData: any, token: string) => {
    const { data } = await api.put(`/admin/customers/${id}`, customerData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const deleteCustomer = async (id: string, token: string) => {
    const { data } = await api.delete(`/admin/customers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};

// --- Service Catalog Management ---
export const getUploadPresignedUrl = async (fileType: string, token: string) => {
    const { data } = await api.post('/admin/catalog/generate-upload-url', { fileType }, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const createCategory = async (categoryData: any, token: string) => {
    const { data } = await api.post('/admin/catalog/categories', categoryData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminCategories = async (token: string) => {
    const { data } = await api.get('/admin/catalog/categories', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateCategory = async (id: string, categoryData: any, token: string) => {
    const { data } = await api.put(`/admin/catalog/categories/${id}`, categoryData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const createService = async (serviceData: any, token: string) => {
    const { data } = await api.post('/admin/catalog/services', serviceData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminServices = async (categoryId: string, token: string) => {
    const { data } = await api.get(`/admin/catalog/services?categoryId=${categoryId}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateService = async (id: string, serviceData: any, token: string) => {
    const { data } = await api.put(`/admin/catalog/services/${id}`, serviceData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const createSubService = async (subServiceData: any, token: string) => {
    const { data } = await api.post('/admin/catalog/sub-services', subServiceData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminSubServices = async (serviceId: string, token: string) => {
    const { data } = await api.get(`/admin/catalog/sub-services?serviceId=${serviceId}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateSubService = async (id: string, subServiceData: any, token: string) => {
    const { data } = await api.put(`/admin/catalog/sub-services/${id}`, subServiceData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};

// --- Blog Management ---
export const createBlog = async (blogData: any, token: string) => {
    const { data } = await api.post('/admin/blogs', blogData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getAdminBlogs = async (token: string) => {
    const { data } = await api.get('/admin/blogs', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const getBlogById = async (id: string, token: string) => {
    const { data } = await api.get(`/admin/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateBlog = async (id: string, blogData: any, token: string) => {
    const { data } = await api.put(`/admin/blogs/${id}`, blogData, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const deleteBlog = async (id: string, token: string) => {
    const { data } = await api.delete(`/admin/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};

export const getAllTechnicians = async (token: string) => {
    const { data } = await api.get('/admin/technicians', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getAdminBookingById = async (id: string, token: string) => {
    const { data } = await api.get(`/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const deleteTechnician = async (id: string, token: string) => {
    const { data } = await api.delete(`/admin/technicians/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
};

export const createTestimonial = async (data: any, token: string) => {
    return api.post('/admin/testimonials', data, { headers: { Authorization: `Bearer ${token}` } });
};
export const getAdminTestimonials = async (token: string) => {
    const { data } = await api.get('/admin/testimonials', { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
export const updateTestimonial = async (id: string, data: any, token: string) => {
    return api.put(`/admin/testimonials/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};
export const deleteTestimonial = async (id: string, token: string) => {
    return api.delete(`/admin/testimonials/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteCategory = async (id: string, token: string) => {
    return api.delete(`/admin/catalog/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteService = async (id: string, token: string) => {
    return api.delete(`/admin/catalog/services/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteSubService = async (id: string, token: string) => {
    return api.delete(`/admin/catalog/sub-services/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const offerJobToTechnicians = async (bookingId: string, technicianIds: string[], token: string) => {
    const { data } = await api.patch(`/admin/bookings/${bookingId}/offer`, { technicianIds }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};