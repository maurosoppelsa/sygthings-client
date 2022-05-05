import React from 'react';
import { Box } from "@react-native-material/core";
import { StyleSheet, Text } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function NewSight() {
    return (
    <Box style={styles.container}>
        <Box style={styles.cameraButton}>
            <Icon name='camera-plus' size={100} color='#000' />
            <Text style={styles.newSightLegend}>
                NEW SIGHT</Text>
        </Box>
    </Box>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cameraButton: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
        marginBottom: 20
      },
      newSightLegend: {
        paddingLeft: 12,
      }
});
