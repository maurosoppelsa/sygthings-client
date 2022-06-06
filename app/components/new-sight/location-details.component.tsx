import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import markerIcon from '../../assets/map-marker-icon.png';
import { Image } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function LocationDetailsComponent() {
    return (
        <Box style={styles.container}>
            <Box>
                <Image source={markerIcon} />
            </Box>
            <Box style={styles.legend}>
                <Text style={styles.title}>Your location</Text>
                <Text style={styles.details}>Esteros de Iberá, corrientes</Text>
            </Box>
                <Icon style={styles.editBt} name='pencil' size={30}></Icon>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginBottom: 50,
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
    },
    details: {
        fontWeight: '700'
    },
    editBt: {
        marginTop: 20,
        marginLeft: 20,
    }
});