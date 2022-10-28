import { Box } from "@react-native-material/core";
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import colors from '../../config/colors';
import SightComponent from "../sight/sight.component";
import { Sight } from "../../interfaces/common";
import TitleComponent from "../common/title-component";
import SightDetailsComponent from "../sight/sight-details.component";
import { useFocusEffect } from "@react-navigation/native";


export default function DashboardComponent({ lastSightsList }: { lastSightsList: Array<Sight> }) {

  const [showDetail, setShowDetail] = useState(false);
  const [currentSight, setCurrentSight] = useState(null);

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

  const ShowSightConent = () => {
    {
      if (showDetail) {
        return <SightDetailsComponent onClose={closeDetails} sight={currentSight} />;
      } else {
        return <ScrollView>
          <TitleComponent title="What people seen..." />
          {lastSightsList.map((sight, key) => {
            return (
              <SightComponent getDetails={getSightDetails} sight={sight} key={key} />
            );
          })}
        </ScrollView>
      }
    }
  };

  return (
    <Box style={styles.mainContainer}>
      <View style={styles.viewContainer}>
        <Box style={styles.sectionContainer}>
          <Box style={styles.mainSection}>
            <ShowSightConent sightItem={currentSight}></ShowSightConent>
          </Box>
        </Box>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    fontSize: 30,
    color: colors.white
  },
  mainSection: {
    flex: 6
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "column",
  },
});