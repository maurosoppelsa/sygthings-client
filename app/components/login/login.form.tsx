import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';
import { Button, Box } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import logo from '../../assets/syghtings_logo.png';

export default function LoginForm({ handleLogin, loadingUser, goToRegister }: { handleLogin: any, loadingUser: boolean, goToRegister: any }) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const isButtonEnabled = () => {
    return !password || !username || loadingUser;
  };
  return (
    <Box>
      <Box>
        <Image source={logo} style={styles.logoImage}></Image>
      </Box>
      <Box>
        <TextInput
          style={styles.input}
          label="User"
          onChangeText={name => setUsername(name)}
          autoComplete="username"
          underlineColor={colors.syghtingGreen}
          activeUnderlineColor={colors.syghtingDarkGreen}
          left={<TextInput.Icon color={colors.gray} name="account" />}
          disabled={loadingUser}
        />
        <TextInput
          style={styles.input}
          label="Password"
          onChangeText={pass => setPassword(pass)}
          secureTextEntry={true}
          autoComplete="password"
          underlineColor={colors.syghtingGreen}
          activeUnderlineColor={colors.syghtingDarkGreen}
          left={<TextInput.Icon color={colors.gray} name="key" />}
          disabled={loadingUser}
        />
        <TouchableOpacity onPress={() => console.log("forgot!")}>
          <Text style={styles.forgotPasswordLegend}>Forgot password!</Text>
        </TouchableOpacity>
      </Box>
      <Button title="Sign In" onPress={() => handleLogin(username, password)} disabled={isButtonEnabled()} style={styles.loginButton} />
      <TouchableOpacity onPress={() => goToRegister()}>
        <Text style={styles.registerlink}>
          Not registered?
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