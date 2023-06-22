import React, { useEffect } from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { loginUser, toggleRegister, createUser, cleanupMessages, verifyUserRegistration, resendEmailVerification } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import NewUserForm from './new-user-form';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import colors from '../../config/colors';
import { StatusBar } from 'expo-status-bar';
import VerifyEmail from './verify-email';

export default function Login() {
  const dispatch = useAppDispatch();
  //const navi = useNavigation<any>();
  const authentication = useSelector((state: any) => state.authentication);

  useEffect(() => {
    if (authentication.user && authentication.isVerifyingEmail) {
      dispatch(verifyUserRegistration(authentication.user.id));
    }
    if (authentication.user && authentication.isUserVerified) {
      handleLogin(authentication.user.email, authentication.user.password);
    }
  }, [authentication.user, authentication.isUserVerified, authentication.isVerifyingEmail]);


  const handleLogin = (email: string, password: string) => {
    const user: User = {
      email,
      password,
    };
    dispatch(loginUser({ user }));
    dispatch(cleanupMessages());
  }

  const goToRegister = () => {
    dispatch(cleanupMessages());
    dispatch(toggleRegister());
  }

  const registerUser = async (user: User) => {
    dispatch(cleanupMessages());
    dispatch(createUser({ user }));
  }

  const goToLogin = () => {
    dispatch(cleanupMessages());
    dispatch(toggleRegister());
  }

  const resendEmail = () => {
    dispatch(resendEmailVerification(authentication.user.id));
  }

  const getFormType = () => {
    if (authentication.isVerifyingEmail) {
      return (<VerifyEmail onResendEmail={() => resendEmail()}></VerifyEmail>);
    }
    if (authentication.isRegistering) {
      return <NewUserForm onCreate={(user: User) => registerUser(user)} onCancel={() => goToLogin()} />
    } else {
      return <LoginForm
        handleLogin={(email: string, password: string) => handleLogin(email, password)}
        loadingUser={authentication.loading} goToRegister={() => goToRegister()} />
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {getFormType()}
      </View>
      {authentication.loading &&
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />}
      {
        authentication.error &&
        <Text style={styles.errorMessage}>{authentication.message}</Text>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: 15,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loadingSpinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 25,
    color: colors.red,
  },
});