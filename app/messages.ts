type Messages = {
    [key: string]: string;
};

export const authErrorMessages: Messages = {
    "auth/user-disabled": "User account has been disabled.",
    "auth/user-not-found": "User not found.",
    "auth/email-already-in-use": "Email already in use.",
    "auth/login-error": "Login failed! username or password invalid.",
    "auth/logout-error": "Error logging out.",
    "auth/error-creating-user": "Error creating user.",
};

export const authSuccessMessages: Messages = {
    "auth/user-created": "User created successfully, please check your email to complete verification.",
    "auth/user-logged-in": "User logged in successfully.",
    "auth/user-logged-out": "User logged out successfully.",
};
