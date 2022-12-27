import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './search'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  search: searchReducer
});
const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
