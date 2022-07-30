import React from 'react';
import { Box, Button } from "@react-native-material/core";
import { StyleSheet, ImageBackground } from 'react-native';
import LocationDetailsComponent from './location-details.component';
import colors from '../../config/colors';
import CameraComponent from './camera.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picture } from '../../interfaces/common';
import NewSightModalComponent from './new-sight-modal/new-sight-modal.component';

export default function NewSightComponent({ onPressCameraBt, isCameraActive, onTakePicture, newPicture, newSightStatus, showModal, onSightSubmit, onFormClose, imageUrl, locationInfo }:
    { onPressCameraBt: any, isCameraActive: boolean, onTakePicture: any, newPicture: Picture, newSightStatus: string, showModal: boolean, onSightSubmit: any, onFormClose: any, imageUrl: string, locationInfo: any }) {
    return (
        !isCameraActive ? <ImageBackground source={{ uri: imageUrl }} resizeMode="cover" style={styles.image}>
            <MaterialCommunityIcons name="map-marker-plus" size={35} style={styles.markerBt} />
            <NewSightModalComponent modalFormStatus={newSightStatus} imageUrl={newPicture ? newPicture.uri : ''} showModal={showModal} onSubmit={onSightSubmit} onClose={onFormClose} />
            <Box style={styles.container}>
                <Box style={styles.boxContent}>
                    <LocationDetailsComponent locationInfo={locationInfo}/>
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
        marginBottom: 60,
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
        marginTop: 30,
        alignSelf: 'center',
    }
});
