import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './drawer-menu';
import TabNavigator from './bottom-tab-menu';

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    );
}

