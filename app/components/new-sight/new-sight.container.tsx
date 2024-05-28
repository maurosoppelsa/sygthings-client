import React, { useEffect, useState } from 'react';
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
import NewSightModalComponent from './new-sight-modal/new-sight-modal.component';
import { Box } from '@react-native-material/core';
import BackgroundComponent from '../common/background.component';
import { Picture, User } from '../../interfaces/common';
import { location } from '../../redux/interfaces';
import UploadImageOptionModal from './upload-image-option-modal/upload-image-option-modal';
import * as ImagePicker from "react-native-image-picker"
import { MediaType } from 'react-native-image-picker';
import LoadingMapComponent from './loading-map.component';
import NewSightButtonComponent from './new-sight-button.component';
import NewSightMarkerComponent from './new-sight-marker.component';

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
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const newLongitude = JSON.stringify(position.coords.longitude);
        const newLatitude = JSON.stringify(position.coords.latitude);
        await dispatch(setCurrentCoordinates({
          longitude: newLongitude,
          latitude: newLatitude,
        }));
        await dispatch(getMapUrl());
        await dispatch(getLocationInfo());
        setLoadingMap(false);
      },
      async (error) => {
        setLoadingMap(false);
        await dispatch(setCurrentCoordinates({
          longitude: '0',
          latitude: '0',
        }));
        console.log(error.message)
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }, []);

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
      maxWidth: 600,
      maxHeight: 600,
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

  if (loadingMap) {
    return (
      <LoadingMapComponent />
    );
  }

  return (
    !isCameraActive ?
      <BackgroundComponent imageUrl={mapImageUrl} enableDefaultBg={hasZeroCoordinates(currentCoordinates) || mapImageUrl === ''}>
        <NewSightMarkerComponent action={openUpdateLocationModal} style={styles.markerBt}/>
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
            <NewSightButtonComponent action={toggleOptionsModal} disabled={hasEmptyCoordinates(currentCoordinates)} style={styles.cameraButton}/>
          </Box>
        </Box>
      </BackgroundComponent>
      : <CameraHandler onTakePicture={onTakePicture} />
  );
}

const styles = StyleSheet.create({
  markerBt: {
    alignSelf: 'flex-end',
    right: 20,
    top: 20,
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
  },
  cameraButton: {
    alignSelf: 'center',
  },
});