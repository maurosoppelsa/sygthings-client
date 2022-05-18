import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './drawer-menu';

export default function Navigation() {
    return (
        <NavigationContainer>
            <DrawerMenu/>
        </NavigationContainer>
    );
}

