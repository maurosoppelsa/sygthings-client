import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import I18n from '../../../i18n/i18n';
import { TextInput } from 'react-native-paper';
import { customRules, spanishErrorMessages } from '../../utils/customInputValidation';
import { Box, Button } from '@react-native-material/core';
import { User } from '../../interfaces/common';

const { useValidation } = require('react-native-form-validator')

export default function UserUpdateForm({ user, onCancel, onUpdate }: { user: User, onCancel: any, onUpdate: any }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [name, setName] = useState(user?.name);
    const [lastName, setlastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [occupation, setOccupation] = useState(user?.occupation);
    const [touchedForm, setTouchedForm] = useState(false);

    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { name, lastName, email, password, confirmNewPassword, occupation },
            deviceLocale: 'es',
            messages: spanishErrorMessages,
            rules: customRules
        });

    const formIsNotEmpty = () => {
        return name && lastName && email && occupation;
    };

    const updateUser = () => {
        validate({
            name: { minlength: 3, maxlength: 10, required: true },
            lastName: { minlength: 3, maxlength: 10, required: true },
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: false, passwordsNotEmpty: { password, newPassword, confirmNewPassword } },
            newPassword: { minlength: 3, maxlength: 7, required: false, passwordsNotEmpty: { newPassword, password, confirmNewPassword } },
            confirmNewPassword: { equalPassword: newPassword, required: false, passwordsNotEmpty: { confirmNewPassword, password, newPassword } },
            occupation: { minlength: 3, maxlength: 25, required: true },
        });
        setTouchedForm(false);
        if (getErrorMessages().length === 0 && formIsNotEmpty() && arePasswordsFieldsValid(newPassword, confirmNewPassword, password)) {
            onUpdate({ name, lastName, password, newPassword, confirmNewPassword, email, occupation });
        }
        return user;
    };

    function arePasswordsFieldsValid(newPassword: any, confirmNewPassword: any, password: any): boolean {
        const isPasswordEmpty = !password || password.trim().length === 0;
        const isNewPasswordEmpty = !newPassword || newPassword.trim().length === 0;
        const isConfirmNewPasswordEmpty = !confirmNewPassword || confirmNewPassword.trim().length === 0;

        if ((isPasswordEmpty && isNewPasswordEmpty && isConfirmNewPasswordEmpty) ||
            (isPasswordEmpty || isNewPasswordEmpty || isConfirmNewPasswordEmpty)) {
            return true;
        }
        if (!isNewPasswordEmpty && !isConfirmNewPasswordEmpty && newPassword === confirmNewPassword) {
            return true;
        }
        return false;
    }

    return (
        <View>
            <Box style={styles.container}>
                <TextInput
                    autoComplete="off"
                    value={name}
                    style={styles.input}
                    label={I18n.t('Login.NewUser.name')}
                    onChangeText={name => setName(name)}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="account" />}
                    error={isFieldInError('name') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('name') && !touchedForm &&
                    getErrorsInField('name').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
                    value={lastName}
                    style={styles.input}
                    label={I18n.t('Login.NewUser.lastName')}
                    onChangeText={lastName => setlastName(lastName)}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="account" />}
                    error={isFieldInError('lastName') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('lastName') && !touchedForm &&
                    getErrorsInField('lastName').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
                    value={email}
                    style={styles.input}
                    label={I18n.t('Login.NewUser.email')}
                    onChangeText={email => setEmail(email)}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="email" />}
                    error={isFieldInError('email') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('email') && !touchedForm &&
                    getErrorsInField('email').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
                    value={password}
                    style={styles.input}
                    label={I18n.t('Profile.currentPassword')}
                    onChangeText={pass => setPassword(pass)}
                    secureTextEntry={true}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="key" />}
                    error={isFieldInError('password') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('password') && !touchedForm &&
                    getErrorsInField('password').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
                    style={styles.input}
                    label={I18n.t('Profile.newPassword')}
                    onChangeText={pass => setNewPassword(pass)}
                    secureTextEntry={true}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="key" />}
                    error={isFieldInError('newPassword') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />

                <TextInput
                    autoComplete="off"
                    style={styles.input}
                    label={I18n.t('Profile.confirmNewPassword')}
                    onChangeText={pass => setconfirmNewPassword(pass)}
                    secureTextEntry={true}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="key" />}
                    error={isFieldInError('confirmNewPassword') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('confirmNewPassword') && !touchedForm &&
                    getErrorsInField('confirmNewPassword').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
                    value={occupation}
                    style={styles.input}
                    label={I18n.t('Login.NewUser.ocuppation')}
                    onChangeText={occupation => setOccupation(occupation)}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="briefcase" />}
                    error={isFieldInError('occupation') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('occupation') && !touchedForm &&
                    getErrorsInField('occupation').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
                <Box style={styles.buttonContainer}>
                    <Button title={I18n.t('Profile.update')} style={styles.formButton} onPress={() => { updateUser() }} />
                    <Button title={I18n.t('Profile.cancel')} style={styles.formButton} onPress={() => onCancel()} />
                </Box>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
        padding: 20,
    },
    input: {
        backgroundColor: colors.white,
    },
    error: {
        color: colors.red,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    formButton: {
        width: '45%',
        backgroundColor: colors.syghtingGreen,
        marginTop: 30,
        height: 40
    },
});