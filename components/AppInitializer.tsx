'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { loadUserFromToken } from '@/store/authSlice';
import { LocationModal } from '@/components/LocationModal'; // मान लें कि यह कंपोनेंट पहले से बना हुआ है

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelector((state: RootState) => state.location);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(loadUserFromToken()).finally(() => {
        setIsInitialized(true);
    });
  }, [dispatch]);
  
  useEffect(() => {
    if (isInitialized && !selectedLocation) {
        setIsLocationModalOpen(true);
    }
  }, [selectedLocation, isInitialized]);

  return (
    <>
        <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
        {children}
    </>
  );
}