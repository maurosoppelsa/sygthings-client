//this needs to be in the top
import 'react-native-gesture-handler';

import React from 'react';
import LoginScreen from './app/screens/login.screen';
import Navigation from './app/navigation';
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import store from './app/redux/store'
import { registerRootComponent } from 'expo';

function Authentication() {
  const authentication = useSelector((state: any) => state.authentication);
  if (authentication.loggedIn) {
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