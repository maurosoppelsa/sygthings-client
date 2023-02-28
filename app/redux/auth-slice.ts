import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/common";
import AuthService from "../services/auth.service";
import { AppState } from "./interfaces";
import { authErrorMessages, authSuccessMessages } from "../messages";

const initialState: AppState = {
  user: null,
  loggedIn: false,
  loading: false,
  isRegistering: false,
  error: false,
  message: "",
};

const authService: AuthService = AuthService.getInstance();

export const loginUser = createAsyncThunk<{ user: User }, { user: User }>(
  "loginUser",
  async ({ user }) => {
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

export const createUser = createAsyncThunk<{ user: User }, { user: User }>(
  "createUser",
  async ({ user }) => {
    const response = await authService.register(user);
    if (response.success) {
      return response;
    } else {
      throw "Error creating user";
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
    cleanupErrors: (state: any) => {
      state.error = false;
      state.message = "";
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
        state.message = authErrorMessages["auth/login-error"];
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
        state.message = authErrorMessages["auth/logout-error"];
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.loggedIn = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.loggedIn = false;
        state.message = authSuccessMessages["auth/user-created"];
      })
      .addCase(createUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.loggedIn = false;
        state.message = authErrorMessages["auth/error-creating-user"];
      });
  },
});
export const { toggleRegister, cleanupErrors } = authSlice.actions;
export default authSlice.reducer;