import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CameraButtonComponent({ onPressCameraBt, customStyles, disable }: { onPressCameraBt: any, customStyles?: any, disable: boolean }) {
    return (
        <TouchableOpacity disabled={disable} style={customStyles} activeOpacity={0.8} onPress={() => { onPressCameraBt() }}>
            {!disable && <MaterialCommunityIcons name="camera" size={70} style={styles.cameraButton} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cameraButton: {
        width: 100,
        height: 100,
        color: 'white',
    },
});