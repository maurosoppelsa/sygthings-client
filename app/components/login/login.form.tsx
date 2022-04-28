import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import logo from '../../assets/main_icon.png';
import { Button, TextInput, Box } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function LoginForm({ handleLogin }: { handleLogin: any }) {

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} resizeMode='contain' style={styles.logoImage}></Image>
        <Text style={styles.text}>Syghtings</Text>
      </View>
      <Box pv={20}>
        <TextInput
          inputContainerStyle={styles.input}
          label="User"
          variant="standard"
          color={colors.syghtingGreen}
          leading={props => <Icon name="account" {...props} style={styles.input} />}
        />
        <TextInput
          secureTextEntry={true}
          label="Password"
          variant="standard"
          color={colors.syghtingGreen}
          leading={props => <Icon name="key" {...props} style={styles.input} />}
        />
      </Box>
      <Button title="Log in" onPress={handleLogin} style={styles.loginButton} />
      <TouchableOpacity onPress={() => console.log("register!")}>
        <Text style={styles.registerlink}>
          Not registered?
        </Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 25,
    color: colors.gray,
    marginBottom: 20
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  input: {
    width: '100%'
  },
  loginButton: {
    backgroundColor: colors.syghtingGreen,
    marginTop: 20,
    width: '100%',
    height:40
  },
  textButton: {
    color: colors.white,
    textAlign: 'center'
  },
  registerlink: {
    alignSelf: 'center',
    marginTop: 30,
    color: colors.blue,
    fontSize:18,
  }
});