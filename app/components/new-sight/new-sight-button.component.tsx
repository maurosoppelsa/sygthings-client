import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
// @ts-ignore
import cameraIcon from '../../assets/camera-a.png';

export default function NewSightButtonComponent({ action, disabled, style }: { action: any, disabled: boolean, style?: any }) {
  return (
    <TouchableOpacity style={[styles.container, disabled && styles.disabledContainer, style]} disabled={disabled} activeOpacity={0.8} onPress={() => { action() }}>
      <Image style={[styles.cameraButton, disabled && styles.disabledCameraButton]} source={cameraIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.maranduGreen,
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 20,
    borderWidth: 10,
    borderColor: colors.maranduGreenShadow2,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  cameraButton: {
    alignSelf: 'center',
  },
  disabledCameraButton: {
    tintColor: 'gray',
  },
});
