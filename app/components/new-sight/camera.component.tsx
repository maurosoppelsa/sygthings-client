import React, { useState, useEffect, RefObject, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButtonComponent from './camera-button.component';
import { Picture } from '../../interfaces/common';
import colors from '../../config/colors';
import { Box } from '@react-native-material/core';

export default function CameraComponent({ onTakePicture }: { onTakePicture: any }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType] = useState(Camera.Constants.Type.back);
  const [loadingPicture, setLoadingPicture] = useState(false);

  const camera = useRef(null);
  const options = { quality: 0.5 };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async (camera: any) => {
    try {
      setLoadingPicture(true);
      /*     await camera.current.pausePreview(); 
          await camera.current.resumePreview(); */
          const picture: Picture = await camera.current.takePictureAsync(options);
          onTakePicture(picture);
    } catch(err){
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
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={camera}>
        {loadingPicture &&
          <Box style={styles.loadingBox}>
            <Box style={styles.loadingContent}>
              <Text style={styles.loadingLeyend}>Loading Picture please wait</Text>
              <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />
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
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 20,
  },
  loadingBox: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContent: {
    flexDirection: 'column',
  },
  loadingLeyend: {
    color: colors.gray,
    fontSize: 25,
  },
});
