import React from 'react';
import { View, StyleSheet } from "react-native";
import MySights from '../components/my-sights/my-sights.container';
import colors from '../config/colors';

export default function MySightsScreen() {
    return (
        <View style={styles.container}>
            <MySights/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    }
});