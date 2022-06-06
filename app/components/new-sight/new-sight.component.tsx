import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text, ImageBackground, Image } from 'react-native';
import imageBg from '../../assets/mapita-ibera.png';
import LocationDetailsComponent from './location-details.component';
import { TouchableOpacity } from 'react-native'
import colors from '../../config/colors';
import CameraComponent from './camera.component';

export default function NewSightComponent({ onPressCameraBt, isCameraActive }: { onPressCameraBt: any, isCameraActive: boolean }) {
    return (
        !isCameraActive ? <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
            <Box style={styles.container}>
                <Box style={styles.boxLegend}>
                    <LocationDetailsComponent />
                </Box>
                <Box style={styles.cameraBox}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {onPressCameraBt()}}>
                        <Image source={require('../../assets/camera-icon.png')} style={styles.cameraButton}/>
                    </TouchableOpacity>
                </Box>
            </Box>
        </ImageBackground> : <CameraComponent/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    cameraButton: {
        width: 80,
        height: 80,
    },
    newSightLegend: {
        paddingLeft: 12,
    },
    boxLegend: {
        marginTop:10,
        flex: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    cameraBox: {
        flex:1,
        alignItems: 'center',
        maxHeight: 80,
        backgroundColor: colors.gray,
    }
});
