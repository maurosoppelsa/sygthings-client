//this needs to be in the top
import 'react-native-gesture-handler';

import React from 'react';
import LoginScreen from './app/screens/login.screen';
import Navigation from './app/components/Navigation';
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import store from './app/redux/store'
import { registerRootComponent } from 'expo';

function Authentication() {
  const userState = useSelector((state: any) => state.user);
  if (userState.loggedIn) {
    return (<Navigation></Navigation>);
  } else {
    return (<LoginScreen></LoginScreen>);
  }
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Authentication></Authentication>
    </ReduxProvider>
  );
}
registerRootComponent(App);