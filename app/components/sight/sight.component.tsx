import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Box, Divider, Button } from "@react-native-material/core";
import colors from '../../config/colors';
import { Sight } from "../../interfaces/common";

export default function SightComponent({ sight }: { sight: Sight }) {
    return (
        <Box style={styles.container}>
            <Box style={styles.content}>
                <Box>
                    <Image style={styles.sightLocation} source={require("../../assets/mapita.png")}></Image>
                    <Image style={styles.animalImage} source={{ uri: sight?.picture?.uri }}></Image>
                </Box>
                <Box style={styles.sightsDescription}>
                    <Box style={styles.sightInfoTitleBox}>
                        <Text style={styles.sightInfoTitleText}>Place:</Text>
                        <Text style={styles.sightInfoTitleText}>Animal:</Text>
                        <Text style={styles.sightInfoTitleText}>Condition:</Text>
                    </Box>
                    <Box style={styles.sightInfoValue}>
                        <Text numberOfLines={1} ellipsizeMode='tail'>{sight?.placeName}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>{sight?.animal}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>{sight?.condition}</Text>
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
    sightsDescription: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
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
    sightInfoTitleBox: {
        minWidth: 80
    },
    sightInfoTitleText: {
        fontWeight: "bold",
    },
    sightInfoValue: {
        flex:1
    },
    sightBt: {
        backgroundColor: colors.syghtingGreen,
        alignSelf: "flex-start",
        bottom: 30,
        left: 140
    }
});