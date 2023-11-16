import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export default function NewSightMarkerComponent({ action, style }: { action: any, style?: any }) {
    return (
        <TouchableOpacity style={[styles.container, style]} activeOpacity={0.8} onPress={() => { action() }}>
            <MaterialCommunityIcons name="map-marker-plus" size={28} style={styles.marker} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.maranduGreen,
        backgroundColor: colors.maranduYellow,
    },
    marker: {
        color: colors.maranduGreen,
        top: 5,
    },
});