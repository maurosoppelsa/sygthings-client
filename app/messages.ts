import I18n from '../i18n/i18n';

type Messages = {
    [key: string]: string;
};

export const authErrorMessages: Messages = {
    "auth/user-not-found": I18n.t('Auth.errors.userNotFound'),
    "auth/email-already-in-use": I18n.t('Auth.errors.emailInUse'),
    "auth/login-error": I18n.t('Auth.errors.loginError'),
    "auth/logout-error": I18n.t('Auth.errors.logoutError'),
    "auth/error-creating-user": I18n.t('Auth.errors.errorCreatingUser'),
    "auth/error-updating-user": I18n.t('Auth.errors.errorUpdatingUser'),
};

export const authSuccessMessages: Messages = {
    "auth/user-created": I18n.t('Auth.success.userCreated'),
    "auth/user-updated": I18n.t('Auth.success.userUpdated'),
};
