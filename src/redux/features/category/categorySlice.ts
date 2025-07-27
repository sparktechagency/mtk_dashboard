import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryCreateError: "",
  CategoryUpdateError: ""
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    SetCategoryCreateError: (state, action) => {
      state.CategoryCreateError = action.payload;
    },
    SetCategoryUpdateError: (state, action) => {
      state.CategoryUpdateError = action.payload;
    }
  },
});

export const {
  SetCategoryCreateError,
  SetCategoryUpdateError
} = categorySlice.actions;

const categorySliceReducer = categorySlice.reducer;
export default categorySliceReducer;
