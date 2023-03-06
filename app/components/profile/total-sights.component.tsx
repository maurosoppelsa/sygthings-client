import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import I18n from '../../../i18n/i18n';


export default function TotalSightsComponent({ sightsAmount }: { sightsAmount: number }) {
    return (
        <Box style={styles.container}>
            <Box style={styles.titleContainer}>
                <FontAwesome5 name="paw" size={20} onPress={() => () => { }} />
                <Text style={styles.title}>{I18n.t('Profile.totalSights')}</Text>
            </Box>
            <Text style={styles.sightsAmount}>{sightsAmount}</Text>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 12,
        color: colors.black,
        fontWeight: '800',
    },
    sightsAmount: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.black,
        alignSelf: 'center'
    }
});