import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import user from './auth-slice';
const reducer = combineReducers({
    user,
})
const store = configureStore({
  reducer,
})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();
export default store;