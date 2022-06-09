import React, { useState, useEffect, RefObject, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButtonComponent from './camera-button.component';
import { Picture } from '../../interfaces/common';

export default function CameraComponent({onTakePicture}: {onTakePicture: any}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType] = useState(Camera.Constants.Type.back);

  const camera = useRef(null);
  const options = {quality: 0.5};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async (camera: any) => {
    const picture: Picture = await camera.current.takePictureAsync(options);
    onTakePicture(picture);
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
        <View style={styles.buttonContainer}>
          <CameraButtonComponent customStyles={styles.cameraBt} onPressCameraBt={async () => { takePicture(camera)}} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    flexDirection: 'row'
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
});
