import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { Box } from "@react-native-material/core";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '../../../../i18n/i18n';

const UploadImageOptionModal = ({ showModal, onSelectCamera, onSelectGallery, onClose }: { onSelectCamera: any, onSelectGallery: any, showModal: boolean, onClose: any }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <Box style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.closeBt} onPress={() => onClose()}>
                            <MaterialCommunityIcons color={colors.maranduGreen} name="close-circle" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => onSelectGallery()}>
                            <MaterialCommunityIcons style={styles.icon} name="image-plus" size={60} />
                            <Text style={styles.textOptions}>{I18n.t('NewSightForm.uploadImageModal.uploadFromGallery')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => onSelectCamera()}>
                            <MaterialCommunityIcons style={styles.icon} name="camera" size={60} />
                            <Text style={styles.textOptions}>{I18n.t('NewSightForm.uploadImageModal.takePicture')}</Text>
                        </TouchableOpacity>
                    </Box>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    icon: {
        color: colors.maranduGreen,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.maranduGreenShadow,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeBt: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
    textOptions: {
        color: colors.darkGray,
        fontSize: 16,
    },
});

export default UploadImageOptionModal;