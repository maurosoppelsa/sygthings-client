import { Box } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, Pressable, View, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewSightFormComponent({ imageUrl, onSubmit, locationInfo }: { imageUrl: { uri: string }, onSubmit: any, locationInfo: string }) {
    const [animalName, onChangeAnimalName] = React.useState("");
    const [checked, setChecked] = React.useState('Alive');
    return (
        <View style={styles.modalForm}>
            <Image source={imageUrl} style={styles.sightImg}></Image>
            <TextInput
                style={styles.animalInput}
                onChangeText={onChangeAnimalName}
                value={animalName}
                placeholder='Animal name'
            />
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Alive</Text>
                <RadioButton
                    value="Alive"
                    status={checked === 'Alive' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Alive')}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Wounded</Text>
                <RadioButton
                    value="Wounded"
                    status={checked === 'Wounded' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Wounded')}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Dead</Text>
                <RadioButton
                    value="Dead"
                    status={checked === 'Dead' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Dead')}
                />
            </Box>
            <Box style={styles.locationLegend}>
                <MaterialCommunityIcons name="map-marker" size={30} style={styles.locationIcon} />
                <Text style={styles.locationTxt}>{locationInfo}</Text>
            </Box>
            <Pressable
                disabled={!animalName}
                style={[styles.buttonSubmit, !animalName ? styles.buttonDisabled : styles.buttonEnabled]}
                onPress={() => onSubmit({ animalName, condition: checked, placeName: locationInfo })}
            >
                <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
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
});