import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStations = createAsyncThunk(
    'stations/fetchStations',
    async (city) => {
        const res = await axios.get("https://metro-planner.onrender.com/stations");
        return res.data.filter(
            (station) => station.city?.toLowerCase() === city?.toLowerCase()
        );
    }
);

const stationsSlice = createSlice({
    name: 'stations',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStations.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchStations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default stationsSlice.reducer;
