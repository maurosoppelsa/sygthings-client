import { Box } from '@react-native-material/core';
import React from 'react';
import { Sight } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import SightListComponent from '../sight/sight-list.component';


export default function MySights() {
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);

    if (mySights.length === 0) {
        return (
            <Box>
                <Text>You haven't submitted any sight yet...</Text>
            </Box>);
    }
    return (
        <SightListComponent sightList={mySights} listTitle={"What I've seen..."} />
    );
}