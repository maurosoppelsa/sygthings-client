import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { Button, Box } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
const { useValidation } = require('react-native-form-validator')

export default function NewUserForm({ onCreate, onCancel }: { onCreate: any, onCancel: any }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [touchedForm, setTouchedForm] = useState(false);


    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { userName, email, password, confirmPassword, occupation },
        });

    const createUser = () => {
        validate({
            userName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: true },
            confirmPassword: { equalPassword: password, required: true },
            occupation: { minlength: 3, maxlength: 7, required: true },
        });
        setTouchedForm(false);
        if (getErrorMessages().length === 0) {
            onCreate({ userName, password, email, occupation });
        }
    };

    return (
        <Box>
            <Box pv={20}>
                <TextInput
                    label="User Name"
                    onChangeText={name => setUsername(name)}
                    underlineColor={colors.syghtingGreen}
                    activeUnderlineColor={colors.syghtingDarkGreen}
                    left={<TextInput.Icon color={colors.gray} name="account" />}
                    error={isFieldInError('userName') && !touchedForm}
                    onFocus={() => setTouchedForm(true)}
                />
                {isFieldInError('userName') && !touchedForm &&
                    getErrorsInField('userName').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}

                <TextInput
                    label="Email"
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
                    label="Password"
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
                    label="Confirm Password"
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
                    label="Occupation"
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
            </Box>
            <Box style={styles.buttonContainer}>
                <Button title="Create" style={styles.formButton} onPress={() => { createUser() }} />
                <Button title="Cancel" style={styles.formButton} onPress={() => onCancel()} />
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
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
});