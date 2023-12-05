import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { Sight } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { capitalizeText, getCreatedByLegend } from '../../utils/common';
import ActionModalComponent from '../common/action-modal.component';
import I18n from '../../../i18n/i18n';
import SightEditComponent from './sight-edit.component';
import { getSightImageUri } from '../../utils/images';


export default function SightDetailsComponent({ sight, onClose, allowDelete = false, onDelete, onUpdate }: { sight: Sight, onClose: any, allowDelete?: boolean, onDelete?: any, onUpdate?: any }) {
    const { name, lastName, occupation } = sight?.user ?? {};
    const [showModal, setShowModal] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);

    const updateSight = (sight: Sight) => {
        setShowEdit(false);
        onUpdate(sight);
    }

    const renderDetails = () => {
        return (
            <View style={styles.container}>
                <Box style={styles.header}>
                <TouchableOpacity style={styles.closeBt} onPress={() => { onClose() }}>
                    <MaterialCommunityIcons name="arrow-left" size={40} style={styles.headerButton} />
                </TouchableOpacity>
                {
                    allowDelete &&
                    <Box style={[styles.touchableActionContainer, styles.actionBt]}>
                        <TouchableOpacity onPress={() => { setShowModal(true) }}>
                            <MaterialCommunityIcons name="trash-can-outline" size={28} style={[styles.headerButton, styles.actionButton]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setShowEdit(true) }}>
                            <MaterialCommunityIcons name="border-color" size={28} style={[styles.headerButton, styles.actionButton, styles.editBt]} />
                        </TouchableOpacity>
                    </Box>
                }
                </Box>
                <Image style={styles.sightImage} source={{ uri: getSightImageUri(sight?.imageId) }} />
                <Box style={styles.headerContainer}>
                    <Text style={styles.sightName}>{sight?.animal}</Text>
                    <Box style={styles.locationContainer}>
                        <MaterialCommunityIcons name="map-marker" size={22} style={styles.locationIcon} />
                        <Text>{sight?.placeName}</Text>
                    </Box>
                </Box>
                <Text>{I18n.t('Sight.condition')}: {capitalizeText(sight?.condition)}</Text>
                <Text style={styles.observationTitle}>{I18n.t('Sight.observations')}:</Text>
                <ScrollView>
                    <Box style={styles.descriptionBox}>
                        <View>
                            <Text style={styles.description}>{sight?.description}</Text>
                        </View>
                    </Box>
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
        padding: 15,
    },
    headerContainer: {
        marginBottom: 2,
        alignItems: 'flex-start',
    },
    sightImage: {
        width: '100%',
        height: '50%',
        borderRadius: 10,
    },
    sightName: {
        marginTop: 5,
        color: colors.maranduGreen,
        textTransform: 'capitalize',
        fontSize: 30,
        fontWeight: 'bold',
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    locationIcon: {
        color: colors.maranduGreen,
        marginRight: 5,
    },
    description: {
        fontSize: 12,
        lineHeight: 20
    },
    createdText: {
        marginTop: 5,
        fontSize: 12,
        alignSelf: 'flex-end',
        color: colors.darkGray,
    },
    touchableActionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerButton: {
        color: colors.maranduGreen,
    },
    actionButton: {
        paddingVertical: 5,
    },
    descriptionBox: {
        backgroundColor: colors.maranduGreenShadow,
        borderRadius: 5,
        padding: 10
    },
    observationTitle: {
        marginTop: 5,
        marginBottom: 10,
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
        marginLeft: 10,
        marginTop: 7,
    }
});