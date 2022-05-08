//this needs to be in the top
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet } from 'react-native';
import colors from './app/config/colors';
import LoginScreen from './app/screens/login.screen';
import Navigation from './app/components/Navigation';

function Authentication(props: any) {
  switch (props.authState) {
    case 'signIn':
      return (<Navigation></Navigation>);
    case 'signOut':
      return (<LoginScreen></LoginScreen>);
    default:
      return (<LoginScreen></LoginScreen>);
  }
}

export default function App() {

  return (
    <Authentication authState='signIn'></Authentication>
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
