import React from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { loginUser, toggleRegister, createUser, cleanupMessages, verifyUserRegistration, resendEmailVerification, toggleResettingPassword, notifyUserResetPassword, verifyUserResetPassword, cancelResetPassword, updateUserPassword } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import NewUserForm from './new-user-form';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import colors from '../../config/colors';
import { StatusBar } from 'expo-status-bar';
import VerifyEmail from './email-verification/verify-email';
import ForgotPassword from './forgot-password';

export default function Login() {
  const dispatch = useAppDispatch();
  //const navi = useNavigation<any>();
  const authentication = useSelector((state: any) => state.authentication);

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

  const goToForgotPassword = () => {
    dispatch(toggleResettingPassword());
  }

  const closeForgotPassword = (email: string, step: number) => {
    if (step === 2) {
      dispatch(cancelResetPassword(email));
    } else {
      dispatch(toggleResettingPassword());
    }
  }

  const sendResetPasswordEmail = (email: string) => {
    dispatch(notifyUserResetPassword(email));
  }

  const updatePassword = (email: string, password: string) => {
    dispatch(updateUserPassword({ email, password }))
  }

  const verifyUserEmail = async (code: string) => {
    try {
      const response = await dispatch(verifyUserRegistration({ userId: authentication?.user?.id, regCode: code }));
      return response.payload.verified;
    } catch (error) {
      console.log(error);
    }
  }

  const verifyUserResetPass = async (email: string, code: string) => {
    try {
      const response = await dispatch(verifyUserResetPassword({ email, code }));
      return response.payload.allowed;
    } catch (error) {
      console.log(error);
    }
  }

  const getFormType = () => {
    if (authentication.isVerifyingEmail) {
      return (<VerifyEmail onRedirect={goToLogin} onVerify={verifyUserEmail} onResendEmail={() => resendEmail()}></VerifyEmail>);
    }
    else if (authentication.isRegistering) {
      return <NewUserForm onCreate={(user: User) => registerUser(user)} onCancel={() => goToLogin()} />
    }
    else if (authentication.isResettingPassword) {
      return <ForgotPassword
        verifyReset={verifyUserResetPass}
        onSendResetPasswordEmail={(email: string) => sendResetPasswordEmail(email)}
        onCancel={(email: string, step: number) => closeForgotPassword(email, step)}
        hasNotified={authentication.hasUserAskedPassReset}
        isAllowReset={authentication.isUserAllowedReset}
        onUpdatePassword={(email: string, password: string) => updatePassword(email, password)}
      />
    }
    else {
      return <LoginForm
        handleLogin={(email: string, password: string) => handleLogin(email, password)}
        loadingUser={authentication.loading} goToRegister={() => goToRegister()}
        goToForgot={() => goToForgotPassword()} />
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