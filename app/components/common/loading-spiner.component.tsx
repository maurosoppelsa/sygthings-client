import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../config/colors';


export default function LoadingSpinnerComponent() {
  return (
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />
  );
}

const styles = StyleSheet.create({
    loadingSpinner: {
        alignSelf: 'center',
    }
});