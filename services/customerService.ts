import api from './api';

export const getDashboardSummary = async (token: string) => {
  const { data } = await api.get('/customer/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getCustomerProfile = async (token: string) => {
    const { data } = await api.get('/customer/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const updateCustomerProfile = async (profileData: { name?: string; phone?: string }, token: string) => {
    const { data } = await api.put('/customer/profile', profileData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const addCustomerAddress = async (addressData: any, token: string) => {
    const { data } = await api.post('/customer/profile/addresses', addressData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const updateCustomerAddress = async (addressId: string, addressData: any, token: string) => {
    const { data } = await api.put(`/customer/profile/addresses/${addressId}`, addressData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const deleteCustomerAddress = async (addressId: string, token: string) => {
    const { data } = await api.delete(`/customer/profile/addresses/${addressId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const changeCustomerPassword = async (passwordData: any, token: string) => {
    const { data } = await api.post('/customer/profile/change-password', passwordData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const createNewBooking = async (bookingData: any, token: string) => {
    const { data } = await api.post('/customer/bookings/new', bookingData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const getCustomerBookings = async (status: string | null, token: string) => {
    const endpoint = status ? `/customer/bookings?status=${status}` : '/customer/bookings';
    const { data } = await api.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const getBookingDetails = async (bookingId: string, token: string) => {
    const { data } = await api.get(`/customer/bookings/${bookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export const submitBookingReview = async (bookingId: string, reviewData: { rating: number; comment?: string }, token: string) => {
    const { data } = await api.post(`/customer/bookings/${bookingId}/review`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getCheckoutConfig = async () => {
    const { data } = await api.get('/public/config');
    return data;
};

export const checkIsFirstBooking = async (token: string) => {
    const { data } = await api.get('/customer/is-first-booking', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const placeOrder = async (bookingData: any, token: string) => {
    const { data } = await api.post('/customer/bookings/new', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const createRazorpayOrder = async (amount: number, token: string) => {
    const { data } = await api.post('/customer/payment/create-order', { amount }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};
