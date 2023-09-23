import React from 'react';
import SightListComponent from '../sight/sight-list.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { getCurrentSights } from '../../redux/sight-slice';
import { View, StyleSheet } from 'react-native';
import I18n from '../../../i18n/i18n';
import { User } from '../../interfaces/common';
import LoadingSpinnerComponent from '../common/loading-spiner.component';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const lastSightsList = useSelector((state: any) => state.sight.currentSights);
  const currentUser: User = useSelector((state: any) => state.authentication.user);
  const isLoadingSights = useSelector((state: any) => state.sight.loading);

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser?.id) {
        dispatch(getCurrentSights(currentUser.id));
      }
    }, [])
  );

  if (isLoadingSights) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinnerComponent />
      </View>
    );
  }
  return (
    <SightListComponent sightList={lastSightsList} listTitle={I18n.t('Dashboard.legend')} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});