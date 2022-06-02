import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/common";
import { AppState } from "./interfaces";

const initialState: AppState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: false,
};

export const loginUser = createAsyncThunk<{ user: User }, { userdata: User }>(
  "loginUser",
  async () => {
    const response = await fakeResp(true, 1000);
    if (response.success) {
      return {
        user: response.body ?? [],
      };
    } else {
      throw "Error login user";
    }
  }
);

const authSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.loggedIn = false; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.loggedIn = false;
      });
  },
});

export default authSlice.reducer;

const fakeResp = (success: any, timeout: any) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ success: true });
      } else {
        reject({ message: "Error" });
      }
    }, timeout);
  });
};
