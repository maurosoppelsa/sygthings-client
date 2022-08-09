import { Box } from "@react-native-material/core";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import colors from '../../config/colors';
import SightComponent from "../sight/sight.component";
import { Sight } from "../../interfaces/common";
import TitleComponent from "../common/title-component";


export default function DashboardComponent({ lastSightsList }: { lastSightsList: Array<Sight> }) {
  return (
    <Box style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.lightGray
      } />
      <View style={styles.viewContainer}>
        <Box style={styles.sectionContainer}>
          <Box style={styles.mainSection}>
            <ScrollView>
              <TitleComponent title="Last Sights" />
              {lastSightsList.map((sight, key) => {
                return (
                  <SightComponent sight={sight} key={key} />
                );
              })}
            </ScrollView>
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