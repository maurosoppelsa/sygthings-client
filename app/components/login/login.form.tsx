import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';
import { Box } from "@react-native-material/core";
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
// @ts-ignore
import logo from '../../assets/logo_name.png';
import I18n from '../../../i18n/i18n';

export default function LoginForm({ handleLogin, loadingUser, goToRegister, goToForgot }: { handleLogin: any, loadingUser: boolean, goToRegister: any, goToForgot: any }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isButtonEnabled = () => {
    return !password || !email || loadingUser;
  };
  return (
    <Box style={styles.loginForm}>
      <Box style={styles.boxImg}>
        <Image source={logo} style={styles.logoImage}></Image>
      </Box>
      <Box>
        <TextInput
          style={styles.input}
          label={I18n.t('Login.email')}
          onChangeText={email => setEmail(email)}
          autoComplete="email"
          underlineColor={colors.mgray}
          activeUnderlineColor={colors.mgray}
          left={<TextInput.Icon color={colors.maranduGreen} name="email" />}
          disabled={loadingUser}
        />
        <TextInput
          style={styles.input}
          label={I18n.t('Login.password')}
          onChangeText={pass => setPassword(pass)}
          secureTextEntry={true}
          autoComplete="password"
          underlineColor={colors.mgray}
          activeUnderlineColor={colors.mgray}
          left={<TextInput.Icon color={colors.maranduGreen} name="key" />}
          disabled={loadingUser}
        />
        <TouchableOpacity onPress={() => goToForgot()}>
          <Text style={styles.forgotPasswordLegend}>{I18n.t('Login.forgotPassword')}</Text>
        </TouchableOpacity>
      </Box>
      <Button onPress={() => handleLogin(email, password)} disabled={isButtonEnabled()} style={styles.loginButton} color={colors.maranduYellow}>{I18n.t('Login.signIn')}</Button>
      <TouchableOpacity onPress={() => goToRegister()}>
        <Text style={styles.registerlink}>
          {I18n.t('Login.notRegistered')}
        </Text>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: colors.gray,
    marginBottom: 20
  },
  input: {
    backgroundColor: colors.white,
  },
  loginButton: {
    backgroundColor: colors.maranduGreen,
    marginTop: 50,
    width: '100%',
    height: 40,
    borderRadius: 10,
  },
  forgotPasswordLegend: {
    alignSelf: 'flex-end',
    color: colors.gray,
    marginTop: 5
  },
  registerlink: {
    alignSelf: 'center',
    marginTop: 30,
    color: colors.gray,
    fontSize: 18,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  boxImg: {
    marginBottom: 10,
  },
  loginForm: {
    padding: 20,
  },
});