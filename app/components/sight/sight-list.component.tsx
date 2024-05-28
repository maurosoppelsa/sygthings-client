import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Box } from "@react-native-material/core";
import { Sight } from "../../interfaces/common";
import SightDetailsComponent from "../sight/sight-details.component";
import { useFocusEffect } from "@react-navigation/native";
import TitleComponent from "../common/title-component";
import SightComponent from "./sight.component";
import colors from "../../config/colors";
import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux';
import { returnToMainScreen } from "../../redux/sight-slice";

export default function SightListComponent({ sightList, listTitle, allowDeletion, onDeleteSight, onUpdateSight }: { sightList: Array<Sight>, listTitle: string, allowDeletion?: boolean, onDeleteSight?: any, onUpdateSight?: any }) {
    const [showDetail, setShowDetail] = useState(false);
    const [currentSight, setCurrentSight] = useState(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const dispatch = useAppDispatch();
    const backToMain = useSelector((state: any) => state.sight.backToMainScreen);
    const [scrollPosition, setScrollPosition] = useState({x: 0, y: 0});
    const [shouldUpdateScroll, setShouldUpdateScroll] = useState(false);

    useEffect(() => {
        if(shouldUpdateScroll) {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: scrollPosition.y, animated: false });
            }
        }
    });

    useFocusEffect(
        React.useCallback(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
            return () => {
                setShowDetail(false);
                scrollPosition.y = 0;
            };
        }, [])
    );

    const getSightDetails = (sight: any) => {
        dispatch(returnToMainScreen(false));
        setCurrentSight(sight);
        setShowDetail(true);
    };

    const closeDetails = () => {
        setShowDetail(false);
        setShouldUpdateScroll(true);
    }

    const deleteSight = (sight: Sight) => {
        setShowDetail(false);
        onDeleteSight(sight);
    }

    const updateSight = (sight: Sight) => {
        setShowDetail(false);
        onUpdateSight(sight);
    }
    
    const handleScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y >= 0) {
            scrollPosition.y = event.nativeEvent.contentOffset.y;
        }
    }

    const ShowSightContent = () => {
        {
            if (showDetail && !backToMain) {
                return <SightDetailsComponent onClose={closeDetails} sight={currentSight} allowDelete={allowDeletion} onDelete={() => { deleteSight(currentSight) }} onUpdate={updateSight} />;
            } else {
                return <ScrollView ref={scrollViewRef} onScroll={(event) => {handleScroll(event)}}>
                    {listTitle !== '' && <TitleComponent title={listTitle} />}
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
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
    },
});