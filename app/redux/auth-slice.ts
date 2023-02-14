import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/common";
import AuthService from "../services/auth.service";
import { AppState } from "./interfaces";

const initialState: AppState = {
  user: null,
  loggedIn: false,
  loading: false,
  isRegistering: false,
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

export const logoutUser = createAsyncThunk<{}>(
  "logoutUser",
  async () => {
    const response = await authService.logout();
    if (response.success) {
      return;
    } else {
      throw "Error login user";
    }
  }
);

export const createUser = createAsyncThunk<{}>(
  "createUser",
  async () => {
    const response = await authService.logout();
    if (response.success) {
      return;
    } else {
      throw "Error login user";
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    toggleRegister: (state: any) => {
      state.isRegistering = !state.isRegistering;
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
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = undefined; 
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = true;
      });
  },
});
export const { toggleRegister } = authSlice.actions;
export default authSlice.reducer;