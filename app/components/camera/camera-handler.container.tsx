import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButtonComponent from './camera-button.component';
import { Picture } from '../../interfaces/common';
import colors from '../../config/colors';
import { Box } from '@react-native-material/core';
import { toggleCamera, newPicture } from '../../redux/camera-slice';
import { useAppDispatch } from '../../redux/store';
import { useFocusEffect } from '@react-navigation/native';
import I18n from '../../../i18n/i18n';
import LoadingSpinnerComponent from '../common/loading-spiner.component';

export default function CameraHandler({onTakePicture}:{onTakePicture: any}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType] = useState(Camera.Constants.Type.back);
  const [loadingPicture, setLoadingPicture] = useState(false);
  const dispatch = useAppDispatch();
  const closeCamera = () => dispatch(toggleCamera({ cameraActive: false }));

  const camera = useRef(null);
  const options = { quality: 0.5 };

  useFocusEffect(
    React.useCallback(() => {
      return () => closeCamera();
    }, [])
  );

  useEffect(() => {
    (async () => {
      const grantedPermisions = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera permisions",
          message:
            "to create a new sight we need to access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      setHasPermission(grantedPermisions === 'granted');
    })();
  }, []);

  const takePicture = async (camera: any) => {
    try {
      setLoadingPicture(true);
      /*     await camera.current.pausePreview(); 
          await camera.current.resumePreview(); */
      const picture: Picture = await camera.current.takePictureAsync(options);
      const pictureTaked = {
        with: picture?.width,
        height: picture?.height,
        uri: picture?.uri,
      }
      dispatch(newPicture(pictureTaked));
      onTakePicture();
    } catch (err) {
      /**
       * should handle error on camera here... 
       */
      console.log(err);
    };
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>{I18n.t('Camera.noAccessCamera')}</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={camera}>
        {loadingPicture &&
          <Box style={styles.loadingBox}>
            <Box style={styles.loadingContent}>
              <LoadingSpinnerComponent/>
            </Box>
          </Box>}
        <View style={styles.buttonContainer}>
          <CameraButtonComponent customStyles={styles.cameraBt} onPressCameraBt={async () => { takePicture(camera) }} disable={loadingPicture} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  cameraBt: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  loadingBox: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLeyend: {
    color: colors.gray,
    fontSize: 25,
  },
});
