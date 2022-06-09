import React from 'react';
import { Box, Button, Icon } from "@react-native-material/core";
import { StyleSheet, ImageBackground, Text } from 'react-native';
import imageBg from '../../assets/mapita-ibera.png';
import LocationDetailsComponent from './location-details.component';
import colors from '../../config/colors';
import CameraComponent from './camera.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picture } from '../../interfaces/common';
import NewSightModalComponent from './new-sight-modal.component';

export default function NewSightComponent({ onPressCameraBt, isCameraActive, onTakePicture, newPicture, showModal }: { onPressCameraBt: any, isCameraActive: boolean, onTakePicture: any, newPicture: Picture, showModal: boolean }) {
    return (
        !isCameraActive ? <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
            <NewSightModalComponent showModal={showModal} imageUrl={newPicture ? newPicture.uri : ''}/>
            <MaterialCommunityIcons name="map-marker-plus" size={35} style={styles.markerBt} />
            <Box style={styles.container}>
                <Box style={styles.boxContent}>
                    <LocationDetailsComponent />
                    <Button style={styles.newSightBt} title='Create new sight' onPress={onPressCameraBt}></Button>
                </Box>
            </Box>
        </ImageBackground> : <CameraComponent onTakePicture={(picture: Picture) => { onTakePicture(picture) }} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    markerBt: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 10,
        color: '#000000',
    },
    newSightLegend: {
        paddingLeft: 12,
    },
    boxContent: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    newSightBox: {
        flex: 1,
        alignItems: 'center',
    },
    newSightBt: {
        borderRadius: 5,
        backgroundColor: colors.syghtingGreen,
        marginBottom: 40,
        marginTop: 20,
        alignSelf: 'center',
    }
});
