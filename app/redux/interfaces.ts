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
    error: boolean | undefined;
};

export type newSightState = {
    newSight: Sight,
    showSightModal: boolean,
    error: boolean | undefined,
    modalStatus: SIGHT_MODAL_STATUS,
};