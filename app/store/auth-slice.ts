import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type  User = {
    username: string;
    password: string;
} | null;

export type UserState = {
    user: User;
    loggedIn: boolean;

};

const initialState: UserState = {
    user: null,
    loggedIn: false,
};

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            return {
              ...state,
              ...action.payload,
              loggedIn: true,
            };
          },
        logoutSuccess: (state, action) => {
            state.user = null;
            state.loggedIn = false;
        },
    },
});

export default userSlice.reducer;

// Actions
const { loginSuccess, logoutSuccess } = userSlice.actions;
export const login = (userData: any) => async (dispatch: any) => {
    try {
        console.log('userSlice username', userData.username);
        console.log('userSlice password', userData.password);
        // const res = await api.post('/api/auth/login/', { username, password })
        dispatch(loginSuccess(userData));
    } catch (e) {
        return console.error(e.message);
    }
}
export const logout = (user: User) => async (dispatch: any) => {
    try {
        // const res = await api.post('/api/auth/logout/')
        return dispatch(logoutSuccess(user))
    } catch (e) {
        return console.error(e.message);
    }
}
