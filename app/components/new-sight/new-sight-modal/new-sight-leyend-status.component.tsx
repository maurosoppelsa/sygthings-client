import { ActivityIndicator, Box } from '@react-native-material/core';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../../config/colors';
import { SIGHT_MODAL_STATUS } from '../../../constants';

export default function NewSightLegendStatus({ status, onClose }: { status: string, onClose: any }) {
    let legendText: string = '';
    let statusStyle: any = {};
    let textInfo: string = '';

    switch (status) {
        case SIGHT_MODAL_STATUS.SUCCESS:
            legendText = 'Success!';
            statusStyle = styles.success;
            textInfo = 'Thanks for submitting, your new sight will be under review.';
            break;
        case SIGHT_MODAL_STATUS.PENDING:
            legendText = 'Loading, please wait...';
            statusStyle = styles.pending;
            textInfo = '';
            break;
        default:
            legendText = 'Failed';
            statusStyle = styles.failed;
            textInfo = 'Something went wrong, please try again.';
    }
    return (
        <Box style={styles.container}>
            <Text style={[statusStyle,styles.leyendText]}>{legendText}</Text>
            <Text style={styles.textInfo}>{textInfo}</Text>
            {status === SIGHT_MODAL_STATUS.PENDING &&
                <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />}

            {status === (SIGHT_MODAL_STATUS.SUCCESS ||  SIGHT_MODAL_STATUS.FAILED) &&
                <Pressable
                    style={styles.closeButton}
                    onPress={() => { onClose() }}
                >
                    <Text style={styles.closeText}>Close</Text>
                </Pressable>}
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 200,
        height: 130,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
    leyendText: {
        fontSize: 18,
        textAlign: 'center',
    },
    textInfo: {
        fontSize: 10,
        textAlign: 'center',
        color: colors.gray,
    },
    loadingSpinner: {
        alignSelf: 'center',
        marginTop: 10,
    },
    closeButton: {
        borderRadius: 5,
        padding: 10,
        minWidth: 100,
        elevation: 2,
        alignSelf: "center",
        backgroundColor: colors.blue,
        marginTop: 10,
        marginBottom: 10,
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});