import { AppBar, HStack, IconButton, Avatar, Flex, Box } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import colors from '../../config/colors';
import imageBg from '../../assets/dashboard_bg.jpg';


export default function DashboardComponent() {
  return (
    <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
      <StatusBar backgroundColor="#07840a" />
      <View style={styles.container}>
        <Box style={styles.sectionContainer}>
          <AppBar
            title='Syghtings'
            style={styles.bar}
            tintColor={colors.white}
            leading={() => (
              <IconButton onPress={() => console.log("to be defined")} icon={<Icon size={30} name="menu" color="white" />} />
            )}
            trailing={props => (
              <HStack>
                <IconButton
                  icon={<Avatar label="IARA FIGINI" size={40} color={colors.lightGray} />}
                  onPress={() => console.log("to be defined")}
                  {...props}
                />
              </HStack>
            )}
          />
          <Box style={styles.mainSection}>
            <Box style={styles.cameraButton}>
              <Icon name='camera-plus' size={100} color='#000' />
              <Text style={styles.newSightLegend}>
                NEW SIGHT</Text>
            </Box>
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
    paddingTop: 25,
    maxHeight: 85,
    backgroundColor: colors.syghtingGreen
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center"
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "column"
  },
  cameraButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 20
  },
  newSightLegend: {
    paddingLeft: 12,
  }
});