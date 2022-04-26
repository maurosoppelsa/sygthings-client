import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import colors from '../../config/colors';


export default function LoginForm({handleLogin}:{handleLogin: any}) {

  return (
    <View style={styles.container}>
      <View 
        style={{ backgroundColor: colors.black }}>
      </View>
      <Button title='Login' onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: "white"
  }
});