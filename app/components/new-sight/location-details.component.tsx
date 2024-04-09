import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../../i18n/i18n';
import { isTabletDevice } from '../../utils/common';

export default function LocationDetailsComponent({ locationInfo }: { locationInfo: string }) {
    const noLocationLegend = I18n.t('LocationDetails.noLocationLegend');
    return (
        <Box style={styles.container}>
            <Box>
                <MaterialCommunityIcons name="map-marker" size={isTabletDevice() ? 60 : 40} style={styles.locationIcon} />
            </Box>
            <Box style={styles.legend}>
                <Text style={styles.details}>{locationInfo || noLocationLegend}</Text>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.maranduGreenShadow,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 20,
    },
    title: {
        fontSize: 12,
        marginBottom: 3,
    },
    legend: {
        alignSelf: 'center',
        maxWidth: isTabletDevice() ? '100%' :'85%',
        paddingRight: 5,
    },
    details: {
        color: colors.darkGray,
        fontSize: isTabletDevice() ? 22 : 18,
    },
    locationIcon: {
        color: colors.maranduGreen,
        margin: 5,
    },
});