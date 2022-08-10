import React from "react";
import { ImageBackground, StyleSheet, Image } from "react-native";
const imageBg = require('../../assets/nature_bg1.jpg');
const imageUri = Image.resolveAssetSource(imageBg).uri;

const BackgroundComponent = (props: any) => {
    return (
        <ImageBackground source={{ uri: (props.imageUrl !== '' && !props.enableDefault) ? props.imageUrl : imageUri }}
            resizeMode="cover" style={styles.image}>
            {props.children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});

export default BackgroundComponent;