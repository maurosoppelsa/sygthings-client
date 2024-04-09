import { SERVER_URL } from "../config/authentication";
import { User, UserToUpdate } from "../interfaces/common";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class AuthService implements Tokenizable{
    private static _instance: AuthService = new AuthService();
    private token: string = '';

    constructor() {
        if (AuthService._instance) {
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        AuthService._instance = this;
    }

    public static getInstance(): AuthService {
        return AuthService._instance;
    }

    public setSessionToken = (token: string) => {
        this.token = token;
    }

    public login = (user: User) => {
        return fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user?.email,
                password: user?.password,
            })
        }).then((response: any) => {
            return response.json();
        })
            .then(async (data) => {
                return {
                    sessionToken: data.sessionToken,
                    user: data.user,
                    success: data.success,
                    message: data.message,
                    verified: !data.success ? data.verified : true,
                };
            })
    }

    public logout = async () => {
        return fetch(`${SERVER_URL}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
                
            },
        }).then((response) => response.json())
            .then((json) => {
                AsyncStorage.clear();
                return json;
            })
    }

    public register = (user: User) => {
        return fetch(`${SERVER_URL}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                occupation: user?.occupation,
                password: user?.password,
            })
        }).then((response) => response.json())
            .then((data) => {
                AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
                return data;
            })
    }

    public update = async (user: UserToUpdate) => {
        return fetch(`${SERVER_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                name: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                occupation: user?.occupation,
                password: user?.password,
                newPassword: user?.newPassword,
            })
        }).then((response) => response.json())
            .then((json) => {
                AsyncStorage.clear();
                return json;
            })
    }

    public deleteUser = async (userId: string) => {
        return fetch(`${SERVER_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public verifyEmail = async (userId: string, regCode: string) => {
        return fetch(`${SERVER_URL}/users/verify/${userId}/${regCode}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public resendEmail = (userId: string) => {
        return fetch(`${SERVER_URL}/users/resend-verification/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public notifyResetPassword = (email: string) => {
        return fetch(`${SERVER_URL}/users/forgot-password/${email}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public verifyResetPassword = (email: string, code: string) => {
        return fetch(`${SERVER_URL}/users/auth-verify-allow-reset/${email}/${code}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public cancelResetPass = (email: string) => {
        return fetch(`${SERVER_URL}/users/auth-cancel-reset-password/${email}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }

    public updatePassword = (email: string, password: string) => {
        return fetch(`${SERVER_URL}/users/auth-update-password`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                email,
            })
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }
}