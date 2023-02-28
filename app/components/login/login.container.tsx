import React from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { loginUser, toggleRegister, createUser, cleanupErrors } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import NewUserForm from './new-user-form';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import colors from '../../config/colors';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
  const dispatch = useAppDispatch();
  //const navi = useNavigation<any>();
  const authentication = useSelector((state: any) => state.authentication);
  const handleLogin = (username: string, password: string) => {
    const user: User = {
      username,
      password,
    };
    dispatch(loginUser({ user }));
  }

  const goToRegister = () => {
    dispatch(toggleRegister());
  }

  const registerUser = (user: User) => {
    dispatch(createUser({ user }));
    dispatch(toggleRegister())
  }

  const goToLogin = () => {
    dispatch(cleanupErrors())
    dispatch(toggleRegister());
  }

  const getFormType = () => {
    if (authentication.isRegistering) {
      return <NewUserForm onCreate={(user: User) => registerUser(user)} onCancel={() => goToLogin()} />
    } else {
      return <LoginForm
        handleLogin={(username: string, password: string) => handleLogin(username, password)}
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
        <Text style={[styles.message, authentication.error ? styles.fail : styles.success]}>{authentication.message}</Text>
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
  message: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 25,
  },
  success: {
    color: colors.syghtingGreen,
  },
  fail: {
    color: colors.red,
  }
});