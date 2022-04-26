import React from 'react';
import { StyleSheet} from 'react-native';
import colors from './app/config/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/login.screen';
import DashboardScreen from './app/screens/dashboard.screen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  </NavigationContainer>
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
