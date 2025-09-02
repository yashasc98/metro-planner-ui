import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import stationsReducer from './features/stationsSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        stations: stationsReducer,
    },
});
