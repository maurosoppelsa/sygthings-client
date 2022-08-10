import React from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import { SIGHT_MODAL_STATUS } from "../../../constants";
import { Location } from "../../../interfaces/common";
import MapComponent from "./map.component";
import NewSightFormComponent from "./new-sight-form.component";
import NewSightLegendStatus from "./new-sight-leyend-status.component";

const NewSightModalComponent = ({ modalFormStatus, imageUrl, showModal, onSubmit, onClose, locationInfo, showLocationModal, onUpdateLocation, onCloseLocationModal, location }: { modalFormStatus: string, imageUrl: string, showModal: boolean, onSubmit: any, onClose: any, locationInfo: string, showLocationModal: boolean, onUpdateLocation: any, onCloseLocationModal: any, location: Location }) => {
  const ModalContent = () => {
    if (showLocationModal) {
      return <MapComponent onUpdatelocation={onUpdateLocation} onClose={onCloseLocationModal} location={location}/>;
    } else if (modalFormStatus === SIGHT_MODAL_STATUS.NEW) {
      return <NewSightFormComponent imageUrl={{ uri: imageUrl }} onSubmit={onSubmit} locationInfo={locationInfo} />
    } else {
      return <NewSightLegendStatus status={modalFormStatus} onClose={onClose} />
    }
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <ModalContent />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewSightModalComponent;