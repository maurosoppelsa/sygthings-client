import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import colors from '../config/colors';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>
                New Sight Screen
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex:1,
    }
});