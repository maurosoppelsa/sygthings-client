import { SERVER_URL } from "../config/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class SightService {
    private static _instance: SightService = new SightService();

    constructor() {
        if (SightService._instance) {
            throw new Error("Error: Instantiation failed: Use SightService.getInstance() instead of new.");
        }
        SightService._instance = this;
    }

    public static getInstance(): SightService {
        return SightService._instance;
    }

    public getAllSights(userId: string) {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/sight/exclude/${userId}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error))
    }

    public getSightsByUser(userId: string) {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/sight/${userId}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error))
    }

    public createSight(sight: any) {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/sight`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
            },
            body: JSON.stringify(sight),
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    return;
                }
            })
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error))
    }

    public deleteSight(sightId: string) {
        const cookie = AsyncStorage.getItem('cookie');
        return fetch(`${SERVER_URL}/sight/${sightId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${cookie}`,
            },
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    return;
                }
            })
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error))
    }
}