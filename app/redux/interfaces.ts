import { Sight, User } from "../interfaces/common";

export type UserState = {
    user: User;
    loggedIn: boolean;
};

export type AppState = {
    user: User;
    loggedIn: boolean;
    loading: boolean;
    error: boolean | undefined;
};

export type newSightState = {
    newSight: Sight,
    showSightModal: boolean,
    loading: boolean,
    error: boolean | undefined,
};