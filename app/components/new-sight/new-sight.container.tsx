import React, { useState } from 'react';
import NewSightComponent from './new-sight.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { toggleCamera, newPicture } from '../../redux/camera-slice';
import { useFocusEffect } from '@react-navigation/native';
import { Picture } from '../../interfaces/common';

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
  const [showModal, setModalVisible] = useState(false);
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
    setModalVisible(true);
  }

  return (
    <NewSightComponent onPressCameraBt={handleCamera}
      isCameraActive={isCameraActive} onTakePicture={(picture: Picture) => { takePicture(picture) }} newPicture={picture} showModal={showModal}/>
  );
}