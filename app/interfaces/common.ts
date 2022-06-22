export type User = {
    username: string;
    password: string;
} | null;


export type Sight = {
    province: string;
    animal: string;
    picture: string;
    condition: string;
    location: {
        latitud: string;
        longitud: string;
    };
} | null

export type Picture = {
    height: number;
    width: number;
    uri: string;
} | null;