import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { toggleCamera } from '../../redux/camera-slice';
import { openModal, closeModal } from '../../redux/sight-slice';
import { createSight } from '../../redux/sight-slice';
import { getMapUrl, getLocationInfo, setCurrentCoordinates, toggleLocationModal } from '../../redux/geolocation-slice';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Text, StyleSheet } from 'react-native';
import { locationToLegend } from '../../utils/geolocation-helper';
import { hasEmptyProperties } from '../../utils/common';
import CameraHandler from '../camera/camera-handler.container';
import LocationDetailsComponent from './location-details.component';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewSightModalComponent from './new-sight-modal/new-sight-modal.component';
import { Box, Button } from '@react-native-material/core';
import BackgroundComponent from '../common/background.component';

export default function NewSight() {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const isCameraActive = useSelector((state: any) => state.camera.cameraActive);
  const picture = useSelector((state: any) => state.camera.picture);
  const showSightModal = useSelector((state: any) => state.sight.showSightModal);
  const modalStatus = useSelector((state: any) => state.sight.modalStatus);
  const currentCoordinates = useSelector((state: any) => state.geolocationInfo.coordinates);
  const mapImageUrl = useSelector((state: any) => state.geolocationInfo.mapImageUrl);
  const locationInfo = useSelector((state: any) => state.geolocationInfo.locationInfo);
  const showChangeLocationModal = useSelector((state: any) => state.geolocationInfo.showLocationModal);

  useEffect(() => {
    (async () => {
      const grantedPermisions = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation permisions",
          message:
            "to create a new sight we need to access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      setHasLocationPermission(grantedPermisions === 'granted');
    })();
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setCurrentCoordinates({
          longitude: JSON.stringify(position.coords.longitude),
          latitude: JSON.stringify(position.coords.latitude),
        }));
        dispatch(getMapUrl());
        dispatch(getLocationInfo());
      }, (error) => alert(error.message), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    }
    );
  }, []);

  const activateCamera = () => {
    dispatch(toggleCamera({ cameraActive: true }));
  };

  const onTakePicture = () => {
    dispatch(openModal());
  }

  const onSightSubmit = (animalInfo: any) => {
    dispatch(createSight({
      sight: {
        animal: animalInfo.animalName,
        picture,
        condition: animalInfo.condition,
        placeName: animalInfo.placeName,
        location: currentCoordinates,
      }
    }));
  }

  const onFormClose = () => {
    dispatch(closeModal());
  }

  const openUpdateLocationModal = () => {
    dispatch(toggleLocationModal());
    dispatch(openModal());
  }

  const onUpdateLocation = (coordinates: Number[]) => {
    dispatch(setCurrentCoordinates({
      longitude: coordinates[0].toString(),
      latitude: coordinates[1].toString(),
    }));
    dispatch(getMapUrl());
    dispatch(getLocationInfo());
    dispatch(toggleLocationModal());
    dispatch(closeModal());
  }

  const onCloseLocationModal = () => {
    dispatch(toggleLocationModal());
    dispatch(closeModal());
  }

  if (hasLocationPermission === null || hasLocationPermission === false) {
    return <Text>No access to geolocation</Text>;
  }

  return (
    !isCameraActive ?
      <BackgroundComponent imageUrl={mapImageUrl} enableDefault={hasEmptyProperties(currentCoordinates)}>
        <MaterialCommunityIcons name="map-marker-plus" size={35} style={styles.markerBt} onPress={() => openUpdateLocationModal()} />
        <NewSightModalComponent
          modalFormStatus={modalStatus}
          imageUrl={picture ? picture.uri : ''}
          showModal={showSightModal} onSubmit={onSightSubmit}
          onClose={onFormClose} locationInfo={locationToLegend(locationInfo)}
          showLocationModal={showChangeLocationModal}
          onUpdateLocation={onUpdateLocation}
          onCloseLocationModal={onCloseLocationModal}
          location={currentCoordinates} />
        <Box style={styles.locationDetailcontainer}>
          <Box style={styles.locationDetailContent}>
            <LocationDetailsComponent locationInfo={locationToLegend(locationInfo)} />
            <Button style={styles.newSightBt} title='Create new sight' onPress={() => activateCamera()}></Button>
          </Box>
        </Box>
      </BackgroundComponent>
      : <CameraHandler onTakePicture={onTakePicture} />
  );
}

const styles = StyleSheet.create({
  markerBt: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
    color: colors.black,
  },
  newSightLegend: {
    paddingLeft: 12,
  },
  locationDetailContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60,
  },
  locationDetailcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
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