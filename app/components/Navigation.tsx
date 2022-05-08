import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IonicIcon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/dashboard.screen';
import NewSightScreen from '../screens/new-sight.screen';
import ProfileScreen from '../screens/profile.screen';
import colors from '../config/colors';

const fullScreenWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();

function DashboardStackScreen() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='DashboardScreen' component={DashboardScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}

function NewSightStackScreen() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='NewSightScreen' component={NewSightScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: { ...styles.bottomMenu },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        let iconName = '';
                        if (route.name === 'Dashboard') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        else if (route.name === 'NewSight') {
                            iconName = focused ? 'camera' : 'camera-outline';
                        }
                        return <IonicIcon style={styles.bottomMenuIcon} name={iconName}></IonicIcon>
                    },
                })}
            >
                <Tab.Screen name='Dashboard' component={DashboardStackScreen} options={{ tabBarShowLabel: false, }}></Tab.Screen>
                <Tab.Screen name='NewSight' component={NewSightStackScreen} options={{ tabBarShowLabel: false, }}></Tab.Screen>
                <Tab.Screen name='Profile' component={ProfileStackScreen} options={{ tabBarShowLabel: false, }}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    bottomMenu: {
        width: fullScreenWidth,
        backgroundColor: colors.black,
        color: colors.white,
        borderTopColor: colors.black
    },
    bottomMenuIcon: {
        color: colors.white,
        fontSize: 23
    }
});

