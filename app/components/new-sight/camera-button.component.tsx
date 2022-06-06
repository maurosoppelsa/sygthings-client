import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CameraButtonComponent({ onPressCameraBt, customStyles }: { onPressCameraBt: any, customStyles?: any }) {
    return (
        <TouchableOpacity style={customStyles} activeOpacity={0.8} onPress={() => { onPressCameraBt() }}>
            <Image source={require('../../assets/camera-icon.png')} style={styles.cameraButton} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        width: 80,
        height: 80,
    },
});