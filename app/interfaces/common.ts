export type User = {
    username: string;
    password: string;
} | null;


export type Sight = {
    animal: string;
    picture: string;
    condition: string;
    location: {
        latitude: string;
        longitude: string;
    };
} | null

export type Picture = {
    height: number;
    width: number;
    uri: string;
} | null;