import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/src/interfaces/auth-interface";

const initialState: any = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserStore: (state, action): IUser => {
      return (state = action.payload);
    },
  },
});

export const { addUserStore } = userSlice.actions;

export default userSlice.reducer;
