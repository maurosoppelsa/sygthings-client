import { ActivityIndicator, Box } from '@react-native-material/core';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export default function NewSightLegendStatus({ status }: { status: string }) {
    let legendText: string = '';
    let statusStyle: any = {};

    switch (status) {
        case 'success':
            legendText = 'Success';
            statusStyle = styles.success;
            break;
        case 'pending':
            legendText = 'Loading, please wait...';
            statusStyle = styles.pending;
            break;
        default:
            legendText = 'Failed';
            statusStyle = styles.failed;
    }
    return (
        <Box style={styles.container}>
            <Text style={statusStyle}>{legendText}</Text>
            {status === 'pending' &&
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />}
        </Box>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 200,
        height: 100,
        alignItems: 'center',
        padding: 20,
    },
    success: {
        color: 'green',
    },
    failed: {
        color: 'red',
    },
    pending: {
        color: 'gray',
    },
    loadingSpinner: {
        alignSelf: 'center',
        marginTop: 10,
      }
});