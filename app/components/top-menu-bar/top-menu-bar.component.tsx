import { AppBar, HStack, IconButton, Avatar, Box, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export function TopMenuBarComponent() {
    return (
        <Box style ={styles.container}>
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
        </Box>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bar: {
        flex: 1,
        paddingTop: 30,
        maxHeight: 85,
      },
});