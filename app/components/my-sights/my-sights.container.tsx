import { Box } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Sight, User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import SightListComponent from '../sight/sight-list.component';
import I18n from '../../../i18n/i18n';
import colors from '../../config/colors';
import { useAppDispatch } from '../../redux/store'
import { deleteSight, getSightsByUser, editSight } from '../../redux/sight-slice';
import LoadingSpinnerComponent from '../common/loading-spiner.component';


export default function MySights() {
    const dispatch = useAppDispatch();
    const currentUser: User = useSelector((state: any) => state.authentication.user);
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
    const isLoadingSights = useSelector((state: any) => state.sight.loadingMySights);
    const [showNoSightsMessage, setShowNoSightsMessage] = useState(false); // Add new state variable

    const onDeleteSight = (sight: Sight) => {
        dispatch(deleteSight(sight?.id));
    }

    const updateSight = (sight: Sight) => {
        dispatch(editSight(sight));
    }

    useEffect(() => {
        if (mySights.length === 0 && currentUser?.id) {
            console.log("getSightsByUser", currentUser?.id);
            dispatch(getSightsByUser(currentUser.id));
            setShowNoSightsMessage(true);
        }
    }, []);

    if (isLoadingSights) {
        return (
            <Box style={styles.container}>
                <LoadingSpinnerComponent/>
            </Box>);
    }

    if (showNoSightsMessage && mySights.length === 0) {
        return (
            <Box style={styles.container}>
                <Box style={styles.textContainer}>
                    <Text style={styles.title}>{I18n.t('MySights.noSights')}</Text>
                </Box>
            </Box>);
    }
    return (
        <SightListComponent sightList={mySights} listTitle={I18n.t('MySights.legend')} allowDeletion={true} onDeleteSight={onDeleteSight} onUpdateSight={updateSight} />
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        alignSelf: 'center'
    },
});

