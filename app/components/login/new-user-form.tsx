import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { Button, TextInput, Box } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const { useValidation } = require('react-native-form-validator')

export default function NewUserForm({ onCreate, onCancel }: { onCreate: any, onCancel: any }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [touched, setTouched] = useState({
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
        occupation: false,
    });


    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { userName, email, password, confirmPassword, occupation },
        });

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
    };

    useEffect(() => {
        validate({
            userName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true },
            password: { minlength: 3, maxlength: 7, required: true },
            confirmPassword: { equalPassword: password, required: true },
            occupation: { minlength: 3, maxlength: 7, required: true },
        });
    }, [userName, email, password, confirmPassword, occupation]);

    const createUser = () => {
        onCreate({ userName, password, email, occupation });
        console.log('getErrorMessages', getErrorMessages());
    };

    return (
        <Box>
            <Box pv={20}>
                <TextInput
                    label="User Name"
                    variant="standard"
                    color={colors.syghtingGreen}
                    onChangeText={name => setUsername(name)}
                    onBlur={() => handleBlur('userName')}
                    style={styles.input}
                    leading={props => <Icon name="account" {...props} style={styles.input} />} />
                {isFieldInError('userName') && touched.userName  &&
                    getErrorsInField('userName').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
                <TextInput
                    label="Password"
                    variant="standard"
                    color={colors.syghtingGreen}
                    onChangeText={pass => setPassword(pass)}
                    onBlur={() => handleBlur('password')}
                    leading={props => <Icon name="key" {...props} style={styles.input} />}
                />
                {isFieldInError('password') &&  touched.password &&
                    getErrorsInField('password').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
                <TextInput label="Confirm Password"
                    variant="standard"
                    color={colors.syghtingGreen}
                    onChangeText={pass => setConfirmPassword(pass)}
                    onBlur={() => handleBlur('confirmPassword')}
                    leading={props => <Icon name="key" {...props} style={styles.input} />}
                />
                {isFieldInError('confirmPassword') && touched.confirmPassword &&
                    getErrorsInField('confirmPassword').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
                <TextInput label="Email"
                    variant="standard"
                    color={colors.syghtingGreen}
                    onChangeText={email => setEmail(email)}
                    onBlur={() => handleBlur('email')}
                    leading={props => <Icon name="email" {...props} style={styles.input} />}
                />
                {isFieldInError('email') && touched.email &&
                    getErrorsInField('email').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
                <TextInput label="Occupation"
                    variant="standard"
                    color={colors.syghtingGreen}
                    onChangeText={occupation => setOccupation(occupation)}
                    onBlur={() => handleBlur('occupation')}
                    leading={props => <Icon name="briefcase" {...props} style={styles.input} />}
                />
                {isFieldInError('occupation') && touched.occupation &&
                    getErrorsInField('occupation').map((errorMessage: any, index: any) => (
                        <Text style={styles.error} key={index}>{errorMessage}</Text>
                    ))}
            </Box>
            <Box style={styles.buttonContainer}>
                <Button disabled={getErrorMessages().length !== 0} title="Create" style={styles.formButton} onPress={() => { createUser() }} />
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