//this needs to be in the top
import 'react-native-gesture-handler';

import React from 'react';
import LoginScreen from './app/screens/login.screen';
import Navigation from './app/navigation';
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import store from './app/redux/store'
import { StatusBar } from 'expo-status-bar';
import colors from './app/config/colors';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AuthService from './app/services/auth.service';
import SightService from './app/services/sight.service';
import { hasDateExpired } from './app/utils/common';

const initServices = (token: string) => {
  const services = [AuthService.getInstance(), SightService.getInstance()];
  services.forEach(service => {
    service.setSessionToken(token);
  });
};

function Authentication() {
  const authentication = useSelector((state: any) => state.authentication);
  if (authentication.loggedIn && !hasDateExpired(authentication.sessionToken.expiresIn)) {
    initServices(authentication.sessionToken.token);
    return (<Navigation></Navigation>);
  } else {
    return (<LoginScreen></LoginScreen>);
  }
}

const persistor = persistStore(store);

export default function App() {
  return (
    <PersistGate persistor={persistor}>
      <ReduxProvider store={store}>
        <StatusBar backgroundColor={colors.maranduGreen
        } />
        <Authentication></Authentication>
      </ReduxProvider>
    </PersistGate>
  );
}
