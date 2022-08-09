import { Box } from '@react-native-material/core';
import React from 'react';
import { Sight } from '../../interfaces/common';
import { useSelector } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';
import SightComponent from '../sight/sight.component';
import TitleComponent from '../common/title-component';


export default function MySights() {
    const mySights: Array<Sight> = useSelector((state: any) => state.sight.mySights);
    if (mySights.length === 0) {
        return (
        <Box>
            <Text>You haven't submitted any sight yet...</Text>
        </Box>);
    }
    return (
        <Box style={styles.container}>
            <ScrollView>
            <TitleComponent title="My Sights" />
                {mySights.map((sight, key) => {
                    return (
                        <Box key={key}>
                            <SightComponent sight={sight} />
                        </Box>
                    );
                })}
            </ScrollView>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row"
    },
  });