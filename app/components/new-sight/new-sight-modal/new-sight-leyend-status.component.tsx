import { Box } from '@react-native-material/core';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../config/colors';
import { SIGHT_MODAL_STATUS } from '../../../constants';
import I18n from '../../../../i18n/i18n';
import LoadingSpinnerComponent from '../../common/loading-spiner.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewSightLegendStatus({ status, onClose }: { status: string, onClose: any }) {
    let legendText: string = '';
    let statusStyle: any = {};
    let textInfo: string = '';

    switch (status) {
        case SIGHT_MODAL_STATUS.SUCCESS:
            legendText = I18n.t('NewSightForm.statusModal.success.title');
            statusStyle = styles.success;
            textInfo = I18n.t('NewSightForm.statusModal.success.message');
            break;
        case SIGHT_MODAL_STATUS.PENDING:
            legendText = I18n.t('NewSightForm.statusModal.pending.title');
            statusStyle = styles.pending;
            textInfo = I18n.t('NewSightForm.statusModal.pending.message');
            break;
        default:
            legendText = I18n.t('NewSightForm.statusModal.fail.title');
            statusStyle = styles.failed;
            textInfo = I18n.t('NewSightForm.statusModal.fail.message');
    }
    return (
        <Box style={styles.container}>
            <Text style={[statusStyle, styles.leyendText]}>{legendText}</Text>
            <Text style={styles.textInfo}>{textInfo}</Text>
            {status === SIGHT_MODAL_STATUS.PENDING &&
                <LoadingSpinnerComponent />}

            {(status === (SIGHT_MODAL_STATUS.SUCCESS) || (status === SIGHT_MODAL_STATUS.FAILED)) &&
                <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                    <MaterialCommunityIcons color={colors.maranduGreen} name="close-circle" size={25} />
                </TouchableOpacity>}
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.maranduGreenShadow,
        width: 350,
        height: 140,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        shadowColor: colors.black,
        borderRadius: 10,
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
        marginTop: 20,
    },
    leyendText: {
        fontSize: 28,
        textAlign: 'center',
    },
    textInfo: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        color: colors.darkGray,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});