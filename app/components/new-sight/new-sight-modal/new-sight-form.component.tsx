import { Box } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, Pressable, View, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../../../i18n/i18n';
import { isTabletDevice } from "../../../utils/common";

export default function NewSightFormComponent({ imageUrl, onSubmit, locationInfo, onClose }: { imageUrl: { uri: string }, onSubmit: any, locationInfo: string, onClose: any }) {
    const [animalName, onChangeAnimalName] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const alive = I18n.t('NewSightForm.alive');
    const wounded = I18n.t('NewSightForm.wounded');
    const dead = I18n.t('NewSightForm.dead');
    const [checked, setChecked] = React.useState(alive);
    return (
        <View style={styles.modalForm}>
            <Image source={imageUrl} style={styles.sightImg}></Image>
            <Box style={styles.animalFieldsContainer}>
                <TextInput
                    style={styles.animalInput}
                    onChangeText={onChangeAnimalName}
                    value={animalName}
                    placeholder={I18n.t('NewSightForm.animalName')}
                />
                <TextInput
                    style={styles.animalInput}
                    onChangeText={onChangeDescription}
                    value={description}
                    placeholder={I18n.t('NewSightForm.description')}
                />
                <Box style={styles.conditionBox}>
                <Box style={styles.radioContainer}>
                    <RadioButton
                        color={colors.maranduGreen}
                        value={alive}
                        status={checked === alive ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(alive)}
                    />
                    <Text style={styles.radioTitle}>{alive}</Text>
                </Box>
                <Box style={styles.radioContainer}>
                    <RadioButton
                        color={colors.maranduGreen}
                        value={wounded}
                        status={checked === wounded ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(wounded)}
                    />
                    <Text style={styles.radioTitle}>{wounded}</Text>
                </Box>
                <Box style={styles.radioContainer}>
                    <RadioButton
                        color={colors.maranduGreen}
                        value={dead}
                        status={checked === dead ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(dead)}
                    />
                    <Text style={styles.radioTitle}>{dead}</Text>
                </Box>
                </Box>
            </Box>
            <Box style={styles.locationLegend}>
                <MaterialCommunityIcons name="map-marker" size={isTabletDevice() ? 40 : 30} style={styles.locationIcon} />
                <Text style={styles.locationTxt}>{locationInfo}</Text>
            </Box>
            <Box style={styles.buttonContainer}>
                <Pressable
                    disabled={!animalName || !description}
                    style={[styles.buttonSubmit, (!animalName || !description) ? styles.buttonDisabled : styles.buttonEnabled]}
                    onPress={() => onSubmit({ animalName, description, condition: checked, placeName: locationInfo })}
                >
                    <Text style={styles.textStyle}>{I18n.t('NewSightForm.button')}</Text>
                </Pressable>
                <Pressable
                    style={[styles.buttonSubmit, styles.buttonEnabled]}
                    onPress={() => { onClose() }}
                >
                    <Text style={styles.textStyle}>{I18n.t('NewSightForm.cancel')}</Text>
                </Pressable>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    modalForm: {
        width: '95%',
        marginTop: 5,
        backgroundColor: colors.white,
        padding: 20,
        alignItems: "flex-start",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonSubmit: {
        borderRadius: 5,
        padding: 10,
        minWidth: isTabletDevice() ? 200 : 120,
        ...(isTabletDevice() && { minHeight: 50}),
        elevation: 2,
        alignSelf: "center",
        margin: 10,
    },
    buttonDisabled: {
        backgroundColor: colors.lightGray,
    },
    buttonEnabled: {
        backgroundColor: colors.maranduGreen,
    },
    textStyle: {
        color: colors.maranduYellow,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        ...(isTabletDevice() && { fontSize: 18}),
    },
    sightImg: {
        width: '100%',
        minHeight: isTabletDevice() ? 400 : 200,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
    },
    animalFieldsContainer: {
        alignSelf: "center",
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.maranduGreenShadow,
        paddingLeft: isTabletDevice() ? 40 : 20,
        paddingRight: isTabletDevice() ? 40 : 20,
        paddingTop: isTabletDevice() ? 20 : 10,
        paddingBottom: isTabletDevice() ? 20 : 10,
        marginTop: 20,
    },
    animalInput: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        marginTop: 12,
        marginBottom: 10,
        borderColor: colors.maranduGreenShadow,
        borderRadius: 5,
        ...(isTabletDevice() && { fontSize: 18}),
    },
    radioContainer: {
        flexDirection: "row",
    },
    radioTitle: {
        marginTop: 7,
        marginLeft: 4,
        color: colors.maranduGreen,
        fontSize: 16,
        textTransform: "capitalize",
        fontWeight: "bold",
    },
    locationTxt: {
        fontSize: isTabletDevice() ? 22 : 18,
        marginTop: 5,
        marginRight: 5,
        color: colors.darkGray,
        maxWidth: isTabletDevice() ? '100%' :'85%',
    },
    locationLegend: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 15,
        paddingTop: 10,
        paddingBottom: 15,
        width: '100%',
        ...(isTabletDevice() && { minHeight: 70}),
        backgroundColor: colors.maranduGreenShadow2,
        borderRadius: 10,
    },
    locationIcon: {
        color: colors.maranduGreen,
        marginTop: 5,
        marginLeft: isTabletDevice() ? 10 : 5,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
    },
    conditionBox: {
        flexDirection: "row",
    }
});