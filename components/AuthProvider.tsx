'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { loadUserFromToken, logout } from '@/store/authSlice';
import { usePathname, useRouter } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const { token, user, isLoading } = useSelector((state: RootState) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (token && !user) {
            dispatch(loadUserFromToken());
        }
    }, [token, user, dispatch]);

    return <>{children}</>;
}