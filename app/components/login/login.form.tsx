import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';
import logo from '../../assets/syghtings_logo.png';
import { Button, TextInput, Box } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function LoginForm({ handleLogin, loadingUser }: { handleLogin: any, loadingUser: boolean }) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const isButtonEnabled = () => {
    return !password || !username || loadingUser;
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage}></Image>
      </View>
      <Box pv={20}>
        <TextInput
          onChangeText={name => setUsername(name)}
          inputContainerStyle={styles.input}
          label="User"
          variant="standard"
          color={colors.syghtingGreen}
          leading={props => <Icon name="account" {...props} style={styles.input} />}
          editable={!loadingUser}
        />
        <TextInput
          onChangeText={pass => setPassword(pass)}
          secureTextEntry={true}
          label="Password"
          variant="standard"
          color={colors.syghtingGreen}
          leading={props => <Icon name="key" {...props} style={styles.input} />}
          editable={!loadingUser}
        />
        <TouchableOpacity onPress={() => console.log("forgot!")}>
          <Text style={styles.forgotPasswordLegend}>Forgot password!</Text>
        </TouchableOpacity>
      </Box>
      <Button title="Sign In" onPress={() => handleLogin(username, password)} disabled={isButtonEnabled()} style={styles.loginButton} />
      <TouchableOpacity onPress={() => console.log("register!")}>
        <Text style={styles.registerlink}>
          Not registered?
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      {loadingUser &&
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />}
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
  text: {
    fontSize: 25,
    color: colors.gray,
    marginBottom: 20
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 250,
    height: 250
  },
  input: {
    width: '100%'
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
  loadingSpinner: {
    position: 'absolute',
    alignSelf: 'center',
  }
});