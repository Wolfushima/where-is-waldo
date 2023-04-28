import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from './slices/gameboard/levelsSlice';
import { firestoreApi } from './services/firebase/firestoreApi';

const store = configureStore({
  reducer: {
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    levels: levelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware),
});

export default store;
