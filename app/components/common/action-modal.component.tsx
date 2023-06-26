import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Box } from '@react-native-material/core';
import colors from '../../config/colors';
import { Button } from 'react-native-paper';
import I18n from '../../../i18n/i18n';

export default function ActionModalComponent({ title, subtitle, actionBtText, cancelBtText = I18n.t('Common.cancel'), showModal, actionCancel, actionProceed }: { title: string, subtitle: string, actionBtText: string, showModal: boolean, actionCancel: any, cancelBtText?: string, actionProceed: any }) {
    const ModalContent = () => {
        return (
            <Box style={styles.modalContainer}>
                <Box>
                    <Box style={styles.deleteTextContainer}>
                        <Text>{title}</Text>
                        <Text>{subtitle}</Text>
                    </Box>
                    <Box style={styles.deleteButtonsContainer}>
                        <Button style={styles.deleteBt} mode="contained" onPress={() => actionProceed()}>{actionBtText}</Button>
                        <Button style={styles.deleteBt} mode="contained" onPress={() => actionCancel()}>{cancelBtText}</Button>
                    </Box>
                </Box>
            </Box>
        );
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
        >
            <View style={styles.centeredView}>
                <ModalContent />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    deleteTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    deleteBt: {
        borderRadius: 5,
        backgroundColor: colors.syghtingGreen,
    }
});