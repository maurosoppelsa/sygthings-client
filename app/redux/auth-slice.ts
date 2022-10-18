import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/common";
import { fakeResp } from "../utils/mocks";
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
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state: any) => {
        state.user = null;
        state.loggedIn = false;
    },
  },
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;