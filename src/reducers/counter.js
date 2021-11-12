import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.value += 5;
    },
    decrement(state) {
      state.value -= 5;
    },
    reset(state) {
      state.value = 0;
    },
  },
});
