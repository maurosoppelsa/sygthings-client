import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { newPicture, toggleCamera } from '../../redux/camera-slice';
import { openModal, closeModal, toggleImageOptionsModal } from '../../redux/sight-slice';
import { createSight } from '../../redux/sight-slice';
import { getMapUrl, getLocationInfo, setCurrentCoordinates, toggleLocationModal } from '../../redux/geolocation-slice';
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet } from 'react-native';
import { locationToLegend } from '../../utils/geolocation-helper';
import { hasZeroCoordinates } from '../../utils/common';
import CameraHandler from '../camera/camera-handler.container';
import LocationDetailsComponent from './location-details.component';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewSightModalComponent from './new-sight-modal/new-sight-modal.component';
import { Box, Button } from '@react-native-material/core';
import BackgroundComponent from '../common/background.component';
import I18n from '../../../i18n/i18n';
import { Picture, User } from '../../interfaces/common';
import { location } from '../../redux/interfaces';
import UploadImageOptionModal from './upload-image-option-modal/upload-image-option-modal';
import * as ImagePicker from "react-native-image-picker"
import { MediaType } from 'react-native-image-picker';
import LoadingMapComponent from './loading-map.component';
import { useFocusEffect } from '@react-navigation/native';

export default function NewSight() {
  const dispatch = useAppDispatch();
  const isCameraActive = useSelector((state: any) => state.camera.cameraActive);
  const picture = useSelector((state: any) => state.camera.picture);
  const showSightModal = useSelector((state: any) => state.sight.showSightModal);
  const modalStatus = useSelector((state: any) => state.sight.modalStatus);
  const currentCoordinates = useSelector((state: any) => state.geolocationInfo.coordinates);
  const mapImageUrl = useSelector((state: any) => state.geolocationInfo.mapImageUrl);
  const locationInfo = useSelector((state: any) => state.geolocationInfo.locationInfo);
  const showChangeLocationModal = useSelector((state: any) => state.geolocationInfo.showLocationModal);
  const currentUser: User = useSelector((state: any) => state.authentication.user);
  const showImageOptionsModal = useSelector((state: any) => state.sight.showImageOptionsModal);
  const isLoadingMap = useSelector((state: any) => state.geolocationInfo.loading);

  const coordinatesHaveChanged = (currentCoordinates: {longitude: string, latitude: string}, newLongitude: string, newLatitude: string) => {
    return currentCoordinates.longitude !== newLongitude || currentCoordinates.latitude !== newLatitude;
  }
 
  useFocusEffect(
    React.useCallback(() => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const newLongitude = JSON.stringify(position.coords.longitude);
          const newLatitude = JSON.stringify(position.coords.latitude);
          if (coordinatesHaveChanged(currentCoordinates, newLongitude, newLatitude)) {
            await dispatch(setCurrentCoordinates({
              longitude: newLongitude,
              latitude: newLatitude,
            }));
            await dispatch(getMapUrl());
            await dispatch(getLocationInfo());
          }
        },
        (error) => console.log(error.message),
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    }, [dispatch, currentCoordinates])
  );
  


  const onSelectCamera = () => {
    dispatch(toggleCamera({ cameraActive: true }));
    dispatch(toggleImageOptionsModal());
  };

  const onSelectGallery = async () => {
    dispatch(toggleImageOptionsModal());
    await openImageinFileSystem();
  }

  const toggleOptionsModal = () => {
    dispatch(toggleImageOptionsModal());
  }

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
        description: animalInfo.description,
        createdAt: new Date(Date.now()).toISOString(),
        province: locationInfo.region,
        userId: currentUser?.id,
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

  function hasEmptyCoordinates(location: location) {
    return location.latitude === "0" && location.longitude === "0"
  }

  const openImageinFileSystem = async () => {
    const options = {
      title: 'Select Sight Picture',
      mediaType: 'photo' as MediaType,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response?.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        return;
      } else if (response.assets && response.assets.length > 0) {
        const picture: Picture = {
          uri: '',
          width: 0,
          height: 0,
        };
        picture.uri = response.assets[0].uri ?? '';
        picture.width = response.assets[0].width ?? 0;
        picture.height = response.assets[0].height ?? 0;
        dispatch(newPicture(picture));
        dispatch(openModal());
      } else {
        return;
      }
    });
  }

  if (isLoadingMap) {
    return (
      <LoadingMapComponent />
    );
  }

  return (
    !isCameraActive ?
      <BackgroundComponent imageUrl={mapImageUrl} enableDefaultBg={hasZeroCoordinates(currentCoordinates) || mapImageUrl === ''}>
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
        <UploadImageOptionModal onSelectCamera={onSelectCamera} onSelectGallery={onSelectGallery} showModal={showImageOptionsModal} onClose={toggleOptionsModal} />
        <Box style={styles.locationDetailcontainer}>
          <Box style={styles.locationDetailContent}>
            <LocationDetailsComponent locationInfo={locationToLegend(locationInfo)} />
            <Button
              disabled={hasEmptyCoordinates(currentCoordinates)}
              style={styles.newSightBt}
              title={I18n.t('NewSight.button')}
              onPress={() => toggleOptionsModal()}></Button>
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