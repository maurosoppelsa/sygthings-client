import React from 'react';
import NewSightComponent from './new-sight.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { toggleCamera } from '../../redux/camera-slice';
import { useFocusEffect } from '@react-navigation/native';

export default function NewSight() {
    const closeCamera = () => dispatch(toggleCamera({cameraActive: false}));
    useFocusEffect(
        React.useCallback(() => {
          return () => closeCamera();
        }, [])
      );
    const dispatch = useAppDispatch();
    const isCameraActive = useSelector((state: any) => state.camera.cameraActive);
    const handleCamera = () => {
        dispatch(toggleCamera({cameraActive: true}));
    };

    const takePicture = () => {
      console.log("taking picture");
      dispatch(toggleCamera({cameraActive: false}));
    }

    return(
        <NewSightComponent onPressCameraBt={handleCamera} isCameraActive={isCameraActive} onTakePicture={takePicture}/>
    );
}