import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Box, Button } from "@react-native-material/core";
import colors from '../../config/colors';
import { Sight } from "../../interfaces/common";

export default function SightComponent({ sight }: { sight: Sight }) {
    return (
        <Box style={styles.container}>
            <Box style={styles.content}>
                <Box>
                    <Box style={styles.animalNameBox}>
                        <Text style={styles.animalName} numberOfLines={1} ellipsizeMode='tail'>{sight?.animal}</Text>
                    </Box>
                    <Image style={styles.animalImage} source={{ uri: sight?.picture?.uri }}></Image>
                </Box>
                <Box style={styles.sightsDescription}>
                    <Box style={styles.sightInfoTitleBox}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.sightInfoTitleText}>Place: {sight?.placeName}</Text>
                        <Text style={styles.sightInfoTitleText}>Condition: {sight?.condition}</Text>
                        <Text style={styles.sightAuthor}>Created by John Doe, 05/02/22 </Text>
                    </Box>
                </Box>
            </Box>
            <Button title={'See this sight'} style={styles.sightBt}></Button>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: colors.white,
    },
    content: {
        flexDirection: 'row',
        maxHeight: 130,
    },
    sightsDescription: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    sightLocation: {
        alignSelf: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 1,
        borderColor: colors.lightGray,
        borderWidth: 2,
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
        alignSelf: "flex-end",
        bottom: 20,
        right: 50,
    },
    sightAuthor: {
        minWidth:150,
        position: 'absolute',
        top: 60,
        fontSize: 12,
        color: colors.gray,
        fontStyle:"italic",
    }
});