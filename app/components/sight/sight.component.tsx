import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Box } from "@react-native-material/core";
import { Button } from "react-native-paper"
import colors from '../../config/colors';
import { Sight } from "../../interfaces/common";
import I18n from '../../../i18n/i18n';
import { getCreatedByLegend, isTabletDevice } from '../../utils/common';
import LinearGradient from 'react-native-linear-gradient';

export default function SightComponent({ sight, getDetails }: { sight: Sight, getDetails: any }) {
    const { name, lastName } = sight?.user ?? {};
    return (
        <Box style={styles.container}>
            <Box style={styles.sightBox}>
                <LinearGradient
                    colors={[colors.maranduGreen, colors.white]}
                    style={styles.gradient}
                />
                <Box style={styles.leftContent}>
                    <Box style={styles.imageSightBox}>
                        <Image style={styles.footprintIcon} source={require('../../assets/footprint.png')}></Image>
                        <Box style={styles.animalNameBox}>
                            <Text style={styles.animalName} numberOfLines={1} ellipsizeMode='tail'>{sight?.animal}</Text>
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.rightContent}>
                    <Box style={styles.sightInfoTitleBox}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.sightInfoTitleText}>{I18n.t('Sight.placeName')}: <Text>{sight?.placeName}</Text></Text>
                        <Text style={styles.sightInfoTitleText}>{I18n.t('Sight.condition')}: {sight?.condition}</Text>
                        <Text style={styles.sightAuthor}>
                            {getCreatedByLegend(name, lastName, '', sight?.createdAt)}
                        </Text>
                    </Box>
                    <Button style={styles.sightBt} labelStyle={styles.buttonLabel} onPress={() => getDetails(sight)} color={colors.maranduYellow}>{I18n.t('Sight.button')}</Button>
                </Box>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: colors.white,
    },
    sightBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        borderTopWidth: 4,
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderRadius: 10,
        borderColor: colors.maranduGreen,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 5,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },
    leftContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: isTabletDevice() ? '30%' : '45%',
        marginTop: 15,
    },
    imageSightBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderColor: colors.maranduGreenShadow,
        height: isTabletDevice() ? 200 : 150,
        width: isTabletDevice() ? 180 : 130,
    },
    rightContent: {
        width: isTabletDevice() ? '70%' : '50%',
        paddingLeft: 20,
        alignSelf: "center",
        marginTop: 30,
    },
    footprintIcon: {
        width: isTabletDevice() ? 85 : 50,
        height: isTabletDevice() ? 85 : 50,
        zIndex: 0,
        alignSelf: "center",
        top: 10,
    },
    animalNameBox: {
        alignSelf: "center",
        textAlign: "center",
        width: 130,
        height: 30,
        opacity: 0.7,
        top: 33,
        overflow: "hidden",
        backgroundColor: colors.maranduGreenShadow,
    },
    animalName: {
        position: "absolute",
        top: isTabletDevice() ? 1 : 5,
        alignSelf: "center",
        color: colors.darkGray,
        zIndex: 2,
        textTransform: "capitalize",
        fontSize: isTabletDevice() ? 20 : 16,
    },
    sightInfoTitleBox: {
        minWidth: 70
    },
    sightInfoTitleText: {
        lineHeight: 25,
        color: colors.darkGray,
        fontSize: isTabletDevice() ? 20 : 16,
    },
    sightInfoValue: {
        flex: 1,
    },
    sightBt: {
        backgroundColor: colors.maranduGreen,
        alignSelf: "flex-start",
        marginTop: isTabletDevice() ? 30 : 20,
        marginBottom: 20,
        ...(isTabletDevice() && { width: 140, height: 50, padding: 2 })
    },
    buttonLabel: {
        // Define your font size here
        fontSize: isTabletDevice() ? 18 : 14, // Example sizes
    },
    sightAuthor: {
        fontSize: isTabletDevice() ? 16 : 14,
        color: colors.darkGray,
        marginTop: isTabletDevice() ? 20 : 10,
    }
});