import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserToUpdate } from "../interfaces/common";
import AuthService from "../services/auth.service";
import { AppState } from "./interfaces";
import { authErrorMessages, authSuccessMessages } from "../messages";
import { resetSights } from "./sight-slice";
import { resetGeoLocation } from "./geolocation-slice";

const initialState: AppState = {
  user: null,
  loggedIn: false,
  loading: false,
  isRegistering: false,
  error: false,
  message: '',
  isVerifyingEmail: false,
  isUpdatingUser: false,
  isUserVerified: false,
  isResettingPassword: false,
  hasUserAskedPassReset: false,
  isUserAllowedReset: false,
};

const authService: AuthService = AuthService.getInstance();

const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = createAsyncThunk<{ user: User }, { user: User }>(
  'loginUser',
  async ({ user }) => {
    const response = await authService.login(user);
    if (response.success) {
      return {
        user: response.user ?? [],
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

    const response = await authService.logout();
    if (response.success) {
      return;
    } else {
      throw new Error('Error logging out');
    }
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

async function getVerificationStatus(userId: string) {
  const response = await authService.verifyEmail(userId);
  if (!response.verified) {
    await sleep(5000);
    return getVerificationStatus(userId);
  } else {
    return response;
  }
}

export const verifyUserRegistration = createAsyncThunk<{ verified: boolean }, string | undefined>(
  'verifyUserRegistration',
  async (userId) => {
    try {
      if (!userId) {
        throw 'Error could not find user';
      }
      const response = await getVerificationStatus(userId);
      return response;
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

async function getVerificationReset(email: string) {
  const response = await authService.verifyResetPassword(email);
  if (!response.allowed) {
    await sleep(5000);
    return getVerificationReset(email);
  } else {
    return response;
  }
}

export const verifyUserResetPassword = createAsyncThunk<{ allowed: boolean }, string>(
  'verifyUserResetPassword',
  async (email) => {
    try {
      const response = await getVerificationReset(email);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

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
        state.isVerifyingEmail = false;
        state.isRegistering = false;
        state.loading = false;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.loggedIn = false;
        state.message = authErrorMessages['auth/login-error'];
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
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
        state.isVerifyingEmail = action.payload.verified ? true : false;
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
        state.isUserAllowedReset = action.payload.allowed;
      })
      .addCase(verifyUserResetPassword.rejected, (state) => {
        state.error = true;
        state.isResettingPassword = true;
        state.message = authErrorMessages['auth/error-sending-email'];
      })
      .addCase(notifyUserResetPassword.fulfilled, (state) => {
        state.hasUserAskedPassReset = true;
      })
      .addCase(notifyUserResetPassword.rejected, (state) => {
        state.error = true;
        state.message = authErrorMessages['auth/error-sending-email'];
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
export const { toggleRegister, cleanupMessages, openUserUpdate, closeUserUpdate, setError, toggleResettingPassword } = authSlice.actions;
export default authSlice.reducer;