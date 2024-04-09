import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Image, TextInput, View, ScrollView } from "react-native";
import { Box } from "@react-native-material/core";
import { Picture, Sight } from "../../interfaces/common";
import colors from "../../config/colors";
import { Button, RadioButton } from 'react-native-paper';
import I18n from '../../../i18n/i18n';
import * as ImagePicker from "react-native-image-picker"
import { MediaType } from "react-native-image-picker";
import { getSightImageUri } from "../../utils/images";
import { isTabletDevice } from "../../utils/common";

export default function SightEditComponent({ sight, onCancelUpdate, onUpdateSight }: { sight: Sight, onCancelUpdate: any, onUpdateSight: any }) {
    const [animalName, setAnimalName] = useState(sight?.animal);
    const [description, setDescription] = useState(sight?.description);
    const alive = I18n.t('NewSightForm.alive');
    const wounded = I18n.t('NewSightForm.wounded');
    const dead = I18n.t('NewSightForm.dead');
    const [checked, setChecked] = useState(sight?.condition);
    const [picture, setPicture] = useState(sight?.picture);
    const [imageSource, setImageSource] = useState(getSightImageUri(sight?.imageId));
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const updatedImageSource = picture ? picture.uri : getSightImageUri(sight?.imageId);
        setImageSource(updatedImageSource);
    }, [sight, picture]);


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
        <ScrollView ref={scrollViewRef}>
            <View style={styles.container}>
                <Box style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: imageSource }} />
                    <Button labelStyle={styles.buttonText} color={colors.maranduYellow} style={[styles.button, styles.updatePictureBT]} onPress={() => { openImageinFileSystem() }}>{I18n.t('EditSight.updatePicture')}</Button>
                </Box>
                <Box>
                    <Text style={styles.inputTitle}>{I18n.t('EditSight.specie')}</Text>
                    <TextInput style={styles.sightInputs} value={animalName} onChangeText={(value) => { setAnimalName(value) }} />
                    <Text style={styles.inputTitle}>{I18n.t('EditSight.observations')}</Text>
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
                            color={colors.maranduGreen}
                            value={alive}
                            status={checked === alive ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(alive)}
                        />
                        <Text style={styles.radioTitle}>{wounded}</Text>
                        <RadioButton
                            color={colors.maranduGreen}
                            value={wounded}
                            status={checked === wounded ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(wounded)}
                        />
                        <Text style={styles.radioTitle}>{dead}</Text>
                        <RadioButton
                            color={colors.maranduGreen}
                            value={dead}
                            status={checked === dead ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(dead)}
                        />
                    </Box>
                </Box>
                <Box style={styles.actionButtonContainer}>
                    <Button labelStyle={styles.buttonText} color={colors.maranduYellow} style={[styles.button, styles.actionBT]} onPress={() => editSight(sight)} disabled={!animalName || !description || !isSightUpdated()}>{I18n.t('Common.edit')}</Button>
                    <Button labelStyle={styles.buttonText} color={colors.maranduYellow} style={[styles.button, styles.actionBT]} onPress={() => onCancelUpdate()}>{I18n.t('Common.cancel')}</Button>
                </Box>
            </View>
        </ScrollView>
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
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
    },
    image: {
        width: isTabletDevice() ? 500 : 300,
        height: isTabletDevice() ? 500 : 300,
        borderWidth: 2,
        borderRadius: 10,
    },
    updatePictureBT: {
        width: isTabletDevice() ? 500 : 300,
        marginTop: 10,
    },
    actionButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: isTabletDevice() ? 500 : 300,
        marginBottom: 20,
    },
    button: {
        borderRadius: 5,
        backgroundColor: colors.maranduGreen,
        marginTop: 30,
    },
    inputTitle: {
        color: colors.darkGray,
        marginTop: 10,
        ...(isTabletDevice() && { fontSize: 18}),
    },
    sightInputs: {
        width: isTabletDevice() ? 500 : 300,
        height: 40,
        borderColor: colors.maranduGreenShadow2,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        padding: 5,
        ...(isTabletDevice() && { fontSize: 18}),
    },
    inputDesc: {
        height: 100,
    },
    actionBT: {
        width: isTabletDevice() ? 200 : 140,
    },
    radioContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: isTabletDevice() ? 500 : 300,
    },
    radioTitle: {
        marginTop: 8,
        color: colors.maranduGreen,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        ...(isTabletDevice() && { fontSize: 18}),
    },
    buttonText: {
        ...(isTabletDevice() && { fontSize: 18}),
    },
});