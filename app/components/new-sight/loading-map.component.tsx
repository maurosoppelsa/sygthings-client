import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';
import I18n from '../../../i18n/i18n';
import LoadingSpinnerComponent from '../common/loading-spiner.component';

export default function LoadingMapComponent() {
    return (
        <View style={styles.container}>
            <Box>
                <LoadingSpinnerComponent />
                <Text style={styles.legend}>{I18n.t('NewSight.loadingMap')}</Text>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    legend: {
        color: colors.gray,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
});