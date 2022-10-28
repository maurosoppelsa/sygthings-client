import { Box } from '@react-native-material/core';
import React, { useState } from 'react';
import { Sight } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';
import SightComponent from '../sight/sight.component';
import TitleComponent from '../common/title-component';
import { useFocusEffect } from '@react-navigation/native';
import SightDetailsComponent from '../sight/sight-details.component';


export default function MySights() {
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
    const [showDetail, setShowDetail] = useState(false);
    const [currentSight, setCurrentSight] = useState(null);

    //TODO avoid this duplicated code
    useFocusEffect(
        React.useCallback(() => {
            return () => setShowDetail(false);
        }, [])
    );

    const getSightDetails = (sight: any) => {
        setCurrentSight(sight);
        setShowDetail(true);
    };

    const closeDetails = () => {
        setShowDetail(false);
    }

    const ShowSightContent = () => {
        if (showDetail) {
            return <SightDetailsComponent onClose={closeDetails} sight={currentSight} />;
        } else {
            return (
                <ScrollView>
                    <TitleComponent title="What I've seen..." />
                    {mySights.map((sight, key) => {
                        return (
                            <Box key={key}>
                                <SightComponent getDetails={getSightDetails} sight={sight} />
                            </Box>
                        );
                    })}
                </ScrollView>
            );
        }
    };

    if (mySights.length === 0) {
        return (
            <Box>
                <Text>You haven't submitted any sight yet...</Text>
            </Box>);
    }
    return (
        <Box style={styles.container}>
            <ShowSightContent />
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
});