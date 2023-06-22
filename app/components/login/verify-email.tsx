import { Box } from '@react-native-material/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import I18n from '../../../i18n/i18n';


export default function VerifyEmail({ onResendEmail }: { onResendEmail: any }) {

    return (
        <View>
            <Box style={styles.container}>
                <MaterialCommunityIcons name="email-send-outline" size={80} color={colors.syghtingDarkGreen} />
                <Text style={styles.text1}>{I18n.t('Login.NewUser.verifyEmail.text1')}</Text>
                <Text style={styles.text2}>{I18n.t('Login.NewUser.verifyEmail.text2')}</Text>
                <Text style={styles.text3}>{I18n.t('Login.NewUser.verifyEmail.text3')}</Text>
                <TouchableOpacity onPress={() => { onResendEmail() }}>
                    <Text style={styles.resendEmailBT}>{I18n.t('Login.NewUser.verifyEmail.resend')}</Text>
                </TouchableOpacity>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: "center",
    },
    text1: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
    },
    text2: {
        fontSize: 15,
        marginTop: 10,
    },
    text3: {
        fontSize: 15,
        marginBottom: 10,
    },
    resendEmailBT: {
        fontSize: 15,
        color: colors.syghtingDarkGreen,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    }
});