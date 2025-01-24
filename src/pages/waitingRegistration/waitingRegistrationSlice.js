// src/redux/waitingRegistrationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  submissions: [],
};

const waitingRegistrationSlice = createSlice({
  name: 'waitingRegistration',
  initialState,
  reducers: {
    addFormSubmission: (state, action) => {
      state.submissions.push(action.payload);
    },
  },
});

// Export the action and the reducer
export const { addFormSubmission } = waitingRegistrationSlice.actions;
export default waitingRegistrationSlice.reducer;
