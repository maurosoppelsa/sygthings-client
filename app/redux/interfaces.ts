import { User } from "../interfaces/common";

export type UserState = {
    user: User;
    loggedIn: boolean;
};