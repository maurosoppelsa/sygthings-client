import { AppBar, HStack, IconButton, Avatar, Flex, Box, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import colors from '../../config/colors';
import imageBg from '../../assets/dashboard_bg.jpg';
import LastSights from './last-sights/last-sights.component';
import BottomBar from '../bottom-bar/bottom-bar.component';


export default function DashboardComponent({ lastSightsList }: { lastSightsList: Array<any> }) {
  return (
    <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
      <StatusBar backgroundColor={colors.lightGray
      } />
      <View style={styles.container}>
        <Box style={styles.sectionContainer}>
          <AppBar
            style={styles.bar}
            tintColor={colors.black}
            transparent={true}
            leading={() => (
              <IconButton onPress={() => console.log("to be defined")} icon={<Icon size={30} name="menu" color={colors.black} />} />
            )}
            trailing={props => (
              <HStack>
                <IconButton onPress={() => console.log("to be defined")} icon={<Icon size={30} name="bell" color={colors.black} />} />
                <IconButton
                  icon={<Avatar label="IARA FIGINI" size={40} color={colors.lightGray} />}
                  onPress={() => console.log("to be defined")}
                  {...props}
                />
              </HStack>
            )}
          />
          <Divider style={{ marginTop: 10 }} />
          <Box style={styles.mainSection}>
            <ScrollView>
              {lastSightsList.map((prop, key) => {
                return (
                  <LastSights key={key}/>
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
  bar: {
    flex: 1,
    paddingTop: 30,
    maxHeight: 85,
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
    flex: 1
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "column",
  },
});