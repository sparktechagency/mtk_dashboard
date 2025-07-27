import { createSlice } from "@reduxjs/toolkit";
import type { TAuthAdmin } from "../../../types/admin.type";


type TInitialState = {
  CreateError: string;
  admin: TAuthAdmin | null;
}

const initialState: TInitialState = {
  CreateError: "",
  admin: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    SetAdminCreateError: (state, action) => {
      state.CreateError = action.payload;
    },
    SetAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const {
  SetAdminCreateError,
  SetAdmin
} = adminSlice.actions;

const adminSliceReducer = adminSlice.reducer;
export default adminSliceReducer;
