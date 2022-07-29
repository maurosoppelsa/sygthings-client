import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import authSlice from './auth-slice';
import cameraSlice from './camera-slice';
import newSightSlice from './new-sight-slice';
import geolocationSlice from './geolocation-slice';
const reducer = combineReducers({
    authentication: authSlice,
    camera: cameraSlice,
    newSight: newSightSlice,
    geolocationInfo: geolocationSlice,
})
const store = configureStore({
  reducer,
})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();
export default store;