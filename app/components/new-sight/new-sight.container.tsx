import React, { useState } from 'react';
import NewSightComponent from './new-sight.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { toggleCamera, newPicture } from '../../redux/camera-slice';
import { toggleSightModal } from '../../redux/new-sight-slice';
import { useFocusEffect } from '@react-navigation/native';
import { Picture } from '../../interfaces/common';
import { createSight } from '../../redux/new-sight-slice';

export default function NewSight() {
  const closeCamera = () => dispatch(toggleCamera({ cameraActive: false }));
  useFocusEffect(
    React.useCallback(() => {
      return () => closeCamera();
    }, [])
  );
  const dispatch = useAppDispatch();
  const isCameraActive = useSelector((state: any) => state.camera.cameraActive);
  const picture = useSelector((state: any) => state.camera.picture);
  const showSightModal = useSelector((state: any) => state.newSight.showSightModal);
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
    dispatch(toggleSightModal());
  }

  const onSightSubmit = () => {
    dispatch(createSight({newSight: null}));
  }

  return (
    <NewSightComponent onPressCameraBt={handleCamera}
      isCameraActive={isCameraActive} onTakePicture={(picture: Picture) => { takePicture(picture) }}
      newPicture={picture} newSightStatus='new' showModal={showSightModal} onSightSubmit={onSightSubmit} />
  );
}