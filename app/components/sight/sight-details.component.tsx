import { Box, Divider } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Sight } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { capitalizeText, getCreatedByLegend } from '../../utils/common';


export default function SightDetailsComponent({ sight, onClose }: { sight: Sight, onClose: any }) {
    const { name, lastName } = sight?.user ?? {};
    return (
        <Box style={styles.container}>
            <Image style={styles.sightImage} source={{ uri: sight?.picture.uri }} />
            <TouchableOpacity style={styles.touchableBackBtWrapper} onPress={() => { onClose() }}>
                <MaterialCommunityIcons name="arrow-left" size={40} style={styles.backButton} />
            </TouchableOpacity>
            <Box style={styles.headerContainer}>
                <Text style={styles.sightName}>{sight?.animal}</Text>
                <Box style={styles.locationContainer}>
                    <MaterialCommunityIcons name="map-marker" size={22} style={styles.locationIcon} />
                    <Text>{sight?.placeName}</Text>
                </Box>
            </Box>
            <Divider style={styles.divider} />
            <Box style={styles.detailsContainer}>
                <Text>Condition: {capitalizeText(sight?.condition)}</Text>
                <Text>Description: <Text style={styles.description}>{sight?.description}</Text></Text>
                <Text style={styles.createdText}>
                    {getCreatedByLegend(name, lastName, sight?.createdAt)}
                </Text>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        marginBottom: 2,
        alignItems: 'center',
    },
    sightImage: {
        width: '100%',
        height: '60%',
    },
    sightName: {
        marginTop: 5,
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
    },
    detailsContainer: {
        padding: 10,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationIcon: {
        color: 'red',
        marginRight: 5,
    },
    description: {
        fontSize: 12,
        lineHeight: 20
    },
    createdText: {
        fontSize: 12,
        alignSelf: 'center',
        color: colors.black,
    },
    touchableBackBtWrapper: {
        position: 'absolute',
        alignSelf: 'flex-start',
        margin: 10,
    },
    backButton: {
        color: colors.white,
    },
    divider: {
        marginTop: 15,
    }
});