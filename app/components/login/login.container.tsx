import React from 'react';
import LoginForm from './login.form';
import { useAppDispatch } from '../../redux/store'
import { loginUser, toggleRegister } from '../../redux/auth-slice';
import { User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import NewUserForm from './new-user-form';
import { View, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
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

  const createUser = (user: User) => {
    console.log(user)
    // dispatch(loginUser({ user }));
  }

  const goToLogin = () => {
    dispatch(toggleRegister());
  }

  const getFormType = () => {
    if (authentication.isRegistering) {
      return <NewUserForm onCreate={(user: User) => createUser(user)} onCancel={() => goToLogin()} />
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
      {
        authentication.error && <Text style={styles.loginFailed}>Login failed! username or password invalid.</Text>
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
  loginFailed: {
    color: colors.red,
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 18,
  }
});