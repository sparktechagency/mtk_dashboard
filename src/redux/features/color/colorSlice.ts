import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ColorCreateError: "",
  ColorUpdateError: ""
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    SetColorCreateError: (state, action) => {
      state.ColorCreateError = action.payload;
    },
    SetColorUpdateError: (state, action) => {
      state.ColorUpdateError = action.payload;
    }
  },
});

export const {
  SetColorCreateError,
  SetColorUpdateError
} = colorSlice.actions;

const colorSliceSliceReducer = colorSlice.reducer;
export default colorSliceSliceReducer;
