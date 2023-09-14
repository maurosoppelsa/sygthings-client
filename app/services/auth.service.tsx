import { SERVER_URL } from "../config/authentication";
import { User, UserToUpdate } from "../interfaces/common";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class AuthService {
    private static _instance: AuthService = new AuthService();

    constructor() {
        if (AuthService._instance) {
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        AuthService._instance = this;
    }

    private setToken = async (token: string) => {
        await AsyncStorage.setItem('token', token);
    }

    private getToken = async () => {
        return await AsyncStorage.getItem('token');
    }

    public static getInstance(): AuthService {
        return AuthService._instance;
    }

    public login = (user: User) => {
        AsyncStorage.clear();
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
            .then(async (json) => {
                if(json.token) {
                   await this.setToken(json.token);
                }
                return {
                    user: json.user,
                    success: json.success,
                };
            })
    }

    public logout = async () => {
        const token = await this.getToken();
        return fetch(`${SERVER_URL}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                
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
            .then((json) => {
                return json;
            })
    }

    public update = async (user: UserToUpdate) => {
        const token = await this.getToken();
        return fetch(`${SERVER_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
        const token = await this.getToken();
        return fetch(`${SERVER_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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