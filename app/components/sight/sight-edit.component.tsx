import React, { useState } from "react";
import { StyleSheet, Text, Image, TextInput } from "react-native";
import { Box, Button } from "@react-native-material/core";
import { Picture, Sight } from "../../interfaces/common";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import I18n from '../../../i18n/i18n';
import * as ImagePicker from "react-native-image-picker"
import { MediaType } from "react-native-image-picker";
import { getSightImageUri } from "../../utils/images";

export default function SightEditComponent({ sight, onCancelUpdate, onUpdateSight }: { sight: Sight, onCancelUpdate: any, onUpdateSight: any }) {
    const [animalName, setAnimalName] = useState(sight?.animal);
    const [description, setDescription] = useState(sight?.description);
    const alive = I18n.t('NewSightForm.alive');
    const wounded = I18n.t('NewSightForm.wounded');
    const dead = I18n.t('NewSightForm.dead');
    const [checked, setChecked] = useState(sight?.condition);
    const [picture, setPicture] = useState(sight?.picture);

    const editSight = (sight: Sight) => {
        if (!sight) return;
        const editedSight: Sight = {
            ...sight,
            animal: animalName || sight?.animal,
            description: description || sight?.description,
            condition: checked || sight?.condition,
            picture: picture ?? sight.picture
        };
        onUpdateSight(editedSight);
    }

    const openImageinFileSystem = async () => {
        const options = {
            title: 'Select Sight Picture',
            mediaType: 'photo' as MediaType,
            maxWidth: 300,
            maxHeight: 300,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
       await ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response?.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return;
            } else if (response.assets && response.assets.length > 0) {
                const picture: Picture = {
                    uri: '',
                    width: 0,
                    height: 0,
                };
                picture.uri = response.assets[0].uri ?? '';
                picture.width = response.assets[0].width ?? 0;
                picture.height = response.assets[0].height ?? 0;
                setPicture(picture)
            } else {
                return;
            }
        });
    }

    const isSightUpdated = () => {
        if (animalName !== sight?.animal) return true;
        if (description !== sight?.description) return true;
        if (checked !== sight?.condition) return true;
        if (picture?.uri !== sight?.picture?.uri) return true;
        return false;
    }

    return (
        <Box style={styles.container}>
            <Box style={styles.header}>
                <MaterialCommunityIcons style={styles.icon} name="border-color" size={25} />
                <Text style={styles.title}>{I18n.t('EditSight.title')}</Text>
            </Box>
            <Box style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: picture ? picture.uri : getSightImageUri(sight?.imageId) }} />
                <Button title={I18n.t('EditSight.updatePicture')} style={[styles.button, styles.updatePictureBT]} onPress={() => { openImageinFileSystem() }} />
            </Box>
            <Box>
                <Text style={styles.inputTitle}>{I18n.t('EditSight.animalName')}</Text>
                <TextInput style={styles.sightInputs} value={animalName} onChangeText={(value) => { setAnimalName(value) }} />
                <Text style={styles.inputTitle}>{I18n.t('EditSight.description')}</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={[styles.sightInputs, styles.inputDesc]} value={description}
                    onChangeText={(value) => { setDescription(value) }} />
            </Box>
            <Box>
                <Text style={styles.inputTitle}>{I18n.t('EditSight.condition')}</Text>
                <Box style={styles.radioContainer}>
                    <Text style={styles.radioTitle}>{alive}</Text>
                    <RadioButton
                        value={alive}
                        status={checked === alive ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(alive)}
                    />
                    <Text style={styles.radioTitle}>{wounded}</Text>
                    <RadioButton
                        value={wounded}
                        status={checked === wounded ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(wounded)}
                    />
                    <Text style={styles.radioTitle}>{dead}</Text>
                    <RadioButton
                        value={dead}
                        status={checked === dead ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(dead)}
                    />
                </Box>
            </Box>
            <Box style={styles.actionButtonContainer}>
                <Button title={I18n.t('Common.edit')} style={[styles.button, styles.actionBT]} onPress={() => editSight(sight)} disabled={!animalName || !description || !isSightUpdated()} />
                <Button title={I18n.t('Common.cancel')} style={[styles.button, styles.actionBT]} onPress={() => onCancelUpdate()} />
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        alignSelf: 'center',
        marginTop: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5,
        marginBottom: 5,
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: 5,
    },
    updatePictureBT: {
        width: 300,
        marginTop: 10,
    },
    actionButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    button: {
        borderRadius: 5,
        backgroundColor: colors.syghtingGreen,
        marginTop: 30,
    },
    inputTitle: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    sightInputs: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 5,
    },
    inputDesc: {
        height: 100,
    },
    actionBT: {
        width: 140,
    },
    radioContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 300,
    },
    radioTitle: {
        marginTop: 8,
    },
});