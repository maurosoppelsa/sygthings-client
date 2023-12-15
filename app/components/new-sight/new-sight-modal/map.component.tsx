import { Box } from '@react-native-material/core';
import MapboxGL, { Logger } from '@rnmapbox/maps';
import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../../config/colors';
import { mapbox_token, map_zoom_level } from "../../../config/map-settings";
import { Location } from '../../../interfaces/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaranduButtonComponent } from '../../common/marandu-button.component';
import I18n from '../../../../i18n/i18n';



export default function MapComponent({ onUpdatelocation, onClose, location }: { onUpdatelocation: any, onClose: any, location: Location }) {
    const [coordinates, setCoordinates] = useState([parseInt(location.longitude), parseInt(location.latitude)]);
    MapboxGL.setWellKnownTileServer('Mapbox');
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

    const renderAnnotations = () => {
        return (
            <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={coordinates}>
                <MaterialCommunityIcons name="map-marker" size={22} style={styles.locationIcon} />
            </MapboxGL.PointAnnotation>
        );
    }

    // original config replace styleUrl by styleJSON={JSON.stringify(map_style)}
    return (
        <Box style={styles.container}>
            <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Light} onRegionWillChange={(payload) => { setCoordinates(payload.geometry.coordinates) }}>
                <MapboxGL.Camera
                    zoomLevel={map_zoom_level}
                    centerCoordinate={[parseInt(location.longitude), parseInt(location.latitude)]}
                />
                {renderAnnotations()}
            </MapboxGL.MapView>
            <Box style={styles.buttonsContainer}>
                <MaranduButtonComponent
                    title={I18n.t('Common.update')}
                    style={styles.mapButton}
                    onPress={() => { onUpdatelocation(coordinates) }}
                />
                <MaranduButtonComponent
                    title={I18n.t('Common.cancel')}
                    style={styles.mapButton}
                    onPress={() => { onClose() }}
                />
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
    },
    locationIcon: {
        color: 'red',
    }
});