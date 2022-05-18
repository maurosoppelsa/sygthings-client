import { Box } from '@react-native-material/core';
import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import colors from '../config/colors';


export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Box style={styles.box}>
                <Text style={styles.text}>
                    Profile Screen
                </Text>
            </Box>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: "row",
    },
    box: {
        flex:1,
        flexDirection: 'column',
    },
    text: {
        alignSelf:'center',
        color:colors.black,
    }
});