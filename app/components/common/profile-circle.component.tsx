import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import colors from '../../config/colors';
import { getInitials } from '../../utils/common';

function ProfileCircleContent(props: any) {
    if (props.imageUrl) {
        return (<Image style={props.style.profileImage} source={{uri: props.imageUrl}}></Image>);
    } else {
        return (<Text style={props.style.initials}>{getInitials(props.fullname || '')}</Text>);
    }
}

export default function PersonCircleComponent({ fullname = '', image = '' }: { fullname?: string, image?: string }) {

    return (
        <Box style={styles.container}>
            <ProfileCircleContent fullname={fullname} imageUrl={image} style={styles}/>
        </Box>
    );
}

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.lightGray,
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    initials: {
        paddingTop: 7,
        letterSpacing: 2,
        fontSize: 20,
        fontWeight: '600',
    },
    profileImage: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 100,
    }
});