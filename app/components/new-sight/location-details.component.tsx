import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../../i18n/i18n';

export default function LocationDetailsComponent({ locationInfo }: { locationInfo: string }) {
    const noLocationLegend = I18n.t('LocationDetails.noLocationLegend');
    return (
        <Box style={styles.container}>
            <Box>
                <MaterialCommunityIcons name="map-marker" size={40} style={styles.locationIcon} />
            </Box>
            <Box style={styles.legend}>
                <Text style={styles.title}>{I18n.t('LocationDetails.yourLocation')}</Text>
                <Text style={styles.details}>{locationInfo || noLocationLegend}</Text>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 10,
        flexDirection: 'row',
    },
    title: {
        fontSize: 11,
        marginBottom: 3,
    },
    legend: {
        alignSelf: 'center',
        marginLeft: 10,
        maxWidth: 250,
    },
    details: {
        fontWeight: '700'
    },
    locationIcon: {
        color: 'red',
        margin: 5,
    },
});