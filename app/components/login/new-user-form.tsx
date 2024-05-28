import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { Box } from "@react-native-material/core";
import { Button } from 'react-native-paper';
import { Checkbox, TextInput } from 'react-native-paper';
import { customRules, spanishErrorMessages } from '../../utils/customInputValidation';
import { User } from '../../interfaces/common';
import I18n from '../../../i18n/i18n';
// @ts-ignore
import logo from '../../assets/logo_new_user.png';
import TermsModal from './terms-and-condition-modal';

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
    const [modalVisible, setModalVisible] = useState(false);

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
        const isValid = await validate({
            name: { minlength: 3, maxlength: 14, required: true },
            lastName: { minlength: 3, maxlength: 10, required: true },
            email: { email: true, required: true },
            password: { minlength: 6, maxlength: 12, required: true },
            confirmPassword: { equalPassword: password, required: true },
            occupation: { minlength: 3, maxlength: 25, required: true },
        });
        setTouchedForm(false);
        if (isValid && formIsNotEmpty()) {
            onCreate({ name, lastName, password, email, occupation });
        }
    };

    return (
        <ScrollView>
            <Box style={styles.newUserForm}>
                <Box>
                    <Box style={styles.headerContent}>
                        <Image source={logo} style={styles.logoImage}></Image>
                        <Box style={styles.headerText}>
                            <Text style={styles.titles}>{I18n.t('Login.NewUser.title')}</Text>
                            <Text style={styles.titles}>{I18n.t('Login.NewUser.subtitle')}</Text>
                        </Box>
                    </Box>
                    <TextInput
                        autoComplete="off"
                        style={styles.input}
                        label={I18n.t('Login.NewUser.name')}
                        onChangeText={name => setName(name)}
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="account" />}
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
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="account" />}
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
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="email" />}
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
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="key" />}
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
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="key" />}
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
                        underlineColor={colors.mgray}
                        activeUnderlineColor={colors.mgray}
                        left={<TextInput.Icon color={colors.maranduGreen} name="briefcase" />}
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
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.termsLink}>{I18n.t('Login.NewUser.terms')}</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box style={styles.buttonContainer}>
                    <Button color={colors.white} disabled={!termsChecked} style={styles.formButton} onPress={() => { createUser() }}>{I18n.t('Login.NewUser.createAccount')}</Button>
                    <Button color={colors.maranduYellow} style={styles.formButton} onPress={() => onCancel()}>{I18n.t('Login.NewUser.cancel')}</Button>
                </Box>
            </Box>
            <TermsModal onClose={() => { setModalVisible(false) }} visible={modalVisible} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    newUserForm: {
        padding: 20,
    },
    headerContent: {
        marginBottom: 25,
    },
    logoImage: {
        alignSelf: 'center',
    },
    titles: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.maranduGreen,
        marginLeft: 15
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
        backgroundColor: colors.maranduGreen,
        marginTop: 20,
        height: 40,
        borderRadius: 10,
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
    headerText: {
        marginTop: 10,
        alignItems: 'center',
    }
});