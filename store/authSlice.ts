import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { 
    login, register, verifyOtp, resendOtp, getUserProfile,
    LoginCredentials, RegisterData, VerifyOtpData 
} from '@/services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'technician';
  specialization?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  registrationEmail: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get('authToken') || null,
  isLoading: true,
  error: null,
  registrationEmail: null,
  isAuthenticated: false,
};

export const loadUserFromToken = createAsyncThunk(
    'auth/loadUser',
    async (_, { rejectWithValue, dispatch }) => {
        const token = Cookies.get('authToken');
        if (token) {
            try {
                const response = await getUserProfile(token);
                return response.data;
            } catch (error) {
                dispatch(logout());
                return rejectWithValue('Session expired');
            }
        }
        return rejectWithValue('No token found');
    }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || 'Registration failed');
    }
  }
);

export const verifyUserOtp = createAsyncThunk(
  'auth/verifyUserOtp',
  async (otpData: VerifyOtpData, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(otpData);
      return response.message;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || 'OTP verification failed');
    }
  }
);

export const resendUserOtp = createAsyncThunk(
  'auth/resendUserOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await resendOtp(email);
      return response.message;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || 'Failed to resend OTP');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      Cookies.set('authToken', response.token, { expires: 7, path: '/' });
      Cookies.set('userRole', response.user.role, { expires: 7, path: '/' });
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.registrationEmail = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      Cookies.remove('authToken');
      Cookies.remove('userRole');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
        state.isLoading = false;
        state.registrationEmail = action.payload.email;
      })
       .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;