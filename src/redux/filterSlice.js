import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterSet(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterSet } = filterSlice.actions;
export const selectFilter = state => state.filter;
