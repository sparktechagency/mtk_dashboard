import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BlogCreateError: "",
  BlogUpdateError: ""
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    SetBlogCreateError: (state, action) => {
      state.BlogCreateError = action.payload;
    },
    SetBlogUpdateError: (state, action) => {
      state.BlogUpdateError = action.payload;
    }
  },
});

export const {
  SetBlogCreateError,
  SetBlogUpdateError
} = blogSlice.actions;

const blogSliceReducer = blogSlice.reducer;
export default blogSliceReducer;
