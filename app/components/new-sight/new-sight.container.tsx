import React, { useEffect, useState } from 'react';
import NewSightComponent from './new-sight.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { toggleCamera, newPicture } from '../../redux/camera-slice';
import { openModal, closeModal } from '../../redux/sight-slice';
import { useFocusEffect } from '@react-navigation/native';
import { Picture } from '../../interfaces/common';
import { createSight } from '../../redux/sight-slice';
import { getMapUrl, getLocationInfo, setCurrentLocation, toggleLocationModal } from '../../redux/geolocation-slice';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, View, Text, Image } from 'react-native';
import { locationToLegend } from '../../utils/geolocation-helper';
import { hasEmptyProperties } from '../../utils/common';
export default function NewSight() {
  const closeCamera = () => dispatch(toggleCamera({ cameraActive: false }));
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const isCameraActive = useSelector((state: any) => state.camera.cameraActive);
  const picture = useSelector((state: any) => state.camera.picture);
  const showSightModal = useSelector((state: any) => state.sight.showSightModal);
  const modalStatus = useSelector((state: any) => state.sight.modalStatus);
  const currentLocation = useSelector((state: any) => state.geolocationInfo.location);
  const mapImageUrl = useSelector((state: any) => state.geolocationInfo.mapImageUrl);
  const locationInfo = useSelector((state: any) => state.geolocationInfo.locationInfo);
  const showChangeLocationModal = useSelector((state: any) => state.geolocationInfo.showLocationModal);
  var imageBg = require('../../assets/nature_bg1.jpg');
  const exampleImageUri = Image.resolveAssetSource(imageBg).uri;

  useFocusEffect(
    React.useCallback(() => {
      return () => closeCamera();
    }, [])
  );

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
        dispatch(setCurrentLocation({
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

  const handleCamera = () => {
    dispatch(toggleCamera({ cameraActive: true }));
  };
  const takePicture = (picture: Picture) => {
    const pictureTaked = {
      with: picture?.width,
      height: picture?.height,
      uri: picture?.uri,
    }
    dispatch(newPicture(pictureTaked));
    dispatch(openModal());
  }

  const onSightSubmit = (animalInfo: any) => {
    dispatch(createSight({
      sight: {
        animal: animalInfo.animalName,
        picture,
        condition: animalInfo.condition,
        placeName: animalInfo.placeName,
        location: currentLocation,
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
    dispatch(setCurrentLocation({
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

  if (hasLocationPermission === null) {
    return <View />;
  }
  if (hasLocationPermission === false) {
    return <Text>No access to geolocation</Text>;
  }
  return (
    <NewSightComponent
      onPressCameraBt={handleCamera}
      isCameraActive={isCameraActive}
      onTakePicture={(picture: Picture) => { takePicture(picture) }}
      newPicture={picture}
      newSightStatus={modalStatus}
      showModal={showSightModal}
      onSightSubmit={onSightSubmit}
      onFormClose={onFormClose}
      imageUrl={(mapImageUrl !== '' && !hasEmptyProperties(currentLocation)) ? mapImageUrl : exampleImageUri}
      locationInfo={locationToLegend(locationInfo)}
      onChangeLocation={openUpdateLocationModal}
      showLocationModal={showChangeLocationModal}
      onUpdateLocation={onUpdateLocation}
      onCloseLocationModal={onCloseLocationModal}
      location={currentLocation} />
  );
}