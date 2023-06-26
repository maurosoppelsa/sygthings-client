import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';
import { Button, Box } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import logo from '../../assets/syghtings_logo.png';
import I18n from '../../../i18n/i18n';

export default function LoginForm({ handleLogin, loadingUser, goToRegister, goToForgot }: { handleLogin: any, loadingUser: boolean, goToRegister: any, goToForgot: any }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isButtonEnabled = () => {
    return !password || !email || loadingUser;
  };
  return (
    <Box>
      <Box>
        <Image source={logo} style={styles.logoImage}></Image>
      </Box>
      <Box>
        <TextInput
          style={styles.input}
          label={I18n.t('Login.email')}
          onChangeText={email => setEmail(email)}
          autoComplete="email"
          underlineColor={colors.syghtingGreen}
          activeUnderlineColor={colors.syghtingDarkGreen}
          left={<TextInput.Icon color={colors.gray} name="email" />}
          disabled={loadingUser}
        />
        <TextInput
          style={styles.input}
          label={I18n.t('Login.password')}
          onChangeText={pass => setPassword(pass)}
          secureTextEntry={true}
          autoComplete="password"
          underlineColor={colors.syghtingGreen}
          activeUnderlineColor={colors.syghtingDarkGreen}
          left={<TextInput.Icon color={colors.gray} name="key" />}
          disabled={loadingUser}
        />
        <TouchableOpacity onPress={() => goToForgot()}>
          <Text style={styles.forgotPasswordLegend}>{I18n.t('Login.forgotPassword')}</Text>
        </TouchableOpacity>
      </Box>
      <Button title={I18n.t('Login.signIn')} onPress={() => handleLogin(email, password)} disabled={isButtonEnabled()} style={styles.loginButton} />
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
    backgroundColor: colors.syghtingGreen,
    marginTop: 20,
    width: '100%',
    height: 40
  },
  textButton: {
    color: colors.white,
    textAlign: 'center'
  },
  forgotPasswordLegend: {
    alignSelf: 'flex-end',
    color: colors.gray
  },
  registerlink: {
    alignSelf: 'center',
    marginTop: 30,
    color: colors.blue,
    fontSize: 18,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});