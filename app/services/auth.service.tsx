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
            if(response.headers.get('Set-cookie')) {
                const cookie = response.headers.get('Content-Type');
                AsyncStorage.setItem('cookie', cookie);
            }
            return response.json();
        })
            .then((json) => {
                return json;
            })
    }

    public logout = () => {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
                
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

    public update = (user: UserToUpdate) => {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
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
                return json;
            })
    }
}