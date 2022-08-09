import { Box, Divider } from "@react-native-material/core";
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';


export default function TitleComponent({ title }: { title: string }) {
  return (
    <Box style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Divider style={styles.divider} trailingInset={32} color={colors.syghtingGreen}></Divider>
    </Box>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 18,
        color: colors.black ,
        fontWeight: "600"
    }, 
    divider: {
        marginTop: 10,
    }
});