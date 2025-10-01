import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'customer' | 'admin' | 'technician';
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const register = async (userData: RegisterData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const verifyOtp = async (otpData: VerifyOtpData) => {
    const { data } = await api.post('/auth/verify-otp', otpData);
    return data;
};

export const resendOtp = async (email: string) => {
    const { data } = await api.post('/auth/resend-otp', { email });
    return data;
};

export const login = async (credentials: LoginCredentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const getUserProfile = async (token: string) => {
    const { data } = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};