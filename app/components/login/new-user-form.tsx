import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Button, Box } from "@react-native-material/core";
import { Avatar, Card, Checkbox, TextInput } from 'react-native-paper';
import { customRules, spanishErrorMessages } from '../../utils/customInputValidation';
import { User } from '../../interfaces/common';
import I18n from '../../../i18n/i18n';

const { useValidation } = require('react-native-form-validator')

type onCreateUser = (user: User) => void;

export default function NewUserForm({ onCreate, onCancel }: { onCreate: onCreateUser, onCancel: any }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [touchedForm, setTouchedForm] = useState(false);
    const [termsChecked, setChecked] = useState(false);

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { name, lastName, email, password, confirmPassword, occupation },
            deviceLocale: 'es',
            messages: spanishErrorMessages,
            rules: customRules
        });

    const formIsNotEmpty = () => {
        return name && lastName && email && password && confirmPassword && occupation;
    };

    const createUser = async () => {
        const isValid = validate({
            name: { minlength: 3, maxlength: 7, required: true },
            lastName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: true },
            confirmPassword: { equalPassword: password, required: true },
            occupation: { minlength: 3, maxlength: 25, required: true },
        });
        setTouchedForm(false);
        if (isValid && formIsNotEmpty()) {
            onCreate({ name, lastName, password, email, occupation });
        }
    };

    return (
        <Box>
            <Box>
                <Box style={styles.headerContent}>
                    <Card.Title
                        titleStyle={styles.title}
                        subtitleStyle={styles.subtitle}
                        title={I18n.t('Login.NewUser.title')}
                        subtitle={I18n.t('Login.NewUser.subtitle')}
                        left={() => <Avatar.Icon style={styles.icon} size={55} icon="rabbit" />}
                    />
                </Box>
                <TextInput
                    autoComplete="off"
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
                    style={styles.input}
                    label={I18n.t('Login.password')}
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
                    label={I18n.t('Login.NewUser.confirmPassword')}
                    onChangeText={pass => setConfirmPassword(pass)}
                    secureTextEntry={true}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="key" />}
                    error={isFieldInError('confirmPassword') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('confirmPassword') && !touchedForm &&
                    getErrorsInField('confirmPassword').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    autoComplete="off"
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
                <Box style={styles.termsContent}>
                    <Checkbox
                        color={colors.syghtingGreen}
                        status={termsChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!termsChecked);
                        }}
                    />
                    <Text>{I18n.t('Login.NewUser.agreement')} </Text>
                    <TouchableOpacity onPress={() => console.log('terms and conditions')}>
                        <Text style={styles.termsLink}>{I18n.t('Login.NewUser.terms')}</Text>
                    </TouchableOpacity>
                </Box>
            </Box>
            <Box style={styles.buttonContainer}>
                <Button disabled={!termsChecked} title={I18n.t('Login.NewUser.createAccount')} style={styles.formButton} onPress={() => { createUser() }} />
                <Button title={I18n.t('Login.NewUser.cancel')} style={styles.formButton} onPress={() => onCancel()} />
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        marginBottom: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.syghtingGreen,
        marginLeft: 15
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.syghtingGreen,
        marginLeft: 15
    },
    icon: {
        backgroundColor: colors.syghtingGreen,
    },
    input: {
        backgroundColor: colors.white,
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
        marginTop: 20,
        height: 40
    },
    error: {
        color: colors.red,
    },
    termsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25
    },
    termsTxt: {
        alignSelf: 'center',
    },
    termsLink: {
        color: colors.blue,
    },
});