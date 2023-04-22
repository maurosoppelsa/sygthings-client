import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight, User } from "../interfaces/common";

export type UserState = {
    user: User;
    loggedIn: boolean;
};

export type AppState = {
    user: User;
    loggedIn: boolean;
    loading: boolean;
    isRegistering: boolean;
    error: boolean | undefined;
    message: string;
    isVerifyingEmail: boolean;
    isUpdatingUser: boolean;
};

export type newSightState = {
    newSight: Sight,
    mySights: Sight[],
    currentSights: Sight[],
    showSightModal: boolean,
    error: boolean | undefined,
    modalStatus: SIGHT_MODAL_STATUS,
};

export type picture = {
    height: number,
    uri: string,
    with: number,
};

export type location = {
    latitude: string,
    longitude: string,
}