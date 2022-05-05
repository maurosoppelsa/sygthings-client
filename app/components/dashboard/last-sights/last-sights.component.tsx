import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Box, Button, Divider } from "@react-native-material/core";
import colors from '../../../config/colors';

export default function LastSights() {
    return (
        <Box style={styles.container}>
            <Box style={styles.content}>
                <Box style={styles.lastImages}>
                    <Image style={styles.sightLocation} source={require("../../../assets/mapita.png")}></Image>
                    <Image style={styles.animalImage} source={require("../../../assets/ciervo.jpg")}></Image>
                </Box>
                <Box style={styles.lastSightsDescription}>
                    <Box style={styles.lastSightInfoTitleBox}>
                        <Text style={styles.lastSightInfoTitleText}>Province:</Text>
                        <Text style={styles.lastSightInfoTitleText}>Animal:</Text>
                        <Text style={styles.lastSightInfoTitleText}>Condition:</Text>
                    </Box>
                    <Box style={styles.lastSightInfoValue}>
                        <Text>Corrientes</Text>
                        <Text>Ciervo de los pantanos</Text>
                        <Text>Alive</Text>
                    </Box>
                </Box>
            </Box>
            <Button title={'See this sight'} style={styles.sightBt}></Button>
            <Divider></Divider>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        padding: 5,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
    },
    lastSightsDescription: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    lastImages: {

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
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: 100,
        position: "absolute",
        top: 70,
        left: 70
    },
    lastSightInfoTitleBox: {
        minWidth: 80
    },
    lastSightInfoTitleText: {
        fontWeight: "bold",
    },
    lastSightInfoValue: {
        minWidth: 200
    },
    sightBt: {
        backgroundColor: colors.syghtingGreen,
        alignSelf: "flex-start",
        bottom:30,
        left:140
    }
});