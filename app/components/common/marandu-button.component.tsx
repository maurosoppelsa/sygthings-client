import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../config/colors';
import { isTabletDevice } from '../../utils/common';

export function MaranduButtonComponent({title, onPress, disabled, style }: {title: string, onPress: any, disabled?: boolean, style?: any}) {
    return (
        <Pressable 
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonEnabled, style]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        minWidth: 120,
        elevation: 2,
        alignSelf: "center",
        margin: 10,
    },
    buttonDisabled: {
        backgroundColor: colors.lightGray,
    },
    buttonEnabled: {
        backgroundColor: colors.maranduGreen,
    },
    text: {
        color: colors.maranduYellow,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        ...(isTabletDevice() && { fontSize: 18 }),
    },
});