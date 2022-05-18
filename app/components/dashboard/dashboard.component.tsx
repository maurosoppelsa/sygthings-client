import { Box } from "@react-native-material/core";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import colors from '../../config/colors';
import imageBg from '../../assets/dashboard_bg.jpg';
import SightComponent from "./sight/sight.component";
import { Sight } from "../../interfaces/common";


export default function DashboardComponent({ lastSightsList }: { lastSightsList: Array<Sight> }) {
  return (
    <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
      <StatusBar backgroundColor={colors.lightGray
      } />
      <View style={styles.container}>
        <Box style={styles.sectionContainer}>
          <Box style={styles.mainSection}>
            <ScrollView>
              {lastSightsList.map((sight, key) => {
                return (
                  <SightComponent sight={sight} key={key} />
                );
              })}
            </ScrollView>
          </Box>
        </Box>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    fontSize: 30,
    color: colors.white
  },
  image: {
    width: '100%',
    height: '100%'
  },
  mainSection: {
    flex: 6
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "column",
  },
});