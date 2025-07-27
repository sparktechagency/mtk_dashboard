import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TJobState {
  viewApplication: boolean
}

// Define the initial state using that type
const initialState: TJobState = {
  viewApplication: true
}

export const jobSlice = createSlice({
  name: 'job',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SetViewApplication: (state, action) => {
      state.viewApplication = action.payload
    }
  },
})

export const { SetViewApplication } = jobSlice.actions;
const jobSliceReducer = jobSlice.reducer;
export default jobSliceReducer;