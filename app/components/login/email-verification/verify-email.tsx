import { Box } from '@react-native-material/core';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../config/colors';
import I18n from '../../../../i18n/i18n';
import CodeInput from '../../common/code-input';
import { Button } from 'react-native-paper';
import EmailVerificationModal from './email-verification-modal';
import ActionModalComponent from '../../common/action-modal.component';
import { MaranduButtonComponent } from '../../common/marandu-button.component';

export default function VerifyEmail({ onVerify, onResendEmail, onRedirect, onCancel }: { onVerify: any, onResendEmail: any, onRedirect?: any, onCancel: any }) {

    const [authCode, setAuthCode] = useState('');
    const [showVerifyModal, setShowModal] = useState(false);
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const actionTitle = I18n.t('Login.NewUser.verifyEmail.actionModalTitle');
    const actionSubtitle = I18n.t('Login.NewUser.verifyEmail.actionModalSubtitle');
    const actionBtText = I18n.t('Login.NewUser.verifyEmail.cancelProcess');

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

    const onProceedCancelVerify = () => {
        onCancel();
        setShowActionModal(false);
    }

    const onCancelVerifyBt = () => {
        setShowActionModal(true);
    }

    return (
        <View>
            <Box style={styles.container}>
                <MaterialCommunityIcons name="email-send-outline" size={80} color={colors.maranduGreen} />
                <Text style={styles.text1}>{I18n.t('Login.NewUser.verifyEmail.text1')}</Text>
                <Text style={styles.text2}>{I18n.t('Login.NewUser.verifyEmail.text2')}</Text>
                <Text style={styles.text3}>{I18n.t('Login.NewUser.verifyEmail.text3')}</Text>
                <CodeInput onChange={getCode} />
                <Box style={styles.buttonContainer}>
                    <MaranduButtonComponent title={I18n.t('Login.NewUser.verifyEmail.verifyBtn')} onPress={() => verify()} disabled={authCode.length < 6}/>
                    <MaranduButtonComponent title={I18n.t('Login.NewUser.verifyEmail.cancelBtn')} onPress={() => onCancelVerifyBt()} />
                </Box>
                <TouchableOpacity onPress={() => { onResendEmail() }}>
                    <Text style={styles.resendEmailBT}>{I18n.t('Login.NewUser.verifyEmail.resend')}</Text>
                </TouchableOpacity>
            </Box>
            <EmailVerificationModal actionBt={handleModalAction} showModal={showVerifyModal} success={verifySuccess} />
            <ActionModalComponent
                actionBtText={actionBtText}
                actionProceed={onProceedCancelVerify}
                actionCancel={() => { setShowActionModal(false) }}
                title={actionTitle}
                subtitle={actionSubtitle}
                showModal={showActionModal}></ActionModalComponent>
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
        color: colors.maranduGreen,
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
        color: colors.maranduGreen,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
});