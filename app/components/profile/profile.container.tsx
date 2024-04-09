import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '../../redux/store';
import { logoutUser, updateUser, openUserUpdate, closeUserUpdate, cleanupMessages, setError, deleteUser } from '../../redux/auth-slice';
import { User, UserToUpdate } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import I18n from '../../../i18n/i18n';
import UserUpdateForm from './user-update-form.component';
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
// @ts-ignore
import customLogo from '../../assets/marandu.png';
import { version } from '../../../package.json';
import { isTabletDevice } from '../../utils/common';

export default function Profile() {

    const dispatch = useAppDispatch();
    const logout = () => dispatch(logoutUser());
    const authentication = useSelector((state: any) => state.authentication);
    const currentUser: User = authentication.user;
    const isUpdatingUser = authentication.isUpdatingUser;
    const fullName = `${currentUser?.name} ${currentUser?.lastName}`;
    const message = authentication.message;
    const error = authentication.error;
    const closeUserUpdateForm = () => dispatch(closeUserUpdate());
    const resetMessages = () => dispatch(cleanupMessages());

    const onCancelUpdateUser = () => {
        closeUserUpdateForm();
    };

    const onUserUpdate = () => {
        dispatch(openUserUpdate());
        resetMessages();
    };

    const hasUserChanged = (user: User, currentUser: User) => {
        return (
            user?.name !== currentUser?.name ||
            user?.lastName !== currentUser?.lastName ||
            user?.email !== currentUser?.email ||
            user?.occupation !== currentUser?.occupation
        );
    };

    const onUpdateUser = (user: UserToUpdate) => {
        if (!hasUserChanged(user, currentUser) && !user.newPassword) {
            dispatch(setError(I18n.t('Profile.noDiffereces')));
        } else {
            dispatch(updateUser(user));
        }
        closeUserUpdateForm();
    };

    const onUserDelete = () => {
        dispatch(deleteUser(currentUser?.id));
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                closeUserUpdateForm();
                resetMessages();
            };
        }, [])
    );

    if (isUpdatingUser) {
        return (
            <View>
                <UserUpdateForm user={currentUser} onCancel={onCancelUpdateUser} onUpdate={onUpdateUser} onDelete={onUserDelete}></UserUpdateForm>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Box style={styles.profileContent}>
                    <TouchableOpacity onPress={() => onUserUpdate()}>
                        <MaterialCommunityIcons style={styles.editBt} name="border-color" size={ isTabletDevice() ? 50 : 30} />
                    </TouchableOpacity>
                    <MaterialCommunityIcons style={styles.accountIcon} name="account-circle-outline" size={isTabletDevice() ? 240 : 120} />
                    <Box style={styles.personContent}>
                        <Box style={styles.personDescription}>
                            <Box style={styles.personInfoField}>
                                <MaterialCommunityIcons style={styles.infoIcon} name="account" size={ isTabletDevice() ? 35 : 25 } onPress={() => () => { }} />
                                <Text style={styles.userTextField}>{fullName}</Text>
                            </Box>
                            <Divider style={styles.divider}></Divider>
                            <Box style={styles.personInfoField}>
                                <MaterialCommunityIcons style={styles.infoIcon} name="email" size={ isTabletDevice() ? 35 : 25 } onPress={() => () => { }} />
                                <Text style={styles.userTextField}>{currentUser?.email}</Text>
                            </Box>
                            <Divider style={styles.divider}></Divider>
                            <Box style={styles.personInfoField}>
                                <MaterialCommunityIcons style={styles.infoIcon} name="briefcase" size={ isTabletDevice() ? 35 : 25 } onPress={() => () => { }} />
                                <Text style={styles.userTextField}>{currentUser?.occupation}</Text>
                            </Box>
                            <Divider style={styles.divider}></Divider>
                        </Box>
                    </Box>
                    <Box style={styles.legendContainer}>
                        {
                            message !== '' &&
                            <Text style={[styles.message, error ? styles.errorMessage : styles.successMessage]}>{message}</Text>
                        }
                        {message === '' &&
                            <Box>
                                <Text style={styles.legend}>{I18n.t("Profile.legend1")}</Text>
                                <Image source={customLogo} style={styles.customLogo}></Image>
                                <Text style={styles.legend}>{I18n.t("Profile.legend2")}</Text>
                            </Box>
                        }
                    </Box>
                    <TouchableOpacity style={styles.logoutBox} onPress={() => logout()}>
                        <MaterialCommunityIcons style={styles.logoutIcon} name="power-standby" size={isTabletDevice() ? 30 : 20} />
                        <Text style={styles.logoutTxt}>{I18n.t('Profile.logout')}</Text>
                    </TouchableOpacity>
                </Box>
                <Text style={styles.versionText}>App Version: {version}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: colors.white,
        height: '100%',
    },
    profileContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    personContent: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    personDescription: {
        alignSelf: 'center',
        marginLeft: isTabletDevice() ? '30%' : '15%',
    },
    accountIcon: {
        alignSelf: 'center',
        color: colors.lightGray,
        marginTop: 20,
        marginBottom: 15,
    },
    personInfoField: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    editBt: {
        alignSelf: 'flex-end',
        color: colors.maranduGreen,
    },
    infoIcon: {
        color: colors.maranduGreen,
        marginRight: isTabletDevice() ? 20 : 10,
        marginTop: 1,
    },
    userTextField: {
        marginTop: 3,
        marginBottom: 10,
        color: colors.darkGray,
        fontSize: isTabletDevice() ? 22 : 16,
    },
    logoutBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: isTabletDevice() ? 40 : 15,
        marginBottom: isTabletDevice() ? 20 : 5,
        alignSelf: 'center'
    },
    logoutIcon: {
        color: colors.red,
        marginRight: 10,
    },
    logoutTxt: {
        color: colors.red,
        fontSize: isTabletDevice() ? 18 : 14,
        ...(isTabletDevice() && { marginTop: 3 })
    },
    message: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        color: colors.red,
    },
    successMessage: {
        color: colors.officeGreen,
    },
    errorMessage: {
        color: colors.red,
    },
    divider: {
        width: '100%',
        backgroundColor: colors.lightGray,
        marginTop: isTabletDevice() ? 15 : 10,
        marginLeft: 25,
        height: 1,
    },
    legendContainer: {
        marginTop: 40,
        marginBottom: 10,
        alignSelf: 'center',
    },
    legend: {
        fontSize: isTabletDevice() ? 18 : 14,
        color: colors.darkGray,
        textAlign: 'center',
    },
    customLogo: {
        alignSelf: 'center',
        marginTop: isTabletDevice() ? 30 : 15,
        marginBottom: isTabletDevice() ? 30 : 15,
    },
    versionText: {
        fontSize: isTabletDevice() ? 14 : 10,
        color: colors.darkGray,
        alignSelf: 'center',
        textAlign: 'center',
    },
});