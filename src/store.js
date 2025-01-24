// store.js or store.ts
import rootReducer from './rootreducers';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default

// Create persist config for your Redux state
const persistConfig = {
  key: 'root', // The key under which to store the state in localStorage
  storage, // Specifies where to store the state (localStorage by default)
};

// Persist the reducer (wrap it with persistReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
const store = configureStore({
  reducer: {
    waitingRegistration: persistedReducer, // Use the persisted reducer
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
