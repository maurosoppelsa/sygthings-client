import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Box } from "@react-native-material/core";
import { Sight } from "../../interfaces/common";
import SightDetailsComponent from "../sight/sight-details.component";
import { useFocusEffect } from "@react-navigation/native";
import TitleComponent from "../common/title-component";
import SightComponent from "./sight.component";

export default function SightListComponent({ sightList, listTitle }: { sightList: Array<Sight>, listTitle: string }) {
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

    const ShowSightContent = () => {
        {
            if (showDetail) {
                return <SightDetailsComponent onClose={closeDetails} sight={currentSight} />;
            } else {
                return <ScrollView>
                    <TitleComponent title={listTitle} />
                    {sightList.map((sight, key) => {
                        return (
                            <SightComponent getDetails={getSightDetails} sight={sight} key={key} />
                        );
                    })}
                </ScrollView>
            }
        }
    };
    return (
        <Box style={styles.container}>
            <ShowSightContent />
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "row",
    },
});