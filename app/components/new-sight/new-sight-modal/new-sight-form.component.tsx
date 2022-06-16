import { Box } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, Pressable, View, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewSightFormComponent({ imageUrl, onSubmit }: { imageUrl: { uri: string }, onSubmit: any }) {
    const [animalTxt, onChangeAnimalTxt] = React.useState("");
    const [checked, setChecked] = React.useState('first');
    return (
        <View style={styles.modalForm}>
            <Image source={imageUrl} style={styles.sightImg}></Image>
            <TextInput
                style={styles.animalInput}
                onChangeText={onChangeAnimalTxt}
                value={animalTxt}
                placeholder='Animal name'
            />
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Alive</Text>
                <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Wounded</Text>
                <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                />
            </Box>
            <Box style={styles.radioContainer}>
                <Text style={styles.radioTitle}>Dead</Text>
                <RadioButton
                    value="third"
                    status={checked === 'third' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('third')}
                />
            </Box>
            <Box style={styles.locationLegend}>
                <MaterialCommunityIcons name="map-marker" size={30} style={styles.locationIcon} />
                <Text style={styles.locationTxt}>Esteros de Iberá, Corrientes</Text>
            </Box>
            <Pressable
                style={styles.buttonSubmit}
                onPress={() => onSubmit()}
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
        borderRadius: 5,
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
        backgroundColor: colors.syghtingGreen
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