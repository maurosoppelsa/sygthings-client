import { Box, Flex } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';
import PersonCircleComponent from './person-circle.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Box style={styles.profileContent}>
                <MaterialCommunityIcons style={styles.editBt} name="border-color" size={20} onPress={() => () => { }} />
                <Box style={styles.personContent}>
                    <PersonCircleComponent fullname={"Emma Phillips"}></PersonCircleComponent>
                    <Box style={styles.personDescription}>
                        <Text>Emma Phillips</Text>
                        <Text style={styles.occupation}>Biologist</Text>
                    </Box>
                </Box>
                <Box style={styles.personInfoContent}>
                    <MaterialCommunityIcons style={styles.mailIcon} name="email-outline" size={15} onPress={() => () => { }} />
                    <Text style={styles.email}>some.email@email.com</Text>
                </Box>
                <Box style={styles.logoutBox}>
                    <MaterialCommunityIcons style={styles.logoutIcon} name="power-standby" size={20} onPress={() => () => { }} />
                    <Text style={styles.logoutTxt}>Log out</Text>
                </Box>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        backgroundColor: colors.white,
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
        marginTop: 20,
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
        marginTop: 20,
    },
    logoutIcon: {
        color: colors.red,
        marginRight: 10,
    },
    logoutTxt: {
        color: colors.red,
        fontSize: 14,
    }
});