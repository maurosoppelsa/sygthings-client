import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import authSlice from './auth-slice';
import cameraSlice from './camera-slice';
import sightSlice from './sight-slice';
import geolocationSlice from './geolocation-slice';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  whitelist: ['authentication'],
};

const reducer = combineReducers({
    authentication: authSlice,
    camera: cameraSlice,
    sight: sightSlice,
    geolocationInfo: geolocationSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();
export default store;