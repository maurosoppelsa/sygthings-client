import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';
import { getInitials } from '../../utils/common';


export default function PersonCircleComponent({ fullname }: { fullname: string }) {
    return (
        <Box style={styles.container}>
                <Text style={styles.initials}>{getInitials(fullname)}</Text>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.lightGray,
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    initials: {
        paddingTop: 7,
        letterSpacing: 2,
        fontSize: 25,
        fontWeight: '600',
    }
});