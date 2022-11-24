import { ACCESS_TOKEN, SERVER_URL } from "../config/authentication";
import { User } from "../interfaces/common";

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
        return fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user?.username,
                password: user?.password,
            })
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
    }
}