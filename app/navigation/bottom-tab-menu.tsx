import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/dashboard.screen';
import NewSightScreen from '../screens/new-sight.screen';
import MySightsScreen from '../screens/my-sights.screen';
import colors from '../config/colors';
import ProfileScreen from '../screens/profile.screen';
import PersonCircleComponent from '../components/common/profile-circle.component';
import I18n from '../../i18n/i18n';
import { User } from '../interfaces/common';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const fullScreenWidth = Dimensions.get('window').width;

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

function MySightsStackScreen() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='MySightsScreen' component={MySightsScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}


export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarStyle: { ...styles.bottomMenu },
                headerShown: true,
                headerTintColor: colors.white,
                headerStyle: {
                    backgroundColor: colors.syghtingGreen,
                },
                headerRight(props) {
                    const currentUser: User = useSelector((state: any) => state.authentication.user);
                    return <TouchableOpacity style={styles.profileBt} onPress={() => navigation.navigate('Profile')}>
                        <PersonCircleComponent fullname={currentUser?.username}></PersonCircleComponent>
                    </TouchableOpacity>
                },
                tabBarIcon: ({ focused }) => {
                    let iconName = '';
                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'MySights') {
                        iconName = focused ? 'md-paw' : 'md-paw-outline';
                    }
                    else if (route.name === 'NewSight') {
                        iconName = focused ? 'camera' : 'camera-outline';
                    }
                    return <IonicIcon style={styles.bottomMenuIcon} name={iconName}></IonicIcon>
                },
            })}
        >
            <Tab.Screen name='Dashboard' component={DashboardStackScreen} options={{ tabBarShowLabel: false, title: I18n.t('Navigation.sections.dashboard') }}></Tab.Screen>
            <Tab.Screen name='NewSight' component={NewSightStackScreen} options={{ tabBarShowLabel: false, title: I18n.t('Navigation.sections.newSights') }}></Tab.Screen>
            <Tab.Screen name='MySights' component={MySightsStackScreen} options={{ tabBarShowLabel: false, title: I18n.t('Navigation.sections.mySights') }}></Tab.Screen>
            <Tab.Screen name='Profile' component={ProfileStackScreen} options={{ tabBarShowLabel: false, title: I18n.t('Navigation.sections.profile'), tabBarButton: () => null }}></Tab.Screen>
        </Tab.Navigator>
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
    },
    profileBt: {
        padding: 10,
    }
});