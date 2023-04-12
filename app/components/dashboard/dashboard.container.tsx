import React, { useEffect } from 'react';
import SightListComponent from '../sight/sight-list.component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store'
import { getCurrentSights } from '../../redux/sight-slice';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import I18n from '../../../i18n/i18n';
import { User } from '../../interfaces/common';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const lastSightsList = useSelector((state: any) => state.sight.currentSights);
  const currentUser: User = useSelector((state: any) => state.authentication.user);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getCurrentSights(currentUser.id));
    }
  }, []);
  if (!lastSightsList) {
    return (
      <View>
        <ActivityIndicator style={styles.loadingSpinner} size="large" color={colors.gray} />
      </View>
    );
  }
  return (
    <SightListComponent sightList={lastSightsList} listTitle={I18n.t('Dashboard.legend')} />
  );
}

const styles = StyleSheet.create({
  loadingSpinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
});