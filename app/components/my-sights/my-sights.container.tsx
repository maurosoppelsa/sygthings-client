import { Box } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { Sight, User } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import SightListComponent from '../sight/sight-list.component';
import I18n from '../../../i18n/i18n';
import colors from '../../config/colors';
import { useAppDispatch } from '../../redux/store'
import { getSightsByUser } from '../../redux/sight-slice';


export default function MySights() {
    const dispatch = useAppDispatch();
    const currentUser: User = useSelector((state: any) => state.authentication.user);
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
    
    useEffect(() => {
        if(mySights.length === 0 && currentUser?.id) {
            dispatch(getSightsByUser(currentUser.id));
        }
      }, []);

    if (mySights.length === 0) {
        return (
            <Box style={styles.container}>
                <Box style={styles.textContainer}>
                    <Text style={styles.title}>{I18n.t('MySights.noSights')}</Text>
                </Box>
            </Box>);
    }
    return (
        <SightListComponent sightList={mySights} listTitle={I18n.t('MySights.legend')} />
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

