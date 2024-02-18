import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserToUpdate } from "../interfaces/common";
import AuthService from "../services/auth.service";
import { AppState } from "./interfaces";
import { authErrorMessages, authSuccessMessages } from "../messages";
import { resetSights } from "./sight-slice";
import { resetGeoLocation } from "./geolocation-slice";
import { getTomorrowDate } from "../utils/common";

const initialState: AppState = {
  user: null,
  sessionToken: {
    token: '',
    expiresIn: null,
  },
  loggedIn: false,
  loading: false,
  isRegistering: false,
  error: false,
  message: '',
  isVerifyingEmail: false,
  expireEmailVerification: null,
  isUpdatingUser: false,
  isUserVerified: false,
  isResettingPassword: false,
  hasUserAskedPassReset: false,
  isUserAllowedReset: false,
};

const authService: AuthService = AuthService.getInstance();

//TODO: remove this, it's just for testing redux persist
//authService.getEverything();

export const loginUser = createAsyncThunk<{ user: User, sessionToken: { token: string, expiresIn: number} }, { user: User }>(
  'loginUser',
  async ({ user }) => {
    const response = await authService.login(user);
    if (response.success) {
      return {
        user: response.user ?? [],
        sessionToken: {
          token: response.sessionToken.token,
          expiresIn: response.sessionToken.expiresIn,
        }
      };
    } else {
      throw 'Error login user';
    }
  });

export const logoutUser = createAsyncThunk<{}>(
  'logoutUser',
  async (_, { dispatch }) => {
    dispatch(resetSights());
    dispatch(resetGeoLocation());
    return initialState;
  });

export const createUser = createAsyncThunk<{ user: User }, { user: User }>(
  'createUser',
  async ({ user }) => {
    const response = await authService.register(user);
    if (response.success) {
      return response;
    } else {
      throw 'Error creating user';
    }
  });

export const updateUser = createAsyncThunk<{ user: UserToUpdate }, UserToUpdate>(
  'updateUser',
  async (user) => {
    const response = await authService.update(user);
    if (response.success) {
      return response;
    } else {
      throw 'Error updating user';
    }
  });

export const deleteUser = createAsyncThunk<{ user: User }, string | undefined>(
  'deleteUser',
  async (userId) => {
    if (!userId) {
      throw 'Error could not find user';
    }
    const response = await authService.deleteUser(userId);
    if (response.success) {
      return response;
    } else {
      throw 'Error deleting user';
    }
  });

