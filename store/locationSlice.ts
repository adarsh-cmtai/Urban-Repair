import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
    _id: string;
    areaName: string;
    city: string;
    pincode: string;
}

interface LocationState {
    selectedLocation: Location | null;
}

const getInitialLocation = (): Location | null => {
    if (typeof window !== 'undefined') {
        const storedLocation = localStorage.getItem('selectedLocation');
        return storedLocation ? JSON.parse(storedLocation) : null;
    }
    return null;
};

const initialState: LocationState = {
    selectedLocation: getInitialLocation(),
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Location>) => {
            state.selectedLocation = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('selectedLocation', JSON.stringify(action.payload));
            }
        },
        clearLocation: (state) => {
            state.selectedLocation = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('selectedLocation');
            }
        },
    },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;