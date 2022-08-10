import { Box } from '@react-native-material/core';
import MapboxGL, { Logger } from '@rnmapbox/maps';
import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../../config/colors';
import { mapbox_token, map_style, map_zoom_level } from "../../../config/map-settings";
import { Location } from '../../../interfaces/common';


export default function MapComponent({ onUpdatelocation, onClose, location }: { onUpdatelocation: any, onClose: any, location: Location }) {
    const [coordinates, setCoordinates] = useState([parseInt(location.longitude), parseInt(location.latitude)]);
    MapboxGL.setAccessToken(mapbox_token);

    // edit logging messages
    Logger.setLogCallback(log => {
        const { message } = log;

        // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
        if (
            message.match('Request failed due to a permanent error: Canceled') ||
            message.match('Request failed due to a permanent error: Socket Closed')
        ) {
            return true;
        }
        return false;
    });

    return (
        <Box style={styles.container}>
            <MapboxGL.MapView style={styles.map} styleJSON={JSON.stringify(map_style)} onRegionWillChange={(payload) => { setCoordinates(payload.geometry.coordinates) }}>
                <MapboxGL.Camera
                    zoomLevel={map_zoom_level}
                    centerCoordinate={[parseInt(location.longitude), parseInt(location.latitude)]}
                />
            </MapboxGL.MapView>
            <Box style={styles.buttonsContainer}>
                <Pressable
                    style={styles.mapButton}
                    onPress={() => { onUpdatelocation(coordinates) }}
                >
                    <Text style={styles.closeText}>Update</Text>
                </Pressable>
                <Pressable
                    style={styles.mapButton}
                    onPress={() => { onClose() }}
                >
                    <Text style={styles.closeText}>Cancel</Text>
                </Pressable>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 300,
        height: 300,
        alignItems: 'center',
        padding: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    mapButton: {
        borderRadius: 5,
        padding: 10,
        minWidth: 100,
        elevation: 2,
        alignSelf: "center",
        backgroundColor: colors.blue,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    map: {
        flex: 1,
        width: 290,
    },
    buttonsContainer: {
        flexDirection: 'row',
    }
});