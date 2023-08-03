import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CameraButtonComponent({ onPressCameraBt, customStyles, disable }: { onPressCameraBt: any, customStyles?: any, disable: boolean }) {
    return (
        <TouchableOpacity disabled={disable} style={customStyles} activeOpacity={0.8} onPress={() => { onPressCameraBt() }}>
            {!disable && <Image source={require('../../assets/camera-icon.png')} style={styles.cameraButton} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        width: 100,
        height: 100,
    },
});