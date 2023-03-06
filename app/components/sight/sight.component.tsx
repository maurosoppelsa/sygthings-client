import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Box, Button } from "@react-native-material/core";
import colors from '../../config/colors';
import { Sight } from "../../interfaces/common";
import I18n from '../../../i18n/i18n';

export default function SightComponent({ sight, getDetails }: { sight: Sight, getDetails: any }) {
    return (
        <Box style={styles.container}>
                <Box style={styles.leftContent}>
                    <Box style={styles.animalNameBox}>
                        <Text style={styles.animalName} numberOfLines={1} ellipsizeMode='tail'>{sight?.animal}</Text>
                    </Box>
                    <Image style={styles.animalImage} source={{ uri: sight?.picture?.uri }}></Image>
                </Box>
                <Box style={styles.rightContent}>
                    <Box style={styles.sightInfoTitleBox}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.sightInfoTitleText}>{I18n.t('Sight.placeName')}: <Text>{sight?.placeName}</Text></Text>
                        <Text style={styles.sightInfoTitleText}>{I18n.t('Sight.condition')}: {sight?.condition}</Text>
                        <Text style={styles.sightAuthor}>Created by John Doe, 05/02/22 </Text>
                    </Box>
                    <Button title={I18n.t('Sight.button')} style={styles.sightBt} onPress={() => getDetails(sight)}></Button>
                </Box>
            </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
        backgroundColor: colors.white,
    },
    content: {
        flexDirection: 'row',
    },
    leftContent: {
        width: '40%',
    },
    rightContent: {
        width: '50%',
        paddingLeft: 20,
        alignSelf: "center"
    },
    animalImage: {
        width: 150,
        height: 150,
        zIndex: 0,
    },
    animalNameBox: {
        position: "absolute",
        minHeight: 30,
        top:120,
        width: 150,
        zIndex: 1,
        backgroundColor: colors.black,
        opacity: 0.7,
    },
    animalName: {
      position: "absolute",
      top: 5,
      alignSelf: "center",
      color: colors.white, 
      zIndex: 2, 
      fontWeight: "bold",
    },
    sightInfoTitleBox: {
        minWidth: 70
    },
    sightInfoTitleText: {
        fontWeight: "100",
        lineHeight: 25,
    },
    sightInfoValue: {
        flex:1,
    },
    sightInfoValueText: {
        fontWeight: "600",
        lineHeight: 19,
        fontSize: 13,
        color: colors.black
    },
    sightBt: {
        backgroundColor: colors.syghtingGreen,
        alignSelf: "flex-start",
        marginTop: 20,
    },
    sightAuthor: {
        fontSize: 12,
        color: colors.gray,
        fontStyle:"italic",
        marginTop: 10,
    }
});