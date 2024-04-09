import { Box, Divider } from "@react-native-material/core";
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';
import { isTabletDevice } from "../../utils/common";


export default function TitleComponent({ title }: { title: string }) {
  return (
    <Box style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: isTabletDevice() ? 26 : 20,
        color: colors.darkGray,
        fontWeight: "600",
        marginTop: 20,
        alignSelf: "center",
    },
});