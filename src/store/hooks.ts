import { createAsyncThunk } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
  useSelector<RootState, TSelected>(selector, shallowEqual);

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();
