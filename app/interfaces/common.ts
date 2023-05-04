export type User = {
    id?: string;
    name?: string;
    lastName?: string;
    password?: string;
    occupation?: string;
    email?: string;
} | null;

export type UserToUpdate = User & { newPassword?: string };


export type Sight = {
    animal: string;
    province: string;
    picture: {
        height: number,
        uri: string,
        with: number,
    },
    condition: string;
    placeName: string;
    location: {
        latitude: string;
        longitude: string;
    },
    description: string;
    createdAt: string;
    userId: string | undefined;
    user?: {
        name: string,
        lastName: string,
        occupation: string,
    }
} | null;

export type Picture = {
    height: number;
    width: number;
    uri: string;
} | null;

export type Location = {
    latitude: string;
    longitude: string;
};

export type Coordinates = {
    latitude: string;
    longitude: string;
};

export type LocationDetails = {
    locality: string;
    place: string;
    country: string;
    region: string;
}