import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SIGHT_MODAL_STATUS } from "../../../constants";
import NewSightFormComponent from "./new-sight-form.component";
import NewSightLegendStatus from "./new-sight-leyend-status.component";

const NewSightModalComponent = ({ modalFormStatus, imageUrl, showModal, onSubmit, onClose }: { modalFormStatus: string, imageUrl: string, showModal: boolean, onSubmit: any, onClose: any }) => {
  const ModalContent = () => modalFormStatus === SIGHT_MODAL_STATUS.NEW ? <NewSightFormComponent imageUrl={{ uri: imageUrl }} onSubmit={onSubmit} /> :
    <NewSightLegendStatus status={modalFormStatus} onClose={onClose}/>
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