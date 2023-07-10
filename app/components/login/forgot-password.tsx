import React, { useState } from 'react';
import { Button, Box } from "@react-native-material/core";
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import I18n from '../../../i18n/i18n';
import colors from '../../config/colors';
import { StyleSheet, Text, Modal } from 'react-native';
import { customRules, spanishErrorMessages } from '../../utils/customInputValidation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionModalComponent from '../common/action-modal.component';

const { useValidation } = require('react-native-form-validator')

export default function ForgotPassword({ onSendResetPasswordEmail, onCancel, hasNotified, isAllowReset, onUpdatePassword }: { onSendResetPasswordEmail: any, onCancel: any, isAllowReset: boolean, hasNotified: boolean, onUpdatePassword: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const currentStep = isAllowReset ? 2 : 1;

    const onAccept = () => {
        setShowCompleteModal(false);
        onUpdatePassword(email, password);
    }

    const CompleteResetModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showCompleteModal}
            >
                <View style={styles.centeredView}>
                        <Box style={styles.modalContainer}>
                            <Box>
                                <Text>{I18n.t('Login.resetPassword.modalResetTitle')}</Text>
                            </Box>
                            <Box>
                                <Button style={styles.button} onPress={() => onAccept()} title={I18n.t('Common.accept')}></Button>
                            </Box>
                        </Box>
                </View>
            </Modal>
        );
    };

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { email, password, confirmPassword },
            deviceLocale: 'es',
            messages: spanishErrorMessages,
            rules: customRules
        });

    const sendEmail = async () => {
        const isValid = await validate({
            email: { email: true, required: true },
        });
        if (isValid) {
            onSendResetPasswordEmail(email);
        }
    };

    const updatePassword = async () => {
        const isValid = await validate({
            password: { minlength: 3, maxlength: 7, required: true },
            confirmPassword: { equalPassword: password, required: true },
        });
        if (isValid) {
            setShowCompleteModal(true);
        }
    };

    const cancelUpdate = () => {
        setShowModal(false);
        onCancel(email, currentStep);
    }

    return (
        <View>
            <Box style={styles.container}>
                {!hasNotified && <Box>
                    <Text style={styles.title}>{I18n.t('Login.resetPassword.title')}</Text>
                    <Text style={styles.subtitle}>{I18n.t('Login.resetPassword.subtitle')}</Text>
                    <TextInput
                        style={styles.input}
                        label={I18n.t('Login.email')}
                        onChangeText={email => setEmail(email)}
                        autoComplete="email"
                        underlineColor={colors.syghtingGreen}
                        activeUnderlineColor={colors.syghtingDarkGreen}
                        left={<TextInput.Icon color={colors.gray} name="email" />}
                        disabled={false}
                    />
                    {isFieldInError('email') &&
                        getErrorsInField('email').map((errorMessage: any, index: any) => (
                            <Text style={styles.error} key={index}>{errorMessage}</Text>
                        ))}
                    <Box style={styles.buttonContainer}>
                        <Button style={styles.button}
                            title={I18n.t('Login.resetPassword.send')}
                            onPress={() => sendEmail()}
                            disabled={email === ''} />
                        <Button style={styles.button} title={I18n.t('Login.resetPassword.cancel')} onPress={() => onCancel()} />
                    </Box>
                </Box>
                }
                {
                    hasNotified && !isAllowReset &&
                    <Box style={styles.waitingForEmailContainer}>
                        <MaterialCommunityIcons name="email-send-outline" size={80} color={colors.syghtingDarkGreen} />
                        <Text>{I18n.t('Login.resetPassword.waitingEmailVerification')}</Text>
                    </Box>
                }
                {
                    isAllowReset &&
                    <Box>
                        <Text style={styles.title}>{I18n.t('Login.resetPassword.allowedToReset')}</Text>
                        <Box style={styles.resetInputContainer}>
                            <TextInput
                                autoComplete="off"
                                style={styles.input}
                                label={I18n.t('Login.password')}
                                onChangeText={pass => setPassword(pass)}
                                secureTextEntry={true}
                                underlineColor={colors.syghtingGreen}
                                activeUnderlineColor={colors.syghtingDarkGreen}
                                left={<TextInput.Icon color={colors.gray} name="key" />}
                                error={isFieldInError('password')}

                            />
                            {isFieldInError('password') &&
                                getErrorsInField('password').map((errorMessage: any, index: any) => (
                                    <Text style={styles.error} key={index}>{errorMessage}</Text>
                                ))}

                            <TextInput
                                autoComplete="off"
                                style={styles.input}
                                label={I18n.t('Login.NewUser.confirmPassword')}
                                onChangeText={pass => setConfirmPassword(pass)}
                                secureTextEntry={true}
                                underlineColor={colors.syghtingGreen}
                                activeUnderlineColor={colors.syghtingDarkGreen}
                                left={<TextInput.Icon color={colors.gray} name="key" />}
                                error={isFieldInError('confirmPassword')}
                            />
                            {isFieldInError('confirmPassword') &&
                                getErrorsInField('confirmPassword').map((errorMessage: any, index: any) => (
                                    <Text style={styles.error} key={index}>{errorMessage}</Text>
                                ))}
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button style={styles.button}
                                title={I18n.t('Login.resetPassword.updatePassword')}
                                onPress={() => updatePassword()}
                                disabled={password === '' || confirmPassword === ''} />
                            <Button style={styles.button} title={I18n.t('Login.resetPassword.cancel')} onPress={() => setShowModal(true)} />
                        </Box>
                    </Box>
                }
                <ActionModalComponent
                    showModal={showModal}
                    actionBtText={I18n.t('Common.continue')}
                    actionCancel={() => setShowModal(false)}
                    actionProceed={() => cancelUpdate()}
                    title={I18n.t('Login.resetPassword.cancelUpdatePassTitle')}
                    cancelBtText={I18n.t('Common.back')}
                    subtitle={I18n.t('Login.resetPassword.cancelUpdatePassSubtitle')} />
                <CompleteResetModal />
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    title: {
        fontSize: 30,
        color: colors.syghtingGreen,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 15,
        color: colors.gray,
        alignSelf: 'center',
        marginTop: 10,
    },
    input: {
        backgroundColor: colors.white,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        backgroundColor: colors.syghtingGreen,
        marginTop: 20,
        height: 40
    },
    error: {
        color: colors.red,
    },
    waitingForEmailContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetInputContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});