export const verifyUserRegistration = createAsyncThunk<{ verified: boolean }, { userId: string, regCode: string }>(
  'verifyUserRegistration',
  async ({ userId, regCode }) => {
    try {
      if (!userId) {
        throw 'Invalid user id';
      } else {
        const response = await authService.verifyEmail(userId, regCode);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  });

export const resendEmailVerification = createAsyncThunk<{ verified: boolean }, string | undefined>(
  'resendVerificationEmail',
  async (userId) => {
    try {
      if (!userId) {
        throw 'Error could not find user';
      }
      const response = await authService.resendEmail(userId);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

export const notifyUserResetPassword = createAsyncThunk<{ notified: boolean }, string>(
  'notifyUserResetPassword',
  async (email) => {
    try {
      const response = await authService.notifyResetPassword(email);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  export const verifyUserResetPassword = createAsyncThunk<{ allowed: boolean }, { email: string, code: string }>(
    'verifyUserResetPassword',
    async ({ email, code }) => {
      try {
        const response = await authService.verifyResetPassword(email, code);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );  

export const cancelResetPassword = createAsyncThunk<{ allowed: boolean }, string>(
  'cancelResetPassword',
  async (email) => {
    try {
      const response = await authService.cancelResetPass(email);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

export const updateUserPassword = createAsyncThunk<{ updated: boolean }, { email: string, password: string }>(
  'updateUserPassword',
  async ({ email, password }) => {
    try {
      const response = await authService.updatePassword(email, password);
      if (response.success) {
        return response;
      } else {
        throw new Error('Error updating password');
      }
    } catch (error) {
      console.log(error);
    }
  });

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    toggleRegister: (state: any) => {
      state.isRegistering = !state.isRegistering;
      state.isVerifyingEmail = false;
    },
    cleanupMessages: (state: any) => {
      state.error = false;
      state.message = '';
    },
    openUserUpdate: (state: any) => {
      state.isUpdatingUser = true;
    },
    closeUserUpdate: (state: any) => {
      state.isUpdatingUser = false;
    },
    setError: (state: any, action: any) => {
      state.error = true;
      state.message = action.payload;
    },
    toggleResettingPassword: (state: any) => {
      state.isResettingPassword = !state.isResettingPassword;
      state.hasUserAskedPassReset = false;
      state.isUserAllowedReset = false;
    },
    sanitizeLogin: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.loggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.sessionToken = action.payload.sessionToken;
        state.isVerifyingEmail = false;
        state.isRegistering = false;
        state.loading = false;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/login-error'];
        state.loading = false;
        state.loggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
        state.sessionToken = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/logout-error'];
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.loggedIn = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.loggedIn = false;
        state.isVerifyingEmail = true;
        state.expireEmailVerification = getTomorrowDate();
      })
      .addCase(createUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.loggedIn = false;
        state.message = authErrorMessages['auth/error-creating-user'];
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { lastName, name, email, occupation } = action.payload.user;
        state.loading = false;
        state.isUpdatingUser = false;
        state.message = authSuccessMessages['auth/user-updated'];
        const updatedUser = {
          ...(state.user || {}),
          ...(lastName ? { lastName } : {}),
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...(occupation ? { occupation } : {})
        };
        state.user = updatedUser;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.message = authErrorMessages['auth/error-updating-user'];
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = authSuccessMessages['auth/user-deleted'];
        state.user = null;
        state.loggedIn = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.message = authErrorMessages['auth/error-deleting-user'];
      })
      .addCase(verifyUserRegistration.pending, (state) => {
        state.isVerifyingEmail = true;
        state.isUserVerified = false;
      })
      .addCase(verifyUserRegistration.fulfilled, (state, action) => {
        state.isUserVerified = action.payload.verified;
      })
      .addCase(verifyUserRegistration.rejected, (state) => {
        state.isUserVerified = false;
        state.isVerifyingEmail = false;
        state.error = true;
        state.message = authErrorMessages['auth/error-verifying-user'];
      })
      .addCase(resendEmailVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.expireEmailVerification = getTomorrowDate();
        state.message = authSuccessMessages['auth/email-sent'];
      })
      .addCase(resendEmailVerification.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.message = authErrorMessages['auth/error-sending-email'];
      })
      .addCase(verifyUserResetPassword.pending, (state) => {
        state.isResettingPassword = true;
      })
      .addCase(verifyUserResetPassword.fulfilled, (state, action) => {
        state.isUserAllowedReset = action.payload?.allowed || false;
      })
      .addCase(verifyUserResetPassword.rejected, (state) => {
        state.error = true;
        state.isResettingPassword = true;
        state.message = authErrorMessages['auth/error-sending-email'];
      })
      .addCase(notifyUserResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(notifyUserResetPassword.fulfilled, (state) => {
        state.hasUserAskedPassReset = true;
        state.loading = false;
      })
      .addCase(notifyUserResetPassword.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/error-sending-email'];
        state.loading = false;
      })
      .addCase(cancelResetPassword.fulfilled, (state) => {
        state.isResettingPassword = false;
        state.isUserAllowedReset = false;
        state.hasUserAskedPassReset = false;
      })
      .addCase(cancelResetPassword.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/error-sending-email'];
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isResettingPassword = false;
        state.isUserAllowedReset = false;
        state.hasUserAskedPassReset = false;
      })
      .addCase(updateUserPassword.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/error-updating-password'];
      });
  },
});
export const { toggleRegister, cleanupMessages, openUserUpdate, closeUserUpdate, setError, toggleResettingPassword, sanitizeLogin } = authSlice.actions;
export default authSlice.reducer;