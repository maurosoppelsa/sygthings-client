import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Sight } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function SightDetailsComponent({ sight, onClose }: { sight: Sight, onClose: any }) {
    return (
        <Box style={styles.container}>
            <Image style={styles.sightImage} source={{ uri: sight?.picture.uri }} />
            <TouchableOpacity style={styles.touchableBackBtWrapper} onPress={() => { onClose() }}>
                <MaterialCommunityIcons name="arrow-left" size={40} style={styles.backButton} />
            </TouchableOpacity>
            <Box style={styles.headerContainer}>
                <Text style={styles.sightName}>{sight?.animal}</Text>
                <Box style={styles.locationContainer}>
                    <MaterialCommunityIcons name="map-marker" size={30} style={styles.locationIcon} />
                    <Text>{sight?.placeName}</Text>
                </Box>
            </Box>
            <Box style={styles.detailsContainer}>
                <Text>Condition: {sight?.condition}</Text>
                <Text>Description:</Text>
                <Text style={styles.description}>Proin velit neque, tempor sit amet risus quis, interdum vestibulum sem. Sed fringilla risus aliquet interdum volutpat. In hac habitasse platea dictumst.</Text>
                <Text style={styles.createdText}>Created by Emma Phillips, Biologist, at 05/03/2022</Text>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2,
    },
    sightImage: {
        width: '100%',
        height: '60%',
    },
    sightName: {
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
    },
    detailsContainer: {
        padding: 5,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        color: 'red',
    },
    description: {
        fontSize: 12,
    },
    createdText: {
        fontSize: 12,
        marginTop: 10,
        alignSelf: 'center',
    },
    touchableBackBtWrapper: {
        position: 'absolute',
        alignSelf: 'flex-start',
        margin: 10,
    },
    backButton: {
        color: colors.white,
    },
});