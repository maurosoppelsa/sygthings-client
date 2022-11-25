import { Box, Flex } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import PersonCircleComponent from '../common/profile-circle.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TotalSightsComponent from './total-sights.component';
import { useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/auth-slice';
import { Sight, User } from '../../interfaces/common';
import { useSelector } from 'react-redux';

export default function Profile() {

    const dispatch = useAppDispatch();
    const logout = () => dispatch(logoutUser());
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
    const currentUser: User = useSelector((state: any) => state.authentication.user);

    return (
        <View style={styles.container}>
            <Box style={styles.profileContent}>
                <MaterialCommunityIcons style={styles.editBt} name="border-color" size={20} onPress={() => () => { }} />
                <Box style={styles.personContent}>
                    <PersonCircleComponent fullname={"Emma Phillips"}></PersonCircleComponent>
                    <Box style={styles.personDescription}>
                        <Text>{currentUser?.username}</Text>
                        <Text style={styles.occupation}>{currentUser?.occupation}</Text>
                    </Box>
                </Box>
                <Box style={styles.personInfoContent}>
                    <MaterialCommunityIcons style={styles.mailIcon} name="email-outline" size={15} onPress={() => () => { }} />
                    <Text style={styles.email}>{currentUser?.email}</Text>
                </Box>
                <Box style={styles.totalSightsContent}>
                    <TotalSightsComponent sightsAmount={mySights.length} />
                    <Text style={styles.sightsLegend}>Thanks for your help! Animals around the world will appreciate your effort.</Text>
                </Box>
                <TouchableOpacity style={styles.logoutBox} onPress={() => logout()}>
                    <MaterialCommunityIcons style={styles.logoutIcon} name="power-standby" size={20} />
                    <Text style={styles.logoutTxt}>Log out</Text>
                </TouchableOpacity>
            </Box>
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
});