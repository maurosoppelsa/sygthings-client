import { SIGHT_MODAL_STATUS } from "../constants";
import { Sight, User } from "../interfaces/common";

export type UserState = {
    user: User;
    loggedIn: boolean;
};

export type AppState = {
    user: User;
    sessionToken: Object | null;
    loggedIn: boolean;
    loading: boolean;
    isRegistering: boolean;
    error: boolean | undefined;
    message: string;
    isVerifyingEmail: boolean;
    expireEmailVerification: number | null;
    isUpdatingUser: boolean;
    isUserVerified: boolean;
    isResettingPassword: boolean;
    hasUserAskedPassReset: boolean;
    isUserAllowedReset: boolean;
};

export type newSightState = {
    newSight: Sight,
    mySights: Sight[],
    currentSights: Sight[],
    showSightModal: boolean,
    error: boolean | undefined,
    loading: boolean,
    loadingMySights: boolean,
    modalStatus: SIGHT_MODAL_STATUS,
    showImageOptionsModal: boolean,
    backToMainScreen: boolean,
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