import React, { useEffect } from 'react';
import SightListComponent from '../sight/sight-list.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { getCurrentSights } from '../../redux/sight-slice';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import colors from '../../config/colors';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const lastSightsList = useSelector((state: any) => state.sight.currentSights);

  useEffect(() => {
    dispatch(getCurrentSights());
  }, []);
  if (!lastSightsList) {
    return (
      <View>
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />
      </View>
    );
  }
  return (
    <SightListComponent sightList={lastSightsList} listTitle={"What people seen..."} />
  );
}

const styles = StyleSheet.create({
  loadingSpinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
});