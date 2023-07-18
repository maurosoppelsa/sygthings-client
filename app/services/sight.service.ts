import { SERVER_URL } from "../config/authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sight } from "../interfaces/common";
import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
const { fs } = RNFetchBlob;

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

    public async createSight(sight: any) {
        try {
            const cookie = await AsyncStorage.getItem('cookie');
            const picture = sight.picture;
            delete sight.picture;
            const formData = new FormData();
            const imageBlob = await RNFS.readFile(picture.uri, 'base64');

            formData.append('photo', imageBlob);
            formData.append('sight', JSON.stringify(sight));

            const serverResponse = await fetch(`${SERVER_URL}/sight`, {
                method: 'POST',
                headers: {
                    "Content-type": "multipart/form-data",
                    Authorization: `${cookie}`,
                },
                body: formData,
            });

            if (serverResponse.status === 200 || serverResponse.status === 201) {
                const json = await serverResponse.json();
                return json;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
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

    public updateSight(sight: Sight) {
        const cookie = AsyncStorage.getItem('cookie');
        const contentType = sight?.picture?.uri ? 'multipart/form-data' : 'application/json';
        let body: BodyInit | null | undefined = null;
        if (sight?.picture) {
            const formData = new FormData();
            formData.append('photo', RNFetchBlob.wrap(sight.picture.uri));
            formData.append('sight', JSON.stringify(sight));
            body = formData;
        } else {
            body = JSON.stringify(sight);
        }
        return fetch(`${SERVER_URL}/sight/${sight?.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': contentType,
                'Authorization': `${cookie}`,
            },
            body,
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