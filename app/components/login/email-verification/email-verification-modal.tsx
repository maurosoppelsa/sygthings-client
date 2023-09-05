import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Box } from '@react-native-material/core';
import colors from '../../../config/colors';
import { Button } from 'react-native-paper';
import I18n from '../../../../i18n/i18n';

export default function EmailVerificationModal({showModal, actionBt, success} : {showModal: boolean, actionBt: any, success: boolean}) {
    const [title, setTitle] = React.useState('');
    
    useEffect(() => {
        if(success) {
            setTitle(I18n.t('Login.NewUser.verifyEmail.verificationCode.verifyModalSuccess'));
        } else {
            setTitle(I18n.t('Login.NewUser.verifyEmail.verificationCode.verifyModalFail'));
        }
    }, [success]);
    
    const ModalContent = () => {
        return (
            <Box style={styles.modalContainer}>
                <Box>
                    <Box>
                        <Text style={styles.title}>{title}</Text>
                    </Box>
                    <Box>
                        <Button style={styles.modalBt} mode="contained" onPress={() => actionBt()}>Ok</Button>
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
        padding: 25,
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
    title: {
        fontSize: 20,
        alignContent: "center",
        textAlign: "center",
    },
    modalBt: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10,
        width: 100,
        backgroundColor: colors.syghtingDarkGreen,
    }
});