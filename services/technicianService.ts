import api from './api';

interface JobHistoryFilters {
    dateFrom?: string;
    dateTo?: string;
}

export const getTechnicianJobQueue = async (token: string) => {
  const { data } = await api.get('/technician/jobs/queue', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const acceptJob = async (bookingId: string, token: string) => {
    const { data } = await api.patch(`/technician/jobs/${bookingId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const getJobHistory = async (filters: JobHistoryFilters, token: string) => {
    const params = new URLSearchParams();
    if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.append('dateTo', filters.dateTo);
  
    const { data } = await api.get(`/technician/jobs/history?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const getTechnicianProfile = async (token: string) => {
    const { data } = await api.get('/technician/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const updateTechnicianProfile = async (profileData: any, token: string) => {
    const { data } = await api.put('/technician/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const changeTechnicianPassword = async (passwordData: any, token: string) => {
    const { data } = await api.post('/technician/profile/change-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const getJobDetails = async (id: string, token: string) => {
    const { data } = await api.get(`/technician/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const startJob = async (id: string, token: string) => {
    const { data } = await api.patch(`/technician/jobs/${id}/start`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const updateJobDetails = async (id: string, updates: any, token: string) => {
    const { data } = await api.patch(`/technician/jobs/${id}/update`, updates, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const completeJob = async (id: string, otp: string, token: string) => {
    const { data } = await api.post(`/technician/jobs/${id}/complete`, { otp }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const getUploadPresignedUrl = async (fileType: string, token: string) => {
    const { data } = await api.post('/technician/jobs/generate-upload-url', { fileType }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};


// Add other technician-specific API functions here later...