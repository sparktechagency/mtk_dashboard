import { createSlice } from "@reduxjs/toolkit";
import type { TAuthAdmin } from "../../../types/admin.type";


type TInitialState = {
  CreateError: string;
  UpdateError: string;
  admin: TAuthAdmin | null;
}

const initialState: TInitialState = {
  CreateError: "",
  UpdateError: "",
  admin: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    SetAdminCreateError: (state, action) => {
      state.CreateError = action.payload;
    },
    SetAdminUpdateError: (state, action) => {
      state.UpdateError = action.payload;
    },
    SetAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const {
  SetAdminCreateError,
  SetAdminUpdateError,
  SetAdmin
} = adminSlice.actions;

const adminSliceReducer = adminSlice.reducer;
export default adminSliceReducer;
