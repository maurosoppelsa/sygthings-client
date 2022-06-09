import { Box } from "@react-native-material/core";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import colors from "../../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NewSightModalComponent = ({ showModal, imageUrl }: { showModal: boolean, imageUrl: string }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [animalTxt, onChangeAnimalTxt] = React.useState("");
  const [checked, setChecked] = React.useState('first');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible && showModal}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{ uri: imageUrl }} style={styles.sightImg}></Image>
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
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
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
    width: 200,
    height: 200,
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

export default NewSightModalComponent;