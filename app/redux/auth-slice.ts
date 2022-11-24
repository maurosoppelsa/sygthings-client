import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/common";
import AuthService from "../services/auth.service";
import { AppState } from "./interfaces";

const initialState: AppState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: false,
};

const authService: AuthService = AuthService.getInstance();

export const loginUser = createAsyncThunk<{ user: User }, { user: User }>(
  "loginUser",
  async ({user}) => {
    const response = await authService.login(user);
    if (response.success) {
      return {
        user: response.user ?? [],
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