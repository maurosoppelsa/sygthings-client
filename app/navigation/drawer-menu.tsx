import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AboutScreen from '../screens/about.screen';
import ProfileScreen from '../screens/profile.screen';
import TabNavigator from './bottom-tab-menu';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
   return (
      <Drawer.Navigator useLegacyImplementation screenOptions={{
         drawerStyle: {
            paddingTop: 10,
         },
         headerTitle:"Syghtings",
         headerRight: () => <IonicIcon style={styles.notificationBt} name="md-notifications" />,
         headerStyle: {
            backgroundColor: colors.syghtingGreen,
            height: 90
         },
         headerTintColor: colors.white,
      }}>
         <Drawer.Screen name="Home" component={TabNavigator} options={{
            drawerLabel: 'Home',
            title: 'Syghtings',
            drawerIcon: ({ focused, size }) => (
               <IonicIcon
                  name="home"
                  size={size}
                  color={focused ? colors.syghtingGreen : colors.lightGray}
               />
            ),
         }} />
         <Drawer.Screen name="Profile" component={ProfileScreen} options={{
            title: 'Profile',
            drawerIcon: ({ focused, size }) => (
               <IonicIcon
                  name="person"
                  size={size}
                  color={focused ? colors.syghtingGreen : colors.lightGray}
               />
            ),
         }} />
         <Drawer.Screen name="About" component={AboutScreen} options={{
            title: 'About',
            drawerIcon: ({ focused, size }) => (
               <IonicIcon
                  name="information-circle-sharp"
                  size={size}
                  color={focused ? colors.syghtingGreen : colors.lightGray}
               />
            ),
         }} />
      </Drawer.Navigator>
   );
}

const styles = StyleSheet.create({
   notificationBt: {
      fontSize: 25,
      marginRight: 15,
      color: colors.white
   }
});