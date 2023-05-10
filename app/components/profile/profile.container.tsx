import { Box } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import PersonCircleComponent from '../common/profile-circle.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TotalSightsComponent from './total-sights.component';
import { useAppDispatch } from '../../redux/store';
import { logoutUser, updateUser, openUserUpdate, closeUserUpdate, cleanupMessages, setError } from '../../redux/auth-slice';
import { Sight, User, UserToUpdate } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import I18n from '../../../i18n/i18n';
import UserUpdateForm from './user-update-form.component';
import { useFocusEffect } from '@react-navigation/native';
import { getSightsByUser } from '../../redux/sight-slice';

export default function Profile() {

    const dispatch = useAppDispatch();
    const logout = () => dispatch(logoutUser());
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
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
        console.log('delete user');
    }

    useEffect(() => {
        if (mySights.length === 0 && currentUser?.id) {
            dispatch(getSightsByUser(currentUser.id));
        }
    }, []);

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
            <Box style={styles.profileContent}>
                <TouchableOpacity onPress={() => onUserUpdate()}>
                    <MaterialCommunityIcons style={styles.editBt} name="border-color" size={20} />
                </TouchableOpacity>
                <Box style={styles.personContent}>
                    <PersonCircleComponent fullname={fullName}></PersonCircleComponent>
                    <Box style={styles.personDescription}>
                        <Text>{fullName}</Text>
                        <Text style={styles.occupation}>{currentUser?.occupation}</Text>
                    </Box>
                </Box>
                <Box style={styles.personInfoContent}>
                    <MaterialCommunityIcons style={styles.mailIcon} name="email-outline" size={15} onPress={() => () => { }} />
                    <Text style={styles.email}>{currentUser?.email}</Text>
                </Box>
                <Box style={styles.totalSightsContent}>
                    <TotalSightsComponent sightsAmount={mySights.length} />
                    <Text style={styles.sightsLegend}>{I18n.t('Profile.sightsLegend')}</Text>
                </Box>
                <TouchableOpacity style={styles.logoutBox} onPress={() => logout()}>
                    <MaterialCommunityIcons style={styles.logoutIcon} name="power-standby" size={20} />
                    <Text style={styles.logoutTxt}>{I18n.t('Profile.logout')}</Text>
                </TouchableOpacity>
            </Box>
            {
                message !== '' &&
                <Text style={[styles.message, error ? styles.errorMessage : styles.successMessage]}>{message}</Text>
            }
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
    },
    personDescription: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    occupation: {
        color: colors.gray,
        fontSize: 10,
    },
    personInfoContent: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    editBt: {
        alignSelf: 'flex-end',
    },
    mailIcon: {
        color: colors.gray,
        marginRight: 10,
        marginTop: 1,
    },
    email: {
        color: colors.gray,
        fontSize: 12,
    },
    logoutBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        alignSelf: 'center'
    },
    logoutIcon: {
        color: colors.red,
        marginRight: 10,
    },
    logoutTxt: {
        color: colors.red,
        fontSize: 14,
    },
    totalSightsContent: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 30,
    },
    sightsLegend: {
        fontStyle: 'italic',
        color: colors.gray,
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
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
});