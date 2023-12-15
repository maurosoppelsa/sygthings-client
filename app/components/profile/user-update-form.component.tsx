import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import colors from '../../config/colors';
import I18n from '../../../i18n/i18n';
import { TextInput } from 'react-native-paper';
import { customRules, spanishErrorMessages } from '../../utils/customInputValidation';
import { Box } from '@react-native-material/core';
import { User } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionModalComponent from '../common/action-modal.component';

const { useValidation } = require('react-native-form-validator')

export default function UserUpdateForm({ user, onCancel, onUpdate, onDelete }: { user: User, onCancel: any, onUpdate: any, onDelete: any }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [name, setName] = useState(user?.name);
    const [lastName, setlastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.email);
    const [occupation, setOccupation] = useState(user?.occupation);
    const [touchedForm, setTouchedForm] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { validate, isFieldInError, getErrorsInField } =
        useValidation({
            state: { name, lastName, email, password, confirmNewPassword, occupation },
            deviceLocale: 'es',
            messages: spanishErrorMessages,
            rules: customRules
        });

    const formIsNotEmpty = () => {
        return name && lastName && email && occupation;
    };

    const updateUser = async () => {
        const isValid = await validate({
            name: { minlength: 3, maxlength: 10, required: true },
            lastName: { minlength: 3, maxlength: 10, required: true },
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: false, passwordsNotEmpty: { password, newPassword, confirmNewPassword }, notEqualPassword: newPassword },
            newPassword: { minlength: 3, maxlength: 7, required: false, passwordsNotEmpty: { newPassword, password, confirmNewPassword } },
            confirmNewPassword: { equalPassword: newPassword, required: false, passwordsNotEmpty: { confirmNewPassword, password, newPassword } },
            occupation: { minlength: 3, maxlength: 25, required: true },
        });
        setTouchedForm(false);
        if (isValid && formIsNotEmpty()) {
            onUpdate({ id: user?.id, name, lastName, password, newPassword, email, occupation });
        }
        return user;
    };

    const deleteUser = () => {
        onDelete();
        setShowModal(false);
    }

    return (
        <View>
            <ScrollView>
                <Box style={styles.container}>
                    <TextInput
                        autoComplete="off"
                        value={name}
                        style={styles.input}
                        label={I18n.t('Login.NewUser.name')}
                        onChangeText={name => setName(name)}
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
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
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
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
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
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
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
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
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
                        left={<TextInput.Icon color={colors.gray} name="key" />}
                        error={isFieldInError('newPassword') && !touchedForm}
                        onFocus={() => setTouchedForm(true)}
                    />
                    {isFieldInError('newPassword') && !touchedForm &&
                        getErrorsInField('newPassword').map((errorMessage: any, index: any) => (
                            <Text style={styles.error} key={index}>{errorMessage}</Text>
                        ))}

                    <TextInput
                        autoComplete="off"
                        style={styles.input}
                        label={I18n.t('Profile.confirmNewPassword')}
                        onChangeText={pass => setconfirmNewPassword(pass)}
                        secureTextEntry={true}
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
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
                        underlineColor={colors.maranduGreen}
                        activeUnderlineColor={colors.maranduGreen}
                        left={<TextInput.Icon color={colors.gray} name="briefcase" />}
                        error={isFieldInError('occupation') && !touchedForm}
                        onFocus={() => setTouchedForm(true)}
                    />
                    {isFieldInError('occupation') && !touchedForm &&
                        getErrorsInField('occupation').map((errorMessage: any, index: any) => (
                            <Text style={styles.error} key={index}>{errorMessage}</Text>
                        ))}
                    <Box style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.buttonSubmit, styles.button]}
                            onPress={() => { updateUser() }}
                        >
                            <Text style={styles.textBtStyle}>{I18n.t('Profile.update')}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonSubmit, styles.button]}
                            onPress={() => onCancel()}
                        >
                            <Text style={styles.textBtStyle}>{I18n.t('Profile.cancel')}</Text>
                        </Pressable>
                    </Box>
                    <TouchableOpacity onPress={() => {
                        setShowModal(true)
                    }
                    }>
                        <Box style={styles.deleteAccountContainer}>
                            <MaterialCommunityIcons style={styles.userDeleteIcon} name="account-off" size={18} />
                            <Text style={styles.deleteAccount}>{I18n.t('Profile.UpdateUserForm.deleteAccount')}</Text>
                        </Box>
                    </TouchableOpacity>
                    <ActionModalComponent
                        showModal={showModal}
                        actionBtText={I18n.t('Common.delete')}
                        actionCancel={() => setShowModal(false)}
                        actionProceed={() => deleteUser()}
                        title={I18n.t('Profile.UpdateUserForm.deleteTitle')}
                        subtitle={I18n.t('Profile.UpdateUserForm.deleteSubtitle')} />
                </Box>
            </ScrollView>
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
    formButton: {
        width: '45%',
        backgroundColor: colors.syghtingGreen,
        marginTop: 30,
        height: 40
    },
    deleteAccount: {
        color: colors.gray,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
    userDeleteIcon: {
        alignSelf: 'center',
        color: colors.gray,
        marginRight: 5,
    },
    deleteAccountContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 20,
    },
    textBtStyle: {
        color: colors.maranduYellow,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    buttonSubmit: {
        borderRadius: 5,
        padding: 10,
        minWidth: 120,
        elevation: 2,
        alignSelf: "center",
        margin: 10,
    },
    button: {
        backgroundColor: colors.maranduGreen,
    },
});