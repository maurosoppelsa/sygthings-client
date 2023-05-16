import { Box, Divider } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Sight } from '../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { capitalizeText, getCreatedByLegend } from '../../utils/common';
import ActionModalComponent from '../common/action-modal.component';
import I18n from '../../../i18n/i18n';
import SightEditComponent from './sight-edit.component';


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
            <Box style={styles.container}>
                <Image style={styles.sightImage} source={{ uri: sight?.picture.uri }} />
                <TouchableOpacity style={[styles.touchableHeader, styles.touchableBackBtWrapper]} onPress={() => { onClose() }}>
                    <MaterialCommunityIcons name="arrow-left" size={40} style={styles.headerButton} />
                </TouchableOpacity>
                {
                    allowDelete &&
                    <Box style={[styles.touchableActionContainer, styles.touchableHeader]}>
                        <TouchableOpacity onPress={() => { setShowModal(true) }}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} style={[styles.headerButton, styles.actionButton]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setShowEdit(true) }}>
                            <MaterialCommunityIcons name="border-color" size={30} style={[styles.headerButton, styles.actionButton]} />
                        </TouchableOpacity>
                    </Box>
                }
                <Box style={styles.headerContainer}>
                    <Text style={styles.sightName}>{sight?.animal}</Text>
                    <Box style={styles.locationContainer}>
                        <MaterialCommunityIcons name="map-marker" size={22} style={styles.locationIcon} />
                        <Text>{sight?.placeName}</Text>
                    </Box>
                </Box>
                <Divider style={styles.divider} />
                <Box style={styles.detailsContainer}>
                    <Text>Condition: {capitalizeText(sight?.condition)}</Text>
                    <Text>Description: <Text style={styles.description}>{sight?.description}</Text></Text>
                    <Text style={styles.createdText}>
                        {getCreatedByLegend(name, lastName, occupation, sight?.createdAt)}
                    </Text>
                </Box>
                <ActionModalComponent
                    showModal={showModal}
                    actionBtText={I18n.t('Common.delete')}
                    actionCancel={() => setShowModal(false)}
                    actionProceed={() => onDelete()}
                    title={I18n.t('Sight.deleteTitle')}
                    subtitle={I18n.t('Sight.deleteSubtitle')} />
            </Box>
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
    },
    headerContainer: {
        marginBottom: 2,
        alignItems: 'center',
    },
    sightImage: {
        width: '100%',
        height: '60%',
    },
    sightName: {
        marginTop: 5,
        color: colors.black,
        fontSize: 30,
        fontWeight: 'bold',
    },
    detailsContainer: {
        padding: 10,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationIcon: {
        color: 'red',
        marginRight: 5,
    },
    description: {
        fontSize: 12,
        lineHeight: 20
    },
    createdText: {
        fontSize: 12,
        alignSelf: 'center',
        color: colors.black,
    },
    touchableHeader: {
        position: 'absolute',
        margin: 10,
    },
    touchableBackBtWrapper: {
        alignSelf: 'flex-start',
    },
    touchableActionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerButton: {
        color: colors.white,
    },
    actionButton: {
        paddingVertical: 5,
    },
    divider: {
        marginTop: 15,
    }
});