import { Box } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { Sight } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { capitalizeText, getCreatedByLegend, isTabletDevice } from '../../utils/common';
import ActionModalComponent from '../common/action-modal.component';
import I18n from '../../../i18n/i18n';
import SightEditComponent from './sight-edit.component';
import { getSightImageUri } from '../../utils/images';
import { ToastAndroid } from 'react-native'
import { BackHandler } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export default function SightDetailsComponent({ sight, onClose, allowDelete = false, onDelete, onUpdate }: { sight: Sight, onClose: any, allowDelete?: boolean, onDelete?: any, onUpdate?: any }) {
    const { name, lastName, occupation } = sight?.user ?? {};
    const [showModal, setShowModal] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);

    useEffect(() => {
        const backHandlerListener = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPress
        );

        return () => backHandlerListener.remove();
    }, []);

    const handleBackButtonPress = () => {
        onClose(); // Call the onClose method provided in props
        return true;  // Returning true indicates that the event has been handled
    };
    
    const updateSight = (sight: Sight) => {
        setShowEdit(false);
        onUpdate(sight);
    }

    const copyCoordinates = () => {
        Clipboard.setString(`${sight?.location.latitude}, ${sight?.location.longitude}`);
        ToastAndroid.show(`${I18n.t('Sight.coordinatesCopied')}`, ToastAndroid.SHORT)
    }

    const renderDetails = () => {
        return (
            <View style={styles.container}>
                <Box style={styles.header}>
                    <TouchableOpacity style={styles.closeBt} onPress={() => { onClose() }}>
                        <MaterialCommunityIcons name="arrow-left" size={ isTabletDevice() ? 60 : 35 } style={styles.headerButton} />
                    </TouchableOpacity>
                    {
                        allowDelete &&
                        <Box style={[styles.touchableActionContainer, styles.actionBt]}>
                            <TouchableOpacity onPress={() => { setShowModal(true) }}>
                                <MaterialCommunityIcons name="trash-can-outline" size={isTabletDevice() ? 46 : 28} style={[styles.headerButton, styles.actionButton]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowEdit(true) }}>
                                <MaterialCommunityIcons name="border-color" size={isTabletDevice() ? 46 : 28} style={[styles.headerButton, styles.actionButton, styles.editBt]} />
                            </TouchableOpacity>
                        </Box>
                    }
                </Box>
                <Image style={styles.sightImage} source={{ uri: getSightImageUri(sight?.imageId) }} />
                <Box style={styles.headerContainer}>
                    <Text style={styles.sightName}>{sight?.animal}</Text>
                    <Box style={styles.locationContainer}>
                        <MaterialCommunityIcons name="map-marker" size={isTabletDevice() ? 30 : 20} style={styles.locationIcon} />
                        <Text style={styles.placeName}>{sight?.placeName}</Text>
                    </Box>
                    <Box>
                        <TouchableOpacity style={[styles.locationContainer, styles.copyCoordinates]} onPress={() => { copyCoordinates() }}>
                            <MaterialCommunityIcons name="content-copy" size={isTabletDevice() ? 30 : 20} style={styles.locationIcon} />
                            <Text style={styles.coordinatesTxt}>{I18n.t('Sight.copyCoordinates')}</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Text style={styles.condition}>{I18n.t('Sight.condition')}: {capitalizeText(sight?.condition)}</Text>
                <Text style={styles.observationTitle}>{I18n.t('Sight.observations')}:</Text>
                    <ScrollView style={styles.descriptionBox}>
                            <Text style={styles.description}>{sight?.description}</Text>
                    </ScrollView>
                <Text style={styles.createdText}>
                    {getCreatedByLegend(name, lastName, occupation, sight?.createdAt)}
                </Text>
                <ActionModalComponent
                    showModal={showModal}
                    actionBtText={I18n.t('Common.delete')}
                    actionCancel={() => setShowModal(false)}
                    actionProceed={() => onDelete()}
                    title={I18n.t('Sight.deleteTitle')}
                    subtitle={I18n.t('Sight.deleteSubtitle')} />
            </View>
        );
    }
    const renderEdit = () => {
        return (
            <Box style={styles.container}>
                <SightEditComponent sight={sight} onUpdateSight={updateSight} onCancelUpdate={() => { setShowEdit(false) }} />
            </Box>
        );
    }
    if (showEdit) {
        return renderEdit();
    }
    else {
        return renderDetails();
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: isTabletDevice() ? 30 : 15,
    },
    headerContainer: {
        marginBottom: isTabletDevice() ? 5 : 2,
        alignItems: 'flex-start',
    },
    sightImage: {
        width: '100%',
        height: isTabletDevice() ? '60%' : '50%',
        borderRadius: 10,
    },
    sightName: {
        marginTop: isTabletDevice() ? 10 : 5,
        color: colors.maranduGreen,
        textTransform: 'capitalize',
        fontSize: isTabletDevice() ? 25 : 16,
        fontWeight: 'bold',
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: isTabletDevice() ? 10 : 5,
        marginBottom: isTabletDevice() ? 3 : 1,
    },
    copyCoordinates: {
        marginLeft: isTabletDevice() ? 10 : 5,
    },
    locationIcon: {
        color: colors.maranduGreen,
        marginRight: isTabletDevice() ? 10 : 5,
    },
    description: {
        ...(isTabletDevice() && { fontSize: 18 }),
    },
    createdText: {
        marginTop: isTabletDevice() ? 10 : 5,
        alignSelf: 'flex-end',
        color: colors.darkGray,
        ...(isTabletDevice() && { fontSize: 16, color: colors.darkGray }),
    },
    touchableActionContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: isTabletDevice() ? 20 : 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerButton: {
        color: colors.maranduGreen,
    },
    actionButton: {
        paddingVertical: isTabletDevice() ? 10 : 5,
    },
    descriptionBox: {
        backgroundColor: colors.maranduGreenShadow,
        borderRadius: 5,
        padding: isTabletDevice() ? 15 : 10,
        maxHeight: isTabletDevice() ? 140 : 70,
    },
    observationTitle: {
        marginTop: isTabletDevice() ? 10 : 5,
        marginBottom: isTabletDevice() ? 20 : 10,
        ...(isTabletDevice() && { fontSize: 18 }),
    },
    closeBt: {
        alignSelf: 'flex-start',
    },
    actionBt: {
        alignSelf: 'flex-end',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editBt: {
        marginLeft: isTabletDevice() ? 20 : 10,
        marginTop: isTabletDevice() ? 14 : 7,
    },
    placeName: {
        ...(isTabletDevice() && { fontSize: 20 }),
    },
    coordinatesTxt: {
        ...(isTabletDevice() && { fontSize: 18 }),
    },
    condition: {
        ...(isTabletDevice() && { fontSize: 18, marginTop: 5 }),
    }
});