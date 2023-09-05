import { Box } from '@react-native-material/core';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../config/colors';
import I18n from '../../../../i18n/i18n';
import CodeInput from '../../common/code-input';
import { Button } from 'react-native-paper';
import EmailVerificationModal from './email-verification-modal';

export default function VerifyEmail({ onVerify, onResendEmail, onRedirect }: { onVerify: any, onResendEmail: any, onRedirect?: any }) {

    const [authCode, setAuthCode] = useState('');
    const [showVerifyModal, setShowModal] = useState(false);
    const [verifySuccess, setVerifySuccess] = useState(false);

    const getCode = (code: string) => {
        setAuthCode(code);
    }

    const handleModalAction = () => {
        setShowModal(false);
        if (verifySuccess && onRedirect) {
            onRedirect();
        } else {
            setAuthCode('');
        }
    }

    const verify = async () => {
        const verificationResult = await onVerify(authCode);
        setShowModal(true);
        setVerifySuccess(verificationResult);
    }

    return (
        <View>
            <Box style={styles.container}>
                <MaterialCommunityIcons name="email-send-outline" size={80} color={colors.syghtingDarkGreen} />
                <Text style={styles.text1}>{I18n.t('Login.NewUser.verifyEmail.text1')}</Text>
                <Text style={styles.text2}>{I18n.t('Login.NewUser.verifyEmail.text2')}</Text>
                <Text style={styles.text3}>{I18n.t('Login.NewUser.verifyEmail.text3')}</Text>
                <CodeInput onChange={getCode} />
                <Button disabled={authCode.length < 6} style={styles.verifyBt} mode="contained" onPress={() => verify()}>
                    {I18n.t('Login.NewUser.verifyEmail.verifyBtn')}
                </Button>
                <TouchableOpacity onPress={() => { onResendEmail() }}>
                    <Text style={styles.resendEmailBT}>{I18n.t('Login.NewUser.verifyEmail.resend')}</Text>
                </TouchableOpacity>
            </Box>
            <EmailVerificationModal actionBt={handleModalAction} showModal={showVerifyModal} success={verifySuccess} />
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
        marginBottom: 20,
    },
    resendEmailBT: {
        fontSize: 15,
        color: colors.syghtingDarkGreen,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },
    verifyBt: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.syghtingDarkGreen,
    }
});