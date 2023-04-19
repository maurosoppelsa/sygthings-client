import { Box } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, Pressable, View, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../../../i18n/i18n';

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
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>{alive}</Text>
                <RadioButton
                    value={alive}
                    status={checked === alive ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(alive)}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>{wounded}</Text>
                <RadioButton
                    value={wounded}
                    status={checked === wounded ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(wounded)}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>{dead}</Text>
                <RadioButton
                    value={dead}
                    status={checked === dead ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(dead)}
                />
            </Box>
            <Box style={styles.locationLegend}>
                <MaterialCommunityIcons name="map-marker" size={30} style={styles.locationIcon} />
                <Text style={styles.locationTxt}>{locationInfo}</Text>
            </Box>
            <Box style={styles.buttonContainer}>
                <Pressable
                    disabled={!animalName}
                    style={[styles.buttonSubmit, !animalName ? styles.buttonDisabled : styles.buttonEnabled]}
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
        width: '90%',
        backgroundColor: colors.white,
        padding: 25,
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
        minWidth: 120,
        elevation: 2,
        alignSelf: "center",
        margin: 10,

    },
    buttonDisabled: {
        backgroundColor: colors.lightGray,
    },
    buttonEnabled: {
        backgroundColor: colors.syghtingGreen,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    sightImg: {
        width: '100%',
        minHeight: 200,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 2,
    },
    animalInput: {
        height: 40,
        width: 200,
        borderWidth: 1,
        padding: 10,
        marginTop: 12,
        marginBottom: 10,
        borderColor: colors.lightGray,
        borderRadius: 5,
    },
    radioContainer: {
        flexDirection: "row",
    },
    radioTitle: {
        marginTop: 8,
    },
    locationTxt: {
        marginTop: 10,
        marginBottom: 20,
    },
    locationLegend: {
        flexDirection: "row",
    },
    locationIcon: {
        color: 'red',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
    }
});