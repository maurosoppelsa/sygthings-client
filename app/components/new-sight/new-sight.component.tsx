import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text, ImageBackground } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import imageBg from '../../assets/mapita-ibera.png';
import LocationDetailsComponent from './location-details.component';

export default function NewSightComponent() {
    return (
        <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
            <Box style={styles.container}>
                <Box style={styles.boxLegend}>
                    <LocationDetailsComponent />
                </Box>
            </Box>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    cameraButton: {
        flex: 1,
        alignItems: "center",
    },
    newSightLegend: {
        paddingLeft: 12,
    },
    boxLegend: {
        flex: 2,
        alignSelf: 'flex-end'
    },
    image: {
        width: '100%',
        height: '100%'
    },
});
